# Frontend Application

## Требования

- Docker
- Docker Compose

## Установка
1. Клонируйте репозиторий:

    ```sh
    git clone https://github.com/WocherZ/AXIOM-GreenSkills2025.git
    cd ./AXIOM-GreenSkills2025/frontend
    ```
## Запуск
    ```
1. Соберите и запустите контейнеры:

    ```sh
    docker build -t front -f ./docker/container/front/Dockerfile .
    docker compose up -d
    ```

3. Приложение будет доступно по адресу `http://localhost:9000`.