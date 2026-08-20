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
import { procedures as procBlocks } from 'blockly/blocks';
import { blockDefs } from './blocks.js';
import { toolboxJson } from './toolbox.js';
import { generateCode } from './generator.js';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('python', python);

// ── 注册积木 ──────────────────────────────────────────

Blockly.common.defineBlocksWithJsonArray(blockDefs);
// 注册内置「自制积木」过程块（procedures_defnoreturn 等）
Blockly.common.defineBlocks(procBlocks.blocks);

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

// ── 🔍 积木搜索 ──────────────────────────────────────

// 从 blockDefs 构建 type → 中文显示名 映射（去掉 %1 占位符）
const blockNameMap = new Map();
for (const def of blockDefs) {
  if (def.message0) {
    const name = def.message0.replace(/%\d+/g, '').trim();
    blockNameMap.set(def.type, name);
  }
}
// 补充内置过程块
blockNameMap.set('procedures_defnoreturn', '自制积木（定义）');
blockNameMap.set('procedures_callnoreturn', '自制积木（调用）');

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (q.length < 1) {
    searchResults.classList.add('hidden');
    return;
  }
  // 匹配积木名（含 type 关键字）
  const matches = [];
  for (const [type, name] of blockNameMap) {
    if (name.toLowerCase().includes(q) || type.toLowerCase().includes(q)) {
      matches.push({ type, name });
    }
  }
  // 按名称排序，最多显示 12 个
  matches.sort((a, b) => a.name.localeCompare(b.name, 'zh'));
  renderSearchResults(matches.slice(0, 12));
});

function renderSearchResults(matches) {
  if (matches.length === 0) {
    searchResults.innerHTML = '<div class="search-empty">没有找到匹配的积木</div>';
    searchResults.classList.remove('hidden');
    return;
  }
  searchResults.innerHTML = '';
  for (const m of matches) {
    const item = document.createElement('button');
    item.className = 'search-item';
    item.textContent = m.name;
    item.addEventListener('click', () => {
      addBlockToWorkspace(m.type);
      searchInput.value = '';
      searchResults.classList.add('hidden');
    });
    searchResults.appendChild(item);
  }
  searchResults.classList.remove('hidden');
}

/** 创建一个积木放到工作区（自动避开已有积木） */
function addBlockToWorkspace(type) {
  const block = workspace.newBlock(type);
  block.initSvg();
  // 放置到工作区右下侧（避免和现有积木重叠）
  const metrics = workspace.getMetrics();
  const topBlocks = workspace.getTopBlocks(false);
  const y = topBlocks.length > 0
    ? topBlocks[topBlocks.length - 1].getRelativeToSurfaceXY().y + 120
    : 30;
  block.moveBy(30, y);
  // 记录位置
  block.getSvgRoot().setAttribute('transform', `translate(30, ${y})`);
  updatePreview();
}

// 点击外部关闭搜索结果
document.addEventListener('click', (e) => {
  if (!searchBar.contains(e.target)) searchResults.classList.add('hidden');
});

// ════════════════════════════════════════════════════
// 📤 导入 .py → 反解成积木
// ════════════════════════════════════════════════════

const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');

importBtn.addEventListener('click', () => importFile.click());
importFile.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const ok = importPyToWorkspace(reader.result);
    if (ok) {
      const orig = importBtn.textContent;
      importBtn.textContent = '✅ 已导入';
      setTimeout(() => (importBtn.textContent = orig), 2500);
    }
  };
  reader.readAsText(file);
  e.target.value = ''; // 允许重复选择同一文件
});

/**
 * 把 Python 代码反解成 Blockly 积木 XML。
 * 支持本工具生成器能产生的常见 Manim 模式；无法识别的行显示为「自定义代码」积木。
 */
function pyToXml(code) {
  const lines = code.split('\n').map(l => l.trim());
  // 过滤：import、class 定义、def construct、空行、注释
  const codeLines = lines.filter(l =>
    l && !l.startsWith('import ') && !l.startsWith('from ') &&
    !l.startsWith('class ') && !l.startsWith('def ') && !l.startsWith('#') &&
    !l.startsWith('self.wait(') && l !== 'pass' && !l.startsWith('    #')
  );

  const blocks = []; // [{type, fields:{}, statement:null}]

  for (const line of codeLines) {
    let b = matchLine(line);
    if (b) blocks.push(b);
  }
  return blocksToXml(blocks);
}

