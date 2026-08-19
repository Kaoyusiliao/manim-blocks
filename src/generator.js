/**
 * Manim Blocks —— Python 代码生成器 (v2)
 *
 * 支持 5 种积木类型：
 *   statement   → 单行语句
 *   C-block     → 控制结构（重复/如果/循环）+ 递归子积木
 *   reporter    → 值表达式（嵌入其他积木）
 *   boolean     → 布尔表达式
 *   hat         → 事件起点
 */

// ── 工具函数 ──────────────────────────────────────────

function _v(b, n) { return b.getFieldValue(n); }
function indent(n) { return '    '.repeat(n); }

// ── 值积木生成器（返回 Python 表达式字符串）───────────

const valueGens = {};

/** 解析任意值积木 → Python 表达式 */
function valueBlock(block) {
  if (!block) return '0';

  // var_get — 变量名直接作为表达式
  if (block.type === 'var_get') return block.getFieldValue('VAR');

  // math_number — 数字字面量
  if (block.type === 'math_number') return block.getFieldValue('NUM');

  // logic_boolean — 布尔字面量
  if (block.type === 'logic_boolean') {
    return block.getFieldValue('BOOL') === 'True' ? 'True' : 'False';
  }

  // op_string — 字符串字面量
  if (block.type === 'op_string') {
    return `"${block.getFieldValue('TEXT')}"`;
  }

  const vg = valueGens[block.type];
  if (vg) return vg(block);

  // 兜底：检查是否有 NUM 字段
  const num = block.getFieldValue('NUM');
  if (num !== null) return num;

  return '0';
}

// ── 数学运算 ──────────────────────────────────────────

valueGens.op_add = (b) =>
  `(${valueBlock(b.getInputTargetBlock('A'))} + ${valueBlock(b.getInputTargetBlock('B'))})`;

valueGens.op_subtract = (b) =>
  `(${valueBlock(b.getInputTargetBlock('A'))} - ${valueBlock(b.getInputTargetBlock('B'))})`;

valueGens.op_multiply = (b) =>
  `(${valueBlock(b.getInputTargetBlock('A'))} * ${valueBlock(b.getInputTargetBlock('B'))})`;

valueGens.op_divide = (b) =>
  `(${valueBlock(b.getInputTargetBlock('A'))} / ${valueBlock(b.getInputTargetBlock('B'))})`;

valueGens.op_mod = (b) =>
  `(${valueBlock(b.getInputTargetBlock('A'))} % ${valueBlock(b.getInputTargetBlock('B'))})`;

valueGens.op_pow = (b) =>
  `(${valueBlock(b.getInputTargetBlock('A'))} ** ${valueBlock(b.getInputTargetBlock('B'))})`;

valueGens.op_random = (b) =>
  `random.randint(${valueBlock(b.getInputTargetBlock('A'))}, ${valueBlock(b.getInputTargetBlock('B'))})`;

valueGens.op_round = (b) => `round(${valueBlock(b.getInputTargetBlock('NUM'))})`;
valueGens.op_abs   = (b) => `abs(${valueBlock(b.getInputTargetBlock('NUM'))})`;
valueGens.op_sin   = (b) => `math.sin(${valueBlock(b.getInputTargetBlock('NUM'))})`;
valueGens.op_cos   = (b) => `math.cos(${valueBlock(b.getInputTargetBlock('NUM'))})`;
valueGens.op_tan   = (b) => `math.tan(${valueBlock(b.getInputTargetBlock('NUM'))})`;
valueGens.op_sqrt  = (b) => `math.sqrt(${valueBlock(b.getInputTargetBlock('NUM'))})`;

// ── 比较运算 ──────────────────────────────────────────

valueGens.op_gt = (b) =>
  `(${valueBlock(b.getInputTargetBlock('A'))} > ${valueBlock(b.getInputTargetBlock('B'))})`;

valueGens.op_lt = (b) =>
  `(${valueBlock(b.getInputTargetBlock('A'))} < ${valueBlock(b.getInputTargetBlock('B'))})`;

valueGens.op_eq = (b) =>
  `(${valueBlock(b.getInputTargetBlock('A'))} == ${valueBlock(b.getInputTargetBlock('B'))})`;

// ── 逻辑运算 ──────────────────────────────────────────

valueGens.op_and = (b) =>
  `(${valueBlock(b.getInputTargetBlock('A'))} and ${valueBlock(b.getInputTargetBlock('B'))})`;

