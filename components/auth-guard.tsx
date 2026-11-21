"use client";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    const adminPage = path.startsWith("/admin");
    setIsAdmin(adminPage);

    // Login pages always accessible
    if (path === "/login" || path === "/admin/login") {
      setAuthed(true);
      setReady(true);
      return;
    }

    if (adminPage) {
      const a = localStorage.getItem("wb_admin_auth");
      if (!a) { window.location.href = "/admin/login"; return; }
      setAuthed(true);
      setReady(true);
      return;
    }

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

export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setIsAdmin(window.location.pathname.startsWith("/admin"));
  }, []);
  return isAdmin;
}
