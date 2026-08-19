/**
 * Manim Blocks —— 主入口 (v3 · Scratch 风格 UI)
 *
 * 1. 注册 Blockly 积木 + 工具箱
 * 2. 注入工作区（zelos 渲染器 + 中文界面）
 * 3. 积木变更 → 自动生成 Python 代码 → 高亮预览
 * 4. 下载 / 复制运行命令 / 清空按钮
 * 5. 标签切换（代码预览 / 快速开始）
 * 6. 安装脚本下载
 */

import * as Blockly from 'blockly';
import * as ZhHans from 'blockly/msg/zh-hans';
Blockly.setLocale(ZhHans);
import { blockDefs } from './blocks.js';
import { toolboxJson } from './toolbox.js';
import { generateCode } from './generator.js';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('python', python);

// ── 注册积木 ──────────────────────────────────────────

Blockly.common.defineBlocksWithJsonArray(blockDefs);

// ── 注入工作区 ─────────────────────────────────────────

const workspace = Blockly.inject('blocklyDiv', {
  toolbox: toolboxJson,
  renderer: 'zelos',
  grid: {
    spacing: 20,
    length: 3,
    colour: '#d0d0d0',
    snap: false,
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
  },
  trashcan: true,
  move: {
    scrollbars: true,
    drag: true,
    wheel: true,
  },
  // 关闭右上角的帮助问号
  readOnly: false,
});

// ── 代码预览 ──────────────────────────────────────────

const previewEl = document.getElementById('codePreview');

function updatePreview() {
  const code = generateCode(workspace);
  const highlighted = hljs.highlight(code, { language: 'python' }).value;
  previewEl.innerHTML = `<code class="hljs language-python">${highlighted}</code>`;
}

// 积木变化时刷新预览（防抖 300ms）
let previewTimer = null;
workspace.addChangeListener(() => {
  if (previewTimer) clearTimeout(previewTimer);
  previewTimer = setTimeout(updatePreview, 300);
});

// 初始预览
updatePreview();

// ── 标签切换 ──────────────────────────────────────────

document.querySelectorAll('.panel-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // 切换 tab 样式
    document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    // 切换内容
    const target = tab.dataset.tab;
    document.querySelectorAll('.panel-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`tab-${target}`).classList.add('active');

    // 切换到预览时刷新
    if (target === 'preview') updatePreview();
  });
});

// ── 下载 .py 文件 ─────────────────────────────────────

document.getElementById('downloadBtn').addEventListener('click', () => {
  const code = generateCode(workspace);
  const blob = new Blob([code], { type: 'text/x-python' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'manim_scene.py';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// ── 复制 Python 代码 ─────────────────────────────────

document.getElementById('copyCodeBtn').addEventListener('click', async () => {
  const code = generateCode(workspace);
  try {
    await navigator.clipboard.writeText(code);
    const btn = document.getElementById('copyCodeBtn');
    const orig = btn.textContent;
    btn.textContent = '✅ 已复制';
    setTimeout(() => (btn.textContent = orig), 2000);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = code;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
});

// ── 复制运行命令 ─────────────────────────────────────

document.getElementById('runBtn').addEventListener('click', async () => {
  const cmd = 'manim -pql manim_scene.py MyScene';
  try {
    await navigator.clipboard.writeText(cmd);
    const btn = document.getElementById('runBtn');
    const orig = btn.textContent;
    btn.textContent = '✅ 命令已复制';
    setTimeout(() => (btn.textContent = orig), 2500);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = cmd;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
});

// ── 清空工作区 ────────────────────────────────────────

document.getElementById('clearBtn').addEventListener('click', () => {
  if (workspace.getTopBlocks(true).length === 0) return;
  if (confirm('确定清空所有积木？')) {
    workspace.clear();
  }
});

// ── 内联复制 (快速开始面板) ──────────────────────────

document.querySelectorAll('.copy-inline').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      const orig = btn.textContent;
      btn.textContent = '✅ 已复制';
      setTimeout(() => (btn.textContent = orig), 1800);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  });
});

// ── 下载安装脚本 ────────────────────────────────────

/** 生成并下载 macOS/Linux 安装脚本 */
function downloadShellScript() {
  const content = `#!/usr/bin/env bash
# Manim Blocks — 一键安装脚本 (macOS / Linux)
# 自动安装 Python3 + pip + manim + FFmpeg

set -e

echo "🧊 Manim Blocks — 安装 Manim 动画引擎"
echo "========================================"

# 检查 Python
if command -v python3 &>/dev/null; then
    echo "✅ Python3 已安装: $(python3 --version)"
else
    echo "📦 正在安装 Python3…"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &>/dev/null; then
            brew install python3
        else
            echo "❌ 请先安装 Homebrew: https://brew.sh"
            echo "   或从 https://www.python.org/downloads/ 下载"
            exit 1
        fi
    else
        # Linux
        sudo apt-get update -qq
        sudo apt-get install -y -qq python3 python3-pip
    fi
fi

# 检查 FFmpeg
if command -v ffmpeg &>/dev/null; then
    echo "✅ FFmpeg 已安装"
else
    echo "📦 正在安装 FFmpeg…"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install ffmpeg
    else
        sudo apt-get install -y -qq ffmpeg
    fi
fi

# 安装 LaTeX（可选，用于公式）
echo ""
echo "📦 正在安装 Manim…"
python3 -m pip install --upgrade pip -q
python3 -m pip install manim -q

echo ""
echo "🎉 安装完成！"
echo ""
echo "测试运行:  manim -pql manim_scene.py MyScene"
echo ""
echo "打开浏览器使用:  https://kaoyusiliao.github.io/manim-blocks/"
`;

  const blob = new Blob([content], { type: 'application/x-sh' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'install_manim.sh';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** 生成并下载 Windows 安装脚本 */
function downloadBatchScript() {
  const content = `@echo off
REM Manim Blocks — 一键安装脚本 (Windows)
REM 自动安装 Python + pip + manim + FFmpeg

echo 🧊 Manim Blocks — 安装 Manim 动画引擎
echo ========================================

REM 检查 Python
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Python 已安装
) else (
    echo 📦 请从 https://www.python.org/downloads/ 下载 Python 3.8+
    echo    安装时务必勾选 "Add Python to PATH"
    pause
    start https://www.python.org/downloads/
    exit /b 1
)

REM 检查 FFmpeg
ffmpeg -version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ FFmpeg 已安装
) else (
    echo 📦 正在安装 FFmpeg…
    winget install FFmpeg 2>nul || (
        echo ❌ 自动安装失败，请手动下载:
        echo    https://ffmpeg.org/download.html
        echo    或将 ffmpeg.exe 放入 PATH
    )
)

echo 📦 正在安装 Manim…
python -m pip install --upgrade pip -q
python -m pip install manim -q

echo.
echo 🎉 安装完成！
echo.
echo 测试运行:  manim -pql manim_scene.py MyScene
echo.
echo 打开浏览器使用:  https://kaoyusiliao.github.io/manim-blocks/
pause
`;

  const blob = new Blob([content], { type: 'application/x-bat' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'install_manim.bat';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.getElementById('downloadScriptBtn').addEventListener('click', downloadShellScript);
document.getElementById('downloadScriptWinBtn').addEventListener('click', downloadBatchScript);