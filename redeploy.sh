#!/bin/bash
# Full redeploy - pulls all pages from GitHub
echo '=== Downloading all pages ==='
cd /opt/wb
curl -sL https://raw.githubusercontent.com/kj2625632-lab/workbench-v2/main/app/layout.tsx -o app/layout.tsx
curl -sL https://raw.githubusercontent.com/kj2625632-lab/workbench-v2/main/app/page.tsx -o app/page.tsx
mkdir -p app/image app/chat app/video app/storyboard app/reverse app/assets
curl -sL https://raw.githubusercontent.com/kj2625632-lab/workbench-v2/main/app/image/page.tsx -o app/image/page.tsx
curl -sL https://raw.githubusercontent.com/kj2625632-lab/workbench-v2/main/app/chat/page.tsx -o app/chat/page.tsx
curl -sL https://raw.githubusercontent.com/kj2625632-lab/workbench-v2/main/app/video/page.tsx -o app/video/page.tsx
curl -sL https://raw.githubusercontent.com/kj2625632-lab/workbench-v2/main/app/storyboard/page.tsx -o app/storyboard/page.tsx
curl -sL https://raw.githubusercontent.com/kj2625632-lab/workbench-v2/main/app/reverse/page.tsx -o app/reverse/page.tsx
curl -sL https://raw.githubusercontent.com/kj2625632-lab/workbench-v2/main/app/assets/page.tsx -o app/assets/page.tsx
echo '=== Files downloaded ==='
ls -la app/*/page.tsx app/page.tsx app/layout.tsx 2>/dev/null
echo '=== Building ==='
npx next build 2>&1 | tail -8
echo '=== Restarting ==='
fuser -k 3000/tcp 2>/dev/null
sleep 2
nohup node node_modules/next/dist/bin/next start -p 3000 > /tmp/wb.log 2>&1 &
sleep 4
echo '=== Done ==='
echo 'ALL_PAGES_DONE - Refresh https://superbaokuan.com'