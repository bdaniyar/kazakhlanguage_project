from pydantic import BaseModel


class AdviceItem(BaseModel):
    id: str
    category: str
    title_kz: str
    text_kz: str
