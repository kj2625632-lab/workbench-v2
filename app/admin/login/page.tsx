"use client";
import { useState } from "react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "123456") {
      localStorage.setItem("wb_admin_auth", JSON.stringify({ username: "admin", loginAt: Date.now() }));
      window.location.href = "/admin";
    } else {
      setError("账号或密码错误");
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "48px 40px", width: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>⚙️</div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 700, color: "#1a1a2e" }}>管理后台</h1>
          <p style={{ margin: "8px 0 0", color: "#9ca3af", fontSize: "14px" }}>爆款工作台 Admin Panel</p>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#4b5563", marginBottom: "6px" }}>管理员账号</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", boxSizing: "border-box", outline: "none" }} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#4b5563", marginBottom: "6px" }}>密码</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••" onKeyDown={(e) => e.key === "Enter" && handleLogin()} style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", boxSizing: "border-box", outline: "none" }} />
        </div>

        {error && <div style={{ padding: "10px 14px", borderRadius: "8px", background: "#fef2f2", color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>{error}</div>}

        <button onClick={handleLogin} style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: "#1a1a2e", color: "#fff", fontSize: "16px", fontWeight: 600, cursor: "pointer" }}>登录管理后台</button>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <a href="/login" style={{ fontSize: "12px", color: "#c0c4cc", textDecoration: "none" }}>← 返回用户登录</a>
        </div>
      </div>
    </div>
  );
}
