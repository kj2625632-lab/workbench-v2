"use client";
import { useState, useEffect } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [msg, setMsg] = useState("");

  const load = () => fetch("/api/admin/orders").then((r) => r.json()).then((d) => { if (d.success) setOrders(d.orders); });
  useEffect(() => { load(); }, []);

  const act = async (action: string, orderId: string) => {
    const r = await fetch("/api/admin/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, orderId }) });
    const d = await r.json();
    if (d.success) { setMsg(action === "refund" ? "已退款" : "已重试"); load(); setTimeout(() => setMsg(""), 2000); }
    else setMsg(d.error || "操作失败");
  };

  const filtered = filter === "all" ? orders : orders.filter((o: any) => o.status === filter);
  const tabs = [{ key: "all", label: `全部 (${orders.length})` }, { key: "completed", label: "已完成" }, { key: "pending", label: "处理中" }, { key: "refunded", label: "已退款" }, { key: "failed", label: "失败" }];

  return (
    <div>
      <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 700 }}>📦 订单管理</h1>
      <p style={{ margin: "8px 0 24px", color: "#6b7280" }}>查看和管理所有订单</p>
      {msg && <div style={{ padding: "10px 16px", borderRadius: "8px", background: msg.includes("失败") ? "#fef2f2" : "#d1fae5", color: msg.includes("失败") ? "#dc2626" : "#065f46", marginBottom: "16px" }}>{msg}</div>}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {tabs.map((t) => (<button key={t.key} onClick={() => setFilter(t.key)} style={{ padding: "8px 18px", borderRadius: "8px", border: filter === t.key ? "none" : "1px solid #e5e7eb", background: filter === t.key ? "#7c3aed" : "#fff", color: filter === t.key ? "#fff" : "#6b7280", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>{t.label}</button>))}
      </div>
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead><tr style={{ background: "#f9fafb" }}>{["订单号", "用户", "类型", "金额", "状态", "时间", "操作"].map((h) => (<th key={h} style={{ padding: "14px 16px", textAlign: "left", fontWeight: 500, color: "#6b7280", fontSize: "12px" }}>{h}</th>))}</tr></thead>
          <tbody>
            {filtered.length === 0 ? <tr><td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "#c0c4cc" }}>暂无订单</td></tr> : filtered.map((o: any) => (
              <tr key={o.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                <td style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: "11px", color: "#6b7280" }}>{o.id}</td>
                <td style={{ padding: "14px 16px", fontWeight: 500 }}>{o.user}</td>
                <td style={{ padding: "14px 16px" }}>{o.type} x{o.count}</td>
                <td style={{ padding: "14px 16px", fontWeight: 600 }}>¥{o.total}</td>
                <td style={{ padding: "14px 16px" }}><span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", background: o.status === "completed" ? "#d1fae5" : o.status === "pending" ? "#fef3c7" : o.status === "refunded" ? "#e0e7ff" : "#fee2e2", color: o.status === "completed" ? "#065f46" : o.status === "pending" ? "#92400e" : o.status === "refunded" ? "#3730a3" : "#991b1b" }}>{o.status === "completed" ? "已完成" : o.status === "pending" ? "处理中" : o.status === "refunded" ? "已退款" : "失败"}</span></td>
                <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "11px" }}>{(o.time || "").substring(0, 16)}</td>
                <td style={{ padding: "14px 16px" }}>
                  {o.status === "completed" && <button onClick={() => act("refund", o.id)} style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #fca5a5", background: "#fff", color: "#dc2626", fontSize: "12px", cursor: "pointer", marginRight: "6px" }}>退款</button>}
                  {o.status === "failed" && <button onClick={() => act("retry", o.id)} style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #93c5fd", background: "#eff6ff", color: "#2563eb", fontSize: "12px", cursor: "pointer" }}>重试</button>}
                  {o.status === "pending" && <button onClick={() => act("complete", o.id)} style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #86efac", background: "#f0fdf4", color: "#16a34a", fontSize: "12px", cursor: "pointer" }}>完成</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
