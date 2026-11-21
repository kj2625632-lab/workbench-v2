import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DIR = join(process.cwd(), "data");
const FILE = join(DIR, "users.json");
function load(): any[] { try { return existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf-8")) : []; } catch { return []; } }
function save(d: any[]) { if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true }); writeFileSync(FILE, JSON.stringify(d, null, 2)); }

export async function GET() { return NextResponse.json({ success: true, users: load().map((u: any) => ({ ...u, password: undefined })) }); }

export async function POST(req: NextRequest) {
  const { action, userId, amount } = await req.json();
  const users = load();
  const i = users.findIndex((u: any) => u.id === userId);
  if (i === -1) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (action === "recharge") { users[i].balance = (users[i].balance || 0) + Number(amount || 0); }
  else if (action === "ban") { users[i].status = "banned"; }
  else if (action === "unban") { users[i].status = "active"; }
  else if (action === "delete") { users.splice(i, 1); save(users); return NextResponse.json({ success: true }); }
  else return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  save(users);
  return NextResponse.json({ success: true, user: { ...users[i], password: undefined } });
}
