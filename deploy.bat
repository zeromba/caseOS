@echo off
echo.
echo ========================================
echo   CaseOS - Cloudflare Deploy Script
echo ========================================
echo.

:: Check if Node is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed.
    echo Download from https://nodejs.org and install, then run this again.
    pause
    exit /b 1
)

:: Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm not found. Reinstall Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [1/5] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed. Check your internet connection.
    pause
    exit /b 1
)
echo Done.

echo.
echo [2/5] Building project...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed. Check the error above.
    pause
    exit /b 1
)
echo Done.

echo.
echo [3/5] Installing Cloudflare Wrangler (deploy tool)...
call npm install -g wrangler
if %errorlevel% neq 0 (
    echo ERROR: Could not install wrangler.
    pause
    exit /b 1
)
echo Done.

echo.
echo [4/5] Logging into Cloudflare...
echo A browser window will open. Log in with your Cloudflare account.
echo If you don't have one, sign up free at https://cloudflare.com
echo.
call wrangler login
if %errorlevel% neq 0 (
    echo ERROR: Cloudflare login failed.
    pause
    exit /b 1
)

echo.
echo [5/5] Deploying to Cloudflare Pages...
call wrangler pages deploy dist --project-name=caseos
if %errorlevel% neq 0 (
    echo.
    echo First time? Cloudflare will ask you to create a new project.
    echo Type: y  when asked to create project
    echo Project name: caseos
    echo.
    call wrangler pages deploy dist --project-name=caseos
)

echo.
echo ========================================
echo   DEPLOYED SUCCESSFULLY
echo   Your site: https://caseos.pages.dev
echo ========================================
echo.
pause
