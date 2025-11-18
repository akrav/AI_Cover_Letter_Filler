#!/usr/bin/env bash
set -euo pipefail

# Optional: set SMITHERY_TOKEN if your Smithery endpoint requires auth
URL_DEFAULT="https://server.smithery.ai/@smithery/skills/mcp?skills.0=calclavia%2Fwebapp-testing"
URL="${SMITHERY_WEBAPP_TESTING_URL:-$URL_DEFAULT}"

echo "→ Testing Web Application Testing MCP initialize at: ${URL}"

AUTH_HEADER=()
if [[ -n "${SMITHERY_TOKEN:-}" ]]; then
  AUTH_HEADER+=(-H "authorization: Bearer ${SMITHERY_TOKEN}")
fi

curl -sS -X POST "${URL}" \
  -H "content-type: application/json" \
  "${AUTH_HEADER[@]}" \
  -d '{
    "jsonrpc":"2.0",
    "id":"init-1",
    "method":"initialize",
    "params":{
      "clientInfo":{"name":"local-cli","version":"0.0.0"},
      "protocolVersion":"2024-11-05"
    }
  }' | jq . || true

echo
echo "If you see a JSON-RPC result with server info/capabilities, the skill endpoint is reachable."


