"use client";
import { useState, useEffect } from "react";

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newImageQuota, setNewImageQuota] = useState(100);
  const [newVideoQuota, setNewVideoQuota] = useState(10);

  useEffect(() => {
    fetch("/api/admin/keys").then((r) => r.json()).then((d) => { if (d.success) setKeys(d.keys); });
  }, []);

  const handleCreate = async () => {
    const resp = await fetch("/api/admin/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create", name: newName, imageQuota: newImageQuota, videoQuota: newVideoQuota }),
    });
    const data = await resp.json();
    if (data.success) {
      setKeys((prev) => [...prev, data.key]);
      setShowCreate(false);
      setNewName("");
    }
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    });
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 700 }}>🔑 API Key 管理</h1>
          <p style={{ margin: "8px 0 0", color: "#6b7280" }}>创建和管理 API Key，设置每个 Key 的使用额度</p>
        </div>
        <button onClick={() => setShowCreate(true)} style={{ padding: "10px 24px", borderRadius: "10px", border: "none", background: "#7c3aed", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>+ 创建 API Key</button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "20px" }}>
          <h3 style={{ margin: "0 0 18px", fontSize: "16px", fontWeight: 600 }}>创建新 API Key</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "12px", alignItems: "end" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#6b7280", marginBottom: "6px" }}>名称</label>
              <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="客户名称" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#6b7280", marginBottom: "6px" }}>图片额度（张）</label>
              <input value={newImageQuota} onChange={(e) => setNewImageQuota(Number(e.target.value))} type="number" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#6b7280", marginBottom: "6px" }}>视频额度（条）</label>
              <input value={newVideoQuota} onChange={(e) => setNewVideoQuota(Number(e.target.value))} type="number" style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px", boxSizing: "border-box" }} />
            </div>
            <button onClick={handleCreate} style={{ padding: "10px 24px", borderRadius: "8px", border: "none", background: "#7c3aed", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>创建</button>
          </div>
        </div>
      )}

      {/* Keys table */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {["名称", "API Key", "图片额度", "视频额度", "已用图片", "已用视频", "状态", "操作"].map((h) => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontWeight: 500, color: "#6b7280", fontSize: "12px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {keys.length === 0 ? (
              <tr><td colSpan={8} style={{ padding: "40px", textAlign: "center", color: "#c0c4cc" }}>暂无 API Key，点击右上角创建</td></tr>
            ) : keys.map((k) => (
              <tr key={k.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                <td style={{ padding: "14px 16px", fontWeight: 600 }}>{k.name}</td>
                <td style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: "11px", color: "#7c3aed" }}>{k.key}</td>
                <td style={{ padding: "14px 16px" }}>{k.imageQuota} 张</td>
                <td style={{ padding: "14px 16px" }}>{k.videoQuota} 条</td>
                <td style={{ padding: "14px 16px" }}>{k.imageUsed} / {k.imageQuota}</td>
                <td style={{ padding: "14px 16px" }}>{k.videoUsed} / {k.videoQuota}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", background: "#d1fae5", color: "#065f46", fontWeight: 500 }}>启用</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <button onClick={() => handleDelete(k.id)} style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #fca5a5", background: "#fff", color: "#dc2626", fontSize: "12px", cursor: "pointer" }}>删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
