@echo off
echo ========================================
echo   Dhani Dhanya - Quick Setup Script
echo ========================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
) else (
    echo ✅ Node.js found
)

echo.
echo [2/4] Installing dependencies...
npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
) else (
    echo ✅ Dependencies installed
)

echo.
echo [3/4] Checking for .env.local file...
if not exist ".env.local" (
    echo ⚠️  Creating .env.local file...
    echo # MySQL Database Configuration > .env.local
    echo DB_HOST=localhost >> .env.local
    echo DB_USER=root >> .env.local
    echo DB_PASSWORD= >> .env.local
    echo DB_NAME=dhani_dhanya >> .env.local
    echo ✅ .env.local created - Please update with your MySQL password
) else (
    echo ✅ .env.local already exists
)

echo.
echo [4/4] Setup complete!
echo.
echo ========================================
echo   Next Steps:
echo ========================================
echo 1. Update .env.local with your MySQL password
echo 2. Create MySQL database (see DEPLOYMENT_GUIDE.md)
echo 3. Run: npm run dev
echo 4. Visit: http://localhost:3000
echo ========================================
echo.
pause