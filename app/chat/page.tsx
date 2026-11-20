"use client";
import { useState, useRef, useEffect } from "react";

interface Message { role: "user" | "assistant"; content: string; }

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, model: "deepseek" }),
      });
      const data = await resp.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.success ? data.reply : "出错了：" + (data.error || "请重试") }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "网络错误，请重试" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 100px)" }}>
      <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>💬 AI 对话</h1>
      <p style={{ margin: "8px 0 20px", color: "#6b7280" }}>选择模型，直接和 AI 聊天</p>

      <div style={{ flex: 1, background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "#c0c4cc" }}>
              <div style={{ fontSize: "56px", marginBottom: "12px" }}>💬</div>
              <p style={{ margin: 0, fontSize: "16px" }}>开始和 AI 对话吧</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: "16px", display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: "14px", background: msg.role === "user" ? "linear-gradient(135deg, #7c3aed, #6366f1)" : "#f3f4f6", color: msg.role === "user" ? "#fff" : "#1a1a2e", fontSize: "14px", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {loading && <div style={{ color: "#9ca3af", fontSize: "14px" }}>AI 正在思考...</div>}
          <div ref={bottomRef} />
        </div>
        <div style={{ padding: "16px", borderTop: "1px solid #e5e7eb", display: "flex", gap: "10px" }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="输入消息..." style={{ flex: 1, padding: "12px 16px", borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "14px", outline: "none" }} />
          <button onClick={handleSend} disabled={loading} style={{ padding: "12px 24px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #7c3aed, #6366f1)", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>发送</button>
        </div>
      </div>
    </div>
  );
}
