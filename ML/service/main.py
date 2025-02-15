import logging
from flask import Flask, request, jsonify

from generate_presentation import generate_presentation_by_file_context

# Настройка логирования
logging.basicConfig(level=logging.ERROR)

import time

app = Flask(__name__)

@app.route('/generate_presentation', methods=['POST'])
def generate_presentation():
    start_time = time.time()  # Начало отсчета времени
    data = request.json
    
    # Проверка наличия и типа данных
    user_query = data.get('user_query')
    file_context = data.get('file_context')
    
    if not user_query or not isinstance(user_query, str):
        return jsonify({"error": "user_query is required and must be a string."}), 400
    
    if not file_context or not isinstance(file_context, str):
        return jsonify({"error": "file_context is required and must be a string."}), 400

    try:
        slides_content = generate_presentation_by_file_context(user_query, file_context)
        execution_time = time.time() - start_time  # Время выполнения запроса
        logging.info(f"Request executed in {execution_time:.2f} seconds.")  # Логирование времени выполнения
        return jsonify(slides_content)
    except Exception as e:
        # Логирование ошибки
        logging.error(f"Error generating presentation: {e}")
        return jsonify({"error": "An error occurred while generating the presentation."}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)