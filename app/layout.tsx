import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "爆款工作台 — AI 电商创作平台",
  description: "AI 图片生成 · 视频制作 · 短剧分镜 · 一站式创作",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className="w-60 flex flex-col border-r bg-gray-50/80">
            {/* Logo */}
            <div className="px-5 py-5">
              <h1 className="text-xl font-bold">
                <span className="gradient-text">🔥 爆款工作台</span>
              </h1>
              <p className="text-xs text-gray-500 mt-1">AI 电商创作平台 v2.0</p>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 space-y-1">
              <a href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-900 bg-white shadow-sm">
                <span>📊</span> 概览
              </a>
              <a href="/chat" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all">
                <span>💬</span> AI 对话
              </a>
              <a href="/image" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all">
                <span>🎨</span> 图片工作台
              </a>
              <a href="/video" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all">
                <span>🎬</span> 视频工作台
              </a>
              <a href="/storyboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all">
                <span>🎞️</span> 分镜工作台
              </a>
              <a href="/reverse" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all">
                <span>🔍</span> 提示词反推
              </a>
              <a href="/assets" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all">
                <span>📁</span> 素材库
              </a>

              <div className="h-px bg-gray-200 my-4" />

              <a href="/wallet" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all">
                <span>💰</span> 钱包 / 额度
              </a>
              <a href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all">
                <span>⚙️</span> 设置
              </a>
            </nav>

            {/* User */}
            <div className="px-5 py-4 border-t bg-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
                  U
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-gray-900">用户</p>
                  <p className="text-xs text-gray-500">剩余 <span className="text-violet-600 font-semibold">128</span> 张</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 overflow-y-auto bg-gray-50/50">
            <div className="p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
