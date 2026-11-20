const orders = [
  { id: "ORD-20261120-001", user: "user_8821", items: [{ name: "Banana Flash", qty: 10, price: "0.40" }], total: "4.00", payMethod: "余额", status: "已完成", time: "2026-11-20 15:30" },
  { id: "ORD-20261120-002", user: "user_3392", items: [{ name: "MiniMax H3", qty: 1, price: "1.40" }], total: "1.40", payMethod: "余额", status: "处理中", time: "2026-11-20 15:25" },
  { id: "ORD-20261120-003", user: "user_1027", items: [{ name: "分镜拆解", qty: 1, price: "2.00" }], total: "2.00", payMethod: "支付宝", status: "已完成", time: "2026-11-20 15:18" },
  { id: "ORD-20261120-004", user: "user_5588", items: [{ name: "Banana Flash", qty: 5, price: "0.40" }], total: "2.00", payMethod: "余额", status: "已完成", time: "2026-11-20 15:12" },
  { id: "ORD-20261120-005", user: "user_2210", items: [{ name: "Seedance 2.0", qty: 3, price: "1.40" }], total: "4.20", payMethod: "微信", status: "失败", time: "2026-11-20 15:05" },
  { id: "ORD-20261120-006", user: "user_7788", items: [{ name: "Banana 2.1", qty: 2, price: "1.00" }], total: "2.00", payMethod: "余额", status: "已完成", time: "2026-11-20 14:58" },
  { id: "ORD-20261120-007", user: "user_4455", items: [{ name: "DeepSeek 对话", qty: 1, price: "0.50" }], total: "0.50", payMethod: "余额", status: "已退款", time: "2026-11-20 14:45" },
];

const tabs = ["全部 (7)", "已完成 (4)", "处理中 (1)", "失败 (1)", "已退款 (1)"];

export default function OrdersPage() {
  return (
    <div>
      <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 700 }}>📦 订单管理</h1>
      <p style={{ margin: "8px 0 24px", color: "#6b7280" }}>查看和管理所有订单</p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {tabs.map((tab, i) => (
          <button key={tab} style={{ padding: "8px 18px", borderRadius: "8px", border: i === 0 ? "none" : "1px solid #e5e7eb", background: i === 0 ? "#7c3aed" : "#fff", color: i === 0 ? "#fff" : "#6b7280", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>{tab}</button>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {["订单号", "用户", "商品", "金额", "支付方式", "状态", "时间", "操作"].map((h) => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontWeight: 500, color: "#6b7280", fontSize: "12px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                <td style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: "11px", color: "#6b7280" }}>{o.id}</td>
                <td style={{ padding: "14px 16px", fontWeight: 500 }}>{o.user}</td>
                <td style={{ padding: "14px 16px" }}>
                  {o.items.map((item, i) => (
                    <div key={i} style={{ fontSize: "12px" }}>{item.name} x{item.qty}</div>
                  ))}
                </td>
                <td style={{ padding: "14px 16px", fontWeight: 600 }}>¥{o.total}</td>
                <td style={{ padding: "14px 16px", color: "#6b7280" }}>{o.payMethod}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 500, background: o.status === "已完成" ? "#d1fae5" : o.status === "处理中" ? "#fef3c7" : o.status === "失败" ? "#fee2e2" : "#e0e7ff", color: o.status === "已完成" ? "#065f46" : o.status === "处理中" ? "#92400e" : o.status === "失败" ? "#991b1b" : "#3730a3" }}>{o.status}</span>
                </td>
                <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "11px" }}>{o.time}</td>
                <td style={{ padding: "14px 16px" }}>
                  <button style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #e5e7eb", background: "#fff", fontSize: "12px", cursor: "pointer", marginRight: "6px" }}>详情</button>
                  {o.status === "失败" && <button style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #93c5fd", background: "#eff6ff", color: "#2563eb", fontSize: "12px", cursor: "pointer" }}>重试</button>}
                  {o.status === "已完成" && <button style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #fca5a5", background: "#fff", color: "#dc2626", fontSize: "12px", cursor: "pointer" }}>退款</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
