from pydantic import BaseModel, Field, field_validator


class TestSubmitRequest(BaseModel):
    answers: list[int] = Field(
        ...,
        description="Әр сұраққа жауап: 0–3 санмен",
        min_length=6,
        max_length=7,
    )

    @field_validator("answers")
    @classmethod
    def each_in_range(cls, v: list[int]) -> list[int]:
        for a in v:
            if a < 0 or a > 3:
                raise ValueError("Әрбір жауап 0–3 аралығында болуы керек")
        return v


class TestSubmitResponse(BaseModel):
    score: int
    max_score: int
    level_key: str
    level_label_kz: str
    message_kz: str
