import type { Metadata } from "next";
import "./globals.css";
import ClientShell from "@/components/client-shell";

export const metadata: Metadata = {
  title: "爆款工作台 - AI 电商创作平台",
  description: "AI 图片生成、视频制作、短剧分镜、一站式创作",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, padding: 0, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif", background: "#f8f9fc", color: "#1a1a2e", height: "100vh", overflow: "hidden" }}>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
