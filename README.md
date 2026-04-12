# JanSaqta

Студенттер үшін психологиялық көмек платформасы: стресс тесті, кеңестер, эмоциялық күнделік және көмек байланыстары. Интерфейс — қазақ тілінде (кириллица).

## Құрылым

- `frontend/` — React (Vite)
- `backend/` — FastAPI, SQLite (`jansaqta.db`)

## Backend іске қосу

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### PostgreSQL (Render) немесе SQLite

- **Жергілікті:** `DATABASE_URL` жоқ болса, SQLite пайдаланылады (`backend/jansaqta.db`).
- **Render:** PostgreSQL сервисінде **Internal Database URL** алыңыз да, Render веб-сервисінің **Environment** ішіне `DATABASE_URL` ретінде салыңыз. Локалда сынақ үшін сол URL-ді `backend/.env` файлына көшіріңіз (үлгі: `.env.example`).

`DATABASE_URL` бар кезде `main.py` іске қосылғанда кестелер (`diary_entries`) бірінші рет автоматты жасалады.

API: [http://127.0.0.1:8000](http://127.0.0.1:8000)  
Автомат сипаттама: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## Frontend іске қосу

Бірінші терминалда backendті қосыңыз. Екінші терминалда:

```bash
cd frontend
npm install
npm run dev
```

Сайт: [http://localhost:5173](http://localhost:5173)

Даму режимінде Vite `/api` сұрауларын `http://127.0.0.1:8000` мекенжайына проксилейді.

## Production үшін (қысқаша)

Frontendті жинаңыз:

```bash
cd frontend
npm run build
```

`VITE_API_URL` өзгерісі арқылы API негізін көрсетіңіз (мысалы: `https://api.sіздің-доменыңыз.kz`). Содан кейін CORS тізімін `backend/main.py` ішінде жаңартыңыз.

## API endpoints

| Method | Path | Мағынасы |
|--------|------|-----------|
| POST | `/test/submit` | Стресс жауаптары → деңгей |
| GET | `/advice` | Кеңестер тізімі |
| POST | `/diary` | Күнделік жазбасын сақтау |
| GET | `/diary` | Барлық жазбалар |
| GET | `/help` | Көмек контактілері |

---

## Render.com — деплой қатесі: `uvicorn: command not found` (127)

**Себептер:** (1) **Root Directory** репо түбі болып қойылған — сол жерде `requirements.txt` жоқ, сондықтан `pip install` еш нәрсе орнатпайды (build 0.03 с сияқты тым жылдам болуы мүмкін). (2) `uvicorn` PATH-та болмауы — `python -m uvicorn` қолдану қауіпсіз.

**Шешім (қолмен Dashboard):**

1. **Settings → Root Directory** → `backend` етіп қойыңыз.
2. **Build Command:** `pip install -r requirements.txt`
3. **Start Command:** `python -m uvicorn main:app --host 0.0.0.0 --port $PORT`  
   (портты `10000` деп бекіту емес — Render `$PORT` береді.)

Репода түбінде `render.yaml` (Blueprint) бар: `rootDir: backend` және сол командалар көрсетілген. Жаңа сервисті Blueprint арқылы ашсаңыз немесе бар сервисті осы файлға сәйкес жаңартсаңыз, бірдей нәтиже шығады.

### Python 3.14 және `pydantic-core` / PyO3 қатесі

2026 жылдан бастап Render **әдепкі түрде Python 3.14** қолданады. `pydantic-core` Rust арқылы жиналады да, **PyO3 әлі 3.14 қолдамайды** (`newer than PyO3's maximum supported version (3.13)`).

**Міндетті:** Render Dashboard → сервис → **Environment** → қосыңыз:

- `PYTHON_VERSION` = `3.11.9` (толық нұсқа, мысалы `3.11.9` немесе `3.13.5`)

Немесе репода `.python-version` (түбінде және `backend/` ішінде) файлдары бар — `3.11.9` бір жолмен. Бірінші кезекте **PYTHON_VERSION** орын алады ([Render docs](https://render.com/docs/python-version)).