valueGens.op_or = (b) =>
  `(${valueBlock(b.getInputTargetBlock('A'))} or ${valueBlock(b.getInputTargetBlock('B'))})`;

valueGens.op_not = (b) =>
  `(not ${valueBlock(b.getInputTargetBlock('A'))})`;

// ── 字符串 ────────────────────────────────────────────

valueGens.op_join = (b) =>
  `(${valueBlock(b.getInputTargetBlock('A'))} + ${valueBlock(b.getInputTargetBlock('B'))})`;

// ── 语句积木生成器 ────────────────────────────────────

const codeGens = {};

/**
 * 递归生成一组相连积木的 Python 代码
 * @param {Blockly.Block} firstBlock - 链首积木
 * @param {number} n - 缩进级别（2 = def construct 内）
 * @returns {string} Python 代码
 */
function blockChainToCode(firstBlock, n) {
  const lines = [];
  let b = firstBlock;
  while (b) {
    const gen = codeGens[b.type];
    if (gen) {
      const result = gen(b, n);
      if (result) lines.push(result);
    } else {
      lines.push(indent(n) + `pass  # 未知积木: ${b.type}`);
    }
    b = b.getNextBlock();
  }
  return lines.join('\n');
}

// ── 🔵 物体 ──────────────────────────────────────────

/** 如果坐标非零则附加 .move_to() */
function maybeMoveTo(block, n) {
  const x = _v(block, 'X'), y = _v(block, 'Y');
  if (x !== '0' || y !== '0') {
    return `\n${indent(n)}${_v(block, 'VAR')}.move_to(${x} * RIGHT + ${y} * UP)`;
  }
  return '';
}

codeGens.object_circle = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Circle()` + maybeMoveTo(b, n);

codeGens.object_square = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Square()` + maybeMoveTo(b, n);

codeGens.object_triangle = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Triangle()` + maybeMoveTo(b, n);

codeGens.object_dot = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Dot()` + maybeMoveTo(b, n);

codeGens.object_rectangle = (b, n) => {
  let code = indent(n) + `${_v(b, 'VAR')} = Rectangle(width=${_v(b, 'W')}, height=${_v(b, 'H')})`;
  return code + maybeMoveTo(b, n);
};

codeGens.object_regular_polygon = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = RegularPolygon(n=${_v(b, 'N')})` + maybeMoveTo(b, n);

codeGens.object_line = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Line([${_v(b, 'X1')}, ${_v(b, 'Y1')}, 0], [${_v(b, 'X2')}, ${_v(b, 'Y2')}, 0])`;

codeGens.object_tex = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Tex(r"${_v(b, 'TEX')}")` + maybeMoveTo(b, n);

codeGens.object_math_tex = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = MathTex(r"${_v(b, 'TEX')}")` + maybeMoveTo(b, n);

codeGens.object_text = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Text("${_v(b, 'CONTENT')}")` + maybeMoveTo(b, n);

// ── 进阶形状 ──────────────────────────────────────────

codeGens.object_rounded_rectangle = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = RoundedRectangle(width=${_v(b, 'W')}, height=${_v(b, 'H')}, corner_radius=${_v(b, 'R')})` +
  maybeMoveTo(b, n);

codeGens.object_polygon = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Polygon(${_v(b, 'VERTS')})`;

codeGens.object_ellipse = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Ellipse(width=${_v(b, 'W')}, height=${_v(b, 'H')})` +
  maybeMoveTo(b, n);

codeGens.object_arrow = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Arrow([${_v(b, 'X1')}, ${_v(b, 'Y1')}, 0], [${_v(b, 'X2')}, ${_v(b, 'Y2')}, 0])`;

codeGens.object_dashed_line = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = DashedLine([${_v(b, 'X1')}, ${_v(b, 'Y1')}, 0], [${_v(b, 'X2')}, ${_v(b, 'Y2')}, 0])`;

codeGens.object_arc = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Arc(radius=${_v(b, 'R')}, angle=${_v(b, 'ANGLE')} * DEGREES)` +
  maybeMoveTo(b, n);

codeGens.object_sector = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Sector(radius=${_v(b, 'R')}, angle=${_v(b, 'ANGLE')} * DEGREES)` +
  maybeMoveTo(b, n);

// ── 进阶文字 ──────────────────────────────────────────

codeGens.object_markup_text = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = MarkupText("${_v(b, 'CONTENT')}")` + maybeMoveTo(b, n);

codeGens.object_title = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Title("${_v(b, 'CONTENT')}")` + maybeMoveTo(b, n);

