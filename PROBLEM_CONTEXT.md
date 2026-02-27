# Контекст проблемы: Изменения в админке не сохраняются

## Суть проблемы
Когда пользователь меняет логотип (или другие настройки) через админку сайта:
- Локально в браузере изменения видны
- На другом компьютере/в другом браузере - изменений нет, всё по-старому
- После перезагрузки страницы - изменения пропадают

## Причина проблемы (найдена)
`DataContext.tsx` хранил все данные только в React state (в памяти браузера).
Не было API для сохранения на сервер:
- siteSettings (логотип, телефон, email)
- news (новости)
- team (команда)
- vacancies (вакансии)
- faq (FAQ)
- pageSettings (SEO настройки страниц)
- homePageContent (контент главной)
- projectFilters (фильтры проектов)

Только `projects` сохранялись через API.

## Что было исправлено (код готов, но не развёрнут)

### 1. server/index.js - добавлены API endpoints:
- GET/PUT `/api/site-settings`
- GET/PUT/POST/DELETE `/api/news`
- GET/PUT `/api/team`
- GET/PUT `/api/vacancies`
- GET/PUT `/api/faq`
- GET/PUT `/api/page-settings`
- GET/PUT `/api/home-content`
- GET/PUT `/api/project-filters`

Данные сохраняются в JSON файлы в `server/data/`:
- site-settings.json
- news.json
- team.json
- vacancies.json
- faq.json
- page-settings.json
- home-content.json
- project-filters.json

### 2. context/DataContext.tsx - переписан полностью:
- Загружает все данные с сервера при старте
- Сохраняет изменения через API
- Fallback на дефолтные данные из constants.ts если API недоступен

## Текущий статус

### Готово:
- [x] Код исправлен
- [x] Сборка успешна (`npm run build`)
- [x] Изменения запушены в ветку `claude/fix-website-build-MvMIj`

### Не сделано:
- [ ] Проект НЕ развёрнут на сервере Timeweb (85.239.52.180)
- [ ] На сервере вообще нет проекта HoroshoGK

## Что нужно сделать для решения

### Вариант 1: Развернуть на сервере Timeweb
```bash
ssh root@85.239.52.180

# Установить Node.js если нет
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Клонировать проект
mkdir -p /var/www
cd /var/www
git clone https://github.com/redsunsav1/HoroshoGK-.git
cd HoroshoGK-
git checkout claude/fix-website-build-MvMIj

# Установить зависимости и собрать
npm install
npm run build

# Запустить сервер (через pm2 для автозапуска)
npm install -g pm2
pm2 start server/index.js --name horosho
pm2 save
pm2 startup
```

### Вариант 2: Если сайт уже где-то работает
Нужно узнать:
1. URL сайта (домен)
2. Где хостится (Vercel? Netlify? Другой сервер?)
3. Как деплоится (CI/CD? Вручную?)

## Файлы которые были изменены
- `server/index.js` - добавлены API endpoints
- `context/DataContext.tsx` - полностью переписан

## Ветка с исправлениями
```
claude/fix-website-build-MvMIj
```

## Коммит
```
3dd047e - Add persistent storage for all site settings via API
```
