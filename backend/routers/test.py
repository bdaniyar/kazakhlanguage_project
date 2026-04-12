from fastapi import APIRouter, HTTPException

from schemas.test import TestSubmitRequest, TestSubmitResponse
from services import test_service

router = APIRouter(prefix="/test", tags=["test"])


@router.post("/submit", response_model=TestSubmitResponse)
def submit_test(body: TestSubmitRequest):
    try:
        score, max_score, level_key, label, msg = (
            test_service.compute_stress_result(body.answers)
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e

    return TestSubmitResponse(
        score=score,
        max_score=max_score,
        level_key=level_key,
        level_label_kz=label,
        message_kz=msg,
    )
