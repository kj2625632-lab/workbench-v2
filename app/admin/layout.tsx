"use client";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/admin/login") { setReady(true); return; }
    const a = localStorage.getItem("wb_admin_auth");
    if (!a) { window.location.href = "/admin/login"; return; }
    setReady(true);
  }, []);

  if (!ready) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "-apple-system, sans-serif", color: "#9ca3af" }}>验证登录中...</div>;
  }

  const path = typeof window !== "undefined" ? window.location.pathname : "";
  if (path === "/admin/login") return <>{children}</>;

  const navItems = [
    { icon: "📊", label: "数据概览", href: "/admin" },
    { icon: "👥", label: "用户管理", href: "/admin/users" },
    { icon: "📦", label: "订单管理", href: "/admin/orders" },
    { icon: "💰", label: "价格配置", href: "/admin/pricing" },
    { icon: "🔑", label: "API 配置", href: "/admin/api" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside style={{ width: "220px", background: "#1a1a2e", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "24px 20px" }}>
          <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#fff" }}>⚙️ 管理后台</h1>
          <p style={{ margin: "6px 0 0", fontSize: "11px", color: "#6b7280" }}>爆款工作台 Admin</p>
        </div>
        <nav style={{ flex: 1, padding: "0 10px" }}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", borderRadius: "8px", fontSize: "13px", color: "#9ca3af", textDecoration: "none", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              {item.label}
            </a>
          ))}
          <div style={{ height: "1px", background: "#374151", margin: "16px 0" }} />
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", borderRadius: "8px", fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>
            <span>🏠</span> 返回前台
          </a>
          <button onClick={() => { localStorage.removeItem("wb_admin_auth"); window.location.href = "/admin/login"; }} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", borderRadius: "8px", fontSize: "13px", color: "#ef4444", textDecoration: "none", marginBottom: "4px", background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}>
            <span>🚪</span> 退出登录
          </button>
        </nav>
        <div style={{ padding: "16px 20px", borderTop: "1px solid #374151" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#7c3aed", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700 }}>A</div>
            <div>
              <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#fff" }}>管理员</p>
              <p style={{ margin: 0, fontSize: "11px", color: "#6b7280" }}>admin</p>
            </div>
          </div>
        </div>
      </aside>
      <main style={{ flex: 1, overflow: "auto", padding: "28px" }}>{children}</main>
    </div>
  );
}