/** 匹配一行代码 → 积木描述；不认识返回 null */
function matchLine(line) {
  const F = (name, val) => ({ name, val });

  // ── 物体创建 ──
  let m;
  if ((m = /^(\w+) = Circle\(\)$/.exec(line)))
    return { type: 'object_circle', fields: [F('VAR', m[1]), F('X', '0'), F('Y', '0')] };
  if ((m = /^(\w+) = Square\(\)$/.exec(line)))
    return { type: 'object_square', fields: [F('VAR', m[1]), F('X', '0'), F('Y', '0')] };
  if ((m = /^(\w+) = Triangle\(\)$/.exec(line)))
    return { type: 'object_triangle', fields: [F('VAR', m[1]), F('X', '0'), F('Y', '0')] };
  if ((m = /^(\w+) = Dot\(\)$/.exec(line)))
    return { type: 'object_dot', fields: [F('VAR', m[1]), F('X', '0'), F('Y', '0')] };
  if ((m = /^(\w+) = Rectangle\(width=([\d.]+), height=([\d.]+)\)$/.exec(line)))
    return { type: 'object_rectangle', fields: [F('VAR', m[1]), F('W', m[2]), F('H', m[3]), F('X', '0'), F('Y', '0')] };
  if ((m = /^(\w+) = RegularPolygon\(n=(\d+)\)$/.exec(line)))
    return { type: 'object_regular_polygon', fields: [F('VAR', m[1]), F('N', m[2]), F('X', '0'), F('Y', '0')] };
  if ((m = /^(\w+) = RoundedRectangle\(width=([\d.]+), height=([\d.]+), corner_radius=([\d.]+)\)$/.exec(line)))
    return { type: 'object_rounded_rectangle', fields: [F('VAR', m[1]), F('W', m[2]), F('H', m[3]), F('R', m[4]), F('X', '0'), F('Y', '0')] };
  if ((m = /^(\w+) = Ellipse\(width=([\d.]+), height=([\d.]+)\)$/.exec(line)))
    return { type: 'object_ellipse', fields: [F('VAR', m[1]), F('W', m[2]), F('H', m[3]), F('X', '0'), F('Y', '0')] };
  if ((m = /^(\w+) = Line\(\[([-\d.]+), ([-\d.]+), 0\], \[([-\d.]+), ([-\d.]+), 0\]\)$/.exec(line)))
    return { type: 'object_line', fields: [F('VAR', m[1]), F('X1', m[2]), F('Y1', m[3]), F('X2', m[4]), F('Y2', m[5])] };
  if ((m = /^(\w+) = Arrow\(\[([-\d.]+), ([-\d.]+), 0\], \[([-\d.]+), ([-\d.]+), 0\]\)$/.exec(line)))
    return { type: 'object_arrow', fields: [F('VAR', m[1]), F('X1', m[2]), F('Y1', m[3]), F('X2', m[4]), F('Y2', m[5])] };
  if ((m = /^(\w+) = DashedLine\(\[([-\d.]+), ([-\d.]+), 0\], \[([-\d.]+), ([-\d.]+), 0\]\)$/.exec(line)))
    return { type: 'object_dashed_line', fields: [F('VAR', m[1]), F('X1', m[2]), F('Y1', m[3]), F('X2', m[4]), F('Y2', m[5])] };
  if ((m = /^(\w+) = Tex\(r"([^"]*)"\)$/.exec(line)))
    return { type: 'object_tex', fields: [F('VAR', m[1]), F('TEX', m[2]), F('X', '0'), F('Y', '0')] };
  if ((m = /^(\w+) = MathTex\(r"([^"]*)"\)$/.exec(line)))
    return { type: 'object_math_tex', fields: [F('VAR', m[1]), F('TEX', m[2]), F('X', '0'), F('Y', '0')] };
  if ((m = /^(\w+) = Text\("([^"]*)"\)$/.exec(line)))
    return { type: 'object_text', fields: [F('VAR', m[1]), F('CONTENT', m[2]), F('X', '0'), F('Y', '0')] };
  if ((m = /^(\w+) = Axes\(x_range=\[([-\d.]+), ([-\d.]+)\], y_range=\[([-\d.]+), ([-\d.]+)\][^)]*\)$/.exec(line)))
    return { type: 'object_axes', fields: [F('VAR', m[1]), F('XMIN', m[2]), F('XMAX', m[3]), F('YMIN', m[4]), F('YMAX', m[5])] };
  if ((m = /^(\w+) = NumberPlane\(x_range=\[([-\d.]+), ([-\d.]+)\], y_range=\[([-\d.]+), ([-\d.]+)\][^)]*\)$/.exec(line)))
    return { type: 'object_number_plane', fields: [F('VAR', m[1]), F('XMIN', m[2]), F('XMAX', m[3]), F('YMIN', m[4]), F('YMAX', m[5]), F('X', '0'), F('Y', '0')] };
  if ((m = /^(\w+) = (\w+)\.plot\(lambda x: ([^,)]+), color=(\w+)\)$/.exec(line)))
    return { type: 'object_graph', fields: [F('AXES', m[2]), F('VAR', m[1]), F('FUNC', m[3])] };
  if ((m = /^(\w+) = Sphere\(radius=([\d.]+)\)$/.exec(line)))
    return { type: 'object3d_sphere', fields: [F('VAR', m[1]), F('R', m[2]), F('X', '0'), F('Y', '0'), F('Z', '0')] };
  if ((m = /^(\w+) = Cube\(side_length=([\d.]+)\)$/.exec(line)))
    return { type: 'object3d_cube', fields: [F('VAR', m[1]), F('L', m[2]), F('X', '0'), F('Y', '0'), F('Z', '0')] };
  if ((m = /^(\w+) = Cylinder\(radius=([\d.]+), height=([\d.]+)\)$/.exec(line)))
    return { type: 'object3d_cylinder', fields: [F('VAR', m[1]), F('R', m[2]), F('H', m[3]), F('X', '0'), F('Y', '0'), F('Z', '0')] };
  if ((m = /^(\w+) = Cone\(base_radius=([\d.]+), height=([\d.]+)\)$/.exec(line)))
    return { type: 'object3d_cone', fields: [F('VAR', m[1]), F('R', m[2]), F('H', m[3]), F('X', '0'), F('Y', '0'), F('Z', '0')] };
  if ((m = /^(\w+) = Torus\(major_radius=([\d.]+), minor_radius=([\d.]+)\)$/.exec(line)))
    return { type: 'object3d_torus', fields: [F('VAR', m[1]), F('R', m[2]), F('R2', m[3]), F('X', '0'), F('Y', '0'), F('Z', '0')] };
  if ((m = /^(\w+) = Prism\(dimensions=\[([\d.]+), ([\d.]+), ([\d.]+)\]\)$/.exec(line)))
    return { type: 'object3d_prism', fields: [F('VAR', m[1]), F('W', m[2]), F('H', m[3]), F('D', m[4]), F('X', '0'), F('Y', '0'), F('Z', '0')] };

  // ── 属性 ──
  if ((m = /^(\w+)\.set_color\((\w+)\)$/.exec(line)))
    return { type: 'property_color', fields: [F('VAR', m[1]), F('COLOR', m[2])] };
  if ((m = /^(\w+)\.set_opacity\(([\d.]+)\)$/.exec(line)))
    return { type: 'property_opacity', fields: [F('VAR', m[1]), F('OPACITY', m[2])] };
  if ((m = /^(\w+)\.scale\(([\d.]+)\)$/.exec(line)))
    return { type: 'property_scale', fields: [F('VAR', m[1]), F('SCALE', m[2])] };
  if ((m = /^(\w+)\.rotate\(([-\d.]+) \* DEGREES\)$/.exec(line)))
    return { type: 'property_rotate', fields: [F('VAR', m[1]), F('ANGLE', m[2])] };
  if ((m = /^(\w+)\.move_to\(([-\d.]+) \* RIGHT \+ ([-\d.]+) \* UP\)$/.exec(line)))
    return { type: 'property_move_to', fields: [F('VAR', m[1]), F('X', m[2]), F('Y', m[3])] };
  if ((m = /^(\w+)\.move_to\(\[([-\d.]+), ([-\d.]+), ([-\d.]+)\]\)$/.exec(line)))
    return { type: 'property_move_to', fields: [F('VAR', m[1]), F('X', m[2]), F('Y', m[3])] };
  if ((m = /^(\w+)\.shift\(([-\d.]+) \* RIGHT \+ ([-\d.]+) \* UP\)$/.exec(line)))
    return { type: 'property_shift', fields: [F('VAR', m[1]), F('DX', m[2]), F('DY', m[3])] };
  if ((m = /^(\w+)\.set_stroke\(width=([\d.]+)\)$/.exec(line)))
    return { type: 'property_stroke_width', fields: [F('VAR', m[1]), F('W', m[2])] };
  if ((m = /^(\w+)\.set_fill\(opacity=([\d.]+)\)$/.exec(line)))
    return { type: 'property_fill_opacity', fields: [F('VAR', m[1]), F('OPACITY', m[2])] };

  // ── 动画 ──
  if ((m = /^self\.play\(Create\((\w+)\)\)$/.exec(line)))
    return { type: 'animate_create', fields: [F('VAR', m[1])] };
  if ((m = /^self\.play\(FadeIn\((\w+)\)\)$/.exec(line)))
    return { type: 'animate_fade_in', fields: [F('VAR', m[1])] };
  if ((m = /^self\.play\(FadeOut\((\w+)\)\)$/.exec(line)))
    return { type: 'animate_fade_out', fields: [F('VAR', m[1])] };
  if ((m = /^self\.play\(Write\((\w+)\)\)$/.exec(line)))
    return { type: 'animate_write', fields: [F('VAR', m[1])] };
  if ((m = /^self\.play\(Unwrite\((\w+)\)\)$/.exec(line)))
    return { type: 'animate_unwrite', fields: [F('VAR', m[1])] };
  if ((m = /^self\.play\(Uncreate\((\w+)\)\)$/.exec(line)))
    return { type: 'animate_uncreate', fields: [F('VAR', m[1])] };
  if ((m = /^self\.play\(GrowFromCenter\((\w+)\)\)$/.exec(line)))
    return { type: 'animate_grow_from_center', fields: [F('VAR', m[1])] };
  if ((m = /^self\.play\(Rotate\((\w+), ([-\d.]+) \* DEGREES\)\)$/.exec(line)))
    return { type: 'animate_rotate', fields: [F('VAR', m[1]), F('ANGLE', m[2])] };
  if ((m = /^self\.play\(Transform\((\w+), (\w+)\)\)$/.exec(line)))
    return { type: 'animate_transform', fields: [F('OBJ', m[1]), F('TARGET', m[2])] };
  if ((m = /^self\.play\(ReplacementTransform\((\w+), (\w+)\)\)$/.exec(line)))
    return { type: 'animate_replacement_transform', fields: [F('OBJ', m[1]), F('TARGET', m[2])] };
  if ((m = /^self\.play\((\w+)\.animate\.shift\(([-\d.]+) \* RIGHT \+ ([-\d.]+) \* UP\)\)$/.exec(line)))
    return { type: 'animate_shift', fields: [F('VAR', m[1]), F('DX', m[2]), F('DY', m[3])] };
  if ((m = /^self\.play\((\w+)\.animate\.scale\(([\d.]+)\)\)$/.exec(line)))
    return { type: 'animate_scale', fields: [F('VAR', m[1]), F('SCALE', m[2])] };
  if ((m = /^self\.play\(Indicate\((\w+)\)\)$/.exec(line)))
    return { type: 'animate_indicate', fields: [F('VAR', m[1])] };
  if ((m = /^self\.play\(Flash\((\w+), line_length=[\d.]+, num_lines=(\d+)\)\)$/.exec(line)))
    return { type: 'animate_flash', fields: [F('VAR', m[1]), F('COUNT', m[2])] };
  if ((m = /^self\.play\(Wiggle\((\w+)\)\)$/.exec(line)))
    return { type: 'animate_wiggle', fields: [F('VAR', m[1])] };
  if ((m = /^self\.play\(SpiralIn\((\w+)\)\)$/.exec(line)))
    return { type: 'animate_spiral_in', fields: [F('VAR', m[1])] };
  if ((m = /^self\.play\(ShrinkToCenter\((\w+)\)\)$/.exec(line)))
    return { type: 'animate_shrink_to_center', fields: [F('VAR', m[1])] };
  if ((m = /^self\.play\(FadeTransform\((\w+), (\w+)\)\)$/.exec(line)))
    return { type: 'animate_fade_transform', fields: [F('OBJ', m[1]), F('TARGET', m[2])] };
  if ((m = /^self\.play\(DrawBorderThenFill\((\w+)\)\)$/.exec(line)))
    return { type: 'animate_draw_then_fill', fields: [F('VAR', m[1])] };
  if ((m = /^self\.play\(FadeIn\((\w+), lag_ratio=([\d.]+)\)\)$/.exec(line)))
    return { type: 'animate_fade_in_letters', fields: [F('VAR', m[1]), F('RATIO', m[2])] };

  // ── 场景 ──
  if ((m = /^self\.add\((\w+)\)$/.exec(line)))
    return { type: 'scene_add', fields: [F('VAR', m[1])] };
  if ((m = /^self\.remove\((\w+)\)$/.exec(line)))
    return { type: 'scene_remove', fields: [F('VAR', m[1])] };

  // ── 未识别 → 自定义代码 ──
  return { type: 'custom_code', fields: [F('CODE', line)] };
}

