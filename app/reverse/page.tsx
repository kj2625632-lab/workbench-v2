"use client";
import { useState } from "react";

export default function ReversePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleReverse = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    try {
      const resp = await fetch("/api/reverse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_url: prompt }),
      });
      const data = await resp.json();
      setResult(data.success ? data.result : "出错了：" + (data.error || "请重试"));
    } catch {
      setResult("网络错误，请重试");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>🔍 提示词反推</h1>
      <p style={{ margin: "8px 0 24px", color: "#6b7280" }}>上传图片或粘贴链接，AI 反推生成提示词</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 600 }}>输入</h3>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#4b5563", marginBottom: "6px" }}>图片链接</label>
          <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="粘贴图片 URL..." style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", boxSizing: "border-box" }} />
          <div style={{ marginTop: "16px", padding: "40px", borderRadius: "10px", border: "2px dashed #e5e7eb", textAlign: "center", color: "#c0c4cc", cursor: "pointer" }}>
            <div style={{ fontSize: "40px" }}>🖼️</div>
            <p style={{ margin: "8px 0 0", fontSize: "14px" }}>或点击上传图片</p>
          </div>
          <button onClick={handleReverse} disabled={loading} style={{ width: "100%", padding: "14px", marginTop: "16px", borderRadius: "12px", border: "none", background: loading ? "#c4b5fd" : "linear-gradient(135deg, #7c3aed, #6366f1)", color: "#fff", fontSize: "16px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "分析中..." : "🔍 反推提示词"}
          </button>
        </div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 600 }}>反推结果</h3>
          {result ? (
            <div style={{ fontSize: "14px", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{result}</div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "#c0c4cc" }}>
              <div style={{ fontSize: "56px", marginBottom: "12px" }}>🔍</div>
              <p style={{ margin: 0, fontSize: "16px" }}>输入图片，点击「反推提示词」</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
