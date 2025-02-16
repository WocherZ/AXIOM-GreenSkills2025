FROM node:20-alpine
WORKDIR /app
RUN apk update
RUN apk add bash nginx
COPY ./ ./
COPY docker/container/front/conf.d/ /etc/nginx/conf.d/
COPY docker/container/front/nginx.conf /etc/nginx/nginx.conf
RUN yarn
RUN yarn global add @quasar/cli
RUN quasar build
RUN rm -rf /var/cache/apk/*

