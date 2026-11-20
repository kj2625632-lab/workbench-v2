// User auth API - register / login / verify
import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const USERS_FILE = join(DATA_DIR, "users.json");

function getUsers(): any[] {
  try {
    if (existsSync(USERS_FILE)) {
      return JSON.parse(readFileSync(USERS_FILE, "utf-8"));
    }
  } catch {}
  return [];
}

function saveUsers(users: any[]) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function makeToken() {
  return "wb_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
}

export async function POST(req: NextRequest) {
  try {
    const { action, username, password, key } = await req.json();

    if (action === "register") {
      if (!username || !password) return NextResponse.json({ error: "用户名和密码不能为空" }, { status: 400 });
      if (username.length < 2) return NextResponse.json({ error: "用户名至少2个字符" }, { status: 400 });
      if (password.length < 4) return NextResponse.json({ error: "密码至少4个字符" }, { status: 400 });

      const users = getUsers();
      if (users.find((u: any) => u.username === username)) {
        return NextResponse.json({ error: "用户名已存在" }, { status: 400 });
      }
      const token = makeToken();
      users.push({
        id: "U" + Date.now().toString(36),
        username,
        password,
        token,
        balance: 10,
        totalSpent: 0,
        createdAt: new Date().toISOString(),
      });
      saveUsers(users);
      return NextResponse.json({ success: true, username, token });
    }

    if (action === "login") {
      if (!username || !password) return NextResponse.json({ error: "用户名和密码不能为空" }, { status: 400 });
      const users = getUsers();
      const user = users.find((u: any) => u.username === username && u.password === password);
      if (!user) return NextResponse.json({ error: "用户名或密码错误" }, { status: 401 });
      return NextResponse.json({ success: true, username: user.username, token: user.token, balance: user.balance });
    }

    return NextResponse.json({ error: "未知操作" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "认证失败" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const users = getUsers();
    return NextResponse.json({ success: true, users: users.map((u: any) => ({ id: u.id, username: u.username, balance: u.balance, totalSpent: u.totalSpent, createdAt: u.createdAt })) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
