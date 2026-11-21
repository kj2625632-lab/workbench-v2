import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DIR = join(process.cwd(), "data");
const FILE = join(DIR, "orders.json");
function load(): any[] { try { return existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf-8")) : []; } catch { return []; } }
function save(d: any[]) { if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true }); writeFileSync(FILE, JSON.stringify(d, null, 2)); }

export async function GET() {
  let orders = load();
  if (orders.length === 0) {
    orders = [
      { id: "ORD-001", user: "demo", type: "图片生成", count: 10, total: 4.00, status: "completed", time: new Date().toISOString() },
      { id: "ORD-002", user: "demo", type: "视频生成", count: 1, total: 1.40, status: "pending", time: new Date().toISOString() },
    ];
    save(orders);
  }
  return NextResponse.json({ success: true, orders });
}

export async function POST(req: NextRequest) {
  const { action, orderId } = await req.json();
  const orders = load();
  const i = orders.findIndex((o: any) => o.id === orderId);
  if (i === -1) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (action === "refund") orders[i].status = "refunded";
  else if (action === "retry") orders[i].status = "pending";
  else if (action === "complete") orders[i].status = "completed";
  else return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  save(orders);
  return NextResponse.json({ success: true, order: orders[i] });
}
