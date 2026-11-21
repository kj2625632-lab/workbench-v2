"use client";
import { useState, useEffect } from "react";

export default function ApiConfigPage() {
  const [baseUrl, setBaseUrl] = useState("https://api.terrakinc.com/v1");
  const [apiKey, setApiKey] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => { fetch("/api/admin/settings").then((r) => r.json()).then((d) => { if (d.success) { setBaseUrl(d.baseUrl); setApiKey(d.apiKey); } }); }, []);

  const save = async () => {
    const r = await fetch("/api/admin/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ baseUrl, apiKey }) });
    const d = await r.json();
    setMsg(d.success ? "已保存！" : d.error || "保存失败");
    setTimeout(() => setMsg(""), 2000);
  };

  const test = async () => {
    setMsg("测试中...");
    const r = await fetch("/api/models");
    const d = await r.json();
    setMsg(d.success ? "✅ API 连接正常" : "❌ 连接失败");
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div>
      <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 700 }}>🔑 API 配置</h1>
      <p style={{ margin: "8px 0 24px", color: "#6b7280" }}>配置上游中转站 API 连接</p>
      {msg && <div style={{ padding: "10px 16px", borderRadius: "8px", background: msg.includes("❌") ? "#fef2f2" : "#d1fae5", color: msg.includes("❌") ? "#dc2626" : "#065f46", marginBottom: "16px" }}>{msg}</div>}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", padding: "28px", maxWidth: "640px" }}>
        <h3 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: 600 }}>中转站连接</h3>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#4b5563", marginBottom: "8px" }}>API Base URL</label>
          <input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#4b5563", marginBottom: "8px" }}>API Key</label>
          <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} type="password" style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={save} style={{ padding: "10px 28px", borderRadius: "8px", border: "none", background: "#7c3aed", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>保存配置</button>
          <button onClick={test} style={{ padding: "10px 28px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", color: "#4b5563", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>测试连接</button>
        </div>
      </div>
    </div>
  );
}
