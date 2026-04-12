from sqlalchemy import select
from sqlalchemy.orm import Session

from models.diary import DiaryEntry
from schemas.diary import DiaryCreate


def create_entry(db: Session, payload: DiaryCreate) -> DiaryEntry:
    entry = DiaryEntry(content=payload.content.strip())
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


def list_entries(db: Session) -> list[DiaryEntry]:
    stmt = select(DiaryEntry).order_by(DiaryEntry.created_at.desc())
    return list(db.scalars(stmt).all())
