from pydantic import BaseModel


class HelpContact(BaseModel):
    id: str
    type_kz: str
    title_kz: str
    detail_kz: str
    phone: str | None = None
