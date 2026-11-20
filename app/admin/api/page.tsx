"use client";
import { useState } from "react";

export default function ApiConfigPage() {
  const [apiKey, setApiKey] = useState("sk-peflA7EpPGG1lxBhzgomSl7aJAeFYzAHvp7HdgUaNVVSDLUq");
  const [baseUrl, setBaseUrl] = useState("https://api.terrakinc.com/v1");

  return (
    <div>
      <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 700 }}>🔑 API 配置</h1>
      <p style={{ margin: "8px 0 24px", color: "#6b7280" }}>配置上游中转站 API 连接</p>

      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", padding: "28px", maxWidth: "640px" }}>
        <h3 style={{ margin: "0 0 20px", fontSize: "16px", fontWeight: 600 }}>中转站连接</h3>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#4b5563", marginBottom: "8px" }}>API Base URL</label>
          <input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", boxSizing: "border-box" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#4b5563", marginBottom: "8px" }}>API Key</label>
          <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} type="password" style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", boxSizing: "border-box" }} />
          <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#9ca3af" }}>保存后会写入 .env.local 文件并自动重启服务</p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ padding: "10px 28px", borderRadius: "8px", border: "none", background: "#7c3aed", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>保存配置</button>
          <button style={{ padding: "10px 28px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", color: "#4b5563", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>测试连接</button>
        </div>
      </div>

      {/* Status */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", padding: "28px", maxWidth: "640px", marginTop: "20px" }}>
        <h3 style={{ margin: "0 0 18px", fontSize: "16px", fontWeight: 600 }}>连接状态</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            { label: "AI 对话 (DeepSeek)", status: "✅ 正常", color: "#10b981" },
            { label: "图片生成 (Banana Flash)", status: "❌ 403 权限不足", color: "#ef4444" },
            { label: "图片生成 (Banana 2.1)", status: "❓ 未测试", color: "#9ca3af" },
            { label: "视频生成 (MiniMax)", status: "❓ 未测试", color: "#9ca3af" },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: "8px", background: "#f9fafb" }}>
              <span style={{ fontSize: "14px" }}>{s.label}</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: s.color }}>{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
