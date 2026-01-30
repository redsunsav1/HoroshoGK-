#!/bin/bash
# Скрипт первоначальной настройки сервера для ГК Хорошо
# Запускать один раз на VPS от root: bash /opt/horoshogk-api/setup.sh

set -e

echo "=== Установка Node.js ==="
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi
echo "Node.js: $(node --version)"

echo "=== Установка nginx ==="
apt-get update
apt-get install -y nginx
systemctl enable nginx

echo "=== Создание директорий ==="
mkdir -p /var/www/horoshogk/uploads
mkdir -p /opt/horoshogk-api/data

echo "=== Установка зависимостей API ==="
cd /opt/horoshogk-api
npm install --production

echo "=== Настройка nginx ==="
cat > /etc/nginx/sites-available/horoshogk << 'NGINX'
server {
    listen 80;
    server_name _;

    root /var/www/horoshogk;
    index index.html;

    # API -> Node.js
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        client_max_body_size 10m;
    }

    # Uploaded images
    location /uploads/ {
        alias /var/www/horoshogk/uploads/;
        expires 30d;
        add_header Cache-Control "public";
    }

    # Static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /images/ {
        expires 30d;
        add_header Cache-Control "public";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/javascript image/svg+xml;
    gzip_min_length 256;
}
NGINX

ln -sf /etc/nginx/sites-available/horoshogk /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "=== Создание systemd-сервиса ==="
cat > /etc/systemd/system/horoshogk-api.service << 'SERVICE'
[Unit]
Description=HoroshoGK API Server
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/horoshogk-api
ExecStart=/usr/bin/node index.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
SERVICE

systemctl daemon-reload
systemctl enable horoshogk-api
systemctl start horoshogk-api

echo ""
echo "=== ГОТОВО ==="
echo "nginx:  работает (порт 80)"
echo "API:    работает (порт 3001)"
echo "Сайт:   /var/www/horoshogk/"
echo "API:    /opt/horoshogk-api/"
echo "Данные: /opt/horoshogk-api/data/"
echo "Фото:   /var/www/horoshogk/uploads/"
