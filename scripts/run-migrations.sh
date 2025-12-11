#!/bin/bash

# Script to run Prisma migrations
# Usage: ./scripts/run-migrations.sh

set -e

echo "🔄 Running Prisma migrations..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "⚠️  DATABASE_URL is not set. Checking for .env file..."
  
  if [ -f ".env" ]; then
    echo "✅ Found .env file. Loading environment variables..."
    export $(cat .env | grep -v '^#' | xargs)
  else
    echo "❌ ERROR: DATABASE_URL is not set and no .env file found."
    echo ""
    echo "Please set DATABASE_URL environment variable or create a .env file:"
    echo 'DATABASE_URL="postgresql://whiskey_user:whiskey_dev_password@localhost:5432/whiskey_inventory?schema=public"'
    exit 1
  fi
fi

echo "📍 Using DATABASE_URL: ${DATABASE_URL}"
echo ""

# Run migrations
if command -v npx &> /dev/null; then
  npx prisma migrate dev
  echo ""
  echo "✅ Migrations completed successfully!"
else
  echo "❌ ERROR: npx command not found. Please install Node.js and npm."
  exit 1
fi
