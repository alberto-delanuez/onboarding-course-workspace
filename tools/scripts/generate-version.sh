#!/bin/bash

# Default values
APP_NAME=${1:-"unknown-app"}
OUTPUT_DIR=${2:-"dist"}
OUTPUT_FILE="$OUTPUT_DIR/version.json"

# Get Git info
VERSION=$(git rev-parse --short HEAD 2>/dev/null || echo "dev")
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"

# Generate JSON
cat > "$OUTPUT_FILE" <<EOF
{
  "appName": "$APP_NAME",
  "version": "$VERSION",
  "buildDate": "$DATE"
}
EOF

echo "App Name: $APP_NAME"
echo "Version: $VERSION"
echo "Build Date: $DATE"
echo -e "\n"
echo "Generated version.json for $APP_NAME at $OUTPUT_FILE"
