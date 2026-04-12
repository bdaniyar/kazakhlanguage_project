from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from schemas.diary import DiaryCreate, DiaryEntryRead
from services import diary_service

router = APIRouter(prefix="/diary", tags=["diary"])


@router.post("", response_model=DiaryEntryRead)
def post_diary(payload: DiaryCreate, db: Session = Depends(get_db)):
    entry = diary_service.create_entry(db, payload)
    return entry


@router.get("", response_model=list[DiaryEntryRead])
def get_diary(db: Session = Depends(get_db)):
    return diary_service.list_entries(db)
