/**
 * Manim Blocks —— Python 代码生成器
 *
 * 每个块类型对应一个生成函数，接收 block 实例，返回一行或多行 Python 代码（不含缩进）。
 * generateCode(workspace) 遍历顶层块，拼接成完整的 Manim Scene 类。
 */

// ── 单个块的代码生成器 ────────────────────────────────

const generators = {};

function _var(block, fieldName = 'VAR') {
  return block.getFieldValue(fieldName);
}
function _num(block, fieldName) {
  return block.getFieldValue(fieldName);
}

// 🔵 物体

generators.object_circle = (b) => `${_var(b)} = Circle()`;
generators.object_square = (b) => `${_var(b)} = Square()`;
generators.object_rectangle = (b) => `${_var(b)} = Rectangle(width=${_num(b, 'W')}, height=${_num(b, 'H')})`;
generators.object_triangle = (b) => `${_var(b)} = Triangle()`;
generators.object_regular_polygon = (b) => `${_var(b)} = RegularPolygon(n=${_num(b, 'N')})`;
generators.object_dot = (b) => `${_var(b)} = Dot()`;
generators.object_line = (b) =>
  `${_var(b)} = Line([${_num(b, 'X1')}, ${_num(b, 'Y1')}, 0], [${_num(b, 'X2')}, ${_num(b, 'Y2')}, 0])`;
generators.object_tex = (b) => `${_var(b)} = Tex(r"${_num(b, 'TEX')}")`;
generators.object_math_tex = (b) => `${_var(b)} = MathTex(r"${_num(b, 'TEX')}")`;
generators.object_text = (b) => `${_var(b)} = Text("${_num(b, 'CONTENT')}")`;

// 🟢 属性

generators.property_color = (b) => `${_var(b)}.set_color(${b.getFieldValue('COLOR')})`;
generators.property_opacity = (b) => `${_var(b)}.set_opacity(${_num(b, 'OPACITY')})`;
generators.property_scale = (b) => `${_var(b)}.scale(${_num(b, 'SCALE')})`;
generators.property_rotate = (b) => `${_var(b)}.rotate(${_num(b, 'ANGLE')} * DEGREES)`;
generators.property_move_to = (b) =>
  `${_var(b)}.move_to(${_num(b, 'X')} * RIGHT + ${_num(b, 'Y')} * UP)`;
generators.property_shift = (b) =>
  `${_var(b)}.shift(${_num(b, 'DX')} * RIGHT + ${_num(b, 'DY')} * UP)`;
generators.property_next_to = (b) =>
  `${_var(b)}.next_to(${_var(b, 'TARGET')}, ${b.getFieldValue('DIR')})`;

// 🟠 动画

generators.animate_create = (b) => `self.play(Create(${_var(b)}))`;
generators.animate_fade_in = (b) => `self.play(FadeIn(${_var(b)}))`;
generators.animate_fade_out = (b) => `self.play(FadeOut(${_var(b)}))`;
generators.animate_shift = (b) =>
  `self.play(${_var(b)}.animate.shift(${_num(b, 'DX')} * RIGHT + ${_num(b, 'DY')} * UP))`;
generators.animate_scale = (b) => `self.play(${_var(b)}.animate.scale(${_num(b, 'SCALE')}))`;
generators.animate_rotate = (b) =>
  `self.play(Rotate(${_var(b)}, ${_num(b, 'ANGLE')} * DEGREES))`;
generators.animate_transform = (b) => `self.play(Transform(${_var(b, 'OBJ')}, ${_var(b, 'TARGET')}))`;
generators.animate_write = (b) => `self.play(Write(${_var(b)}))`;
generators.animate_unwrite = (b) => `self.play(Unwrite(${_var(b)}))`;

// 🔴 场景

generators.scene_wait = (b) => `self.wait(${_num(b, 'SECONDS')})`;
generators.scene_add = (b) => `self.add(${_var(b)})`;
generators.scene_remove = (b) => `self.remove(${_var(b)})`;

// ── 主生成函数 ────────────────────────────────────────

/**
 * 将 Blockly 工作区中的顶层积木序列转换为完整的 Manim Python 脚本。
 * @param {Blockly.Workspace} workspace
 * @returns {string} 完整的 .py 文件内容
 */
export function generateCode(workspace) {
  const topBlocks = workspace.getTopBlocks(true); // 按 Y 坐标排序（从上到下）
  const lines = [];

  for (const block of topBlocks) {
    const fn = generators[block.type];
    if (fn) {
      const line = fn(block);
      if (line) {
        // 动画和场景块直接输出，物体和属性块需要 8 空格缩进（method 内）
        lines.push('        ' + line);
      }
    } else {
      lines.push('        # 未知积木: ' + block.type);
    }
  }

  // 如果最后一个积木不是等待，自动补一段保持画面
  const lastType = topBlocks.length > 0 ? topBlocks[topBlocks.length - 1].type : null;
  if (lastType !== 'scene_wait') {
    lines.push('        self.wait(1)');
  }

  const body = lines.join('\n');

  return `from manim import *

class MyScene(Scene):
    def construct(self):
${body}
`;
}