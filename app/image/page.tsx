"use client";
import { useState } from "react";

export default function ImagePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    try {
      const resp = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: "banana-flash", width: 1024, height: 1024 }),
      });
      const data = await resp.json();
      if (data.success && data.images?.length > 0) {
        setResults((prev) => [...data.images.map((i: any) => i.url), ...prev]);
      } else {
        alert(data.error || "生成失败");
      }
    } catch (e: any) {
      alert("网络错误: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>🎨 图片工作台</h1>
      <p style={{ margin: "8px 0 24px", color: "#6b7280" }}>输入描述，立即生成高质量电商图片</p>

      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "24px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 600 }}>生成设置</h3>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#4b5563", marginBottom: "6px" }}>画面描述</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="描述你想要的图片...&#10;例：白色大理石台面上的护肤精华液，柔和自然光，高端产品摄影" style={{ width: "100%", minHeight: "120px", padding: "12px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", resize: "vertical", boxSizing: "border-box" }} />

          <div style={{ marginTop: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#4b5563", marginBottom: "6px" }}>模型</label>
            {[{ id: "banana-flash", name: "Banana Flash", desc: "¥0.04/张 · 速度快" }, { id: "banana-2.1", name: "Banana 2.1", desc: "¥0.10/张 · 高质量" }].map((m, i) => (
              <div key={m.id} style={{ padding: "12px", borderRadius: "10px", border: `1px solid ${i === 0 ? "#7c3aed" : "#e5e7eb"}`, marginBottom: "8px", cursor: "pointer", background: i === 0 ? "#f5f3ff" : "#fff" }}>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>{m.desc}</div>
              </div>
            ))}
          </div>

          <button onClick={handleGenerate} disabled={loading} style={{ width: "100%", padding: "14px", marginTop: "16px", borderRadius: "12px", border: "none", background: loading ? "#c4b5fd" : "linear-gradient(135deg, #7c3aed, #6366f1)", color: "#fff", fontSize: "16px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "生成中..." : "✨ 生成图片"}
          </button>
        </div>

        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 600 }}>生成结果</h3>
          {results.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "#c0c4cc" }}>
              <div style={{ fontSize: "56px", marginBottom: "12px" }}>🎨</div>
              <p style={{ margin: 0, fontSize: "16px" }}>输入描述，点击生成开始创作</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
              {results.map((url, i) => (
                <img key={i} src={url} alt={"生成图片"} style={{ width: "100%", borderRadius: "10px", border: "1px solid #e5e7eb" }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
