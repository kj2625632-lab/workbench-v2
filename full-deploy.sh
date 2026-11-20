#!/bin/bash
# COMPLETE deploy: frontend + admin panel + all API routes
echo '=== Downloading ALL files ==='
cd /opt/wb
B=https://raw.githubusercontent.com/kj2625632-lab/workbench-v2/main

# Frontend pages
curl -sL $B/app/layout.tsx -o app/layout.tsx
curl -sL $B/app/page.tsx -o app/page.tsx
for d in image chat video storyboard reverse assets; do mkdir -p app/$d; curl -sL $B/app/$d/page.tsx -o app/$d/page.tsx; done

# Admin pages
mkdir -p app/admin/users app/admin/orders app/admin/pricing app/admin/api
curl -sL $B/app/admin/layout.tsx -o app/admin/layout.tsx
curl -sL $B/app/admin/page.tsx -o app/admin/page.tsx
curl -sL $B/app/admin/users/page.tsx -o app/admin/users/page.tsx
curl -sL $B/app/admin/orders/page.tsx -o app/admin/orders/page.tsx
curl -sL $B/app/admin/pricing/page.tsx -o app/admin/pricing/page.tsx
curl -sL $B/app/admin/api/page.tsx -o app/admin/api/page.tsx

# API routes
for d in chat generate generate/batch reverse storyboard/parse video/generate models; do mkdir -p app/api/$d; curl -sL $B/app/api/$d/route.ts -o app/api/$d/route.ts; done

echo '=== Files ==='
find app -name '*.tsx' -o -name 'route.ts' | sort

echo '=== Building ==='
npx next build 2>&1 | tail -12
echo '=== Restarting ==='
fuser -k 3000/tcp 2>/dev/null
sleep 2
nohup node node_modules/next/dist/bin/next start -p 3000 > /tmp/wb.log 2>&1 &
sleep 4
echo '=== Testing ==='
echo -n 'API models: '; curl -s http://localhost:3000/api/models | head -c 80
echo ''
echo -n 'Admin page: '; curl -s http://localhost:3000/admin | head -c 80
echo ''
echo 'COMPLETE_DEPLOY_DONE'
echo 'Frontend: https://superbaokuan.com'
echo 'Admin: https://superbaokuan.com/admin'