FROM debian:bullseye-slim

ENV NGINX_VERSION="1.26.2-1~bullseye"
ENV NGINX_VERSION_WITHOUT_PREFIX="1.26.2"
ENV NGINX_VTS_VERSION="0.2.3"

# Обновляем список пакетов и устанавливаем необходимые инструменты
RUN apt-get update && apt-get install -y gnupg2 curl dpkg-dev

# Добавляем ключ и репозиторий Nginx
RUN curl -fsSL http://nginx.org/keys/nginx_signing.key | gpg --dearmor -o /usr/share/keyrings/nginx-archive-keyring.gpg \
    && echo "deb-src [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/debian/ bullseye nginx" >> /etc/apt/sources.list.d/nginx.list \
    && apt-get update

# Устанавливаем исходные коды Nginx
RUN mkdir -p /opt/rebuildnginx \
    && chmod 0777 /opt/rebuildnginx \
    && cd /opt/rebuildnginx \
    && apt-get source nginx=${NGINX_VERSION} \
    && apt-get build-dep -y nginx=${NGINX_VERSION}

# Скачиваем и распаковываем модуль VTS
RUN cd /opt \
    && curl -sL https://github.com/vozlt/nginx-module-vts/archive/v${NGINX_VTS_VERSION}.tar.gz | tar -xz \
    && ls -al /opt/rebuildnginx \
    && ls -al /opt \
    && sed -i -r -e "s/\.\/configure(.*)/.\/configure\1 --add-module=\/opt\/nginx-module-vts-${NGINX_VTS_VERSION}/" /opt/rebuildnginx/nginx-${NGINX_VERSION_WITHOUT_PREFIX}/debian/rules \
    && cd /opt/rebuildnginx/nginx-${NGINX_VERSION_WITHOUT_PREFIX} \
    && dpkg-buildpackage -b \
    && cd /opt/rebuildnginx \
    && dpkg --install nginx_${NGINX_VERSION}_amd64.deb \
    && apt-get remove --purge -y dpkg-dev curl && apt-get -y --purge autoremove && rm -rf /var/lib/apt/lists/*
