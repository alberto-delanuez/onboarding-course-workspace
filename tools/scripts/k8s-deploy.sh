#!/usr/bin/env bash
set -euo pipefail
# Generate version files (Nx)
npx nx run @onboarding-course/formal-blue:docker:build
npx nx run @onboarding-course/mad-purple:docker:build

# Read versions
FB_VERSION=$(cat dist/apps/customer/formal-blue/version.json | jq -r .version)
MP_VERSION=$(cat dist/apps/customer/mad-purple/version.json | jq -r .version)

# Deploy with image tag set
helm upgrade --install formal-blue apps/customer/formal-blue/charts/formal-blue \
  -f apps/customer/formal-blue/charts/formal-blue/values.yaml \
  --set image.tag="${FB_VERSION}"

helm upgrade --install mad-purple apps/customer/mad-purple/charts/mad-purple \
  -f apps/customer/mad-purple/charts/mad-purple/values.yaml \
  --set image.tag="${MP_VERSION}"

kubectl get svc formal-blue
kubectl get svc mad-purple
