export default function AssetsPage() {
  return (
    <div>
      <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>📁 素材库</h1>
      <p style={{ margin: "8px 0 24px", color: "#6b7280" }}>管理你的图片、视频和音频素材</p>
      <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {["全部", "图片", "视频", "音频"].map((tab, i) => (
            <button key={tab} style={{ padding: "8px 20px", borderRadius: "10px", border: "none", background: i === 0 ? "linear-gradient(135deg, #7c3aed, #6366f1)" : "#f3f4f6", color: i === 0 ? "#fff" : "#6b7280", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>{tab}</button>
          ))}
        </div>
        <div style={{ textAlign: "center", padding: "80px 20px", color: "#c0c4cc" }}>
          <div style={{ fontSize: "56px", marginBottom: "12px" }}>📁</div>
          <p style={{ margin: 0, fontSize: "16px" }}>暂无素材</p>
          <p style={{ margin: "8px 0 0", fontSize: "13px" }}>生成的图片和视频会自动保存到这里</p>
        </div>
      </div>
    </div>
  );
}
