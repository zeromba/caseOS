#!/bin/bash

echo ""
echo "========================================"
echo "  CaseOS - Cloudflare Deploy Script"
echo "========================================"
echo ""

# Check Node
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js not installed. Install from https://nodejs.org"
    exit 1
fi

echo "[1/5] Installing dependencies..."
npm install || { echo "ERROR: npm install failed"; exit 1; }

echo ""
echo "[2/5] Building project..."
npm run build || { echo "ERROR: Build failed"; exit 1; }

echo ""
echo "[3/5] Installing Cloudflare Wrangler..."
npm install -g wrangler || { echo "ERROR: Could not install wrangler"; exit 1; }

echo ""
echo "[4/5] Logging into Cloudflare..."
wrangler login || { echo "ERROR: Login failed"; exit 1; }

echo ""
echo "[5/5] Deploying..."
wrangler pages deploy dist --project-name=caseos

echo ""
echo "========================================"
echo "  DEPLOYED: https://caseos.pages.dev"
echo "========================================"