codeGens.object_bulleted_list = (b, n) => {
  const items = _v(b, 'CONTENT').split(',').map(s => s.trim()).filter(Boolean);
  const quoted = items.map(s => `"${s}"`).join(', ');
  return indent(n) + `${_v(b, 'VAR')} = BulletedList(${quoted})` + maybeMoveTo(b, n);
};

codeGens.object_code_block = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Code(code_string="${_v(b, 'CONTENT')}", language="python", font_size=24)` +
  maybeMoveTo(b, n);

// ── 进阶坐标 ──────────────────────────────────────────

codeGens.object_number_plane = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = NumberPlane(x_range=[${_v(b, 'XMIN')}, ${_v(b, 'XMAX')}], ` +
  `y_range=[${_v(b, 'YMIN')}, ${_v(b, 'YMAX')}], ` +
  `background_line_style={"stroke_opacity": 0.5})` +
  maybeMoveTo(b, n);

codeGens.object_number_line = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = NumberLine(x_range=[${_v(b, 'XMIN')}, ${_v(b, 'XMAX')}], length=${_v(b, 'LEN')}, include_numbers=True)` +
  maybeMoveTo(b, n);

codeGens.object_polar_plane = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = PolarPlane(radius_max=${_v(b, 'RMAX')})` +
  maybeMoveTo(b, n);

codeGens.object_axes = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Axes(x_range=[${_v(b, 'XMIN')}, ${_v(b, 'XMAX')}], ` +
  `y_range=[${_v(b, 'YMIN')}, ${_v(b, 'YMAX')}], ` +
  `x_length=6, y_length=4, axis_config={"include_numbers": True})`;
codeGens.object_graph = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = ${_v(b, 'AXES')}.plot(lambda x: ${_v(b, 'VAR')}_fn(x), color=YELLOW)`;

// ── 🟢 属性 ──────────────────────────────────────────

codeGens.property_color   = (b, n) =>
  indent(n) + `${_v(b, 'VAR')}.set_color(${b.getFieldValue('COLOR')})`;
codeGens.property_color_rgb = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')}.set_fill("${_v(b, 'FILL')}").set_stroke(color="${_v(b, 'STROKE')}")`;
codeGens.property_opacity  = (b, n) =>
  indent(n) + `${_v(b, 'VAR')}.set_opacity(${_v(b, 'OPACITY')})`;
codeGens.property_scale    = (b, n) =>
  indent(n) + `${_v(b, 'VAR')}.scale(${_v(b, 'SCALE')})`;
codeGens.property_rotate   = (b, n) =>
  indent(n) + `${_v(b, 'VAR')}.rotate(${_v(b, 'ANGLE')} * DEGREES)`;
codeGens.property_move_to  = (b, n) =>
  indent(n) + `${_v(b, 'VAR')}.move_to(${_v(b, 'X')} * RIGHT + ${_v(b, 'Y')} * UP)`;
codeGens.property_shift    = (b, n) =>
  indent(n) + `${_v(b, 'VAR')}.shift(${_v(b, 'DX')} * RIGHT + ${_v(b, 'DY')} * UP)`;
codeGens.property_next_to  = (b, n) =>
  indent(n) + `${_v(b, 'VAR')}.next_to(${_v(b, 'TARGET')}, ${b.getFieldValue('DIR')})`;

// ── 🟠 动画 ──────────────────────────────────────────

codeGens.animate_create = (b, n) =>
  indent(n) + `self.play(Create(${_v(b, 'VAR')}))`;
codeGens.animate_fade_in = (b, n) =>
  indent(n) + `self.play(FadeIn(${_v(b, 'VAR')}))`;
codeGens.animate_fade_out = (b, n) =>
  indent(n) + `self.play(FadeOut(${_v(b, 'VAR')}))`;
codeGens.animate_grow_from_center = (b, n) =>
  indent(n) + `self.play(GrowFromCenter(${_v(b, 'VAR')}))`;
codeGens.animate_write = (b, n) =>
  indent(n) + `self.play(Write(${_v(b, 'VAR')}))`;
codeGens.animate_unwrite = (b, n) =>
  indent(n) + `self.play(Unwrite(${_v(b, 'VAR')}))`;
codeGens.animate_shift = (b, n) =>
  indent(n) +
  `self.play(${_v(b, 'VAR')}.animate.shift(${_v(b, 'DX')} * RIGHT + ${_v(b, 'DY')} * UP))`;
codeGens.animate_scale = (b, n) =>
  indent(n) + `self.play(${_v(b, 'VAR')}.animate.scale(${_v(b, 'SCALE')}))`;
