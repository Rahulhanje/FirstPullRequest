@echo off
REM Development startup script for FirstPullRequest (Windows)
echo 🚀 Starting FirstPullRequest development environment...

REM Clear Vite cache
echo 🗑️  Clearing Vite cache...
if exist "node_modules\.vite" (
    rmdir /s /q "node_modules\.vite"
)

REM Start development server
echo ⚡ Starting development server...
npm run dev