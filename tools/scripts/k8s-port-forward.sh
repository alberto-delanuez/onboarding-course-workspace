#!/usr/bin/env bash
set -euo pipefail
kubectl port-forward service/formal-blue 4200:80 &
PF1=$!
kubectl port-forward service/mad-purple 4201:80 &
PF2=$!
cleanup() {
  kill $PF1 $PF2 2>/dev/null || true
}
trap cleanup EXIT INT TERM
wait
