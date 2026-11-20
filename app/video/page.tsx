export default function VideoPage() {
  return (
    <div>
      <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>🎬 视频工作台</h1>
      <p style={{ margin: "8px 0 24px", color: "#6b7280" }}>文生视频 / 图生视频，AI 一键生成</p>
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "24px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 600 }}>生成设置</h3>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#4b5563", marginBottom: "6px" }}>视频描述</label>
          <textarea placeholder="描述你想要的视频内容...&#10;&#10;例：产品展示视频，一瓶护肤精华液在大理石台面上缓慢旋转，柔和光线变化" style={{ width: "100%", minHeight: "120px", padding: "12px", borderRadius: "10px", border: "1px solid #e5e7eb", fontSize: "14px", resize: "vertical", boxSizing: "border-box" }} />
          <div style={{ marginTop: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#4b5563", marginBottom: "6px" }}>模型</label>
            {["Seedance 2.0 720P - ¥1.4/条", "MiniMax H3 768P - ¥0.3/秒", "Omni Flash 720P - ¥0.6/条"].map((m, i) => (
              <div key={i} style={{ padding: "12px", borderRadius: "10px", border: `1px solid ${i === 0 ? "#7c3aed" : "#e5e7eb"}`, marginBottom: "8px", cursor: "pointer", background: i === 0 ? "#f5f3ff" : "#fff", fontSize: "14px" }}>{m}</div>
            ))}
          </div>
          <button style={{ width: "100%", padding: "14px", marginTop: "16px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #7c3aed, #6366f1)", color: "#fff", fontSize: "16px", fontWeight: 600, cursor: "pointer" }}>🎬 生成视频</button>
        </div>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 600 }}>生成结果</h3>
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#c0c4cc" }}>
            <div style={{ fontSize: "56px", marginBottom: "12px" }}>🎬</div>
            <p style={{ margin: 0, fontSize: "16px" }}>填写左侧描述，点击「生成视频」开始创作</p>
            <p style={{ margin: "8px 0 0", fontSize: "13px" }}>视频生成约需 2-5 分钟</p>
          </div>
        </div>
      </div>
    </div>
  );
}
