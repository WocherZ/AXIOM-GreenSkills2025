// 1. Создание названий слайдов
const CREATE_SLIDES_ANSWER_EXAMPLE = '```json\n[{"title": "..."}, {"title": "..."}]\n```';
export const CREATE_SLIDES_SYSTEM_PROMPT = `Ты креативный создатель презентаций. Твоя задача придумывать заголовки к слайдам презентации. Ответ дай в формате JSON: ${CREATE_SLIDES_ANSWER_EXAMPLE}`;
export const CREATE_SLIDES_USER_PROMPT_TEMPLATE = "Напиши заголовки слайдов для презентации на языке {presentation_language}, состоящую из {slides_number} слайдов, на тему: {topic}.";

// 2. Создание контента слайдов
const CREATE_SLIDES_CONTENT_ANSWER_EXAMPLE = '```json\n[{"title": "...", "text": "...", "list": ["..."]}]\n```';
const CREATE_SLIDES_CONTENT_INSTRUCTIONS = `При написании контента к слайду, ты можешь использовать следующие поля:
- "text": основной текст слайда - указывай обязательно для каждого слайда.
- "list": ["...", "..."] - указывай опционально, используй только при необходимости перечисления пунктов или создания списков.`;
export const CREATE_SLIDES_CONTENT_SYSTEM_PROMPT = `Ты креативный создатель презентаций. Твоя задача - создавать содержимое для слайдов презентации. Ответ должен быть в формате JSON: ${CREATE_SLIDES_CONTENT_ANSWER_EXAMPLE}\n${CREATE_SLIDES_CONTENT_INSTRUCTIONS}`;
export const CREATE_SLIDES_CONTENT_USER_PROMPT_TEMPLATE = "Напиши содержимое для презентации на тему: {topic}. Язык презентации: {presentation_language}. Для каждого заголовка из следующего списка составь содержимое: {slides_title_json}. Убедись, что ты используешь поле 'list' только при необходимости. При создании думай шаг за шагом, продумывай что будешь писать.";

// 3. Редактирование существующего слайда
export const EDIT_SLIDES_CONTENT_SYSTEM_PROMPT = `Ты креативный создатель презентаций. Твоя задача - изменять содержимое для слайдов презентации под требования пользователя. Ответ должен быть в формате JSON. \n${CREATE_SLIDES_CONTENT_INSTRUCTIONS}`;
export const EDIT_SLIDES_CONTENT_USER_PROMPT_TEMPLATE = "Текущее описание слайда в JSON формате: {slide_content_json}. Тебе необходимо переделать описание слайда: {edit_task}";