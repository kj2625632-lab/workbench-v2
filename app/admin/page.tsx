const stats = [
  { label: "总用户数", value: "1,286", change: "+23 今日", color: "#7c3aed" },
  { label: "今日收入", value: "¥892", change: "+12% vs 昨日", color: "#10b981" },
  { label: "今日生成量", value: "1,547", change: "图片 1,203 · 视频 344", color: "#2563eb" },
  { label: "API 余额", value: "¥3,280", change: "预计可用 15 天", color: "#f59e0b" },
];

const recentOrders = [
  { id: "ORD-20261120-001", user: "user_8821", type: "图片生成 x10", amount: "¥4.00", status: "已完成", time: "2 分钟前" },
  { id: "ORD-20261120-002", user: "user_3392", type: "视频生成 x1", amount: "¥1.40", status: "处理中", time: "5 分钟前" },
  { id: "ORD-20261120-003", user: "user_1027", type: "分镜拆解 x1", amount: "¥2.00", status: "已完成", time: "12 分钟前" },
  { id: "ORD-20261120-004", user: "user_5588", type: "图片生成 x5", amount: "¥2.00", status: "已完成", time: "18 分钟前" },
  { id: "ORD-20261120-005", user: "user_2210", type: "视频生成 x3", amount: "¥4.20", status: "失败", time: "25 分钟前" },
];

const topModels = [
  { name: "Banana Flash", usage: 847, percent: 42 },
  { name: "DeepSeek V4.1", usage: 523, percent: 26 },
  { name: "Banana 2.1", usage: 312, percent: 15 },
  { name: "MiniMax H3", usage: 218, percent: 11 },
  { name: "其他", usage: 120, percent: 6 },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 700 }}>📊 数据概览</h1>
      <p style={{ margin: "8px 0 28px", color: "#6b7280" }}>平台运营数据一览</p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: "#fff", borderRadius: "14px", padding: "22px", border: "1px solid #e5e7eb" }}>
            <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af", fontWeight: 500 }}>{s.label}</p>
            <p style={{ margin: "10px 0 4px", fontSize: "30px", fontWeight: 700, color: s.color }}>{s.value}</p>
            <p style={{ margin: 0, fontSize: "12px", color: "#c0c4cc" }}>{s.change}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        {/* Recent Orders */}
        <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ margin: "0 0 18px", fontSize: "16px", fontWeight: 600 }}>最近订单</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ color: "#9ca3af", fontSize: "12px", textAlign: "left" }}>
                <th style={{ padding: "8px 0", fontWeight: 500 }}>订单号</th>
                <th style={{ padding: "8px 0", fontWeight: 500 }}>用户</th>
                <th style={{ padding: "8px 0", fontWeight: 500 }}>内容</th>
                <th style={{ padding: "8px 0", fontWeight: 500 }}>金额</th>
                <th style={{ padding: "8px 0", fontWeight: 500 }}>状态</th>
                <th style={{ padding: "8px 0", fontWeight: 500 }}>时间</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px 0", fontFamily: "monospace", fontSize: "12px", color: "#6b7280" }}>{o.id}</td>
                  <td style={{ padding: "12px 0" }}>{o.user}</td>
                  <td style={{ padding: "12px 0" }}>{o.type}</td>
                  <td style={{ padding: "12px 0", fontWeight: 600 }}>{o.amount}</td>
                  <td style={{ padding: "12px 0" }}>
                    <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 500, background: o.status === "已完成" ? "#d1fae5" : o.status === "处理中" ? "#fef3c7" : "#fee2e2", color: o.status === "已完成" ? "#065f46" : o.status === "处理中" ? "#92400e" : "#991b1b" }}>{o.status}</span>
                  </td>
                  <td style={{ padding: "12px 0", color: "#9ca3af", fontSize: "12px" }}>{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Models */}
        <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ margin: "0 0 18px", fontSize: "16px", fontWeight: 600 }}>热门模型</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {topModels.map((m) => (
              <div key={m.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px" }}>
                  <span style={{ color: "#4b5563" }}>{m.name}</span>
                  <span style={{ fontWeight: 600 }}>{m.usage} 次</span>
                </div>
                <div style={{ height: "8px", background: "#f3f4f6", borderRadius: "99px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${m.percent}%`, background: "linear-gradient(90deg, #7c3aed, #6366f1)", borderRadius: "99px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
