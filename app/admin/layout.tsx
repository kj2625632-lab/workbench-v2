import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理后台 - 爆款工作台",
  description: "用户管理、订单管理、价格配置",
};

const navItems = [
  { icon: "📊", label: "数据概览", href: "/admin" },
  { icon: "👥", label: "用户管理", href: "/admin/users" },
  { icon: "📦", label: "订单管理", href: "/admin/orders" },
  { icon: "💰", label: "价格配置", href: "/admin/pricing" },
  { icon: "🔑", label: "API 配置", href: "/admin/api" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, padding: 0, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif", background: "#f8f9fc", color: "#1a1a2e", height: "100vh", overflow: "hidden" }}>
        <div style={{ display: "flex", height: "100vh" }}>
          {/* Sidebar */}
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
            </nav>
            <div style={{ padding: "16px 20px", borderTop: "1px solid #374151" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#7c3aed", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700 }}>A</div>
                <div>
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#fff" }}>管理员</p>
                  <p style={{ margin: 0, fontSize: "11px", color: "#6b7280" }}>admin@superbaokuan.com</p>
                </div>
              </div>
            </div>
          </aside>
          {/* Main */}
          <main style={{ flex: 1, overflow: "auto", padding: "28px" }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
