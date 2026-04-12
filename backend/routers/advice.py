from fastapi import APIRouter

from schemas.advice import AdviceItem
from services import advice_service

router = APIRouter(prefix="/advice", tags=["advice"])


@router.get("", response_model=list[AdviceItem])
def get_advice():
    return advice_service.list_advice()
