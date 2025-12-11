#!/bin/bash

set -e

# Script to generate TypeScript client from OpenAPI contract
# Usage: ./scripts/generate-client.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CONTRACT_PATH="$PROJECT_ROOT/contracts/openapi.yaml"
OUTPUT_DIR="$PROJECT_ROOT/generated/ts-client"

echo "🚀 Generating TypeScript client from OpenAPI contract..."
echo "Contract: $CONTRACT_PATH"
echo "Output: $OUTPUT_DIR"
echo ""

# Check if openapi-generator-cli is installed
if ! command -v openapi-generator-cli &> /dev/null; then
    echo "❌ Error: openapi-generator-cli not found"
    echo "Please install it globally with:"
    echo "  npm install -g @openapitools/openapi-generator-cli"
    exit 1
fi

# Check if contract file exists
if [ ! -f "$CONTRACT_PATH" ]; then
    echo "❌ Error: OpenAPI contract not found at $CONTRACT_PATH"
    exit 1
fi

# Clean previous generation
if [ -d "$OUTPUT_DIR" ]; then
    echo "🧹 Cleaning previous generated files..."
    rm -rf "$OUTPUT_DIR"
fi

# Generate TypeScript client using typescript-fetch generator
echo "⚙️  Running OpenAPI Generator..."
openapi-generator-cli generate \
    -i "$CONTRACT_PATH" \
    -g typescript-fetch \
    -o "$OUTPUT_DIR" \
    --additional-properties=supportsES6=true,npmName=whiskey-inventory-client,npmVersion=1.0.0

echo ""
echo "✅ TypeScript client generated successfully at: $OUTPUT_DIR"
echo ""
echo "Generated files include:"
echo "  - API classes with typed methods"
echo "  - Model interfaces matching the OpenAPI schema"
echo "  - Runtime and configuration files"
echo ""
echo "To use the client in your TypeScript project:"
echo "  import { WhiskeysApi, Configuration } from './generated/ts-client';"
