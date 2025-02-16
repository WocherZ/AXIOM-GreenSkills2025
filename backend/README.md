# NestJS Application

## Требования

- Docker
- Docker Compose
- npm
- yarn

## Установка
1. Клонируйте репозиторий:

    ```sh
    git clone https://github.com/WocherZ/AXIOM-GreenSkills2025.git
    cd ./AXIOM-GreenSkills2025/backend
    ```
## Запуск

1. Заполните переменные среды:

    ```sh
    cp .env.example ./docker/.env.local
    ```
2. Соберите и запустите контейнеры:

    ```sh
    docker build -t gamma.app -f ./docker/Dockerfile .
    RUN_SEED=true docker compose -f local.docker-compose.yaml up -d
    ```

3. Приложение будет доступно по адресу `http://localhost:8080`.
4. Документация `http://localhost:8080/api/swagger`.


