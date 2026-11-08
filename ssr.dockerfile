FROM php:8.4-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl libpng-dev libonig-dev libxml2-dev libpq-dev zip unzip libatomic1 \
    && docker-php-ext-install mbstring exif pcntl bcmath gd pdo pdo_pgsql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://nodejs.org/dist/v26.13.0/node-v26.13.0-linux-x64.tar.xz \
    | tar -xJ -C /usr/local --strip-components=1

COPY . .

RUN rm -f /usr/local/bin/pnpm /usr/local/bin/pnpx \
    && npm install --global pnpm@12.18.0

RUN pnpm install --frozen-lockfile

RUN curl -sS https://getcomposer.org/installer \
    | php -- --install-dir=/usr/bin --filename=composer

RUN composer install --optimize-autoloader

COPY docker/php/www.conf /usr/local/etc/php-fpm.d/www.conf

RUN mkdir -p \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

RUN pnpm run build:ssr

EXPOSE 13715

CMD ["node", "bootstrap/ssr/ssr.js"]
