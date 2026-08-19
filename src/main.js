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

// ════════════════════════════════════════════════════
// 小白友好功能：示例模板 / 空白提示 / 系统检测 / 模态框
// ════════════════════════════════════════════════════

// ── 空白工作区提示 ──────────────────────────────────

const emptyHint = document.getElementById('emptyHint');
const emptyHintTitle = emptyHint.querySelector('h3');
const emptyHintDesc = emptyHint.querySelector('p');
const emptyHintBtn = document.getElementById('loadFirstExample');

function updateEmptyHint() {
  const topBlocks = workspace.getTopBlocks(true);

  if (topBlocks.length === 0) {
    // 完全空白 → 默认引导
    emptyHintTitle.textContent = '从左边拖积木到这里开始';
    emptyHintDesc.innerHTML = `试试这样：<br/>
      <span class="hint-steps">1️⃣ 点左侧「🔵 物体」→ 拖「创建圆形」到这里<br/>
      2️⃣ 再拖一个「🟠 动画」→「创建动画」<b>接在圆形下面</b><br/>
      3️⃣ 右边立刻显示生成的代码！</span>`;
    emptyHintBtn.style.display = '';
    emptyHint.classList.remove('hidden');
    return;
  }

  // 有积木：检查是否有「咬合的链」
  const chainHeads = topBlocks.filter(b => b.getNextBlock());
  if (chainHeads.length === 0) {
    // 有积木但都没咬合 → 提示接起来
    emptyHintTitle.textContent = '🧩 把积木上下拼在一起';
    emptyHintDesc.innerHTML = `<span class="hint-steps">
      积木要像乐高一样<b>上下拼接</b>才会成为程序。<br/>
      把上面的积木拖到另一个积木的下面，出现凹槽对齐后松手。<br/><br/>
      💡 或者点「🧩 示例」一键加载拼好的作品。</span>`;
    emptyHintBtn.style.display = 'none';
    emptyHint.classList.remove('hidden');
  } else {
    emptyHint.classList.add('hidden');
  }
}

// 在 changeListener 里也调用
workspace.addChangeListener(updateEmptyHint);
updateEmptyHint();

document.getElementById('loadFirstExample').addEventListener('click', () => {
  loadExample(0);
});

// ── 示例模板库 ──────────────────────────────────────

/**
 * 示例模板：每个示例包含一个 XML 积木定义。
 * 用 Blockly.utils.xml.textToDom 解析后加载到工作区。
 */
