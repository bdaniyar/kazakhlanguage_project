import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# backend/.env — тек жергілікті даму үшін (Render-де Environment ішінде DATABASE_URL)
load_dotenv(Path(__file__).resolve().parent / ".env")


def _database_url() -> str:
    url = os.getenv("DATABASE_URL", "").strip()
    if url:
        # Render кейде postgres:// береді; SQLAlchemy үшін postgresql:// керек
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        return url
    return "sqlite:///./jansaqta.db"


SQLALCHEMY_DATABASE_URL = _database_url()

_connect_args = {}
_engine_kwargs = {}

if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    _connect_args["check_same_thread"] = False
else:
    # Render / облако: үзілген қосылымдардан кейін қайта тексеру
    _engine_kwargs["pool_pre_ping"] = True

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args=_connect_args,
    **_engine_kwargs,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
