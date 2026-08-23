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

# 🔴 Vent på at Sonar har BEHANDLET denne analyse, før vi spørger.
#
# Scanneren uploader og returnerer; serveren behandler asynkront. Spørger vi
# straks, svarer API'et ud fra den FORRIGE analyse — og printer den som om den
# var denne. Målt 2026-08-23 på PR #156: steppet skrev "issues: 0", mens
# quality-gaten samtidig meldte 1. To instrumenter uenige om samme kørsel, og
# det tavse af dem så mest autoritativt ud.
#
# Værre end altid at tage fejl: det er rigtigt for det meste, så uenigheden
# opdages kun hvis nogen tilfældigvis sammenligner.
REPORT=".scannerwork/report-task.txt"
if [ -f "$REPORT" ]; then
  CE_TASK_ID=$(grep '^ceTaskId=' "$REPORT" | cut -d= -f2- | tr -d '\r')
  status=""
  for _ in $(seq 1 40); do
    status=$(api "ce/task?id=${CE_TASK_ID}" | jq -r '.task.status // empty' 2>/dev/null)
    case "$status" in
      SUCCESS) break ;;
      FAILED|CANCELED) break ;;
      *) sleep 3 ;;
    esac
  done
  if [ "$status" != "SUCCESS" ]; then
    # Fravær af bekræftelse må ikke læse som bekræftelse.
    echo "::warning::analysen er ikke bekræftet færdigbehandlet (status: ${status:-ukendt}). Fundene nedenfor kan stamme fra en TIDLIGERE analyse."
  fi
else
  echo "::warning::${REPORT} findes ikke — kan ikke binde opslaget til DENNE analyse. Fundene nedenfor kan være forældede."
fi

issues=$(api "issues/search?componentKeys=${SONAR_PROJECT_KEY}&pullRequest=${PR_NUMBER}&resolved=false&ps=100")
if [ -z "$issues" ] || ! echo "$issues" | jq -e .issues >/dev/null 2>&1; then
  echo "::warning::kunne ikke hente issues — se dashboardet. Dette siger INTET om hvorvidt der er fund."
else
  n=$(echo "$issues" | jq '.issues | length')
  echo "issues: $n"
  echo "$issues" | jq -r '.issues[] |
    "  \(.severity) \(.type) \(.rule)\n    \(.component | split(":") | last):\(.line // "?")\n    \(.message)"'
fi

# 🔴 Denne gren SKAL sige noget uanset udfald. Foerste udgave sprang tavst
# hotspots over, naar opslaget fejlede — og en gate-melding om "0.00% Security
# Hotspots Reviewed" med INTET i loggen er praecis den tilstand, steppet findes
# for at fjerne. Fravaer maa ikke oploese sig til tavshed.
hotspots=$(api "hotspots/search?projectKey=${SONAR_PROJECT_KEY}&pullRequest=${PR_NUMBER}&ps=100")
if [ -z "$hotspots" ]; then
  echo "::warning::hotspot-opslaget gav intet svar — se dashboardet. Dette siger INTET om hvorvidt der er hotspots."
elif ! echo "$hotspots" | jq -e .hotspots >/dev/null 2>&1; then
  echo "::warning::hotspot-opslaget kunne ikke laeses. Sonar svarede:"
  echo "$hotspots" | head -c 500
  echo
else
  n=$(echo "$hotspots" | jq '.hotspots | length')
  echo "security hotspots: $n  (kraever manuel gennemgang i Sonars UI — kan ikke lukkes herfra)"
  echo "$hotspots" | jq -r '.hotspots[] |
    "  \(.vulnerabilityProbability) \(.securityCategory) \(.status)\n    \(.component | split(":") | last):\(.line // "?")\n    \(.message)"'
fi

exit 0
