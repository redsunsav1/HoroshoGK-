# Инструкция по деплою на Timeweb Cloud

## Требования
- Node.js 18+ на сервере
- Доступ по SSH

## Шаги деплоя

### 1. Подключитесь к серверу по SSH

```bash
ssh root@85.239.52.180
```

### 2. Установите Node.js (если ещё не установлен)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs
```

### 3. Создайте папку для проекта

```bash
mkdir -p /var/www/horosho-gk
cd /var/www/horosho-gk
```

### 4. Загрузите файлы проекта

**Вариант A: Через Git**
```bash
git clone https://github.com/redsunsav1/HoroshoGK-.git .
```

**Вариант B: Через SCP (с вашего Mac)**
```bash
# На вашем Mac выполните:
scp -r /путь/к/проекту/* root@85.239.52.180:/var/www/horosho-gk/
```

### 5. Установите зависимости и соберите проект

```bash
cd /var/www/horosho-gk

# Установка зависимостей фронтенда
npm install

# Сборка фронтенда
npm run build

# Установка зависимостей сервера
cd server
npm install
cd ..
```

### 6. Настройте автозапуск через PM2

```bash
# Установите PM2 глобально
npm install -g pm2

# Запустите сервер
cd /var/www/horosho-gk/server
pm2 start server.js --name "horosho-gk"

# Настройте автозапуск при перезагрузке
pm2 startup
pm2 save
```

### 7. Настройте Nginx (опционально, для порта 80)

```bash
apt install nginx -y
```

Создайте конфиг `/etc/nginx/sites-available/horosho-gk`:

```nginx
server {
    listen 80;
    server_name 85.239.52.180;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активируйте конфиг:

```bash
ln -s /etc/nginx/sites-available/horosho-gk /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

---

## Обновление сайта

После внесения изменений:

```bash
cd /var/www/horosho-gk
git pull origin main  # или загрузите файлы через SCP
npm install
npm run build
pm2 restart horosho-gk
```

---

## Проверка

- Сайт: `http://85.239.52.180`
- Админка: `http://85.239.52.180/admin`
- API: `http://85.239.52.180/api/projects`

---

## Про HTTPS

Для HTTPS нужен домен. Без домена бесплатный SSL (Let's Encrypt) не работает.

**Рекомендую:**
1. Купить домен (от 150₽/год на reg.ru или timeweb)
2. Привязать к серверу
3. Настроить SSL через Certbot:

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d ваш-домен.ru
```
