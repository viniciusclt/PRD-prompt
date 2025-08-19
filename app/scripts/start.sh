
#!/bin/sh

echo "🚀 Starting PRD Prompt Clone..."

# Run database migrations
echo "📊 Running database migrations..."
npx prisma migrate deploy

# Seed database if empty
echo "🌱 Seeding database..."
npx prisma db seed || echo "⚠️  Seed failed or already populated"

# Start the application
echo "🎯 Starting Next.js server..."
exec node server.js
