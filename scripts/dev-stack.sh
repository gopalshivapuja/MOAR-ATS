#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="${PROJECT_ROOT}/docker-compose.yml"

if [[ -n "${DEV_STACK_MOCK:-}" ]]; then
  DOCKER_COMPOSE_BIN="${DEV_STACK_MOCK}"
else
  DOCKER_COMPOSE_BIN="docker compose"
  if ! command -v docker &>/dev/null; then
    echo "Docker is required but not installed. Visit https://docs.docker.com/get-docker/."
    exit 1
  fi

  # macOS users with older Docker Desktop versions might still have docker-compose
  if ! ${DOCKER_COMPOSE_BIN} version &>/dev/null; then
    if command -v docker-compose &>/dev/null; then
      DOCKER_COMPOSE_BIN="docker-compose"
    else
      echo "Neither 'docker compose' nor 'docker-compose' commands are available."
      exit 1
    fi
  fi
fi

usage() {
  cat <<'USAGE'
Usage: ./scripts/dev-stack.sh <command>

Commands:
  up            Start Postgres + Redis in the background
  down          Stop containers but keep volumes
  clean         Stop containers and remove volumes
  status        Show container status
  logs          Tail service logs (Ctrl+C to stop)

Examples:
  ./scripts/dev-stack.sh up
  ./scripts/dev-stack.sh logs
  ./scripts/dev-stack.sh clean
USAGE
}

CMD="${1:-}"
if [[ -z "${CMD}" ]]; then
  usage
  exit 1
fi

compose() {
  ${DOCKER_COMPOSE_BIN} -f "${COMPOSE_FILE}" "$@"
}

case "${CMD}" in
  up)
    compose up -d
    ;;
  down)
    compose down
    ;;
  clean)
    compose down -v
    ;;
  status)
    compose ps
    ;;
  logs)
    compose logs -f
    ;;
  *)
    usage
    exit 1
    ;;
esac

