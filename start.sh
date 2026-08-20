#!/usr/bin/env bash
# Manim Blocks — 一键启动：Web GUI + 渲染服务器
set -e

echo "╔══════════════════════════════════════════════╗"
echo "║     Manim Blocks — 搭积木 → 看动画           ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# 启动渲染服务器（后台）
echo "📡 启动渲染服务器 (port 3081)..."
python3 render_server.py &
RENDER_PID=$!
echo "   PID: $RENDER_PID"

# 启动 Web GUI（前台，按 Ctrl+C 同时退出）
echo "🌐 启动 Web GUI (port 3080)..."
echo ""
echo "   ⏩ 打开浏览器: http://127.0.0.1:3080"
echo "   🧩 搭好积木后点「▶ 运行」一键渲染"
echo ""

# 清理后台进程
cleanup() {
  echo ""
  echo "🛑 正在关闭..."
  kill $RENDER_PID 2>/dev/null || true
  exit 0
}
trap cleanup SIGINT SIGTERM

pnpm dev --host 2>&1
cleanup