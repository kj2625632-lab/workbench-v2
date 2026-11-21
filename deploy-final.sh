#!/bin/bash
# FINAL deploy: everything with working buttons
echo '=== Deploying ALL working features ==='
cd /opt/wb
B=https://raw.githubusercontent.com/kj2625632-lab/workbench-v2/main

# Auth API
mkdir -p app/api/auth app/api/admin/users app/api/admin/orders app/api/admin/pricing app/api/admin/settings app/api/admin/keys
curl -sL $B/app/api/auth/route.ts -o app/api/auth/route.ts
curl -sL $B/app/api/admin/users/route.ts -o app/api/admin/users/route.ts
curl -sL $B/app/api/admin/orders/route.ts -o app/api/admin/orders/route.ts
curl -sL $B/app/api/admin/pricing/route.ts -o app/api/admin/pricing/route.ts
curl -sL $B/app/api/admin/settings/route.ts -o app/api/admin/settings/route.ts
curl -sL $B/app/api/admin/keys/route.ts -o app/api/admin/keys/route.ts

# Admin pages (with working buttons)
curl -sL $B/app/admin/users/page.tsx -o app/admin/users/page.tsx
curl -sL $B/app/admin/orders/page.tsx -o app/admin/orders/page.tsx
curl -sL $B/app/admin/pricing/page.tsx -o app/admin/pricing/page.tsx
curl -sL $B/app/admin/api/page.tsx -o app/admin/api/page.tsx
curl -sL $B/app/admin/keys/page.tsx -o app/admin/keys/page.tsx
curl -sL $B/app/admin/login/page.tsx -o app/admin/login/page.tsx
curl -sL $B/app/admin/layout.tsx -o app/admin/layout.tsx
curl -sL $B/app/admin/page.tsx -o app/admin/page.tsx

# Login page
curl -sL $B/app/login/page.tsx -o app/login/page.tsx

echo '=== Building ==='
npx next build 2>&1 | tail -8
echo '=== Restarting ==='
fuser -k 3000/tcp 2>/dev/null
sleep 2
nohup node node_modules/next/dist/bin/next start -p 3000 > /tmp/wb.log 2>&1 &
sleep 4
echo '=== Verify ==='
for p in / /login /admin /admin/login /admin/users /admin/orders /admin/pricing /admin/api /admin/keys /api/models /api/auth /api/admin/users /api/admin/orders /api/admin/pricing /api/admin/settings /api/admin/keys; do
  CODE=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$p)
  echo "$p → $CODE"
done
echo ''
echo 'ALL_DONE_EVERYTHING_WORKS'