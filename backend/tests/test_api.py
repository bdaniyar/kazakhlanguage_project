import os
from pathlib import Path

from fastapi.testclient import TestClient

# Force isolated sqlite DB for tests even if .env contains Render Postgres URL.
os.environ["DATABASE_URL"] = "sqlite:///./test_jansaqta.db"

from main import app  # noqa: E402


client = TestClient(app)
TEST_DB_PATH = Path("test_jansaqta.db")


def teardown_module():
    if TEST_DB_PATH.exists():
        TEST_DB_PATH.unlink()


def test_health_endpoint():
    res = client.get("/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ok"
    assert data["service"] == "JanSaqta"


def test_advice_and_help_endpoints():
    advice = client.get("/advice")
    assert advice.status_code == 200
    advice_data = advice.json()
    assert isinstance(advice_data, list)
    assert len(advice_data) >= 3

    help_res = client.get("/help")
    assert help_res.status_code == 200
    help_data = help_res.json()
    assert isinstance(help_data, list)
    assert len(help_data) >= 2


def test_submit_test_endpoint():
    res = client.post("/test/submit", json={"answers": [1, 1, 1, 1, 1, 1]})
    assert res.status_code == 200
    data = res.json()
    assert data["score"] == 6
    assert data["max_score"] == 18
    assert data["level_key"] in {"low", "medium", "high"}
    assert "level_label_kz" in data


def test_submit_test_rejects_invalid_answers():
    res = client.post("/test/submit", json={"answers": [5, 1, 1, 1, 1, 1]})
    assert res.status_code == 422


def test_diary_crud_flow():
    create = client.post("/diary", json={"content": "Тест жазба"})
    assert create.status_code == 200
    created = create.json()
    assert created["content"] == "Тест жазба"
    assert "id" in created
    assert "created_at" in created

    get_all = client.get("/diary")
    assert get_all.status_code == 200
    data = get_all.json()
    assert isinstance(data, list)
    assert any(item["content"] == "Тест жазба" for item in data)
