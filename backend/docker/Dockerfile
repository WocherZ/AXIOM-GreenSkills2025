FROM node:23-alpine AS base

WORKDIR /app

ARG APP_USER=node
ARG APP_GROUP=node
ARG APP_USER_UID=1001

ENV ALLOW_CONFIG_MUTATIONS=true

RUN apk add --update --no-cache tzdata \
                                nano \
                                bash \
                                htop \
    && cp /usr/share/zoneinfo/UTC /etc/localtime \
    && echo "UTC" > /etc/timezone

FROM base AS manifests

COPY .yarn ./.yarn

COPY package.json yarn.lock .yarnrc.yml ./

FROM manifests AS installer-dev

RUN yarn --frozen-lockfile

FROM installer-dev AS installer-prod

ENV NODE_ENV=production

RUN yarn workspaces focus --all --production && yarn cache clean --all

FROM installer-dev AS builder

COPY . .

RUN yarn build

FROM base AS runner

# Копируем package.json
COPY --from=manifests /app /app
# Копируем продакшен-зависимости
COPY --from=installer-prod /app /app

COPY --from=builder /app/dist /app/dist

COPY --from=builder /app/entrypoint.sh /app/entrypoint.sh

COPY --from=builder /app/.env /app/.env

CMD ["sh", "entrypoint.sh"]