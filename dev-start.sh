#!/bin/bash

# Development startup script for FirstPullRequest
echo "🚀 Starting FirstPullRequest development environment..."

# Clear any existing processes on port 5173
echo "🧹 Cleaning up development environment..."
lsof -ti:5173 | xargs kill -9 2>/dev/null || true

# Clear Vite cache
echo "🗑️  Clearing Vite cache..."
rm -rf node_modules/.vite

# Start development server
echo "⚡ Starting development server..."
npm run dev