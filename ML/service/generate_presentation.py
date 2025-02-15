import json
import openai
import concurrent.futures
from typing import List, Dict
from langchain.text_splitter import TokenTextSplitter
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from concurrent.futures import ThreadPoolExecutor

from config import *
from prompt import *

embedding_client = openai.OpenAI(api_key="EMPTY", base_url=EMBEDDING_BASE_URL)
qdrant_client = QdrantClient(url=QDRANT_URL)
llm_client = openai.OpenAI(api_key="EMPTY", base_url=BASE_URL)


def get_text_embedding(text: str) -> List:
    embedding_response = embedding_client.embeddings.create(
        model=EMBEDDING_MODEL_NAME,
        input=text
    )
    embedding = embedding_response.data[0].embedding
    return embedding


def split_text_into_chunks(text: str, chunk_size: int, chunk_overlap=50) -> List[str]:
    text_splitter = TokenTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    chunks = text_splitter.split_text(text)
    return chunks


def embed_chunk(chunk: str) -> List:
    return get_text_embedding(chunk)


def get_relevant_docs(user_query: str) -> List:
    search_result = qdrant_client.query_points(
        collection_name=COLLECTION_NAME,
        query=get_text_embedding(user_query),
        with_payload=True,
        limit=5
    ).points

    found_texts = []
    for result in search_result:
        found_texts.append(
            result.payload.get("chunk")
        )

    return found_texts


def extract_llm_answer(llm_answer: str) -> List | Dict:
    # Извлекаем текст между ```json и ```
    json_text = llm_answer.split('```json')[1].split('```')[0].strip()
    return json.loads(json_text)


def process_slide(slide_topic: Dict) -> Dict:
    topic = slide_topic['title']
    slide_info = slide_topic['info']
    use_list_on_slide = slide_topic['use_list']

    system_prompt = CREATE_SLIDES_CONTENT_SYSTEM_PROMPT + CREATE_SLIDES_CONTENT_LIST if use_list_on_slide else CREATE_SLIDES_CONTENT_SYSTEM_PROMPT

    docs = get_relevant_docs(slide_info)
    relevant_content = '\n'.join(docs)
    chat_response = llm_client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": system_prompt },
            {"role": "user", "content": CREATE_SLIDES_CONTENT_USER_PROMPT_TEMPLATE.format(relevant_content=relevant_content, slide_topic=topic)},
        ]
    )
    slide_content = chat_response.choices[0].message.content
    return extract_llm_answer(slide_content)


def generate_presentation_by_file_context(user_query: str, file_context: str) -> List[Dict]:
    content_text = file_context
    user_prompt = user_query

    try:
        chunk_size = 200
        chunks = split_text_into_chunks(content_text, chunk_size)

        vectors = []
        with ThreadPoolExecutor(max_workers=EMBEDDING_THREADS) as executor:
            embeddings = list(executor.map(embed_chunk, chunks))

        for i, vector in enumerate(embeddings):
            vectors.append(PointStruct(id=i + 1, vector=vector, payload={"chunk": chunks[i]}))

        if not qdrant_client.collection_exists(COLLECTION_NAME):
            qdrant_client.create_collection(
                collection_name=COLLECTION_NAME,
                vectors_config=VectorParams(size=1024, distance=Distance.DOT),
            )

        qdrant_client.upsert(
            collection_name=COLLECTION_NAME,
            wait=True,
            points=vectors,
        )
        print("Vector db")

        summary_threashold = 5000  # Максимальная длина текста для суммаризации
        # Суммаризируем в несколько потоков
        if len(content_text) > summary_threashold:
            chunks = split_text_into_chunks(content_text, summary_threashold, chunk_overlap=100)
            with ThreadPoolExecutor() as executor:
                chat_responses = list(executor.map(lambda chunk: llm_client.chat.completions.create(
                    model=MODEL_NAME,
                    messages=[
                        {"role": "system", "content": SUMMARY_TEXT_CONTENT_SYSTEM_PROMPT},
                        {"role": "user", "content": SUMMARY_TEXT_CONTENT_USER_PROMPT_TEMPLATE.format(text_content=chunk, user_query=user_prompt)},
                    ],
                    temperature=0
                ), chunks))
            
            summary_content = " ".join(response.choices[0].message.content for response in chat_responses)

        # Суммаризируем в один поток
        else:
            chat_response = llm_client.chat.completions.create(
                model=MODEL_NAME,
                messages=[
                    {"role": "system", "content": SUMMARY_TEXT_CONTENT_SYSTEM_PROMPT},
                    {"role": "user", "content": SUMMARY_TEXT_CONTENT_USER_PROMPT_TEMPLATE.format(text_content=content_text, user_query=user_prompt)},
                ],
                temperature=0
            )
            summary_content = chat_response.choices[0].message.content
        print("Summary")

        chat_response = llm_client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": CREATE_SLIDES_PLAN_SYSTEM_PROMPT},
                {"role": "user", "content": CREATE_SLIDES_PLAN_USER_PROMPT_TEMPLATE.format(summary_content=summary_content, user_query=user_prompt)},
            ],
            temperature=0
        )
        slides_titles = chat_response.choices[0].message.content
        slides_titles_array = extract_llm_answer(slides_titles)
        print("Slide titles")

        with concurrent.futures.ThreadPoolExecutor(max_workers=CREATE_SLIDES_THREADS) as executor:
            slides_content = list(executor.map(process_slide, slides_titles_array))
            print("Slide content")
    except Exception as e:
        print(e)
        return []
    finally:
        qdrant_client.delete_collection(collection_name=COLLECTION_NAME)

    return slides_content