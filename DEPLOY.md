# Деплой и управление данными сайта HoroshoGK

## Структура данных

Данные загружаются в таком приоритете:
1. **localStorage браузера** - кэш пользователя
2. **Серверный API** (`/api/data`) - Express сервер (если запущен)
3. **constants.ts** - значения по умолчанию

---

## Как изменить данные проекта (Brooklyn, Бабайка и т.д.)

### Вариант 1: Через constants.ts (рекомендуется)

1. Открой `constants.ts` и измени нужные данные
2. Увеличь `DATA_VERSION` в `context/DataContext.tsx`:
   ```typescript
   const DATA_VERSION = '4'; // было '3', стало '4'
   ```
3. Пересобери и задеплой (см. ниже)

### Вариант 2: Через админку

1. Открой http://85.239.52.180/admin
2. Внеси изменения
3. Нажми "Сохранить"

**Важно:** Изменения через админку сохраняются в localStorage. Если нужно применить их для всех пользователей - нужен работающий Express API на сервере.

---

## Деплой на сервер

### Быстрый деплой (одна команда)

```bash
cd /Users/admin/Documents/GitHub/HoroshoGK-
git pull origin claude/fix-website-build-MvMIj && npm run build && scp -r dist/* root@85.239.52.180:/var/www/horoshogk/
```

### Пошаговый деплой

```bash
# 1. Перейти в папку проекта
cd /Users/admin/Documents/GitHub/HoroshoGK-

# 2. Получить последние изменения
git pull origin claude/fix-website-build-MvMIj

# 3. Собрать проект
npm run build

# 4. Загрузить на сервер
scp -r dist/* root@85.239.52.180:/var/www/horoshogk/
# Пароль: oh+u2C#S6vgE.n
```

### Если git pull не работает (конфликты)

```bash
git stash
git pull origin claude/fix-website-build-MvMIj
git stash pop
```

Или сбросить конфликтные файлы:
```bash
git checkout --theirs server/index.js server/package.json
git add server/index.js server/package.json
git pull origin claude/fix-website-build-MvMIj
```

---

## Проверка после деплоя

1. Открой сайт в **режиме инкогнито** или нажми `Cmd+Shift+R`
2. Проверь что изменения применились
3. Проверь что хеш JS файла в `dist/assets/` изменился (например, `index-yLQ01nw1.js`)

---

## Управление сервером

### Подключение к серверу

```bash
ssh root@85.239.52.180
# Пароль: oh+u2C#S6vgE.n
```

### Проверка процессов Node.js

```bash
ps aux | grep node
```

### Остановка Express API (если нужно сбросить данные)

```bash
kill <PID>  # где PID - номер процесса из предыдущей команды
```

### Запуск Express API

```bash
cd /var/www/horosho/server
node index.js &
```

---

## Принудительный сброс данных у всех пользователей

Если нужно чтобы ВСЕ пользователи получили свежие данные из constants.ts:

1. Увеличь `DATA_VERSION` в `context/DataContext.tsx`
2. Пересобери и задеплой
3. При следующем посещении у каждого пользователя localStorage очистится

---

## Структура проекта

```
/var/www/horoshogk/     - статика сайта (dist)
/var/www/horosho/       - Express API сервер
```

## Важные файлы

| Файл | Назначение |
|------|------------|
| `constants.ts` | Данные по умолчанию (проекты, новости, FAQ и т.д.) |
| `context/DataContext.tsx` | Загрузка данных, DATA_VERSION |
| `components/admin/AdminLayout.tsx` | Админ-панель |

---

## Частые проблемы

### Изменения не применяются на сайте

1. Проверь что git pull прошёл успешно
2. Проверь что npm run build создал новый хеш файла
3. Обнови страницу с `Cmd+Shift+R`
4. Проверь что Express API не возвращает старые данные: `curl http://85.239.52.180/api/data`

### Данные возвращаются к старым значениям

- Express API хранит старые данные → убей процесс: `kill <PID>`
- localStorage закэшировал старое → увеличь DATA_VERSION
