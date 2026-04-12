from fastapi import APIRouter

from schemas.help import HelpContact
from services import help_service

router = APIRouter(prefix="/help", tags=["help"])


@router.get("", response_model=list[HelpContact])
def get_help():
    return help_service.list_help()