const EXAMPLES = [
  {
    name: '✨ 第一个动画',
    emoji: '🌈',
    desc: '一个红色圆形从中心出现 —— 最简入门',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_circle" x="30" y="30">
<field name="VAR">circle</field><field name="X">0</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">circle</field><field name="COLOR">RED</field><next>
<block type="animate_create">
<field name="VAR">circle</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next>
</block>
</next>
</block>
</next>
</block>
</xml>`,
  },
  {
    name: '📐 公式书写',
    emoji: '∑',
    desc: '爱因斯坦公式逐字写出，像老师板书',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_math_tex" x="30" y="30">
<field name="VAR">formula</field><field name="TEX">E = mc^2</field><field name="X">0</field><field name="Y">1</field><next>
<block type="property_color">
<field name="VAR">formula</field><field name="COLOR">YELLOW</field><next>
<block type="animate_write">
<field name="VAR">formula</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next>
</block>
</next>
</block>
</next>
</block>
</xml>`,
  },
  {
    name: '🔁 旋转星形',
    emoji: '⭐',
    desc: '五角星重复旋转 5 次 —— 学会「重复」积木',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_star" x="30" y="30">
<field name="VAR">star</field><field name="R">2</field><field name="X">0</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">star</field><field name="COLOR">ORANGE</field><next>
<block type="animate_create">
<field name="VAR">star</field><next>
<block type="control_repeat">
<field name="TIMES">5</field><statement name="DO">
<block type="animate_rotate">
<field name="VAR">star</field><field name="ANGLE">72</field></block>
</statement><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next>
</block>
</next>
</block>
</next>
</block>
</next>
</block>
</xml>`,
  },
  {
    name: '🧊 3D 立方体',
    emoji: '🧊',
    desc: '三维立方体旋转展示 —— 自动启用 3D 场景',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="camera_3d_orientation" x="30" y="30">
<field name="PHI">75</field><field name="THETA">-45</field><next>
<block type="object3d_cube">
<field name="VAR">cube</field><field name="L">2</field><field name="X">0</field><field name="Y">0</field><field name="Z">0</field><next>
<block type="property_color">
<field name="VAR">cube</field><field name="COLOR">BLUE</field><next>
<block type="animate_create">
<field name="VAR">cube</field><next>
<block type="animate_rotating">
<field name="VAR">cube</field><field name="ANGLE">360</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next>
</block>
</next>
</block>
</next>
</block>
</next>
</block>
</xml>`,
  },
  {
    name: '📊 函数曲线',
    emoji: '📈',
    desc: '坐标轴上画 x² 抛物线 + 网格平面',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_number_plane" x="30" y="30">
<field name="VAR">plane</field><field name="XMIN">-4</field><field name="XMAX">4</field><field name="YMIN">-1</field><field name="YMAX">5</field><field name="X">0</field><field name="Y">0</field><next>
<block type="object_axes">
<field name="VAR">axes</field><field name="XMIN">-4</field><field name="XMAX">4</field><field name="YMIN">-1</field><field name="YMAX">5</field><next>
<block type="object_graph">
<field name="AXES">axes</field><field name="VAR">graph</field><field name="FUNC">x**2</field><next>
<block type="scene_add">
<field name="VAR">plane</field><next>
<block type="scene_add">
<field name="VAR">axes</field><next>
<block type="animate_create">
<field name="VAR">graph</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next>
</block>
</next>
</block>
</next>
</block>
</next>
</block>
</next>
</block>
</next>
</block>
</xml>`,
  },
  {
    name: '💬 文字动画',
    emoji: '🎨',
    desc: '彩色文字 + 字母逐个平滑淡入 + 淡出',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_text" x="30" y="30">
<field name="VAR">text</field><field name="CONTENT">Hello, Manim!</field><field name="X">0</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">text</field><field name="COLOR">PURPLE</field><next>
<block type="animate_fade_in_letters">
<field name="VAR">text</field><field name="RATIO">0.5</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_shift">
<field name="VAR">text</field><field name="DX">2</field><field name="DY">1</field><next>
<block type="animate_fade_out">
<field name="VAR">text</field></block>
</next>
</block>
</next>
</block>
</next>
</block>
</next>
</block>
</next>
</block>
</xml>`,
  },
  {
    name: '🎯 变形动画',
    emoji: '🔄',
    desc: '圆形平滑变形为正方形 —— Transform 积木',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_circle" x="30" y="30">
<field name="VAR">circle</field><field name="X">-2</field><field name="Y">0</field><next>
<block type="object_square">
<field name="VAR">square</field><field name="X">2</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">circle</field><field name="COLOR">RED</field><next>
<block type="property_color">
<field name="VAR">square</field><field name="COLOR">BLUE</field><next>
<block type="animate_create">
<field name="VAR">circle</field><next>
<block type="animate_create">
<field name="VAR">square</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_transform">
<field name="OBJ">circle</field><field name="TARGET">square</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next>
</block>
</next>
</block>
</next>
</block>
</next>
</block>
</next>
</block>
</next>
</block>
</next>
</block>
</next>
</block>
</xml>`,
  },
];

/** 加载示例到工作区 */
function loadExample(index) {
  const example = EXAMPLES[index];
  if (!example) return;

  // 清空工作区
  workspace.clear();

  // 解析 XML 并加载
  const dom = Blockly.utils.xml.textToDom(example.xml);
  Blockly.Xml.domToWorkspace(dom, workspace);

  // 收起模态框
  document.getElementById('examplesModal').classList.add('hidden');
  updateEmptyHint();
  updatePreview();

  // 提示用户
  const btn = document.getElementById('examplesBtn');
  const orig = btn.textContent;
  btn.textContent = `✅ 已加载「${example.name}」`;
  setTimeout(() => (btn.textContent = orig), 2500);
}

// ── 示例模态框 ──────────────────────────────────────

const examplesModal = document.getElementById('examplesModal');
const examplesGrid = document.getElementById('examplesGrid');

// 生成示例卡片
EXAMPLES.forEach((ex, i) => {
  const card = document.createElement('button');
  card.className = 'example-card';
  card.innerHTML = `
    <div class="example-emoji">${ex.emoji}</div>
    <div class="example-name">${ex.name}</div>
    <div class="example-desc">${ex.desc}</div>
  `;
  card.addEventListener('click', () => loadExample(i));
  examplesGrid.appendChild(card);
});

document.getElementById('examplesBtn').addEventListener('click', () => {
  examplesModal.classList.remove('hidden');
});

// 关闭模态框（点背景或 ✕）
document.querySelectorAll('[data-close-modal]').forEach(el => {
  el.addEventListener('click', () => examplesModal.classList.add('hidden'));
});

// ── 系统检测（新手教程第 0 步） ──────────────────────

// 自动检测系统并高亮对应按钮
(function detectSystem() {
  const ua = navigator.userAgent;
  let sys = null;
  if (/Mac|iPhone|iPad/.test(ua)) sys = 'mac';
  else if (/Windows/.test(ua)) sys = 'win';

  if (sys) {
    const btn = document.querySelector(`.sys-btn[data-sys="${sys}"]`);
    if (btn) btn.classList.add('sys-active');
    // 默认展开对应系统的 details
    const summary = document.querySelector(`.sys-btn[data-sys="${sys}"]`);
    if (summary) {
      // 找到最近的 details 并展开
    }
  }
})();

// 用户手动选择系统时高亮并记住
document.querySelectorAll('.sys-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sys-btn').forEach(b => b.classList.remove('sys-active'));
    btn.classList.add('sys-active');
    const sys = btn.dataset.sys;
    try { localStorage.setItem('manim-blocks-sys', sys); } catch (e) {}
    // 展开第一个对应系统的 details
    const dets = document.querySelectorAll('.guide-det');
    dets.forEach(d => {
      const s = d.querySelector('summary');
      if (s && s.textContent.includes(sys === 'mac' ? 'Mac' : 'Windows')) {
        d.open = true;
      }
    });
  });
});

// 恢复用户上次选择
try {
  const saved = localStorage.getItem('manim-blocks-sys');
  if (saved) {
    const btn = document.querySelector(`.sys-btn[data-sys="${saved}"]`);
    if (btn) btn.click();
  }
} catch (e) {}