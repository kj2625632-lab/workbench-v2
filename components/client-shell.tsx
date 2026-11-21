"use client";
import { useEffect, useState } from "react";

const navItems = [
  { icon: "📊", label: "概览", href: "/" },
  { icon: "💬", label: "AI 对话", href: "/chat" },
  { icon: "🎨", label: "图片工作台", href: "/image" },
  { icon: "🎬", label: "视频工作台", href: "/video" },
  { icon: "🎞️", label: "分镜工作台", href: "/storyboard" },
  { icon: "🔍", label: "提示词反推", href: "/reverse" },
  { icon: "📁", label: "素材库", href: "/assets" },
];
const bottomItems = [
  { icon: "💰", label: "钱包 / 额度", href: "/wallet" },
  { icon: "⚙️", label: "设置", href: "/settings" },
];

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<"loading" | "login" | "admin" | "frontend">("loading");
  const [username, setUsername] = useState("用户");

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/login" || path === "/admin/login") { setState("login"); return; }
    if (path.startsWith("/admin")) {
      if (!localStorage.getItem("wb_admin_auth")) { window.location.href = "/admin/login"; return; }
      setState("admin"); return;
    }
    const a = localStorage.getItem("wb_auth");
    if (!a) { window.location.href = "/login"; return; }
    try { const d = JSON.parse(a); setUsername(d.username || "用户"); } catch {}
    setState("frontend");
  }, []);

  if (state === "loading") return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "-apple-system, sans-serif", color: "#9ca3af" }}>验证登录中...</div>;
  if (state === "login" || state === "admin") return <>{children}</>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside style={{ width: "240px", background: "#fff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "24px 20px" }}>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, background: "linear-gradient(135deg, #7c3aed, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🔥 爆款工作台</h1>
          <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#9ca3af" }}>AI 电商创作平台 v2.0</p>
        </div>
        <nav style={{ flex: 1, padding: "0 12px", overflow: "auto" }}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 12px", borderRadius: "10px", fontSize: "14px", color: "#4b5563", textDecoration: "none", marginBottom: "4px" }}>
              <span style={{ fontSize: "18px" }}>{item.icon}</span>{item.label}
            </a>
          ))}
          <div style={{ height: "1px", background: "#e5e7eb", margin: "16px 0" }} />
          {bottomItems.map((item) => (
            <a key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 12px", borderRadius: "10px", fontSize: "14px", color: "#4b5563", textDecoration: "none", marginBottom: "4px" }}>
              <span style={{ fontSize: "18px" }}>{item.icon}</span>{item.label}
            </a>
          ))}
        </nav>
        <div style={{ padding: "16px 20px", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #6366f1)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700 }}>{username[0]?.toUpperCase() || "U"}</div>
            <div>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#1a1a2e" }}>{username}</p>
              <button onClick={() => { localStorage.removeItem("wb_auth"); window.location.href = "/login"; }} style={{ margin: 0, fontSize: "12px", color: "#9ca3af", background: "none", border: "none", cursor: "pointer", padding: 0 }}>退出登录</button>
            </div>
          </div>
        </div>
      </aside>
      <main style={{ flex: 1, overflow: "auto", padding: "32px" }}>{children}</main>
    </div>
  );
}
