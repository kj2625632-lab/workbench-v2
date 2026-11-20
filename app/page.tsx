const stats = [
  { label: "剩余额度", value: "128", sub: "张图片", color: "#7c3aed" },
  { label: "今日已生成", value: "23", sub: "张图片 · 2 个视频", color: "#2563eb" },
  { label: "短剧项目", value: "3", sub: "个进行中", color: "#ec4899" },
  { label: "素材库", value: "456", sub: "张素材", color: "#10b981" },
];

const quickActions = [
  { icon: "🎨", title: "图片工作台", desc: "输入描述，立即生成产品图", href: "/image", border: "#c4b5fd" },
  { icon: "🎬", title: "分镜工作台", desc: "剧本拆解、短剧制作", href: "/storyboard", border: "#93c5fd" },
  { icon: "🔍", title: "提示词反推", desc: "看别人的图，反推怎么做", href: "/reverse", border: "#86efac" },
];

const usage = [
  { label: "1K 图片", used: 23, total: 50, color: "linear-gradient(90deg, #8b5cf6, #6366f1)" },
  { label: "2K 高清", used: 8, total: 20, color: "linear-gradient(90deg, #3b82f6, #06b6d4)" },
  { label: "4K 超清", used: 2, total: 5, color: "linear-gradient(90deg, #ec4899, #f43f5e)" },
  { label: "视频生成", used: 2, total: 5, color: "linear-gradient(90deg, #22c55e, #10b981)" },
];

export default function Dashboard() {
  return (
    <div style={{ maxWidth: "1100px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: 0, fontSize: "30px", fontWeight: 700, color: "#1a1a2e" }}>欢迎回来 👋</h1>
        <p style={{ margin: "8px 0 0", fontSize: "15px", color: "#6b7280" }}>这里是你的创作控制台，额度、用量与快捷入口一目了然</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "36px" }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <p style={{ margin: 0, fontSize: "13px", color: "#9ca3af", fontWeight: 500 }}>{s.label}</p>
            <p style={{ margin: "10px 0 4px", fontSize: "34px", fontWeight: 700, color: s.color }}>{s.value}</p>
            <p style={{ margin: 0, fontSize: "12px", color: "#c0c4cc" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 style={{ margin: "0 0 16px", fontSize: "19px", fontWeight: 600, color: "#1a1a2e" }}>快捷入口</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginBottom: "36px" }}>
        {quickActions.map((a) => (
          <a key={a.title} href={a.href} style={{ display: "block", background: "#fff", borderRadius: "16px", padding: "28px", border: "1px solid #e5e7eb", textDecoration: "none", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: "36px", marginBottom: "14px" }}>{a.icon}</div>
            <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 600, color: "#1a1a2e" }}>{a.title}</h3>
            <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#9ca3af" }}>{a.desc}</p>
          </a>
        ))}
      </div>

      {/* Usage */}
      <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <h2 style={{ margin: "0 0 24px", fontSize: "19px", fontWeight: 600, color: "#1a1a2e" }}>每日额度</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {usage.map((u) => (
            <div key={u.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                <span style={{ color: "#6b7280" }}>{u.label}</span>
                <span style={{ fontWeight: 600, color: "#1a1a2e" }}>{u.used} / {u.total}</span>
              </div>
              <div style={{ height: "10px", background: "#f3f4f6", borderRadius: "99px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(u.used / u.total) * 100}%`, background: u.color, borderRadius: "99px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
