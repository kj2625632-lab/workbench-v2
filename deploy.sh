#!/bin/bash
# One-click deploy script for workbench-v2
echo '=== Downloading code from GitHub ==='
cd /opt
rm -rf wb
# Download tarball from GitHub
curl -sL https://github.com/kj2625632-lab/workbench-v2/archive/refs/heads/main.tar.gz -o wb.tar.gz
tar xzf wb.tar.gz
mv workbench-v2-main wb
rm -f wb.tar.gz
echo '=== Installing dependencies ==='
cd wb
npm install --production=false 2>&1 | tail -3
echo '=== Building ==='
npm run build 2>&1 | tail -5
echo '=== Stopping old server ==='
pkill -f 'next start' 2>/dev/null
pkill -f 'next-server' 2>/dev/null
fuser -k 3000/tcp 2>/dev/null
sleep 2
echo '=== Writing .env ==='
echo 'TERRAKINC_API_KEY=sk-peflA7EpPGG1lxBhzgomSl7aJAeFYzAHvp7HdgUaNVVSDLUq' > .env.local
echo '=== Starting server ==='
nohup node node_modules/next/dist/bin/next start -p 3000 > /tmp/wb.log 2>&1 &
sleep 4
echo '=== Checking ==='
curl -s http://localhost:3000 | head -20
echo ''
echo 'DEPLOY_DONE - Now refresh https://superbaokuan.com'