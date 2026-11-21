import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DIR = join(process.cwd(), "data");
const FILE = join(DIR, "pricing.json");
function load(): any { try { return existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf-8")) : getDefault(); } catch { return getDefault(); } }
function save(d: any) { if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true }); writeFileSync(FILE, JSON.stringify(d, null, 2)); }
function getDefault() {
  return {
    image: [
      { id: "banana-flash", name: "Banana Flash", cost: 0.02, price: 0.04 },
      { id: "banana-2.1", name: "Banana 2.1", cost: 0.05, price: 0.10 },
    ],
    video: [
      { id: "seedance-720", name: "Seedance 2.0 720P", cost: 0.70, price: 1.40 },
      { id: "minimax-768", name: "MiniMax H3 768P", cost: 0.15, price: 0.30 },
    ],
    llm: [
      { id: "deepseek", name: "DeepSeek V4.1", cost: 0.001, price: 0.002 },
      { id: "storyboard", name: "分镜拆解", cost: 1.00, price: 2.00 },
    ],
  };
}

export async function GET() { return NextResponse.json({ success: true, pricing: load() }); }

export async function POST(req: NextRequest) {
  const { category, id, price } = await req.json();
  const pricing = load();
  if (!pricing[category]) return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  const idx = pricing[category].findIndex((p: any) => p.id === id);
  if (idx === -1) return NextResponse.json({ error: "Item not found" }, { status: 404 });
  pricing[category][idx].price = Number(price);
  save(pricing);
  return NextResponse.json({ success: true, item: pricing[category][idx] });
}
