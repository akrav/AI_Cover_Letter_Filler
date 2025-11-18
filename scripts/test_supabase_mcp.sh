#!/usr/bin/env bash
set -euo pipefail

: "${SUPABASE_PROJECT_REF:?Set SUPABASE_PROJECT_REF in env}"
: "${SUPABASE_ACCESS_TOKEN:?Set SUPABASE_ACCESS_TOKEN in env}"

URL="https://mcp.supabase.com/mcp?project_ref=${SUPABASE_PROJECT_REF}&features=database,docs"

echo "→ Testing Supabase MCP initialize at: ${URL}"
curl -sS -X POST "${URL}" \
  -H "content-type: application/json" \
  -H "authorization: Bearer ${SUPABASE_ACCESS_TOKEN}" \
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
echo "If you see a JSON-RPC result with server info/capabilities, Supabase MCP is reachable."


