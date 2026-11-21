"use client";
import { useState, useEffect } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");

  const load = () => fetch("/api/admin/users").then((r) => r.json()).then((d) => { if (d.success) setUsers(d.users); });
  useEffect(() => { load(); }, []);

  const act = async (action: string, userId: string, amount?: number) => {
    const r = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, userId, amount }) });
    const d = await r.json();
    if (d.success) { setMsg(action === "recharge" ? "充值成功" : action === "ban" ? "已封禁" : "已解封"); load(); setTimeout(() => setMsg(""), 2000); }
    else setMsg(d.error || "操作失败");
  };

  const filtered = users.filter((u: any) => (u.username || "").includes(search) || (u.id || "").includes(search));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 700 }}>👥 用户管理</h1>
          <p style={{ margin: "8px 0 0", color: "#6b7280" }}>共 {users.length} 个用户</p>
        </div>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="搜索用户名/ID..." style={{ padding: "10px 16px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", width: "240px", outline: "none" }} />
      </div>
      {msg && <div style={{ padding: "10px 16px", borderRadius: "8px", background: msg.includes("失败") ? "#fef2f2" : "#d1fae5", color: msg.includes("失败") ? "#dc2626" : "#065f46", marginBottom: "16px", fontSize: "14px" }}>{msg}</div>}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead><tr style={{ background: "#f9fafb" }}>{["ID", "用户名", "余额", "状态", "注册时间", "操作"].map((h) => (<th key={h} style={{ padding: "14px 16px", textAlign: "left", fontWeight: 500, color: "#6b7280", fontSize: "12px" }}>{h}</th>))}</tr></thead>
          <tbody>
            {filtered.length === 0 ? <tr><td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#c0c4cc" }}>暂无用户数据</td></tr> : filtered.map((u: any) => (
              <tr key={u.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                <td style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: "11px", color: "#6b7280" }}>{u.id}</td>
                <td style={{ padding: "14px 16px", fontWeight: 600 }}>{u.username}</td>
                <td style={{ padding: "14px 16px" }}>{u.balance} 张</td>
                <td style={{ padding: "14px 16px" }}><span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", background: u.status === "banned" ? "#fee2e2" : "#d1fae5", color: u.status === "banned" ? "#991b1b" : "#065f46" }}>{u.status === "banned" ? "已封禁" : "正常"}</span></td>
                <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "11px" }}>{(u.createdAt || "").substring(0, 10)}</td>
                <td style={{ padding: "14px 16px" }}>
                  <button onClick={() => { const v = prompt("充值数量:"); if (v) act("recharge", u.id, Number(v)); }} style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #93c5fd", background: "#eff6ff", color: "#2563eb", fontSize: "12px", cursor: "pointer", marginRight: "6px" }}>充值</button>
                  {u.status === "banned" ? <button onClick={() => act("unban", u.id)} style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #86efac", background: "#f0fdf4", color: "#16a34a", fontSize: "12px", cursor: "pointer" }}>解封</button> : <button onClick={() => act("ban", u.id)} style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #fca5a5", background: "#fff", color: "#dc2626", fontSize: "12px", cursor: "pointer" }}>封禁</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
