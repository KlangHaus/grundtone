#!/usr/bin/env bash
# Printer SonarQubes fund for denne PR i job-loggen.
#
# 🔴 Hvorfor: quality-gaten melder "3 New Issues" uden at sige HVILKE. Detaljen
# ligger bag SONAR_TOKEN, som med rette kun findes i CI — så den, der skal rette
# fejlen, er præcis den, der ikke kan se den. Det har blokeret to gange på én
# dag. Steppet kører dér, hvor tokenet legitimt bor, og lægger fundene et sted
# enhver med adgang til en Actions-log kan læse dem.
#
# Diagnostisk, aldrig blokerende: gaten selv afgør rødt/grønt. Fejler DETTE
# step, må det ikke se ud som en fejlet analyse — derfor `exit 0` til sidst.
set -uo pipefail

: "${SONAR_HOST_URL:?}" "${SONAR_TOKEN:?}" "${SONAR_PROJECT_KEY:?}" "${PR_NUMBER:?}"

api() {
  curl -sS --max-time 30 -u "${SONAR_TOKEN}:" "${SONAR_HOST_URL}/api/$1" 2>/dev/null
}

echo "── SonarQube-fund for PR #${PR_NUMBER} ──"

issues=$(api "issues/search?componentKeys=${SONAR_PROJECT_KEY}&pullRequest=${PR_NUMBER}&resolved=false&ps=100")
if [ -z "$issues" ] || ! echo "$issues" | jq -e .issues >/dev/null 2>&1; then
  echo "::warning::kunne ikke hente issues — se dashboardet. Dette siger INTET om hvorvidt der er fund."
else
  n=$(echo "$issues" | jq '.issues | length')
  echo "issues: $n"
  echo "$issues" | jq -r '.issues[] |
    "  \(.severity) \(.type) \(.rule)\n    \(.component | split(":") | last):\(.line // "?")\n    \(.message)"'
fi

hotspots=$(api "hotspots/search?projectKey=${SONAR_PROJECT_KEY}&pullRequest=${PR_NUMBER}&ps=100")
if echo "$hotspots" | jq -e .hotspots >/dev/null 2>&1; then
  n=$(echo "$hotspots" | jq '.hotspots | length')
  echo "security hotspots: $n  (kræver manuel gennemgang i Sonar — kan ikke lukkes herfra)"
  echo "$hotspots" | jq -r '.hotspots[] |
    "  \(.vulnerabilityProbability) \(.securityCategory)\n    \(.component | split(":") | last):\(.line // "?")\n    \(.message)"'
fi

exit 0
