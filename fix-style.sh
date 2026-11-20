#!/bin/bash
# Fix styling - install all deps including devDependencies for Tailwind CSS
echo '=== Installing ALL dependencies (including Tailwind) ==='
cd /opt/wb
npm install 2>&1 | tail -3
echo '=== Rebuilding with CSS ==='
npm run build 2>&1 | tail -8
echo '=== Restarting server ==='
pkill -f 'next start' 2>/dev/null
pkill -f 'next-server' 2>/dev/null
fuser -k 3000/tcp 2>/dev/null
sleep 2
nohup node node_modules/next/dist/bin/next start -p 3000 > /tmp/wb.log 2>&1 &
sleep 4
echo '=== Testing ==='
curl -s http://localhost:3000 | grep -o 'stylesheet' | head -1
echo ''
echo 'STYLE_FIXED - Refresh https://superbaokuan.com'