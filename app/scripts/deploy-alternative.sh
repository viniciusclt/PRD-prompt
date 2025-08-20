
#!/bin/sh

echo "🚀 Starting PRD Prompt Clone (Alternative Deploy)..."

# Option 1: Try with migrations first
echo "📊 Trying database migrations..."
if npx prisma migrate deploy; then
    echo "✅ Migrations applied successfully"
else
    echo "⚠️ Migrations failed, trying db push instead..."
    # Option 2: Fallback to db push (syncs schema directly)
    npx prisma db push --accept-data-loss
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Seed database if empty
echo "🌱 Seeding database..."
npx prisma db seed || echo "⚠️ Seed failed or already populated"

# Start the application
echo "🎯 Starting Next.js server..."
if [ -f "server.js" ]; then
    exec node server.js
else
    exec yarn start
fi
