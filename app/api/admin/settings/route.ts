import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DIR = join(process.cwd(), "data");
const FILE = join(DIR, "settings.json");
function load(): any { try { return existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf-8")) : {}; } catch { return {}; } }
function save(d: any) { if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true }); writeFileSync(FILE, JSON.stringify(d, null, 2)); }

export async function GET() {
  const s = load();
  return NextResponse.json({ success: true, baseUrl: s.baseUrl || "https://api.terrakinc.com/v1", apiKey: s.apiKey || process.env.TERRAKINC_API_KEY || "" });
}

export async function POST(req: NextRequest) {
  const { baseUrl, apiKey } = await req.json();
  const s = load();
  if (baseUrl !== undefined) s.baseUrl = baseUrl;
  if (apiKey !== undefined) s.apiKey = apiKey;
  save(s);
  return NextResponse.json({ success: true, baseUrl: s.baseUrl, apiKey: s.apiKey });
}
