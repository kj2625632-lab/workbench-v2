"use client";
import { useState } from "react";

export default function StoryboardPage() {
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleParse = async () => {
    if (!script.trim() || loading) return;
    setLoading(true);
    try {
      const resp = await fetch("/api/storyboard/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script }),
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
      <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>🎞️ 分镜工作台</h1>
      <p style={{ margin: "8px 0 24px", color: "#6b7280" }}>粘贴剧本，AI 自动拆解分镜</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 600 }}>剧本输入</h3>
          <textarea value={script} onChange={(e) => setScript(e.target.value)} placeholder="粘贴你的剧本或故事...&#10;&#10;例：一个女孩在咖啡店偶遇前任，两人尴尬地打招呼，回忆起曾经的美好时光..." style={{ width: "100%", minHeight: "300px", padding: "12px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", resize: "vertical", boxSizing: "border-box" }} />
          <button onClick={handleParse} disabled={loading} style={{ width: "100%", padding: "14px", marginTop: "16px", borderRadius: "12px", border: "none", background: loading ? "#c4b5fd" : "linear-gradient(135deg, #7c3aed, #6366f1)", color: "#fff", fontSize: "16px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "解析中..." : "🎬 拆解分镜"}
          </button>
        </div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 600 }}>分镜结果</h3>
          {result ? (
            <div style={{ fontSize: "14px", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{result}</div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "#c0c4cc" }}>
              <div style={{ fontSize: "56px", marginBottom: "12px" }}>🎞️</div>
              <p style={{ margin: 0, fontSize: "16px" }}>粘贴剧本，点击「拆解分镜」</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
