#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "Starting GRISK (frontend + backend + database)…"
docker compose -f "$ROOT/docker-compose.yml" up --build "$@"
