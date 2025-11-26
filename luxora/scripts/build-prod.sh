#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

echo "🚀 Starting Production Build..."

# 1. Generate Prisma Client
# This is critical for Vercel deployment to ensure the client matches the runtime environment
echo "📦 Generating Prisma Client..."
npx prisma generate

# 2. Build Nuxt Application
echo "🏗️  Building Nuxt Application..."
npx nuxt build

echo "✅ Build Complete!"