/** 把积木描述列表转成咬合的 Blockly XML */
function blocksToXml(blocks) {
  if (blocks.length === 0) return null;
  // 从后往前构建 next 链
  let inner = null;
  for (let i = blocks.length - 1; i >= 0; i--) {
    const b = blocks[i];
    const fields = b.fields.map(f =>
      `<field name="${f.name}">${String(f.val).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')}</field>`
    ).join('');
    const attrs = i === 0 ? ' x="30" y="30"' : '';
    if (i === blocks.length - 1) {
      inner = `<block type="${b.type}"${attrs}>\n${fields}</block>`;
    } else {
      inner = `<block type="${b.type}"${attrs}>\n${fields}<next>\n${inner}\n</next>\n</block>`;
    }
  }
  return `<xml xmlns="https://developers.google.com/blockly/xml">\n${inner}\n</xml>`;
}

/** 导入 .py 到工作区，成功返回 true */
function importPyToWorkspace(code) {
  const xml = pyToXml(code);
  if (!xml) {
    alert('没有识别到可导入的代码');
    return false;
  }
  workspace.clear();
  const dom = Blockly.utils.xml.textToDom(xml);
  Blockly.Xml.domToWorkspace(dom, workspace);
  updateEmptyHint();
  updatePreview();
  return true;
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

// ── GitHub 仓库按钮 ─────────────────────────────────

document.getElementById('githubBtn').addEventListener('click', () => {
  window.open('https://github.com/Kaoyusiliao/manim-blocks', '_blank');
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
echo "📦 正在安装 Manim + SymPy…"
python3 -m pip install --upgrade pip -q
python3 -m pip install manim sympy -q

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
python -m pip install manim sympy -q

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
      3️⃣ 右边立刻显示生成的代码！</span>
      <br/><br/>
      <span class="hint-quote">💬 不是只有伟大的艺术家才能做出好作品的。</span>`;
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
    name: '第 1 课 · 第一个动画',
    level: 'basic',
    emoji: '🌈',
    desc: '红色圆形从中心画出 —— 学会「物体 + 动画」两步走（对应：基本图形/常用动画）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_circle" x="30" y="30">
<field name="VAR">circle</field><field name="X">0</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">circle</field><field name="COLOR">RED</field><next>
<block type="animate_create">
<field name="VAR">circle</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 2 课 · 公式书写',
    level: 'basic',
    emoji: '∑',
    desc: '爱因斯坦公式逐字写出（对应：文字和公式）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_math_tex" x="30" y="30">
<field name="VAR">formula</field><field name="TEX">E = mc^2</field><field name="X">0</field><field name="Y">1</field><next>
<block type="property_color">
<field name="VAR">formula</field><field name="COLOR">YELLOW</field><next>
<block type="animate_write">
<field name="VAR">formula</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 3 课 · 旋转星形',
    level: 'basic',
    emoji: '⭐',
    desc: '五角星重复旋转 5 次 —— 学会「重复」积木（对应：常用动画/图形样式）',
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
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 4 课 · 3D 立方体',
    level: 'basic',
    emoji: '🧊',
    desc: '三维立方体旋转 —— 自动启用 3D 场景和相机视角',
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
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 5 课 · 函数曲线',
    level: 'basic',
    emoji: '📈',
    desc: '坐标轴 + 网格平面 + 抛物线（对应：坐标系）',
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
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 6 课 · 文字动画',
    level: 'basic',
    emoji: '🎨',
    desc: '字母逐个平滑淡入 + 移动 + 淡出（对应：文本样式）',
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
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 7 课 · 变形动画',
    level: 'basic',
    emoji: '🔄',
    desc: '圆形平滑变形为正方形（对应：高级动画/变换效果）',
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
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 8 课 · 滚动字幕',
    level: 'basic',
    emoji: '📜',
    desc: '文字从屏幕底部滚入再滚出（合集经典：滚动字幕）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_text" x="30" y="30">
<field name="VAR">text</field><field name="CONTENT">谢谢观看！</field><field name="X">0</field><field name="Y">-4</field><next>
<block type="property_color">
<field name="VAR">text</field><field name="COLOR">YELLOW</field><next>
<block type="animate_shift">
<field name="VAR">text</field><field name="DX">0</field><field name="DY">8</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 9 课 · 圆规动画',
    level: 'basic',
    emoji: '🧭',
    desc: '用弧线画圆 —— 动态几何演示（合集经典：圆规动画）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_dot" x="30" y="30">
<field name="VAR">center</field><field name="X">0</field><field name="Y">0</field><next>
<block type="object_arc" x="30" y="100">
<field name="VAR">arc</field><field name="R">2</field><field name="ANGLE">360</field><field name="X">0</field><field name="Y">0</field><next>
<block type="animate_create">
<field name="VAR">arc</field><next>
<block type="animate_create">
<field name="VAR">center</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 10 课 · 匀速玫瑰线',
    level: 'advanced',
    emoji: '🌹',
    desc: '五瓣玫瑰线匀速画出（等弧长参数化，对应：参数曲线/弧长文章）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_axes" x="30" y="30">
<field name="VAR">axes</field><field name="XMIN">-2.5</field><field name="XMAX">2.5</field><field name="YMIN">-2.5</field><field name="YMAX">2.5</field><next>
<block type="object_parametric_curve_uniform">
<field name="VAR">curve</field><field name="AXES">axes</field><field name="FUNC">lambda t: (2*np.cos(5*t)*np.cos(t), 2*np.cos(5*t)*np.sin(t))</field><field name="T0">0</field><field name="T1">3.14</field><field name="N">800</field><next>
<block type="animate_create">
<field name="VAR">curve</field><field name="DURATION">6</field><next>
<block type="scene_wait">
<field name="SECONDS">6</field></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 11 课 · 心形线',
    emoji: '❤️',
    desc: '用独立参数曲线画心形（对应合集：参数化曲线篇）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_parametric_function" x="30" y="30">
<field name="VAR">heart</field><field name="FUNC">lambda t: (16*np.sin(t)**3, 13*np.cos(t) - 5*np.cos(2*t) - 2*np.cos(3*t) - np.cos(4*t), 0)</field><field name="T0">0</field><field name="T1">6.28</field><field name="STEP">0.01</field><field name="COLOR">PINK</field><next>
<block type="animate_create">
<field name="VAR">heart</field><field name="DURATION">3</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 12 课 · 3D 螺旋线',
    emoji: '🌀',
    desc: '三维空间中的螺旋线（自动 3D 场景 + 立体着色）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_parametric_function_3d" x="30" y="30">
<field name="VAR">curve</field><field name="FUNC">lambda u: (1.2*np.cos(u), 1.2*np.sin(u), u*0.05)</field><field name="T0">-18.8</field><field name="T1">31.4</field><field name="STEP">0.01</field><field name="COLOR">RED</field><next>
<block type="animate_create">
<field name="VAR">curve</field><field name="DURATION">3</field><next>
<block type="scene_wait">
<field name="SECONDS">3</field></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 13 课 · 齐步走',
    emoji: '👯',
    desc: '圆和方形同时移动：圆上移、方下移（对应合集：如何让多个动画齐步走·方法一）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_circle" x="30" y="30">
<field name="VAR">circle</field><field name="X">-2</field><field name="Y">0</field><next>
<block type="object_square">
<field name="VAR">square</field><field name="X">2</field><field name="Y">0</field><next>
<block type="animate_create">
<field name="VAR">circle</field><field name="DURATION">1</field><next>
<block type="animate_create">
<field name="VAR">square</field><field name="DURATION">1</field><next>
<block type="animate_together">
<field name="A">circle</field><field name="B">square</field><field name="DX1">0</field><field name="DY1">2</field><field name="DX2">0</field><field name="DY2">-2</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 14 课 · 错峰淡入',
    emoji: '⏱️',
    desc: '多个副本依次错峰淡入，形成流动感（对应合集：动画组合/节奏控制）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_square" x="30" y="30">
<field name="VAR">sq</field><field name="X">0</field><field name="Y">0</field><next>
<block type="animate_create">
<field name="VAR">sq</field><field name="DURATION">1</field><next>
<block type="animate_lagged_start">
<field name="OBJ">sq</field><field name="COUNT">5</field><next>
<block type="scene_wait">
<field name="SECONDS">3</field></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 15 课 · 变速动画',
    emoji: '🎢',
    desc: '小球自由落体越来越快（ChangeSpeed 变速，对应合集：掌握ChangeSpeed类）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_dot" x="30" y="30">
<field name="VAR">ball</field><field name="X">0</field><field name="Y">3</field><next>
<block type="property_color">
<field name="VAR">ball</field><field name="COLOR">YELLOW</field><next>
<block type="object_line" x="30" y="100">
<field name="VAR">path</field><field name="X1">0</field><field name="Y1">3</field><field name="X2">0</field><field name="Y2">-3</field><next>
<block type="animate_change_speed">
<field name="VAR">ball</field><field name="PATH">path</field><field name="SPEEDINFO">{0: 0.1, 0.3: 0.5, 1: 2.0}</field><field name="DURATION">3</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 16 课 · 动画节奏',
    emoji: '🎵',
    desc: '小球往返移动（there_and_back 节奏，对应合集：Rate Functions 节奏控制）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_dot" x="30" y="30">
<field name="VAR">ball</field><field name="X">-3</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">ball</field><field name="COLOR">TEAL</field><next>
<block type="animate_create">
<field name="VAR">ball</field><field name="DURATION">1</field><next>
<block type="animate_rhythm">
<field name="VAR">ball</field><field name="DX">6</field><field name="DY">0</field><field name="RATE">there_and_back</field><field name="DURATION">3</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 17 课 · 背景图片',
    emoji: '🖼️',
    desc: '给动画加背景图 + 前景公式（对应合集：背景图片·方法一）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_background" x="30" y="30">
<field name="VAR">bg</field><field name="PATH">./assets/background.jpg</field><next>
<block type="object_math_tex" x="30" y="100">
<field name="VAR">math</field><field name="TEX">\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}</field><field name="X">0</field><field name="Y">0</field><next>
<block type="animate_write">
<field name="VAR">math</field><next>
<block type="scene_wait">
<field name="SECONDS">3</field></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 18 课 · 公式着色',
    emoji: '🎨',
    desc: '勾股定理各段不同颜色（对应合集：公式各部分颜色·拆分法）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_formula_colors" x="30" y="30">
<field name="VAR">tex</field><field name="PARTS">a^2, +, b^2, =, c^2</field><field name="COLOR">YELLOW,GREEN,RED</field><next>
<block type="animate_write">
<field name="VAR">tex</field><field name="DURATION">2</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 19 课 · 目录动画',
    emoji: '📑',
    desc: '创建目录列表并指示当前项（对应合集：目录动画）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_bulleted_list" x="30" y="30">
<field name="VAR">catalog</field><field name="CONTENT">manim 是什么, 多平台支持, 基于 Python, 重要依赖</field><field name="X">0</field><field name="Y">1</field><next>
<block type="animate_write">
<field name="VAR">catalog</field><field name="DURATION">2</field><next>
<block type="animate_indicate">
<field name="VAR">catalog</field><next>
<block type="scene_wait">
<field name="SECONDS">3</field></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 20 课 · 切线动画（SymPy）',
    emoji: '📉',
    desc: 'SymPy 自动求导 + Manim 画切线（对应合集：切线魔法·SymPy导数）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x</field><next>
<block type="sympy_expr">
<field name="VAR">f_sym</field><field name="EXPR">x**3 - 2*x + 1</field><next>
<block type="sympy_diff">
<field name="EXPR">f_sym</field><field name="VAR">x</field><field name="RESULT">df</field><next>
<block type="sympy_subs">
<field name="EXPR">df</field><field name="VAR">x</field><field name="VALUE">1</field><field name="RESULT">k_val</field><next>
<block type="sympy_evalf">
<field name="EXPR">k_val</field><field name="VAR">k</field><next>
<block type="sympy_lambdify">
<field name="EXPR">f_sym</field><field name="VARS">x</field><field name="VAR">f</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">-1</field><field name="XMAX">3</field><field name="YMIN">-2</field><field name="YMAX">3</field><next>
<block type="object_graph_func">
<field name="AXES">ax</field><field name="FUNC">f</field><field name="COLOR">YELLOW</field><field name="VAR">graph</field><next>
<block type="custom_code">
<field name="CODE">tangent = ax.plot(lambda x: k*(x-1) + f(1), color=RED)</field><next>
<block type="scene_add">
<field name="VAR">ax</field><next>
<block type="scene_add">
<field name="VAR">graph</field><next>
<block type="animate_create">
<field name="VAR">tangent</field><field name="DURATION">2</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 21 课 · 积分面积（SymPy）',
    emoji: '📊',
    desc: 'SymPy 精确积分 + 黎曼矩形逼近（对应合集：填充与积累：积分与面积的可视化）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x</field><next>
<block type="sympy_expr">
<field name="VAR">f_sym</field><field name="EXPR">x**2</field><next>
<block type="sympy_integrate">
<field name="EXPR">x**2</field><field name="VAR">x</field><field name="LOWER">0</field><field name="UPPER">2</field><field name="RESULT">area</field><next>
<block type="sympy_evalf">
<field name="EXPR">area</field><field name="VAR">area_val</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">-1</field><field name="XMAX">3</field><field name="YMIN">-1</field><field name="YMAX">5</field><next>
<block type="object_graph">
<field name="AXES">ax</field><field name="VAR">graph</field><field name="FUNC">x**2</field><next>
<block type="custom_code">
<field name="CODE">riemann = ax.get_riemann_rectangles(graph, x_range=[0, 2], dx=0.5, stroke_color=WHITE)</field><next>
<block type="custom_code">
<field name="CODE">label = MathTex(f"\\\\int_0^2 x^2 \\\\, dx = {area:.4f}").next_to(ax, DOWN)</field><next>
<block type="scene_add">
<field name="VAR">ax</field><next>
<block type="scene_add">
<field name="VAR">graph</field><next>
<block type="scene_add">
<field name="VAR">riemann</field><next>
<block type="animate_write">
<field name="OBJ">label</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 22 课 · 追及问题（SymPy）',
    emoji: '🚗',
    desc: 'SymPy 解方程求两车相遇时间和位置（对应合集：用SymPy自动求解追及问题的方程）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">t</field><next>
<block type="sympy_expr">
<field name="VAR">pos_a</field><field name="EXPR">30*t</field><next>
<block type="sympy_expr">
<field name="VAR">pos_b</field><field name="EXPR">20*(t - 1) + 20</field><next>
<block type="sympy_solve">
<field name="EXPR">pos_a - pos_b</field><field name="VARS">t</field><field name="VAR">solutions</field><next>
<block type="sympy_evalf">
<field name="EXPR">solutions[0]</field><field name="VAR">meet_t</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">0</field><field name="XMAX">5</field><field name="YMIN">0</field><field name="YMAX">120</field><next>
<block type="custom_code">
<field name="CODE">a_line = ax.plot(lambda t: 30*t, color=BLUE)</field><next>
<block type="custom_code">
<field name="CODE">b_line = ax.plot(lambda t: 20*(t-1)+20, color=RED)</field><next>
<block type="object_dot_axes">
<field name="AXES">ax</field><field name="X">meet_t</field><field name="Y">30*meet_t</field><field name="COLOR">YELLOW</field><field name="VAR">dot</field><next>
<block type="custom_code">
<field name="CODE">label = MathTex(f"t={meet_t:.2f}s, s={30*meet_t:.1f}m").next_to(dot, UP)</field><next>
<block type="scene_add">
<field name="VAR">ax</field><next>
<block type="scene_add">
<field name="VAR">a_line</field><next>
<block type="scene_add">
<field name="VAR">b_line</field><next>
<block type="scene_add">
<field name="VAR">dot</field><next>
<block type="scene_add">
<field name="VAR">label</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 23 课 · 抛物线求根（SymPy）',
    emoji: '📈',
    desc: 'SymPy 自动计算抛物线求根、判别式与顶点（对应合集：用SymPy自动计算抛物线求根）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x</field><next>
<block type="sympy_expr">
<field name="VAR">f_sym</field><field name="EXPR">x**2 - 4*x + 3</field><next>
<block type="sympy_solve">
<field name="EXPR">f_sym</field><field name="VARS">x</field><field name="VAR">roots</field><next>
<block type="sympy_latex">
<field name="EXPR">f_sym</field><field name="VAR">f_latex</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">-1</field><field name="XMAX">5</field><field name="YMIN">-2</field><field name="YMAX">5</field><next>
<block type="object_graph">
<field name="AXES">ax</field><field name="VAR">graph</field><field name="FUNC">x**2 - 4*x + 3</field><next>
<block type="custom_code">
<field name="CODE">root_dots = VGroup(*[Dot(ax.c2p(float(r), 0), color=RED) for r in roots])</field><next>
<block type="custom_code">
<field name="CODE">root_labels = VGroup(*[MathTex(f"x={float(r):.1f}").next_to(ax.c2p(float(r), 0), DOWN) for r in roots])</field><next>
<block type="object_math_tex">
<field name="VAR">formula</field><field name="TEX">f(x) = x^2 - 4x + 3</field><next>
<block type="scene_add">
<field name="VAR">ax</field><next>
<block type="scene_add">
<field name="VAR">graph</field><next>
<block type="scene_add">
<field name="VAR">root_dots</field><next>
<block type="scene_add">
<field name="VAR">root_labels</field><next>
<block type="scene_add">
<field name="VAR">formula</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 24 课 · SymPy 初识与联动',
    emoji: '📐',
    desc: 'SymPy 数值解方程求 sin(x)=x/2 交点 + 坐标轴标注（对应合集：告别手动计算，SymPy 初识与 Manim 联动）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x</field><next>
<block type="sympy_nsolve">
<field name="EXPR">sin(x) - x/2</field><field name="GUESS">1.8</field><field name="VAR">root</field><next>
<block type="sympy_evalf">
<field name="EXPR">root</field><field name="VAR">root_val</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">-1</field><field name="XMAX">5</field><field name="YMIN">-1</field><field name="YMAX">3</field><next>
<block type="custom_code">
<field name="CODE">sin_graph = ax.plot(lambda x: float(sin(x)), color=BLUE)</field><next>
<block type="custom_code">
<field name="CODE">line_graph = ax.plot(lambda x: x/2, color=RED)</field><next>
<block type="custom_code">
<field name="CODE">dot = Dot(ax.c2p(root_val, float(sin(root_val))), color=YELLOW)</field><next>
<block type="custom_code">
<field name="CODE">label = MathTex(f"x \\\\approx {root_val:.4f}").next_to(dot, UR)</field><next>
<block type="scene_add">
<field name="VAR">ax</field><next>
<block type="scene_add">
<field name="VAR">sin_graph</field><next>
<block type="scene_add">
<field name="VAR">line_graph</field><next>
<block type="scene_add">
<field name="VAR">dot</field><next>
<block type="scene_add">
<field name="VAR">label</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 25 课 · 公式自动推导',
    emoji: '🤖',
    desc: 'SymPy 展开/因式分解/化简，自动推导数学公式（对应合集：让数学公式自动推导）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x, y</field><next>
<block type="sympy_expr">
<field name="VAR">expr</field><field name="EXPR">(x+2)*(x+3)</field><next>
<block type="sympy_expand">
<field name="EXPR">(x+2)*(x+3)</field><field name="VAR">expanded</field><next>
<block type="sympy_factor">
<field name="EXPR">expanded</field><field name="VAR">factored</field><next>
<block type="object_math_tex">
<field name="VAR">f1</field><field name="TEX">(x+2)(x+3) = x^2 + 5x + 6</field><field name="X">0</field><field name="Y">1</field><next>
<block type="object_math_tex">
<field name="VAR">f2</field><field name="TEX">x^2 + 5x + 6 = (x+2)(x+3)</field><field name="X">0</field><field name="Y">0</field><next>
<block type="object_math_tex">
<field name="VAR">f3</field><field name="TEX">sin^2 x + cos^2 x = 1</field><field name="X">0</field><field name="Y">-1</field><next>
<block type="custom_code">
<field name="CODE">title = Text("SymPy 自动公式推导", font_size=36).to_edge(UP)</field><next>
<block type="scene_add">
<field name="VAR">title</field><next>
<block type="scene_play">
<field name="VAR">f1</field><field name="ANIM">Write</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="scene_play">
<field name="VAR">f2</field><field name="ANIM">Write</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="scene_play">
<field name="VAR">f3</field><field name="ANIM">Write</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 26 课 · 轨迹交点',
    emoji: '🎯',
    desc: 'SymPy 联立方程求解两条直线交点（对应合集：轨迹的蓝图：方程求解与交点计算）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x, y</field><next>
<block type="custom_code">
<field name="CODE">sol = solve([0.5*x+1-y, -0.8*x+4-y], (x,y), dict=True)[0]; cx, cy = float(sol[x]), float(sol[y])</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">-1</field><field name="XMAX">5</field><field name="YMIN">-1</field><field name="YMAX">5</field><next>
<block type="custom_code">
<field name="CODE">l1 = ax.plot(lambda x: 0.5*x+1, color=BLUE)</field><next>
<block type="custom_code">
<field name="CODE">l2 = ax.plot(lambda x: -0.8*x+4, color=RED)</field><next>
<block type="custom_code">
<field name="CODE">dot = Dot(ax.c2p(cx, cy), color=YELLOW); label = MathTex(f"({cx:.2f}, {cy:.2f})").next_to(dot, UR)</field><next>
<block type="scene_add">
<field name="VAR">ax</field><next>
<block type="scene_add">
<field name="VAR">l1</field><next>
<block type="scene_add">
<field name="VAR">l2</field><next>
<block type="scene_add">
<field name="VAR">dot</field><next>
<block type="scene_add">
<field name="VAR">label</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 27 课 · 物理模拟',
    emoji: '🏗️',
    desc: 'SymPy dsolve 解微分方程得解析解，代替数值积分做弹簧振子动画（对应合集：别自己写欧拉了！）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">t, k, m</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">0</field><field name="XMAX">10</field><field name="YMIN">-2</field><field name="YMAX">2</field><next>
<block type="custom_code">
<field name="CODE">x_fn = lambda t: float(cos(sqrt(2/1)*t)); graph = ax.plot(x_fn, color=YELLOW)</field><next>
<block type="custom_code">
<field name="CODE">tracker = ValueTracker(0); dot = always_redraw(lambda: Dot(ax.c2p(tracker.get_value(), x_fn(tracker.get_value())), color=RED))</field><next>
<block type="custom_code">
<field name="CODE">label = always_redraw(lambda: MathTex(f"t={tracker.get_value():.1f}").to_corner(UL))</field><next>
<block type="scene_add">
<field name="VAR">ax</field><next>
<block type="scene_add">
<field name="VAR">graph</field><next>
<block type="scene_add">
<field name="VAR">dot</field><next>
<block type="scene_add">
<field name="VAR">label</field><next>
<block type="custom_code">
<field name="CODE">self.play(tracker.animate.set_value(10), run_time=6, rate_func=linear)</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 28 课 · 弧长参数化（SymPy）',
    emoji: '🌀',
    desc: 'SymPy 弧长积分 + 等弧长参数化，解决曲线绘制速度不均（对应合集：用 SymPy 解决曲线速度不均）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_axes" x="30" y="30">
<field name="VAR">axes</field><field name="XMIN">-3</field><field name="XMAX">3</field><field name="YMIN">-3</field><field name="YMAX">3</field><next>
<block type="object_parametric_curve_uniform">
<field name="VAR">curve</field><field name="AXES">axes</field><field name="FUNC">lambda t: (2*np.cos(5*t)*np.cos(t), 2*np.cos(5*t)*np.sin(t))</field><field name="T0">0</field><field name="T1">3.14</field><field name="N">1000</field><next>
<block type="scene_add">
<field name="VAR">axes</field><next>
<block type="animate_create">
<field name="VAR">curve</field><field name="DURATION">5</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 29 课 · 一次函数工厂',
    emoji: '🏭',
    desc: 'SymPy 自动计算截距，在坐标轴上绘制 y=2x+1 并标注截距点（对应合集：一次函数图像工厂）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x</field><next>
<block type="custom_code">
<field name="CODE">x_int = float(solve(2*x+1, x)[0]); y_int = float(2*0+1)</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">-5</field><field name="XMAX">5</field><field name="YMIN">-5</field><field name="YMAX">5</field><next>
<block type="object_graph">
<field name="AXES">ax</field><field name="VAR">line</field><field name="FUNC">2*x+1</field><next>
<block type="custom_code">
<field name="CODE">x_dot = Dot(ax.c2p(x_int, 0), color=RED); y_dot = Dot(ax.c2p(0, y_int), color=GREEN)</field><next>
<block type="object_math_tex">
<field name="VAR">label</field><field name="TEX">y = 2x + 1</field><field name="X">0</field><field name="Y">3.5</field><next>
<block type="scene_add">
<field name="VAR">ax</field><next>
<block type="scene_add">
<field name="VAR">line</field><next>
<block type="scene_add">
<field name="VAR">x_dot</field><next>
<block type="scene_add">
<field name="VAR">y_dot</field><next>
<block type="scene_add">
<field name="VAR">label</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 30 课 · 三角形构造',
    emoji: '🔺',
    desc: 'SymPy 解方程组求三角形顶点，SSS 全等判定可视化（对应合集：三角形构造与全等条件验证）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x, y</field><next>
<block type="custom_code">
<field name="CODE">sol = solve([Eq(x**2+y**2,25), Eq((x-4)**2+y**2,9)], (x,y)); C = [s for s in sol if s[1]>0][0]; C_pt = np.array([float(C[0]), float(C[1]), 0])</field><next>
<block type="custom_code">
<field name="CODE">tri = Polygon([0,0,0], [4,0,0], C_pt, color=YELLOW, fill_opacity=0.3)</field><next>
<block type="custom_code">
<field name="CODE">labels = VGroup(MathTex('A(0,0)').next_to([0,0,0], DL), MathTex('B(4,0)').next_to([4,0,0], DR), MathTex(f'C({float(C[0]):.1f},{float(C[1]):.1f})').next_to(C_pt, UP))</field><next>
<block type="animate_create">
<field name="VAR">tri</field><field name="DURATION">2</field><next>
<block type="animate_write">
<field name="VAR">labels</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 31 课 · 因式分解拼图（SymPy）',
    emoji: '🧩',
    desc: 'SymPy 因式分解 + 自动生成矩形面积拼图，展示十字相乘几何意义（对应合集：用SymPy自动因式分解）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_rectangle" x="30" y="30">
<field name="VAR">sq_x2</field><field name="W">2</field><field name="H">2</field><field name="X">0</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">sq_x2</field><field name="COLOR">BLUE</field><next>
<block type="property_fill_opacity">
<field name="VAR">sq_x2</field><field name="OPACITY">0.4</field><next>
<block type="object_rectangle">
<field name="VAR">rec_3x</field><field name="W">3</field><field name="H">2</field><field name="X">2.5</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">rec_3x</field><field name="COLOR">RED</field><next>
<block type="property_fill_opacity">
<field name="VAR">rec_3x</field><field name="OPACITY">0.4</field><next>
<block type="object_rectangle">
<field name="VAR">rec_2x</field><field name="W">2</field><field name="H">2</field><field name="X">0</field><field name="Y">2</field><next>
<block type="property_color">
<field name="VAR">rec_2x</field><field name="COLOR">RED</field><next>
<block type="property_fill_opacity">
<field name="VAR">rec_2x</field><field name="OPACITY">0.4</field><next>
<block type="object_rectangle">
<field name="VAR">rec_6</field><field name="W">3</field><field name="H">2</field><field name="X">2.5</field><field name="Y">2</field><next>
<block type="property_color">
<field name="VAR">rec_6</field><field name="COLOR">GREEN</field><next>
<block type="property_fill_opacity">
<field name="VAR">rec_6</field><field name="OPACITY">0.4</field><next>
<block type="object_math_tex">
<field name="VAR">formula</field><field name="TEX">x^2 + 5x + 6 = (x+2)(x+3)</field><field name="X">0</field><field name="Y">3.5</field><next>
<block type="object_math_tex">
<field name="VAR">label_x2</field><field name="TEX">x^2</field><field name="X">0</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">label_x2</field><field name="COLOR">BLUE</field><next>
<block type="object_math_tex">
<field name="VAR">label_3x</field><field name="TEX">3x</field><field name="X">2.5</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">label_3x</field><field name="COLOR">RED</field><next>
<block type="object_math_tex">
<field name="VAR">label_2x</field><field name="TEX">2x</field><field name="X">0</field><field name="Y">2</field><next>
<block type="property_color">
<field name="VAR">label_2x</field><field name="COLOR">RED</field><next>
<block type="object_math_tex">
<field name="VAR">label_6</field><field name="TEX">6</field><field name="X">2.5</field><field name="Y">2</field><next>
<block type="property_color">
<field name="VAR">label_6</field><field name="COLOR">GREEN</field><next>
<block type="scene_play">
<field name="VAR">formula</field><field name="ANIM">Write</field><next>
<block type="scene_play">
<field name="VAR">sq_x2</field><field name="ANIM">Create</field><next>
<block type="scene_play">
<field name="VAR">rec_3x</field><field name="ANIM">Create</field><next>
<block type="scene_play">
<field name="VAR">rec_2x</field><field name="ANIM">Create</field><next>
<block type="scene_play">
<field name="VAR">rec_6</field><field name="ANIM">Create</field><next>
<block type="scene_play">
<field name="VAR">label_x2</field><field name="ANIM">Write</field><next>
<block type="scene_play">
<field name="VAR">label_3x</field><field name="ANIM">Write</field><next>
<block type="scene_play">
<field name="VAR">label_2x</field><field name="ANIM">Write</field><next>
<block type="scene_play">
<field name="VAR">label_6</field><field name="ANIM">Write</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 32 课 · 知觉错觉',
    emoji: '👁️',
    desc: '用积木搭建动态艾宾浩斯错觉——橙色圆大小不变，周围圆大小变化让人产生错觉（对应合集：探索视觉的边界）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_circle" x="30" y="30">
<field name="VAR">center1</field><field name="X">-2</field><field name="Y">2</field><next>
<block type="property_color">
<field name="VAR">center1</field><field name="COLOR">ORANGE</field><next>
<block type="property_fill_opacity">
<field name="VAR">center1</field><field name="OPACITY">1</field><next>
<block type="property_stroke_width">
<field name="VAR">center1</field><field name="W">0</field><next>
<block type="object_circle">
<field name="VAR">center2</field><field name="X">0</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">center2</field><field name="COLOR">ORANGE</field><next>
<block type="property_fill_opacity">
<field name="VAR">center2</field><field name="OPACITY">1</field><next>
<block type="property_stroke_width">
<field name="VAR">center2</field><field name="W">0</field><next>
<block type="object_circular_arrangement">
<field name="CENTER">center1</field><field name="COUNT">6</field><field name="RADIUS">0.4</field><field name="CRADIUS">0.1</field><field name="COLOR">PURE_BLUE</field><field name="VAR">ring_small</field><next>
<block type="object_group">
<field name="A">center1</field><field name="B">ring_small</field><field name="VAR">group_a</field><next>
<block type="object_circular_arrangement">
<field name="CENTER">center2</field><field name="COUNT">6</field><field name="RADIUS">1.5</field><field name="CRADIUS">0.7</field><field name="COLOR">PURE_BLUE</field><field name="VAR">ring_large</field><next>
<block type="object_group">
<field name="A">center2</field><field name="B">ring_large</field><field name="VAR">group_b</field><next>
<block type="scene_add">
<field name="VAR">group_a</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_replacement_transform">
<field name="OBJ">group_a</field><field name="TARGET">group_b</field><next>
<block type="animate_replacement_transform">
<field name="OBJ">group_b</field><field name="TARGET">group_a</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 33 课 · 动态交点',
    emoji: '📐',
    desc: 'SymPy 解直线方程 + Manim 更新器实现动态交点计算（对应合集：用Manim实现动态交点计算）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x, y, k, b</field><next>
<block type="custom_code">
<field name="CODE">def get_line(p1,p2): sol=solve([Eq(p1[0]*k+b,p1[1]),Eq(p2[0]*k+b,p2[1])],(k,b),dict=True)[0]; return float(sol[k]),float(sol[b])</field><next>
<block type="custom_code">
<field name="CODE">def cross_point(l1k,l1b,l2k,l2b): sol=solve([Eq(l1k*x+l1b,y),Eq(l2k*x+l2b,y)],(x,y),dict=True)[0]; return np.array([float(sol[x]),float(sol[y]),0])</field><next>
<block type="custom_code">
<field name="CODE">pts = {"A":[-2.5,2,0],"B":[-2.5,-3,0],"C":[2.5,-3,0],"D":[2.5,2,0]}; rect = Polygon(*[pts[k] for k in ["A","B","C","D"]], stroke_width=3, color=GREEN)</field><next>
<block type="custom_code">
<field name="CODE">E = Dot([-0.52,2,0], color=BLUE); F = Dot([0.52,2,0], color=BLUE); H = Dot([0,0,0], color=YELLOW)</field><next>
<block type="custom_code">
<field name="CODE">F.add_updater(lambda z: z.become(Dot(pts["D"]-(E.get_center()-pts["A"]), color=BLUE))); H.add_updater(lambda z: z.become(Dot(cross_point(*get_line(pts["B"],E.get_center()),*get_line(pts["C"],F.get_center())), color=YELLOW)))</field><next>
<block type="custom_code">
<field name="CODE">self.play(Create(rect), Create(VGroup(E, F, H)))</field><next>
<block type="custom_code">
<field name="CODE">self.play(E.animate.shift(LEFT*1.5), run_time=3)</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
];

function loadExample(index) {
  const example = EXAMPLES[index];
  if (!example) return;

  // 清空工作区
  workspace.clear();

  try {
    // 解析 XML 并加载
    const dom = Blockly.utils.xml.textToDom(example.xml);
    Blockly.Xml.domToWorkspace(dom, workspace);
  } catch (e) {
    console.error('加载示例失败:', e);
    alert('加载示例失败: ' + e.message);
    return;
  }

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

// ── 教程模态框 ──────────────────────────────────────

const examplesModal = document.getElementById('examplesModal');
const examplesGrid = document.getElementById('examplesGrid');

// 生成课程卡片（按当前选中的 level 过滤）
let currentLevel = 'basic';
function renderCourses() {
  examplesGrid.innerHTML = '';
  EXAMPLES.forEach((ex, i) => {
    if (ex.level !== currentLevel) return;
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
}
renderCourses();

// 基础 / 进阶 / SymPy 标签切换
document.querySelectorAll('.course-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.course-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentLevel = tab.dataset.level;
    // 显示/隐藏 SymPy 说明
    const note = document.getElementById('sympyNote');
    if (note) note.style.display = currentLevel === 'sympy' ? 'block' : 'none';
    renderCourses();
  });
});

document.getElementById('examplesBtn').addEventListener('click', () => {
  examplesModal.classList.remove('hidden');
});

// ── 💬 讨论按钮 → GitHub Discussions ─────────────────

document.getElementById('discussBtn').addEventListener('click', () => {
  window.open('https://github.com/Kaoyusiliao/manim-blocks/discussions', '_blank');
});

// ── 💖 赞助按钮 → 收款码弹窗 ─────────────────────────

const sponsorModal = document.getElementById('sponsorModal');

document.getElementById('sponsorBtn').addEventListener('click', () => {
  sponsorModal.classList.remove('hidden');
});

// 关闭模态框（点背景或 ✕）
document.querySelectorAll('[data-close-modal]').forEach(el => {
  el.addEventListener('click', () => {
    examplesModal.classList.add('hidden');
    sponsorModal.classList.add('hidden');
  });
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

// ── ▶ 运行按钮 → 渲染服务器 ──────────────────────────

const RENDER_URL = 'http://127.0.0.1:3081/render';
const runBtn = document.getElementById('runBtn');
const qualitySelect = document.getElementById('qualitySelect');
const videoContainer = document.getElementById('videoContainer');
const videoPlayer = document.getElementById('videoPlayer');
const videoStatus = document.getElementById('videoStatus');
const renderBadge = document.getElementById('renderBadge');

// 检测服务器状态（仅作显示，不禁用按钮）
async function checkRenderServer() {
  try {
    const res = await fetch('http://127.0.0.1:3081/health', {
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      renderBadge.textContent = '● 在线';
      renderBadge.className = 'render-badge online';
    } else {
      throw new Error('not ok');
    }
  } catch {
    renderBadge.textContent = '● 离线';
    renderBadge.className = 'render-badge offline';
  }
}

checkRenderServer();
setInterval(checkRenderServer, 10000);

// 运行按钮（始终可点，失败时显示错误）
runBtn.addEventListener('click', async () => {
  const code = generateCode(workspace);
  if (!code.trim() || code.includes('pass  # ⚠️')) {
    videoContainer.classList.remove('hidden');
    videoStatus.textContent = '⚠️ 先把积木拼成程序再运行';
    videoStatus.className = 'error';
    return;
  }

  runBtn.disabled = true;
  runBtn.textContent = '⏳ 渲染中…';
  videoContainer.classList.remove('hidden');
  videoPlayer.src = '';
  videoStatus.textContent = '🎬 正在渲染，请稍候…';
  videoStatus.className = '';

  try {
    const res = await fetch(RENDER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        scene: 'MyScene',
        quality: qualitySelect.value,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || `HTTP ${res.status}`);
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    videoPlayer.src = url;
    videoPlayer.load();
    videoStatus.textContent = '✅ 渲染完成！点击 ▶ 播放';
    videoStatus.className = 'success';
  } catch (e) {
    const msg = e.message;
    if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('ERR_CONNECTION_REFUSED')) {
      videoStatus.textContent = '❌ 渲染服务器未启动，请先启动渲染服务器';
    } else {
      videoStatus.textContent = '❌ ' + msg;
    }
    videoStatus.className = 'error';
  } finally {
    runBtn.disabled = false;
    runBtn.textContent = '▶ 运行';
  }
});

// ── 快速开始复制按钮 ──────────────────────────────

// 检测操作系统，显示正确的命令
(function detectOS() {
  const cmdStart = document.getElementById('cmdStart');
  const cmdInstall = document.getElementById('cmdInstall');
  const qsHint = document.getElementById('qsHint');
  const qsCopyBtn = document.getElementById('qsCopyBtn');
  if (!cmdStart) return;

  const isWin = navigator.userAgent.includes('Windows');
  const startCmd = isWin ? 'py -3 render_server.py' : 'python3 render_server.py';
  const installCmd = 'pip install manim';
  const hint = isWin
    ? '在项目文件夹中运行（或双击 start.bat）'
    : '在项目文件夹中运行（或双击 start.command）';

  cmdStart.textContent = startCmd;
  if (cmdInstall) cmdInstall.textContent = installCmd;
  qsHint.textContent = hint;

  qsCopyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(startCmd).then(() => {
      qsCopyBtn.textContent = '✅';
      setTimeout(() => (qsCopyBtn.textContent = '📋'), 2000);
    });
  });
})();