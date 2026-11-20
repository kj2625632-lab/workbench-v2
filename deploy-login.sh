#!/bin/bash
# Deploy login + admin features
echo '=== Downloading new files ==='
cd /opt/wb
B=https://raw.githubusercontent.com/kj2625632-lab/workbench-v2/main

# Login pages
mkdir -p app/login app/admin/login app/admin/keys
curl -sL $B/app/login/page.tsx -o app/login/page.tsx
curl -sL $B/app/admin/login/page.tsx -o app/admin/login/page.tsx
curl -sL $B/app/admin/keys/page.tsx -o app/admin/keys/page.tsx

# Auth API
curl -sL $B/app/api/auth/route.ts -o app/api/auth/route.ts
mkdir -p app/api/admin/keys
curl -sL $B/app/api/admin/keys/route.ts -o app/api/admin/keys/route.ts

# Also re-download orders page (fixed version)
curl -sL $B/app/admin/orders/page.tsx -o app/admin/orders/page.tsx

echo '=== Building ==='
npx next build 2>&1 | tail -8
echo '=== Restarting ==='
fuser -k 3000/tcp 2>/dev/null
sleep 2
nohup node node_modules/next/dist/bin/next start -p 3000 > /tmp/wb.log 2>&1 &
sleep 4
echo '=== Testing ==='
curl -s -o /dev/null -w 'Homepage: %{http_code}' http://localhost:3000/
echo ''
curl -s -o /dev/null -w 'Login: %{http_code}' http://localhost:3000/login
echo ''
curl -s -o /dev/null -w 'Admin: %{http_code}' http://localhost:3000/admin
echo ''
curl -s -o /dev/null -w 'Admin Login: %{http_code}' http://localhost:3000/admin/login
echo ''
echo 'LOGIN_DEPLOY_DONE'