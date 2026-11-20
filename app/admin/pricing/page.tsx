"use client";
import { useState } from "react";

const initialPrices = {
  image: [
    { id: "banana-flash", name: "Banana Flash", cost: "¥0.02", price: "¥0.04", margin: "100%" },
    { id: "banana-2.1", name: "Banana 2.1", cost: "¥0.05", price: "¥0.10", margin: "100%" },
    { id: "flare-1k", name: "Flare 1K", cost: "¥0.02", price: "¥0.04", margin: "100%" },
    { id: "sunburst", name: "Sunburst", cost: "¥0.065", price: "¥0.13", margin: "100%" },
  ],
  video: [
    { id: "seedance-720", name: "Seedance 2.0 720P", cost: "¥0.70", price: "¥1.40", margin: "100%" },
    { id: "minimax-768", name: "MiniMax H3 768P", cost: "¥0.15/秒", price: "¥0.30/秒", margin: "100%" },
    { id: "omni-flash", name: "Omni Flash 720P", cost: "¥0.30", price: "¥0.60", margin: "100%" },
  ],
  llm: [
    { id: "deepseek", name: "DeepSeek V4.1", cost: "¥0.001/次", price: "¥0.002/次", margin: "100%" },
    { id: "storyboard", name: "分镜拆解", cost: "¥1.00", price: "¥2.00", margin: "100%" },
    { id: "reverse", name: "提示词反推", cost: "¥0.50", price: "¥1.00", margin: "100%" },
  ],
};

export default function PricingPage() {
  const [prices] = useState(initialPrices);

  return (
    <div>
      <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 700 }}>💰 价格配置</h1>
      <p style={{ margin: "8px 0 24px", color: "#6b7280" }}>配置各模型的售价（售价 = 成本 x 2）</p>

      {[
        { key: "image" as const, title: "🎨 图片模型", data: prices.image },
        { key: "video" as const, title: "🎬 视频模型", data: prices.video },
        { key: "llm" as const, title: "💬 AI 对话 / 工具", data: prices.llm },
      ].map((section) => (
        <div key={section.key} style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "20px" }}>
          <h3 style={{ margin: "0 0 18px", fontSize: "16px", fontWeight: 600 }}>{section.title}</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr>
                {["模型", "成本", "售价", "利润率", "操作"].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 500, color: "#6b7280", fontSize: "12px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.data.map((item) => (
                <tr key={item.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px" }}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "monospace" }}>{item.id}</div>
                  </td>
                  <td style={{ padding: "12px", color: "#6b7280" }}>{item.cost}</td>
                  <td style={{ padding: "12px" }}>
                    <input defaultValue={item.price} style={{ width: "100px", padding: "6px 10px", borderRadius: "6px", border: "1px solid #e5e7eb", fontSize: "13px", fontWeight: 600, color: "#7c3aed" }} />
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", background: "#d1fae5", color: "#065f46", fontWeight: 500 }}>{item.margin}</span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <button style={{ padding: "6px 16px", borderRadius: "6px", border: "none", background: "#7c3aed", color: "#fff", fontSize: "12px", fontWeight: 500, cursor: "pointer" }}>保存</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
