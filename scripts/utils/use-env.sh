#!/bin/bash

# Script to switch between environment configurations

case "$1" in
  "local")
    echo "Switching to LOCAL environment..."
    cp .config/.env.local .env
    echo "✅ Using local Docker Postgres (port 5433)"
    ;;
  
  "production")
    echo "Switching to PRODUCTION environment..."
    cp .secure/.env .env
    echo "✅ Using production Supabase"
    echo "⚠️  Be careful with production data!"
    ;;
  
  "supabase-local")
    echo "Switching to LOCAL SUPABASE environment..."
    echo "DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres" > .env
    echo "DIRECT_URL=postgresql://postgres:postgres@localhost:54322/postgres" >> .env
    echo "✅ Using local Supabase (port 54322)"
    ;;
  
  *)
    echo "Usage: ./scripts/use-env.sh [local|production|supabase-local]"
    echo ""
    echo "Options:"
    echo "  local          - Use Docker Postgres (port 5433)"
    echo "  production     - Use production Supabase"
    echo "  supabase-local - Use local Supabase (port 54322)"
    exit 1
    ;;
esac

echo ""
echo "Current database connection:"
grep "^DATABASE_URL" .env | cut -d'=' -f2 | cut -d'@' -f2
echo ""