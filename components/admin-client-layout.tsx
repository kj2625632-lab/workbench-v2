"use client";
import AuthGuard from "@/components/auth-guard";

export default function AdminClientLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard adminPath>{children}</AuthGuard>;
}
