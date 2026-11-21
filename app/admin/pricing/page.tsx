"use client";
import { useState, useEffect } from "react";

export default function AdminPricingPage() {
  const [pricing, setPricing] = useState<any>({});
  const [msg, setMsg] = useState("");

  useEffect(() => { fetch("/api/admin/pricing").then((r) => r.json()).then((d) => { if (d.success) setPricing(d.pricing); }); }, []);

  const save = async (category: string, id: string, price: number) => {
    const r = await fetch("/api/admin/pricing", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category, id, price }) });
    const d = await r.json();
    if (d.success) { setMsg("已保存: " + id + " → ¥" + price); setTimeout(() => setMsg(""), 2000); }
    else setMsg(d.error || "保存失败");
  };

  const sections = [
    { key: "image", title: "🎨 图片模型" },
    { key: "video", title: "🎬 视频模型" },
    { key: "llm", title: "💬 AI 对话/工具" },
  ];

  return (
    <div>
      <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 700 }}>💰 价格配置</h1>
      <p style={{ margin: "8px 0 24px", color: "#6b7280" }}>配置各模型售价，修改后点击保存生效</p>
      {msg && <div style={{ padding: "10px 16px", borderRadius: "8px", background: msg.includes("失败") ? "#fef2f2" : "#d1fae5", color: msg.includes("失败") ? "#dc2626" : "#065f46", marginBottom: "16px" }}>{msg}</div>}
      {sections.map((s) => (
        <div key={s.key} style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "20px" }}>
          <h3 style={{ margin: "0 0 18px", fontSize: "16px", fontWeight: 600 }}>{s.title}</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead><tr>{["模型", "成本", "售价", "利润率", "操作"].map((h) => (<th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 500, color: "#6b7280", fontSize: "12px" }}>{h}</th>))}</tr></thead>
            <tbody>
              {(pricing[s.key] || []).map((item: any) => (
                <PriceRow key={item.id} item={item} category={s.key} onSave={save} />
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function PriceRow({ item, category, onSave }: any) {
  const [price, setPrice] = useState(item.price);
  const margin = item.cost > 0 ? Math.round(((price - item.cost) / item.cost) * 100) : 0;
  return (
    <tr style={{ borderTop: "1px solid #f3f4f6" }}>
      <td style={{ padding: "12px" }}><div style={{ fontWeight: 600 }}>{item.name}</div><div style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "monospace" }}>{item.id}</div></td>
      <td style={{ padding: "12px", color: "#6b7280" }}>¥{item.cost}</td>
      <td style={{ padding: "12px" }}><input value={price} onChange={(e) => setPrice(Number(e.target.value))} type="number" step="0.01" style={{ width: "90px", padding: "6px 10px", borderRadius: "6px", border: "1px solid #e5e7eb", fontSize: "13px", fontWeight: 600, color: "#7c3aed" }} /></td>
      <td style={{ padding: "12px" }}><span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", background: "#d1fae5", color: "#065f46", fontWeight: 500 }}>{margin}%</span></td>
      <td style={{ padding: "12px" }}><button onClick={() => onSave(category, item.id, price)} style={{ padding: "6px 16px", borderRadius: "6px", border: "none", background: "#7c3aed", color: "#fff", fontSize: "12px", fontWeight: 500, cursor: "pointer" }}>保存</button></td>
    </tr>
  );
}
