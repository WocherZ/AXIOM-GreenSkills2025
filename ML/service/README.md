# RAG сервис для создания презентаций на основе LLM

## Описание

Данный сервис позволяет создавать презентации на основе текстового файла и запроса пользователя. Код реализует REST API для генерации на основе RAG-а по файлу презентации.

## Как развернуть

1. Создайте виртуальное окружение:
```
python -m venv .venv
```

2. Активируйте виртуальное окружение:
- На Windows:
```
.venv\Scripts\activate
```
- На macOS и Linux:
```
source .venv/bin/activate
```

1. Установите vllm:
```
pip install vllm
```

2. Разверните LLM модель:
```
vllm serve --host 0.0.0.0 --port 9000 Qwen/Qwen2.5-14B-Instruct-GPTQ-Int4
```

3. Разверните модель эмбеддинга:
```
vllm serve --host 0.0.0.0 --port 9001 BAAI/bge-m3
```

Для развертывания RAG сервиса для создания презентаций на основе LLM, выполните следующие шаги:

1. Клонируйте репозиторий с проектом:
```
git clone https://github.com/WocherZ/AXIOM-GreenSkills2025.git
```

2. Перейдите в директорию сервиса:
```
cd ./AXIOM-GreenSkills2025/ML/service
```

3. Постройте Docker-образ для сервиса:
```
docker build -t rag_service .
```

4. Запустите контейнер с сервисом:
```
docker run -d -p 5000:5000 --name rag_service rag_service
```

После выполнения этих шагов, сервис будет доступен по адресу `http://localhost:5000`.

Пример обращения к сервису с помощью Python:
```python
import requests
url = 'http://localhost:5000/generate_presentation'

# Данные для запроса
data = {
    'user_query': 'Сделай презентацию про функционал',
    'file_context': content_text
}

# Выполнение POST-запроса
response = requests.post(url, json=data)

# Проверка статуса ответа
if response.status_code == 200:
    # Успешный ответ
    slides_content = response.json()
    print("Содержимое слайдов:", slides_content)
else:
    # Обработка ошибок
    print("Ошибка:", response.json())
```