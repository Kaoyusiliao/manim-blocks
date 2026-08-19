/**
 * Manim Blocks —— 主入口
 *
 * 1. 注册 Blockly 积木 + 工具箱
 * 2. 注入工作区（zelos 渲染器 + 中文界面）
 * 3. 积木变更 → 自动生成 Python 代码 → 高亮预览
 * 4. 下载 / 复制 / 清空按钮
 */

import * as Blockly from 'blockly';
import 'blockly/msg/zh-hans';
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
    colour: '#2a3a5e',
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

// ── 复制代码 ──────────────────────────────────────────

document.getElementById('copyBtn').addEventListener('click', async () => {
  const code = generateCode(workspace);
  try {
    await navigator.clipboard.writeText(code);
    const btn = document.getElementById('copyBtn');
    const orig = btn.textContent;
    btn.textContent = '✅ 已复制';
    setTimeout(() => (btn.textContent = orig), 2000);
  } catch {
    // 降级：选中文本
    const ta = document.createElement('textarea');
    ta.value = code;
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