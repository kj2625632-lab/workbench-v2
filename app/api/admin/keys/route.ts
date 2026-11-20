// API key quota management
import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const KEYS_FILE = join(DATA_DIR, "api-keys.json");

function getKeys(): any[] {
  try {
    if (existsSync(KEYS_FILE)) {
      return JSON.parse(readFileSync(KEYS_FILE, "utf-8"));
    }
  } catch {}
  return [];
}

function saveKeys(keys: any[]) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(KEYS_FILE, JSON.stringify(keys, null, 2));
}

export async function GET() {
  const keys = getKeys();
  return NextResponse.json({ success: true, keys });
}

export async function POST(req: NextRequest) {
  try {
    const { action, id, name, imageQuota, videoQuota, apiKey } = await req.json();

    if (action === "create") {
      const keys = getKeys();
      const newKey = {
        id: "AK" + Date.now().toString(36),
        name: name || "未命名",
        key: "wb_" + Math.random().toString(36).substring(2, 14),
        apiKey: apiKey || "",
        imageQuota: imageQuota || 100,
        videoQuota: videoQuota || 10,
        imageUsed: 0,
        videoUsed: 0,
        status: "active",
        createdAt: new Date().toISOString(),
      };
      keys.push(newKey);
      saveKeys(keys);
      return NextResponse.json({ success: true, key: newKey });
    }

    if (action === "update") {
      const keys = getKeys();
      const idx = keys.findIndex((k: any) => k.id === id);
      if (idx === -1) return NextResponse.json({ error: "Key 不存在" }, { status: 404 });
      if (name !== undefined) keys[idx].name = name;
      if (imageQuota !== undefined) keys[idx].imageQuota = imageQuota;
      if (videoQuota !== undefined) keys[idx].videoQuota = videoQuota;
      if (apiKey !== undefined) keys[idx].apiKey = apiKey;
      saveKeys(keys);
      return NextResponse.json({ success: true, key: keys[idx] });
    }

    if (action === "delete") {
      const keys = getKeys().filter((k: any) => k.id !== id);
      saveKeys(keys);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "未知操作" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
