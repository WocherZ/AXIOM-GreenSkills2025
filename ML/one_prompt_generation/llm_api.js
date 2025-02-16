import OpenAI from "openai";

import {CREATE_SLIDES_SYSTEM_PROMPT, 
        CREATE_SLIDES_USER_PROMPT_TEMPLATE,
        CREATE_SLIDES_CONTENT_SYSTEM_PROMPT,
        CREATE_SLIDES_CONTENT_USER_PROMPT_TEMPLATE,
        EDIT_SLIDES_CONTENT_SYSTEM_PROMPT,
        EDIT_SLIDES_CONTENT_USER_PROMPT_TEMPLATE
    } from "./prompt.js";

const LLM_URL = "http://176.114.91.72:9000/v1";
const MODEL_NAME = "Qwen2.5-14B-Instruct-GPTQ-Int4";

const openai = new OpenAI({ apiKey: "EMPTY", baseURL: LLM_URL });


async function generateSlides(topic, slidesNumber = 4, presentationLanguage = "Русский") {
    const userPrompt = CREATE_SLIDES_USER_PROMPT_TEMPLATE
        .replace("{presentation_language}", presentationLanguage)
        .replace("{slides_number}", slidesNumber)
        .replace("{topic}", topic);

    const response = await openai.chat.completions.create({
        model: MODEL_NAME,
        messages: [
            { 
                role: "system", 
                content: CREATE_SLIDES_SYSTEM_PROMPT 
            },
            { 
                role: "user", 
                content: userPrompt 
            }
        ],
        stream: false,
    });
    const content = response.choices[0]?.message?.content || "";
    return content;
}


async function generateSlidesContent(topic, presentationLanguage = "Русский", slidesTitleJson = "[{...}]") {
    const userPrompt = CREATE_SLIDES_CONTENT_USER_PROMPT_TEMPLATE
        .replace("{topic}", topic)
        .replace("{presentation_language}", presentationLanguage)
        .replace("{slides_title_json}", slidesTitleJson);
    
    const response = await openai.chat.completions.create({
        model: MODEL_NAME,
        messages: [
            { 
                role: "system", 
                content: CREATE_SLIDES_CONTENT_SYSTEM_PROMPT 
            },
            { 
                role: "user", 
                content: userPrompt 
            }
        ],
        stream: false,
    });

    const content = response.choices[0]?.message?.content || "";
    return content;
}


async function editSlideContent(slideContentJson, editTask) {
    const userPrompt = EDIT_SLIDES_CONTENT_USER_PROMPT_TEMPLATE
        .replace("{slide_content_json}", JSON.stringify(slideContentJson))
        .replace("{edit_task}", editTask);

    const response = await openai.chat.completions.create({
        model: MODEL_NAME,
        messages: [
            { 
                role: "system", 
                content: EDIT_SLIDES_CONTENT_SYSTEM_PROMPT 
            },
            { 
                role: "user", 
                content: userPrompt 
            }
        ],
        stream: false,
    });

    const content = response.choices[0]?.message?.content || "";
    return content;
}

// 1. Создание названий слайдов
const slides = await generateSlides("История создания атомных станций", 4, "Русский");
process.stdout.write(JSON.stringify(slides));

// 2. Создание контента слайдов
const slidesTitleJson = `[
    {"title": "Истоки и первые шаги в атомной энергетике"},
    {"title": "Первые атомные электростанции в мире"},
    {"title": "Развитие атомных станций в разных странах"},
    {"title": "Современные атомные станции и их преимущества"}
]`
const slidesContent = await generateSlidesContent("История создания атомных станций", "Русский", slidesTitleJson)
process.stdout.write(slidesContent)

// 3. Редактирование существующего слайда
const slideContentJson = {
    "title": "Истоки и первые шаги в атомной энергетике",
    "text": "Истоки атомной энергетики берут начало с конца 19 века, когда были предложены теории о ядерной структуре атома и о радиоактивности. Первый серьезный шаг был сделан в 1898 году, когда французские ученые Пьер и Клод Боррели и их супруга Андреии Боррели обнаружили радиоактивный радон. Однако, на первых шагах атомной энергетики не было теории о ядерной реакции. Основным шагом стало открытие натурализации атома френцем физиком Луи Боррели и его супругой."
};

const editTask = "Упрости текст";
// const editTask = "Разбить на пункты";

const slide = await editSlideContent(slideContentJson, editTask);
process.stdout.write(slide)