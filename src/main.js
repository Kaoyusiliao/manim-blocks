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
import { EXAMPLES } from './examples.js';
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
    controls: false,   // 内置 SVG 控件渲染不稳定，改用自定义 HTML 按钮（见 #zoomControls）
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
  },
  trashcan: false,   // 内置垃圾桶也是不稳定的 SVG，改用自定义 HTML 按钮（见 #trashBtn）
  move: {
    scrollbars: true,
    drag: true,
    wheel: true,
  },
  // 关闭右上角的帮助问号
  readOnly: false,
});

// ── 自定义缩放控制（替代 Blockly 内置不稳定的 SVG 控件）──
document.getElementById('zoomInBtn')?.addEventListener('click', () => workspace.zoomCenter(1));
document.getElementById('zoomOutBtn')?.addEventListener('click', () => workspace.zoomCenter(-1));
document.getElementById('zoomFitBtn')?.addEventListener('click', () => workspace.zoomToFit());
document.getElementById('zoomResetBtn')?.addEventListener('click', () => { workspace.setScale(1); workspace.scrollCenter(); });

// ── 自定义垃圾桶（拖入删除 + 点击删除选中积木）──
const trashBtn = document.getElementById('trashBtn');
if (trashBtn) {
  // 点击：删除当前选中的积木
  trashBtn.addEventListener('click', () => {
    const sel = Blockly.getSelected();
    if (sel) sel.dispose(true, true);
  });
  // 拖拽：松手时若积木落在垃圾桶上就删除
  workspace.addChangeListener(e => {
    if (e.type !== Blockly.Events.BLOCK_DRAG) return;
    trashBtn.classList.toggle('drag-over', e.isStart);   // 拖拽中高亮提示
    if (e.isStart) return;
    const block = workspace.getBlockById(e.blockId);
    if (!block || block.isInFlyout || block.isShadow()) return;
    const root = block.getSvgRoot();
    const ctm = root && root.getScreenCTM();
    if (!ctm) return;
    const r = trashBtn.getBoundingClientRect();
    const pad = 24; // 吸附容差，更容易拖中
    if (ctm.e > r.left - pad && ctm.e < r.right + pad && ctm.f > r.top - pad && ctm.f < r.bottom + pad) {
      block.dispose(false, true);
    }
  });
}

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
  try { updatePreview(); } catch (e) { console.error('代码预览更新失败:', e); }

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

// 渲染服务器 URL（可从 localStorage 或环境变量配置）
const RENDER_BASE = localStorage.getItem('renderBase') || 'http://127.0.0.1:3081';
const RENDER_URL = RENDER_BASE + '/render';
const HEALTH_URL = RENDER_BASE + '/health';

const runBtn = document.getElementById('runBtn');
const qualitySelect = document.getElementById('qualitySelect');
const videoContainer = document.getElementById('videoContainer');
const videoPlayer = document.getElementById('videoPlayer');
const videoStatus = document.getElementById('videoStatus');
const renderBadge = document.getElementById('renderBadge');

// 兼容旧浏览器的 AbortSignal.timeout 回退
function fetchWithTimeout(url, ms) {
  if (typeof AbortSignal.timeout === 'function') {
    return fetch(url, { signal: AbortSignal.timeout(ms) });
  }
  const ctrl = new AbortController();
  setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { signal: ctrl.signal });
}

// 检测服务器状态（仅作显示，不禁用按钮）
async function checkRenderServer() {
  try {
    const res = await fetchWithTimeout(HEALTH_URL, 2000);
    if (res.ok) {
      renderBadge.textContent = '● 在线';
      renderBadge.className = 'render-badge online';
      return;
    }
  } catch { /* fall through */ }
  renderBadge.textContent = '● 离线';
  renderBadge.className = 'render-badge offline';
}

// 点击状态徽章可配置服务器地址
renderBadge.addEventListener('click', () => {
  const url = prompt('渲染服务器地址（含端口号）：', RENDER_BASE);
  if (url) {
    localStorage.setItem('renderBase', url.replace(/\/+$/, ''));
    location.reload();
  }
});
renderBadge.title = '点击设置渲染服务器地址';

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
// 已通过 .copy-inline 按钮统一处理