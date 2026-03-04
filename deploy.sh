#!/bin/bash
set -e

echo "============================================="
echo "  Деплой HoroshoGK на Timeweb Cloud"
echo "============================================="
echo ""

# --- 1. Обновляем систему и ставим базовые пакеты ---
echo "[1/7] Обновляю систему..."
apt-get update -qq
apt-get install -y -qq curl git nginx

# --- 2. Ставим Node.js 20 ---
echo "[2/7] Устанавливаю Node.js 20..."
if ! command -v node &> /dev/null || [[ $(node -v | cut -d. -f1 | tr -d v) -lt 18 ]]; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y -qq nodejs
fi
echo "  Node.js: $(node -v)"
echo "  npm: $(npm -v)"

# --- 3. Клонируем проект ---
echo "[3/7] Клонирую проект..."
PROJECT_DIR="/var/www/horoshogk"
mkdir -p /var/www

if [ -d "$PROJECT_DIR" ]; then
    echo "  Папка уже существует, обновляю..."
    cd "$PROJECT_DIR"
    git fetch --all
    git checkout main
    git reset --hard origin/main
else
    cd /var/www
    git clone https://github.com/redsunsav1/HoroshoGK-.git horoshogk
    cd "$PROJECT_DIR"
    git checkout main
fi

# --- 4. Ставим зависимости и собираем ---
echo "[4/7] Устанавливаю зависимости и собираю проект..."
npm install
npm run build

# Ставим серверные зависимости
cd server
npm install
cd ..

# Создаём папку для загрузок
mkdir -p "$PROJECT_DIR/uploads"
mkdir -p "$PROJECT_DIR/server/data"

# --- 5. Настраиваем pm2 ---
echo "[5/7] Настраиваю pm2..."
npm install -g pm2

# Останавливаем старый процесс если есть
pm2 delete horoshogk 2>/dev/null || true

# Запускаем API сервер
pm2 start server/index.js --name horoshogk --cwd "$PROJECT_DIR"
pm2 save
pm2 startup systemd -u root --hp /root 2>/dev/null || true

echo "  API сервер запущен на порту 3001"

# --- 6. Настраиваем Nginx ---
echo "[6/7] Настраиваю Nginx..."

# Удаляем дефолтный конфиг
rm -f /etc/nginx/sites-enabled/default

cat > /etc/nginx/sites-available/horoshogk << 'NGINX_CONF'
server {
    listen 80;
    server_name _;

    root /var/www/horoshogk/dist;
    index index.html;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml image/svg+xml;
    gzip_min_length 1000;

    # API — проксируем на Node.js
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        client_max_body_size 50m;
    }

    # Загруженные изображения
    location /uploads/ {
        alias /var/www/horoshogk/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Статические ассеты с долгим кэшем
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Картинки
    location /images/ {
        expires 30d;
        add_header Cache-Control "public";
    }

    # SPA fallback — все остальные URL на index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}
NGINX_CONF

ln -sf /etc/nginx/sites-available/horoshogk /etc/nginx/sites-enabled/horoshogk

# Проверяем конфиг и перезапускаем
nginx -t
systemctl restart nginx
systemctl enable nginx

# --- 7. Проверка ---
echo "[7/7] Проверяю..."
echo ""

# Ждём секунду чтобы сервер поднялся
sleep 2

# Проверяем API
API_CHECK=$(curl -s http://127.0.0.1:3001/api/health 2>/dev/null || echo "FAIL")
if echo "$API_CHECK" | grep -q "ok"; then
    echo "  ✅ API сервер работает"
else
    echo "  ❌ API сервер не отвечает: $API_CHECK"
fi

# Проверяем Nginx
NGINX_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1/ 2>/dev/null || echo "000")
if [ "$NGINX_CHECK" = "200" ]; then
    echo "  ✅ Nginx раздаёт сайт"
else
    echo "  ❌ Nginx не отвечает (код: $NGINX_CHECK)"
fi

# Проверяем проксирование API через Nginx
API_PROXY_CHECK=$(curl -s http://127.0.0.1/api/health 2>/dev/null || echo "FAIL")
if echo "$API_PROXY_CHECK" | grep -q "ok"; then
    echo "  ✅ Проксирование /api через Nginx работает"
else
    echo "  ❌ Проксирование /api не работает: $API_PROXY_CHECK"
fi

echo ""
echo "============================================="
echo "  ГОТОВО!"
echo "============================================="
echo ""
echo "  Сайт: http://85.239.52.180"
echo "  API:  http://85.239.52.180/api/health"
echo ""
echo "  Полезные команды:"
echo "    pm2 status          — статус API сервера"
echo "    pm2 logs horoshogk  — логи API сервера"
echo "    pm2 restart horoshogk — перезапуск API"
echo ""
