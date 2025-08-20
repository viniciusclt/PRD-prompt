
#!/bin/sh

echo "🚀 Starting PRD Prompt Clone..."

# Generate Prisma client first
echo "🔧 Generating Prisma client..."
npx prisma generate

# Try migrations first, fallback to db push
echo "📊 Setting up database..."
if npx prisma migrate deploy 2>/dev/null; then
    echo "✅ Migrations applied successfully"
else
    echo "⚠️ No migrations found, using db push..."
    npx prisma db push --accept-data-loss
fi

# Seed database if empty
echo "🌱 Seeding database..."
npx prisma db seed || echo "⚠️ Seed completed or failed"

# Start the application
echo "🎯 Starting Next.js server..."
if [ -f "server.js" ]; then
    exec node server.js
else
    exec yarn start
fi
