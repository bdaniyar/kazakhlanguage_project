# JanSaqta

Платформа психологической поддержки для студентов: стресс-тест, советы, эмоциональный дневник и контакты помощи. Интерфейс — на казахском языке (кириллица).

## Структура проекта

- `frontend/` — React (Vite)
- `backend/` — FastAPI, SQLite (`jansaqta.db`)

## Запуск backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### PostgreSQL (Render) или SQLite

- **Локально:** если `DATABASE_URL` не задан, используется SQLite (`backend/jansaqta.db`).
- **Render:** возьмите **Internal Database URL** в сервисе PostgreSQL и добавьте его в **Environment** веб-сервиса как `DATABASE_URL`. Для локальной проверки можно скопировать этот URL в `backend/.env` (шаблон: `.env.example`).

Если `DATABASE_URL` задан, при первом запуске `main.py` таблицы (`diary_entries`) создаются автоматически.

API: [http://127.0.0.1:8000](http://127.0.0.1:8000)  
Swagger: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## Запуск frontend

В первом терминале запустите backend. Во втором:

```bash
cd frontend
npm install
npm run dev
```

Сайт: [http://localhost:5173](http://localhost:5173)

В режиме разработки Vite проксирует запросы `/api` на `http://127.0.0.1:8000`.

## Production (кратко)

Сборка frontend:

```bash
cd frontend
npm run build
```

**Production / удалённый API:** frontend отправляет запросы в backend через **`VITE_API_URL`**.

1. В `frontend/` создайте `.env.local` (или задайте переменную в Build Environment вашего хостинга):
   ```bash
   VITE_API_URL=https://your-backend.onrender.com
   ```
   Без `/` в конце.
2. Запустите `npm run build` или `npm run dev` — Vite подхватит значение во время сборки.

Локальная разработка: если `VITE_API_URL` **не задан**, запросы идут через `/api`-прокси (`vite.config.js` → `127.0.0.1:8000`).

Пример: `frontend/.env.example`.

## API endpoints

| Method | Path | Назначение |
|--------|------|------------|
| POST | `/test/submit` | Ответы теста на стресс → уровень |
| GET | `/advice` | Список советов |
| POST | `/diary` | Сохранить запись дневника |
| GET | `/diary` | Получить все записи |
| GET | `/help` | Контакты помощи |

## Predeploy-тест (рекомендуется)

Одна команда для проверки backend + сборки frontend:

```bash
./scripts/predeploy.sh
```

Что делает скрипт:
- устанавливает зависимости backend;
- запускает API-тесты через `pytest`;
- выполняет `npm run build` для frontend.

---

## Render.com — ошибка деплоя: `uvicorn: command not found` (127)

**Причины:** (1) **Root Directory** выставлен в корень репозитория, где нет `requirements.txt`, поэтому `pip install` ничего не ставит (часто заметно по слишком быстрой сборке, например 0.03 s). (2) `uvicorn` может отсутствовать в PATH — безопаснее запускать через `python -m uvicorn`.

**Решение (в Dashboard):**

1. **Settings → Root Directory** → укажите `backend`.
2. **Build Command:** `pip install -r requirements.txt`
3. **Start Command:** `python -m uvicorn main:app --host 0.0.0.0 --port $PORT`  
   (не фиксируйте порт `10000` вручную — Render передаёт `$PORT`).

В корне репозитория есть `render.yaml` (Blueprint): `rootDir: backend` и те же команды. Можно создать/обновить сервис через Blueprint.

### Ошибка Python 3.14 и `pydantic-core` / PyO3

С 2026 года Render по умолчанию использует **Python 3.14**. `pydantic-core` собирается через Rust, а **PyO3 пока не поддерживает 3.14** (`newer than PyO3's maximum supported version (3.13)`).

**Обязательно:** Render Dashboard → сервис → **Environment**:

- `PYTHON_VERSION` = `3.11.9` (полная версия, например `3.11.9` или `3.13.5`)

Также в репозитории есть `.python-version` (в корне и в `backend/`) со значением `3.11.9`. Приоритет выше у переменной окружения **PYTHON_VERSION** ([Render docs](https://render.com/docs/python-version)).
