#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> Backend: install dependencies"
cd "$ROOT_DIR/backend"
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip >/dev/null
pip install -r requirements.txt

echo "==> Backend: run tests"
pytest -q

echo "==> Frontend: install dependencies and build"
cd "$ROOT_DIR/frontend"
npm install
npm run build

echo "==> Predeploy checks passed"
