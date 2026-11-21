#!/bin/bash
# One-time setup: install remote admin API
echo '=== Setting up Remote Admin API ==='
cd /opt/wb
B=https://raw.githubusercontent.com/kj2625632-lab/workbench-v2/main

# Download the deploy API
mkdir -p app/api/admin/deploy
curl -sL $B/app/api/admin/deploy/route.ts -o app/api/admin/deploy/route.ts

# Download all latest files
curl -sL $B/app/layout.tsx -o app/layout.tsx
curl -sL $B/components/client-shell.tsx -o components/client-shell.tsx
curl -sL $B/components/auth-guard.tsx -o components/auth-guard.tsx

# Rebuild
echo '=== Building ==='
npx next build 2>&1 | tail -5
echo '=== Restarting ==='
fuser -k 3000/tcp 2>/dev/null
sleep 2
nohup node node_modules/next/dist/bin/next start -p 3000 > /tmp/wb.log 2>&1 &
sleep 5

# Test
echo '=== Testing Remote Admin API ==='
curl -s http://localhost:3000/api/admin/deploy?token=superbaokuan-admin-2026 | head -1
echo ''
echo 'REMOTE_ADMIN_READY'
echo 'Admin Token: superbaokuan-admin-2026'
echo 'API Endpoint: https://superbaokuan.com/api/admin/deploy'