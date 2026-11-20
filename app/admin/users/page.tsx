"use client";
import { useState } from "react";

const initialUsers = [
  { id: "U001", name: "user_8821", email: "user8821@example.com", balance: "128 张", totalSpent: "¥456.00", status: "正常", joined: "2026-11-01" },
  { id: "U002", name: "user_3392", email: "user3392@example.com", balance: "45 张", totalSpent: "¥230.00", status: "正常", joined: "2026-11-05" },
  { id: "U003", name: "user_1027", email: "user1027@example.com", balance: "0 张", totalSpent: "¥1,020.00", status: "余额不足", joined: "2026-10-20" },
  { id: "U004", name: "user_5588", email: "user5588@example.com", balance: "312 张", totalSpent: "¥890.00", status: "正常", joined: "2026-11-10" },
  { id: "U005", name: "user_2210", email: "user2210@example.com", balance: "12 张", totalSpent: "¥67.00", status: "已封禁", joined: "2026-11-15" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) => u.name.includes(search) || u.email.includes(search));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 700 }}>👥 用户管理</h1>
          <p style={{ margin: "8px 0 0", color: "#6b7280" }}>管理平台用户账户和余额</p>
        </div>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="搜索用户名/邮箱..." style={{ padding: "10px 16px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", width: "240px", outline: "none" }} />
      </div>

      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {["用户ID", "用户名", "邮箱", "余额", "累计消费", "状态", "注册日期", "操作"].map((h) => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontWeight: 500, color: "#6b7280", fontSize: "12px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                <td style={{ padding: "14px 16px", fontFamily: "monospace", color: "#6b7280" }}>{u.id}</td>
                <td style={{ padding: "14px 16px", fontWeight: 600 }}>{u.name}</td>
                <td style={{ padding: "14px 16px", color: "#6b7280" }}>{u.email}</td>
                <td style={{ padding: "14px 16px" }}>{u.balance}</td>
                <td style={{ padding: "14px 16px", fontWeight: 600 }}>{u.totalSpent}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 500, background: u.status === "正常" ? "#d1fae5" : u.status === "余额不足" ? "#fef3c7" : "#fee2e2", color: u.status === "正常" ? "#065f46" : u.status === "余额不足" ? "#92400e" : "#991b1b" }}>{u.status}</span>
                </td>
                <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: "12px" }}>{u.joined}</td>
                <td style={{ padding: "14px 16px" }}>
                  <button style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #e5e7eb", background: "#fff", fontSize: "12px", cursor: "pointer", marginRight: "6px" }}>充值</button>
                  <button style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #fca5a5", background: "#fff", color: "#dc2626", fontSize: "12px", cursor: "pointer" }}>封禁</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
