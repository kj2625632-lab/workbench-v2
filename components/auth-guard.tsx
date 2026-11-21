"use client";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    // Login pages always accessible
    if (path === "/login" || path === "/admin/login") {
      setAuthed(true);
      setReady(true);
      return;
    }
    // Admin pages check admin auth
    if (path.startsWith("/admin")) {
      const a = localStorage.getItem("wb_admin_auth");
      if (!a) { window.location.href = "/admin/login"; return; }
      setAuthed(true);
      setReady(true);
      return;
    }
    // Frontend pages check user auth
    const a = localStorage.getItem("wb_auth");
    if (!a) { window.location.href = "/login"; return; }
    setAuthed(true);
    setReady(true);
  }, []);

  if (!ready) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "-apple-system, sans-serif", color: "#9ca3af", fontSize: "14px" }}>验证登录中...</div>;
  }
  return <>{authed ? children : null}</>;
}
