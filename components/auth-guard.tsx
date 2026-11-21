"use client";
import { useEffect, useState } from "react";

export default function AuthGuard({ children, adminPath }: { children: React.ReactNode; adminPath?: boolean }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    // Login pages don't need auth
    if (path === "/login" || path === "/admin/login") {
      setAuthed(true);
      setReady(true);
      return;
    }

    if (adminPath) {
      const a = localStorage.getItem("wb_admin_auth");
      if (!a) {
        window.location.href = "/admin/login";
        return;
      }
      setAuthed(true);
    } else {
      const a = localStorage.getItem("wb_auth");
      if (!a) {
        window.location.href = "/login";
        return;
      }
      setAuthed(true);
    }
    setReady(true);
  }, [adminPath]);

  if (!ready) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif", color: "#9ca3af", fontSize: "14px" }}>
        验证登录中...
      </div>
    );
  }

  return <>{authed ? children : null}</>;
}
