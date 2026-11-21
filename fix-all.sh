#!/bin/bash
# Fix all issues: auth API + rebuild
echo '=== Fixing auth API ==='
cd /opt/wb
B=https://raw.githubusercontent.com/kj2625632-lab/workbench-v2/main
mkdir -p app/api/auth
curl -sL $B/app/api/auth/route.ts -o app/api/auth/route.ts
echo 'Auth route:' $(head -1 app/api/auth/route.ts)

# Also re-download login pages (fixed layout)
curl -sL $B/app/login/page.tsx -o app/login/page.tsx
mkdir -p app/admin/login
curl -sL $B/app/admin/login/page.tsx -o app/admin/login/page.tsx

echo '=== Building ==='
npx next build 2>&1 | tail -8
echo '=== Restarting ==='
fuser -k 3000/tcp 2>/dev/null
sleep 2
nohup node node_modules/next/dist/bin/next start -p 3000 > /tmp/wb.log 2>&1 &
sleep 4
echo '=== Testing ==='
curl -s -o /dev/null -w 'Homepage: %{http_code}' http://localhost:3000/ && echo ''
curl -s -o /dev/null -w 'Login: %{http_code}' http://localhost:3000/login && echo ''
curl -s -X POST http://localhost:3000/api/auth -H 'Content-Type: application/json' -d '{"action":"register","username":"demo","password":"123456"}' && echo ''
echo 'FIX_ALL_DONE'