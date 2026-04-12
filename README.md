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
