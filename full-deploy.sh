#!/bin/bash
# Complete redeploy - ALL pages + ALL API routes
echo '=== Downloading ALL files ==='
cd /opt/wb
B=https://raw.githubusercontent.com/kj2625632-lab/workbench-v2/main

# Pages
curl -sL $B/app/layout.tsx -o app/layout.tsx
curl -sL $B/app/page.tsx -o app/page.tsx
mkdir -p app/image app/chat app/video app/storyboard app/reverse app/assets
curl -sL $B/app/image/page.tsx -o app/image/page.tsx
curl -sL $B/app/chat/page.tsx -o app/chat/page.tsx
curl -sL $B/app/video/page.tsx -o app/video/page.tsx
curl -sL $B/app/storyboard/page.tsx -o app/storyboard/page.tsx
curl -sL $B/app/reverse/page.tsx -o app/reverse/page.tsx
curl -sL $B/app/assets/page.tsx -o app/assets/page.tsx

# API routes
mkdir -p app/api/chat app/api/generate app/api/generate/batch app/api/reverse app/api/storyboard/parse app/api/video/generate app/api/models
curl -sL $B/app/api/chat/route.ts -o app/api/chat/route.ts
curl -sL $B/app/api/generate/route.ts -o app/api/generate/route.ts
curl -sL $B/app/api/generate/batch/route.ts -o app/api/generate/batch/route.ts
curl -sL $B/app/api/reverse/route.ts -o app/api/reverse/route.ts
curl -sL $B/app/api/storyboard/parse/route.ts -o app/api/storyboard/parse/route.ts
curl -sL $B/app/api/video/generate/route.ts -o app/api/video/generate/route.ts
curl -sL $B/app/api/models/route.ts -o app/api/models/route.ts

echo '=== Files ==='
find app -name '*.tsx' -o -name 'route.ts' | sort

echo '=== Building ==='
npx next build 2>&1 | tail -10
echo '=== Restarting ==='
fuser -k 3000/tcp 2>/dev/null
sleep 2
nohup node node_modules/next/dist/bin/next start -p 3000 > /tmp/wb.log 2>&1 &
sleep 4
echo '=== Testing ==='
curl -s http://localhost:3000/api/models | head -1
echo ''
echo 'FULL_REDEPLOY_DONE - Refresh https://superbaokuan.com'