codeGens.animate_rotate = (b, n) =>
  indent(n) + `self.play(Rotate(${_v(b, 'VAR')}, ${_v(b, 'ANGLE')} * DEGREES))`;
codeGens.animate_spin = (b, n) =>
  indent(n) + `self.play(Rotate(${_v(b, 'VAR')}, TAU * ${_v(b, 'TURNS')}))`;
codeGens.animate_transform = (b, n) =>
  indent(n) + `self.play(Transform(${_v(b, 'OBJ')}, ${_v(b, 'TARGET')}))`;

// ── 进阶动画 ──────────────────────────────────────────

codeGens.animate_replacement_transform = (b, n) =>
  indent(n) + `self.play(ReplacementTransform(${_v(b, 'OBJ')}, ${_v(b, 'TARGET')}))`;

codeGens.animate_draw_then_fill = (b, n) =>
  indent(n) + `self.play(DrawBorderThenFill(${_v(b, 'VAR')}))`;

codeGens.animate_uncreate = (b, n) =>
  indent(n) + `self.play(Uncreate(${_v(b, 'VAR')}))`;

codeGens.animate_flash = (b, n) =>
  indent(n) + `self.play(Flash(${_v(b, 'VAR')}, line_length=1, num_lines=${_v(b, 'COUNT')}))`;

codeGens.animate_indicate = (b, n) =>
  indent(n) + `self.play(Indicate(${_v(b, 'VAR')}))`;

codeGens.animate_spiral_in = (b, n) =>
  indent(n) + `self.play(SpiralIn(${_v(b, 'VAR')}))`;

codeGens.animate_shrink_to_center = (b, n) =>
  indent(n) + `self.play(ShrinkToCenter(${_v(b, 'VAR')}))`;

codeGens.animate_fade_transform = (b, n) =>
  indent(n) + `self.play(FadeTransform(${_v(b, 'OBJ')}, ${_v(b, 'TARGET')}))`;

codeGens.animate_wiggle = (b, n) =>
  indent(n) + `self.play(Wiggle(${_v(b, 'VAR')}))`;

codeGens.animate_apply_method = (b, n) => {
  const method = _v(b, 'METHOD').trim();
  if (method.includes(',')) {
    const [name, ...args] = method.split(',').map(s => s.trim());
    return indent(n) + `self.play(ApplyMethod(${_v(b, 'OBJ')}.${name}, ${args.join(', ')}))`;
  }
  return indent(n) + `self.play(ApplyMethod(${_v(b, 'OBJ')}.${method}))`;
};

// ── 样式属性 ──────────────────────────────────────────

codeGens.property_stroke_width = (b, n) =>
  indent(n) + `${_v(b, 'VAR')}.set_stroke(width=${_v(b, 'W')})`;

codeGens.property_fill_opacity = (b, n) =>
  indent(n) + `${_v(b, 'VAR')}.set_fill(opacity=${_v(b, 'OPACITY')})`;

codeGens.property_flip = (b, n) =>
  indent(n) + `${_v(b, 'VAR')}.flip(${b.getFieldValue('AXIS')})`;

// ── 🔴 场景 ──────────────────────────────────────────

codeGens.scene_wait   = (b, n) => indent(n) + `self.wait(${_v(b, 'SECONDS')})`;
codeGens.scene_add    = (b, n) => indent(n) + `self.add(${_v(b, 'VAR')})`;
codeGens.scene_remove = (b, n) => indent(n) + `self.remove(${_v(b, 'VAR')})`;
codeGens.scene_play   = (b, n) => {
  const anim = b.getFieldValue('ANIM');
  return indent(n) + `self.play(${anim}(${_v(b, 'VAR')}))`;
};

// ── 🟣 控制 (C-blocks) ───────────────────────────────

codeGens.control_repeat = (b, n) => {
  const times = _v(b, 'TIMES');
  const inner = b.getInputTargetBlock('DO');
  const body = inner ? blockChainToCode(inner, n + 1) : indent(n + 1) + 'pass';
  return `${indent(n)}for _ in range(${times}):\n${body}`;
};

codeGens.control_forever = (b, n) => {
  const inner = b.getInputTargetBlock('DO');
  const body = inner ? blockChainToCode(inner, n + 1) : indent(n + 1) + 'pass';
  return `${indent(n)}while True:\n${body}`;
};

