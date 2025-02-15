# Summary
SUMMARY_TEXT_CONTENT_SYSTEM_PROMPT = "Ты эксперт в создании кратких и точных резюме документов. Содержание должно отражать суть документа и состоять не больше, чем из 3 предложений."
SUMMARY_TEXT_CONTENT_USER_PROMPT_TEMPLATE = "Пожалуйста, составь краткое содержание для следующего документа: {text_content}\n\nКраткое содержание:"

# Creation presentation plan
CREATE_SLIDES_PLAN_ANSWER_EXAMPLE = '''```json\n[{"title": "...", "info": "...", "use_list": true}, {"title": "...", "info": "...", "use_list": false}]\n```
Для каждого слайда используй следующие поля:
- "title": Название слайда.
- "info": Краткая информация из контекста, которая будет расположена на слайде.
- "use_list": Флаг использования списка, true - использовать список на слайде, false - не использовать список.
'''
CREATE_SLIDES_PLAN_SYSTEM_PROMPT = f"Ты креативный создатель презентаций. Твоя задача придумывать заголовки к слайдам презентации. Ответ дай в формате JSON:{CREATE_SLIDES_PLAN_ANSWER_EXAMPLE}"
CREATE_SLIDES_PLAN_USER_PROMPT_TEMPLATE = "Тебе дан следующий контекст: {summary_content}\nСделай презентацию по запросу пользователя: {user_query}\nНазвание слайдов в виде JSON:"


# Creation content
CREATE_SLIDES_CONTENT_ANSWER_EXAMPLE = '''```json\n{"title": "...", "text": "..."}\n```'''
CREATE_SLIDES_CONTENT_INSTRUCTIONS = '''При написании контента к слайду, ты можешь использовать следующие поля:
- "title": название слайда.
- "text": основной текст слайда - указывай обязательно для каждого слайда.'''
CREATE_SLIDES_CONTENT_LIST = '''- "list": ["...", "..."] - перечисление пунктов или создание списков для презентации (bullet points).'''
CREATE_SLIDES_CONTENT_SYSTEM_PROMPT = f"Ты креативный создатель презентаций. Твоя задача - создавать содержимое для слайдов презентации. Ответ должен быть в формате JSON:{CREATE_SLIDES_CONTENT_ANSWER_EXAMPLE}\n{CREATE_SLIDES_CONTENT_INSTRUCTIONS}"
CREATE_SLIDES_CONTENT_USER_PROMPT_TEMPLATE = "Тебе дана следующая информация: {relevant_content}\nТебе нужно составить содержание для слайда с названием: {slide_topic}. Содержание слайда в виде JSON:"