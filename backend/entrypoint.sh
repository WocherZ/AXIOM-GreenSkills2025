#!/bin/sh

npm run migration:run

# Проверяем, установлена ли переменная RUN_SEED и равна ли она "true"
if [ "$RUN_SEED" = "true" ]; then
  npm run seed:build
fi

node dist/main.js
