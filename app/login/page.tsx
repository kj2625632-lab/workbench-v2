"use client";
import { useState } from "react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register" | "apikey">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (mode === "apikey") {
        if (!apiKey.trim()) { setError("请输入 API Key"); setLoading(false); return; }
        localStorage.setItem("wb_auth", JSON.stringify({ type: "apikey", key: apiKey.trim(), name: "API 用户" }));
        window.location.href = "/";
      } else {
        if (!username.trim() || !password.trim()) { setError("请填写完整"); setLoading(false); return; }
        const resp = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: mode, username: username.trim(), password: password.trim() }),
        });
        const data = await resp.json();
        if (data.success) {
          localStorage.setItem("wb_auth", JSON.stringify({ type: "account", username: data.username || username.trim(), token: data.token }));
          window.location.href = "/";
        } else {
          setError(data.error || "操作失败");
        }
      }
    } catch (e: any) {
      setError("网络错误: " + e.message);
    }
    setLoading(false);
  };

  return (
    <body style={{ margin: 0, padding: 0, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "48px 40px", width: "420px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700, background: "linear-gradient(135deg, #7c3aed, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🔥 爆款工作台</h1>
          <p style={{ margin: "8px 0 0", color: "#9ca3af", fontSize: "14px" }}>AI 电商创作平台</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
          {[
            { key: "login" as const, label: "登录" },
            { key: "register" as const, label: "注册" },
            { key: "apikey" as const, label: "API Key" },
          ].map((tab) => (
            <button key={tab.key} onClick={() => { setMode(tab.key); setError(""); }} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "none", background: mode === tab.key ? "#7c3aed" : "#f3f4f6", color: mode === tab.key ? "#fff" : "#6b7280", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>{tab.label}</button>
          ))}
        </div>

        {mode !== "apikey" ? (
          <>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#4b5563", marginBottom: "6px" }}>用户名</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="输入用户名" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", boxSizing: "border-box", outline: "none" }} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#4b5563", marginBottom: "6px" }}>密码</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="输入密码" onKeyDown={(e) => e.key === "Enter" && handleSubmit()} style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", boxSizing: "border-box", outline: "none" }} />
            </div>
          </>
        ) : (
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#4b5563", marginBottom: "6px" }}>API Key</label>
            <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="粘贴你的 API Key..." onKeyDown={(e) => e.key === "Enter" && handleSubmit()} style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", boxSizing: "border-box", outline: "none", fontFamily: "monospace" }} />
            <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#9ca3af" }}>使用管理员分配的 API Key 直接登录，无需注册</p>
          </div>
        )}

        {error && <div style={{ padding: "10px 14px", borderRadius: "8px", background: "#fef2f2", color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>{error}</div>}

        <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: loading ? "#c4b5fd" : "linear-gradient(135deg, #7c3aed, #6366f1)", color: "#fff", fontSize: "16px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "处理中..." : mode === "login" ? "登 录" : mode === "register" ? "注 册" : "进入工作台"}
        </button>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <a href="/admin/login" style={{ fontSize: "12px", color: "#c0c4cc", textDecoration: "none" }}>管理员登录 →</a>
        </div>
      </div>
    </body>
  );
}