codeGens.control_if = (b, n) => {
  const cond = valueBlock(b.getInputTargetBlock('COND'));
  const inner = b.getInputTargetBlock('DO');
  const body = inner ? blockChainToCode(inner, n + 1) : indent(n + 1) + 'pass';
  return `${indent(n)}if ${cond}:\n${body}`;
};

codeGens.control_if_else = (b, n) => {
  const cond = valueBlock(b.getInputTargetBlock('COND'));
  const doBlock = b.getInputTargetBlock('DO');
  const elseBlock = b.getInputTargetBlock('ELSE');
  const doBody = doBlock ? blockChainToCode(doBlock, n + 1) : indent(n + 1) + 'pass';
  const elseBody = elseBlock ? blockChainToCode(elseBlock, n + 1) : indent(n + 1) + 'pass';
  return `${indent(n)}if ${cond}:\n${doBody}\n${indent(n)}else:\n${elseBody}`;
};

codeGens.control_wait_until = (b, n) => {
  const cond = valueBlock(b.getInputTargetBlock('COND'));
  return `${indent(n)}while not (${cond}):\n${indent(n + 1)}self.wait(0.1)`;
};

// ── 🔷 变量 ──────────────────────────────────────────

codeGens.var_set = (b, n) => {
  const val = valueBlock(b.getInputTargetBlock('VALUE'));
  return indent(n) + `${_v(b, 'VAR')} = ${val}`;
};

codeGens.var_change = (b, n) => {
  const delta = valueBlock(b.getInputTargetBlock('DELTA'));
  return indent(n) + `${_v(b, 'VAR')} += ${delta}`;
};

// ── 📋 列表 ──────────────────────────────────────────

codeGens.list_create = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = []`;

codeGens.list_append = (b, n) =>
  indent(n) + `${_v(b, 'VAR')}.append(${valueBlock(b.getInputTargetBlock('ITEM'))})`;

codeGens.list_for_each = (b, n) => {
  const list = _v(b, 'LIST');
  const item = _v(b, 'ITEM');
  const inner = b.getInputTargetBlock('DO');
  const body = inner ? blockChainToCode(inner, n + 1) : indent(n + 1) + 'pass';
  return `${indent(n)}for ${item} in ${list}:\n${body}`;
};

// ── 🎩 事件 ──────────────────────────────────────────

codeGens.event_start = (b, n) => indent(n) + '# 场景开始';

// ── ⬜ 辅助 — 值块放在语句中视为独立表达式 ──────────────

codeGens.math_number   = (b, n) => indent(n) + `_ = ${_v(b, 'NUM')}`;
codeGens.logic_boolean  = (b, n) => indent(n) + `_ = ${_v(b, 'BOOL') === 'True' ? 'True' : 'False'}`;

// ── 主生成函数 ────────────────────────────────────────

/**
 * 将 Blockly 工作区中的顶层积木转换为完整的 Manim Python 脚本。
 * @param {Blockly.Workspace} workspace
 * @returns {string} 完整的 .py 文件内容
 */
export function generateCode(workspace) {
  const topBlocks = workspace.getTopBlocks(true);

  // 检测是否需要 import random/math
  let needsRandom = false;
  let needsMath = false;

  for (const block of topBlocks) {
    const types = collectBlockTypes(block);
    if (types.has('op_random')) needsRandom = true;
    if (types.has('op_sin') || types.has('op_cos') || types.has('op_tan') || types.has('op_sqrt'))
      needsMath = true;
  }

  // 生成 imports
  const imports = ['from manim import *'];
  if (needsRandom) imports.push('import random');
  if (needsMath) imports.push('import math');

  // 生成 body
  const body = topBlocks.length > 0
    ? blockChainToCode(topBlocks[0], 2)
    : indent(2) + 'pass  # 拖拽左侧积木开始创作';

  // 自动补 wait
  const lastType = topBlocks.length > 0 ? topBlocks[topBlocks.length - 1].type : null;
  const extraWait = lastType !== 'scene_wait' ? indent(2) + 'self.wait(1)' : '';

  return `${imports.join('\n')}

class MyScene(Scene):
    def construct(self):
${body}
${extraWait}
`;
}

/** 递归收集一个积木及其所有子积木的类型 */
function collectBlockTypes(block, set = new Set()) {
  if (!block) return set;
  set.add(block.type);
  for (const input of block.inputList) {
    if (input.connection) {
      const target = input.connection.targetBlock();
      if (target) collectBlockTypes(target, set);
    }
  }
  const next = block.getNextBlock();
  if (next) collectBlockTypes(next, set);
  return set;
}