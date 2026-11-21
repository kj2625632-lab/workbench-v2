// Remote admin deploy API - allows remote code deployment with admin token
import { NextRequest, NextResponse } from "next/server";
import { execSync } from "child_process";
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const TOKENS_FILE = join(DATA_DIR, "admin-tokens.json");
const ADMIN_TOKEN = "superbaokuan-admin-2026";

function checkAuth(req: NextRequest): boolean {
  const token = req.headers.get("x-admin-token") || new URL(req.url).searchParams.get("token");
  return token === ADMIN_TOKEN;
}

// GET: check status
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  try {
    const uptime = process.uptime();
    const nodeVersion = process.version;
    return NextResponse.json({ success: true, status: "running", uptime: Math.round(uptime), nodeVersion, timestamp: new Date().toISOString() });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST: execute admin commands
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const { action, script, restart } = await req.json();

  try {
    if (action === "deploy") {
      // Pull latest code from GitHub and rebuild
      const result = execSync(
        `cd /opt/wb && curl -sL https://raw.githubusercontent.com/kj2625632-lab/workbench-v2/main/full-deploy.sh -o /tmp/fd.sh && bash /tmp/fd.sh 2>&1 | tail -20`,
        { timeout: 300000, encoding: "utf-8" }
      );
      return NextResponse.json({ success: true, output: result });
    }

    if (action === "rebuild") {
      const result = execSync(`cd /opt/wb && npx next build 2>&1 | tail -10`, { timeout: 300000, encoding: "utf-8" });
      return NextResponse.json({ success: true, output: result });
    }

    if (action === "restart") {
      execSync(`fuser -k 3000/tcp 2>/dev/null; sleep 1; nohup node /opt/wb/node_modules/next/dist/bin/next start -p 3000 > /tmp/wb.log 2>&1 &`, { timeout: 10000, encoding: "utf-8" });
      return NextResponse.json({ success: true, message: "Server restarting" });
    }

    if (action === "logs") {
      const result = execSync(`tail -50 /tmp/wb.log 2>/dev/null || echo 'No logs'`, { encoding: "utf-8" });
      return NextResponse.json({ success: true, logs: result });
    }

    if (action === "exec" && script) {
      // Execute arbitrary command (admin only)
      const safeScript = script.replace(/;\s*rm\s+-rf\s+\//g, ""); // basic safety
      const result = execSync(safeScript, { timeout: 60000, encoding: "utf-8", cwd: "/opt/wb" });
      return NextResponse.json({ success: true, output: result });
    }

    return NextResponse.json({ error: "Unknown action. Use: deploy, rebuild, restart, logs, exec" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message, output: e.stdout || e.stderr || "" }, { status: 500 });
  }
}
