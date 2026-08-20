#!/usr/bin/env bash
# Manim Blocks 启动器
# 双击此文件即可启动 Web GUI + 渲染服务器
# 会自动找到项目文件夹位置，无需手动 cd

cd "$(dirname "$0")"
echo "╔══════════════════════════════════════════════╗"
echo "║     Manim Blocks — 搭积木 → 看动画           ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "  正在启动..."
echo "  浏览器打开后，搭好积木点「▶ 运行」一键渲染"
echo "  关闭此窗口 = 退出"
echo ""

pnpm dev