/**
 * Manim Blocks — Blockly 积木定义（64 种）
 *
 * 积木类型：
 *   statement  (previous+next) → 动作块
 *   C-block    (input_statement) → 控制块，包裹子积木
 *   reporter   (output: Number/String) → 值块，嵌入其他块
 *   boolean    (output: Boolean) → 条件块，嵌入 if/while
 *   hat        (无 previous) → 事件起点
 */

/** @type {Array} 全部积木 JSON 定义 */
export const blockDefs = [

  // ════════════════════════════════════════════════════
  // 🔵 物体（Object）—— statement blocks
  // ════════════════════════════════════════════════════

  {
    type: 'object_circle',
    message0: '创建圆形 %1  坐标 (%2, %3)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'circle' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建一个圆形，设置坐标位置',
  },
  {
    type: 'object_square',
    message0: '创建方形 %1  坐标 (%2, %3)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'square' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建一个方形，设置坐标位置',
  },
  {
    type: 'object_rectangle',
    message0: '创建矩形 %1  宽 %2  高 %3  坐标 (%4, %5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'rect' },
      { type: 'field_number', name: 'W', value: 3, min: 0.1, max: 20, precision: 0.1 },
      { type: 'field_number', name: 'H', value: 2, min: 0.1, max: 20, precision: 0.1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建指定宽高的矩形，设置坐标位置',
  },
  {
    type: 'object_triangle',
    message0: '创建三角形 %1  坐标 (%2, %3)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'triangle' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建一个等边三角形，设置坐标位置',
  },
  {
    type: 'object_regular_polygon',
    message0: '创建正多边形 %1  边数 %2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'polygon' },
      { type: 'field_number', name: 'N', value: 6, min: 3, max: 24, precision: 1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建正 N 边形，设置坐标位置',
  },
  {
    type: 'object_dot',
    message0: '创建点 %1  坐标 (%2, %3)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'dot' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建一个点，设置坐标位置',
  },
  {
    type: 'object_line',
    message0: '创建线段 %1  起点 (%2, %3) → (%4, %5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'line' },
      { type: 'field_number', name: 'X1', value: -3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y1', value: -2, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X2', value: 3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y2', value: 2, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建从 (x1,y1) 到 (x2,y2) 的线段',
  },
  {
    type: 'object_tex',
    message0: '创建 LaTeX 公式 %1  内容 %2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'formula' },
      { type: 'field_input', name: 'TEX', text: 'x^2 + y^2 = 1' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 260, tooltip: '用 LaTeX 公式创建公式对象，可设置坐标',
  },
  {
    type: 'object_math_tex',
    message0: '创建 MathTex %1  内容 %2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'math' },
      { type: 'field_input', name: 'TEX', text: '\\sum_{k=1}^{n} k^2' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 260, tooltip: '用 LaTeX 创建数学公式（默认斜体），可设置坐标',
  },
  {
    type: 'object_text',
    message0: '创建文字 %1  内容 %2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'text' },
      { type: 'field_input', name: 'CONTENT', text: 'Hello, Manim!' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 260, tooltip: '创建普通文字，可设置坐标',
  },

  // 进阶形状
  {
    type: 'object_rounded_rectangle',
    message0: '创建圆角矩形 %1  宽 %2  高 %3  半径 %4  坐标 (%5, %6)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'rrect' },
      { type: 'field_number', name: 'W', value: 3, min: 0.1, max: 20, precision: 0.1 },
      { type: 'field_number', name: 'H', value: 2, min: 0.1, max: 20, precision: 0.1 },
      { type: 'field_number', name: 'R', value: 0.5, min: 0.05, max: 5, precision: 0.1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建圆角矩形',
  },
  {
    type: 'object_polygon',
    message0: '创建多边形 %1  顶点列表 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'polygon' },
      { type: 'field_input', name: 'VERTS', text: '[0,0,0],[2,0,0],[1,2,0]' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建任意多边形，填顶点坐标列表',
  },
  {
    type: 'object_ellipse',
    message0: '创建椭圆 %1  宽 %2  高 %3  坐标 (%4, %5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'ellipse' },
      { type: 'field_number', name: 'W', value: 3, min: 0.1, max: 20, precision: 0.1 },
      { type: 'field_number', name: 'H', value: 2, min: 0.1, max: 20, precision: 0.1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建椭圆',
  },
  {
    type: 'object_arrow',
    message0: '创建箭头 %1  从 (%2,%3) 到 (%4,%5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'arrow' },
      { type: 'field_number', name: 'X1', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y1', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X2', value: 3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y2', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建箭头（带箭头尖的线段）',
  },
  {
    type: 'object_dashed_line',
    message0: '创建虚线 %1  从 (%2,%3) 到 (%4,%5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'dline' },
      { type: 'field_number', name: 'X1', value: -3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y1', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X2', value: 3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y2', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建虚线',
  },
  {
    type: 'object_arc',
    message0: '创建弧线 %1  半径 %2  角度 %3° 坐标 (%4, %5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'arc' },
      { type: 'field_number', name: 'R', value: 1, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'ANGLE', value: 180, min: 1, max: 360, precision: 5 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建圆弧',
  },
  {
    type: 'object_sector',
    message0: '创建扇形 %1  半径 %2  角度 %3° 坐标 (%4, %5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'sector' },
      { type: 'field_number', name: 'R', value: 1, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'ANGLE', value: 90, min: 1, max: 360, precision: 5 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建扇形（饼形）',
  },

  // 进阶文字
  {
    type: 'object_markup_text',
    message0: '创建 MarkupText %1  内容 %2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'mtext' },
      { type: 'field_input', name: 'CONTENT', text: '<b>粗体</b> <i>斜体</i>' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 260, tooltip: '创建带 HTML 标签样式的文字（类似 Markdown）',
  },
  {
    type: 'object_title',
    message0: '创建标题 %1  内容 %2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'title' },
      { type: 'field_input', name: 'CONTENT', text: '标题文字' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 3, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 260, tooltip: '创建标题文字（大字居中）',
  },
  {
    type: 'object_bulleted_list',
    message0: '创建列表 %1  内容 %2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'list' },
      { type: 'field_input', name: 'CONTENT', text: '第一项, 第二项, 第三项' },
      { type: 'field_number', name: 'X', value: -4, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 2, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 260, tooltip: '创建项目符号列表，用逗号分隔各项',
  },
  {
    type: 'object_code_block',
    message0: '创建代码块 %1  内容 %2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'code' },
      { type: 'field_input', name: 'CONTENT', text: 'print("Hello World")' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 260, tooltip: '创建代码块显示',
  },
  {
    type: 'object_paragraph',
    message0: '创建段落 %1  内容 %2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'para' },
      { type: 'field_input', name: 'CONTENT', text: '第一行, 第二行, 第三行' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 260, tooltip: '创建多行段落，用逗号分隔各行',
  },
  {
    type: 'object_integer',
    message0: '创建整数 %1  数值 %2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'num' },
      { type: 'field_number', name: 'VALUE', value: 42, min: -9999, max: 9999, precision: 1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 260, tooltip: '创建整数显示（可实时更新）',
  },
  {
    type: 'object_decimal',
    message0: '创建小数 %1  数值 %2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'num' },
      { type: 'field_number', name: 'VALUE', value: 3.14, min: -9999, max: 9999, precision: 0.01 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 260, tooltip: '创建小数显示（可实时更新）',
  },
  {
    type: 'object_matrix',
    message0: '创建矩阵 %1  内容 %2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'matrix' },
      { type: 'field_input', name: 'CONTENT', text: '[[1,2],[3,4]]' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 260, tooltip: '创建矩阵显示，填 JSON 风格二维数组',
  },
  {
    type: 'object_table',
    message0: '创建表格 %1  数据 %2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'table' },
      { type: 'field_input', name: 'CONTENT', text: '["姓名","分数"],["张三",90],["李四",85]' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 260, tooltip: '创建表格，填行数据（逗号分隔列，中括号分号分隔行）',
  },
  {
    type: 'object_graph_diagram',
    message0: '创建图 %1  顶点 %2  边 %3  有向? %4',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'graph' },
      { type: 'field_input', name: 'VERTS', text: '["A","B","C"]' },
      { type: 'field_input', name: 'EDGES', text: '[("A","B"),("B","C")]' },
      { type: 'field_dropdown', name: 'DIRECTED',
        options: [['无向图', 'Graph'], ['有向图', 'DiGraph']],
      },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建图（顶点和边），可切换有向/无向',
  },
  {
    type: 'object_angle',
    message0: '创建角度标记 %1  顶点 %2  边1 %3  边2 %4',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'angle' },
      { type: 'field_variable', name: 'V1', variable: 'vertex' },
      { type: 'field_variable', name: 'V2', variable: 'a1' },
      { type: 'field_variable', name: 'V3', variable: 'a2' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '在三个点之间创建角度标记',
  },
  {
    type: 'object_bezier',
    message0: '创建贝塞尔曲线 %1  控制点 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'curve' },
      { type: 'field_input', name: 'POINTS', text: '[0,0,0],[1,2,0],[3,0,0],[4,2,0]' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建贝塞尔曲线，填控制点坐标列表',
  },
  {
    type: 'object_shape_union',
    message0: '合并 %1 和 %2 → %3',
    args0: [
      { type: 'field_variable', name: 'A', variable: 'a' },
      { type: 'field_variable', name: 'B', variable: 'b' },
      { type: 'field_variable', name: 'VAR', variable: 'result' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '将两个图形合并（并集）',
  },
  {
    type: 'object_shape_intersection',
    message0: '交集 %1 和 %2 → %3',
    args0: [
      { type: 'field_variable', name: 'A', variable: 'a' },
      { type: 'field_variable', name: 'B', variable: 'b' },
      { type: 'field_variable', name: 'VAR', variable: 'result' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '两个图形的交集（公共部分）',
  },
  {
    type: 'object_shape_difference',
    message0: '差集 %1 减 %2 → %3',
    args0: [
      { type: 'field_variable', name: 'A', variable: 'a' },
      { type: 'field_variable', name: 'B', variable: 'b' },
      { type: 'field_variable', name: 'VAR', variable: 'result' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: 'A 减去 B 的部分（差集）',
  },

  // 更多几何图形
  {
    type: 'object_annulus',
    message0: '创建圆环 %1  外半径 %2  内半径 %3  坐标 (%4, %5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'annulus' },
      { type: 'field_number', name: 'R1', value: 2, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'R2', value: 1, min: 0.05, max: 10, precision: 0.05 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建圆环（两个同心圆之间的区域）',
  },
  {
    type: 'object_annular_sector',
    message0: '创建圆环扇形 %1  外半径 %2  内半径 %3  角度 %4°',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'asector' },
      { type: 'field_number', name: 'R1', value: 2, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'R2', value: 1, min: 0.05, max: 10, precision: 0.05 },
      { type: 'field_number', name: 'ANGLE', value: 90, min: 1, max: 360, precision: 5 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建圆环扇形（圆环的一部分）',
  },
  {
    type: 'object_arc_between_points',
    message0: '创建两点间弧线 %1  (%2,%3)→(%4,%5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'arc' },
      { type: 'field_number', name: 'X1', value: -2, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y1', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X2', value: 2, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y2', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建连接两点的弧线',
  },
  {
    type: 'object_double_arrow',
    message0: '创建双箭头 %1  (%2,%3)→(%4,%5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'darrow' },
      { type: 'field_number', name: 'X1', value: -3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y1', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X2', value: 3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y2', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建两端都有箭头的双箭头',
  },
  {
    type: 'object_vector_arrow',
    message0: '创建向量 %1  起点(%2,%3) 方向(%4,%5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'vec' },
      { type: 'field_number', name: 'X1', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y1', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'DX', value: 3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'DY', value: 2, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建从起点出发的向量箭头',
  },
  {
    type: 'object_curved_arrow',
    message0: '创建弯曲箭头 %1  角度 %2°',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'carrow' },
      { type: 'field_number', name: 'ANGLE', value: 180, min: 1, max: 360, precision: 5 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建弯曲的箭头',
  },
  {
    type: 'object_star',
    message0: '创建五角星 %1  半径 %2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'star' },
      { type: 'field_number', name: 'R', value: 2, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建五角星',
  },
  {
    type: 'object_cross',
    message0: '创建十字 %1  坐标 (%2, %3)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'cross' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建十字形状',
  },
  {
    type: 'object_elbow',
    message0: '创建直角拐角 %1  坐标 (%2, %3)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'elbow' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建直角拐角（L形）',
  },
  {
    type: 'object_right_angle',
    message0: '创建直角标记 %1  顶点 %2  边1 %3  边2 %4',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'rangle' },
      { type: 'field_variable', name: 'V1', variable: 'vertex' },
      { type: 'field_variable', name: 'V2', variable: 'a1' },
      { type: 'field_variable', name: 'V3', variable: 'a2' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建直角标记',
  },
  {
    type: 'object_surrounding_rect',
    message0: '给 %1 加包围框 %2  颜色 %3',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'box' },
      { type: 'field_variable', name: 'TARGET', variable: 'obj' },
      { type: 'field_dropdown', name: 'COLOR',
        options: [['黄色', 'YELLOW'], ['红色', 'RED'], ['蓝色', 'BLUE'], ['绿色', 'GREEN']],
      },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '在物体周围绘制一个包围框',
  },
  {
    type: 'object_background_rect',
    message0: '给 %1 加背景框 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'bgbox' },
      { type: 'field_variable', name: 'TARGET', variable: 'obj' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '在物体后面添加黑色背景框',
  },
  {
    type: 'object_underline',
    message0: '给 %1 加下划线 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'uline' },
      { type: 'field_variable', name: 'TARGET', variable: 'obj' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '在文字下方添加下划线',
  },
  {
    type: 'object_cutout',
    message0: '挖空 %1 减去 %2 → %3',
    args0: [
      { type: 'field_variable', name: 'A', variable: 'a' },
      { type: 'field_variable', name: 'B', variable: 'b' },
      { type: 'field_variable', name: 'VAR', variable: 'result' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '从图形中挖掉另一个图形',
  },
  {
    type: 'object_exclusion',
    message0: '异或 %1 和 %2 → %3',
    args0: [
      { type: 'field_variable', name: 'A', variable: 'a' },
      { type: 'field_variable', name: 'B', variable: 'b' },
      { type: 'field_variable', name: 'VAR', variable: 'result' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '两个图形的对称差（异或）',
  },
  {
    type: 'object_convex_hull',
    message0: '凸包 %1 → %2',
    args0: [
      { type: 'field_variable', name: 'A', variable: 'points' },
      { type: 'field_variable', name: 'VAR', variable: 'hull' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '生成点集的凸包',
  },
  {
    type: 'object_tangent_line',
    message0: '创建切线 %1  曲线 %2  长度 %3',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'tan' },
      { type: 'field_variable', name: 'CURVE', variable: 'curve' },
      { type: 'field_number', name: 'LEN', value: 2, min: 0.1, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '在曲线一端创建切线',
  },
  {
    type: 'object_brace',
    message0: '创建花括号 %1  对象 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'brace' },
      { type: 'field_variable', name: 'TARGET', variable: 'obj' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '在物体下方创建花括号',
  },
  {
    type: 'object_brace_label',
    message0: '花括号标注 %1  对象 %2  文字 %3',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'blabel' },
      { type: 'field_variable', name: 'TARGET', variable: 'obj' },
      { type: 'field_input', name: 'TEXT', text: '长度' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '花括号加文字标注',
  },
  {
    type: 'object_group',
    message0: '组合 %1 和 %2 → %3',
    args0: [
      { type: 'field_variable', name: 'A', variable: 'a' },
      { type: 'field_variable', name: 'B', variable: 'b' },
      { type: 'field_variable', name: 'VAR', variable: 'group' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '将多个物体组合成一个组',
  },

  // 进阶坐标
  {
    type: 'object_number_plane',
    message0: '创建坐标平面 %1  x(%2,%3) y(%4,%5) 坐标 (%6,%7)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'plane' },
      { type: 'field_number', name: 'XMIN', value: -5, min: -20, max: 0, precision: 1 },
      { type: 'field_number', name: 'XMAX', value: 5, min: 0, max: 20, precision: 1 },
      { type: 'field_number', name: 'YMIN', value: -3, min: -20, max: 0, precision: 1 },
      { type: 'field_number', name: 'YMAX', value: 3, min: 0, max: 20, precision: 1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建带网格的坐标平面',
  },
  {
    type: 'object_number_line',
    message0: '创建数轴 %1  x(%2,%3) 长度 %4  坐标 (%5,%6)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'nline' },
      { type: 'field_number', name: 'XMIN', value: -5, min: -20, max: 0, precision: 1 },
      { type: 'field_number', name: 'XMAX', value: 5, min: 0, max: 20, precision: 1 },
      { type: 'field_number', name: 'LEN', value: 10, min: 2, max: 20, precision: 0.5 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建一维数轴',
  },
  {
    type: 'object_polar_plane',
    message0: '创建极坐标平面 %1  r=%2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'pplane' },
      { type: 'field_number', name: 'RMAX', value: 5, min: 1, max: 20, precision: 1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建极坐标平面',
  },
  {
    type: 'object_complex_plane',
    message0: '创建复数平面 %1  x(%2,%3) y(%4,%5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'cplane' },
      { type: 'field_number', name: 'XMIN', value: -5, min: -20, max: 0, precision: 1 },
      { type: 'field_number', name: 'XMAX', value: 5, min: 0, max: 20, precision: 1 },
      { type: 'field_number', name: 'YMIN', value: -3, min: -20, max: 0, precision: 1 },
      { type: 'field_number', name: 'YMAX', value: 3, min: 0, max: 20, precision: 1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建复数平面（复平面）',
  },
  {
    type: 'object_implicit_graph',
    message0: '画隐函数 %1  坐标轴 %2  方程 %3',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'graph' },
      { type: 'field_variable', name: 'AXES', variable: 'axes' },
      { type: 'field_input', name: 'FUNC', text: 'x**2 + y**2 - 1' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '绘制隐函数方程图像（如圆 x²+y²=1）',
  },
  {
    type: 'object_parametric_curve',
    message0: '画参数曲线 %1  坐标轴 %2  参数方程 %3  t 范围(%4,%5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'curve' },
      { type: 'field_variable', name: 'AXES', variable: 'axes' },
      { type: 'field_input', name: 'FUNC', text: 'lambda t: (np.cos(2*t), np.sin(3*t))' },
      { type: 'field_number', name: 'T0', value: 0, min: -100, max: 100, precision: 0.5 },
      { type: 'field_number', name: 'T1', value: 6.28, min: -100, max: 100, precision: 0.5 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '绘制参数曲线，t 是参数',
  },
  {
    type: 'object_parametric_curve_uniform',
    message0: '参数曲线·匀速绘制 %1  坐标轴 %2  参数方程 %3  t 范围(%4,%5)  点数 %6',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'curve' },
      { type: 'field_variable', name: 'AXES', variable: 'axes' },
      { type: 'field_input', name: 'FUNC', text: 'lambda t: (np.cos(5*t) * np.cos(t), np.cos(5*t) * np.sin(t))' },
      { type: 'field_number', name: 'T0', value: 0, min: -100, max: 100, precision: 0.5 },
      { type: 'field_number', name: 'T1', value: 3.14, min: -100, max: 100, precision: 0.5 },
      { type: 'field_number', name: 'N', value: 500, min: 50, max: 5000, precision: 50 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '绘制参数曲线且保证匀速（等弧长参数化）— 用 Create 动画时笔画速度均匀',
  },

  // ── 3D 物体 ────────────────────────────────────────
  {
    type: 'object3d_sphere',
    message0: '创建球体 %1  半径 %2  坐标 (%3,%4,%5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'sphere' },
      { type: 'field_number', name: 'R', value: 1, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Z', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建 3D 球体',
  },
  {
    type: 'object3d_cube',
    message0: '创建立方体 %1  边长 %2  坐标 (%3,%4,%5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'cube' },
      { type: 'field_number', name: 'L', value: 2, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Z', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建 3D 立方体',
  },
  {
    type: 'object3d_cylinder',
    message0: '创建圆柱 %1  半径 %2  高 %3  坐标 (%4,%5,%6)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'cylinder' },
      { type: 'field_number', name: 'R', value: 1, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'H', value: 2, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Z', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建 3D 圆柱体',
  },
  {
    type: 'object3d_cone',
    message0: '创建圆锥 %1  半径 %2  高 %3  坐标 (%4,%5,%6)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'cone' },
      { type: 'field_number', name: 'R', value: 1, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'H', value: 2, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Z', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建 3D 圆锥体',
  },
  {
    type: 'object3d_torus',
    message0: '创建圆环 %1  大半径 %2  小半径 %3  坐标 (%4,%5,%6)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'torus' },
      { type: 'field_number', name: 'R', value: 1.5, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'R2', value: 0.5, min: 0.05, max: 5, precision: 0.05 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Z', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建 3D 圆环面',
  },
  {
    type: 'object3d_prism',
    message0: '创建棱柱 %1  宽 %2  高 %3  深 %4  坐标 (%5,%6,%7)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'prism' },
      { type: 'field_number', name: 'W', value: 2, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'H', value: 1.5, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'D', value: 1, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Z', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建 3D 长方体棱柱',
  },
  {
    type: 'object3d_dot',
    message0: '创建 3D 点 %1  坐标 (%2,%3,%4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'dot3d' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Z', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建 3D 空间中的点',
  },
  {
    type: 'object3d_line',
    message0: '创建 3D 线段 %1  (%2,%3,%4)→(%5,%6,%7)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'line3d' },
      { type: 'field_number', name: 'X1', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y1', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Z1', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X2', value: 3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y2', value: 2, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Z2', value: 1, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建 3D 空间线段',
  },
  {
    type: 'object3d_arrow',
    message0: '创建 3D 箭头 %1  (%2,%3,%4)→(%5,%6,%7)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'arrow3d' },
      { type: 'field_number', name: 'X1', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y1', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Z1', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X2', value: 3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y2', value: 2, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Z2', value: 1, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建 3D 空间箭头',
  },
  {
    type: 'object3d_tetrahedron',
    message0: '创建正四面体 %1  边长 %2  坐标 (%3,%4,%5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'tetra' },
      { type: 'field_number', name: 'L', value: 2, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Z', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建正四面体（三角锥）',
  },
  {
    type: 'object3d_octahedron',
    message0: '创建正八面体 %1  边长 %2  坐标 (%3,%4,%5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'octa' },
      { type: 'field_number', name: 'L', value: 2, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Z', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建正八面体',
  },
  {
    type: 'object3d_dodecahedron',
    message0: '创建正十二面体 %1  边长 %2  坐标 (%3,%4,%5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'dodeca' },
      { type: 'field_number', name: 'L', value: 1.5, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Z', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建正十二面体',
  },
  {
    type: 'object3d_icosahedron',
    message0: '创建正二十面体 %1  边长 %2  坐标 (%3,%4,%5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'icosa' },
      { type: 'field_number', name: 'L', value: 1.5, min: 0.1, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Z', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建正二十面体',
  },
  {
    type: 'object3d_surface',
    message0: '创建曲面 %1  函数 %2  u(%3,%4) v(%5,%6)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'surface' },
      { type: 'field_input', name: 'FUNC', text: 'lambda u, v: np.array([u, v, u**2 - v**2])' },
      { type: 'field_number', name: 'U0', value: -2, min: -10, max: 0, precision: 0.5 },
      { type: 'field_number', name: 'U1', value: 2, min: 0, max: 10, precision: 0.5 },
      { type: 'field_number', name: 'V0', value: -2, min: -10, max: 0, precision: 0.5 },
      { type: 'field_number', name: 'V1', value: 2, min: 0, max: 10, precision: 0.5 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建参数曲面，u,v 是参数',
  },
  {
    type: 'object3d_polyhedron',
    message0: '创建多面体 %1  顶点 %2  面 %3',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'poly' },
      { type: 'field_input', name: 'VERTS', text: '[[0,0,0],[2,0,0],[2,2,0],[0,2,0]]' },
      { type: 'field_input', name: 'FACES', text: '[[0,1,2,3]]' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建自定义多面体，填顶点坐标和面索引',
  },
  {
    type: 'object3d_axes',
    message0: '创建 3D 坐标轴 %1  x(%2,%3) y(%4,%5) z(%6,%7)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'axes3d' },
      { type: 'field_number', name: 'XMIN', value: -5, min: -20, max: 0, precision: 1 },
      { type: 'field_number', name: 'XMAX', value: 5, min: 0, max: 20, precision: 1 },
      { type: 'field_number', name: 'YMIN', value: -4, min: -20, max: 0, precision: 1 },
      { type: 'field_number', name: 'YMAX', value: 4, min: 0, max: 20, precision: 1 },
      { type: 'field_number', name: 'ZMIN', value: -3, min: -20, max: 0, precision: 1 },
      { type: 'field_number', name: 'ZMAX', value: 3, min: 0, max: 20, precision: 1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建三维坐标系',
  },

  {
    type: 'object_axes',
    message0: '创建坐标轴 %1  x 范围 (%2, %3)  y 范围 (%4, %5)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'axes' },
      { type: 'field_number', name: 'XMIN', value: -5, min: -20, max: 0, precision: 1 },
      { type: 'field_number', name: 'XMAX', value: 5, min: 0, max: 20, precision: 1 },
      { type: 'field_number', name: 'YMIN', value: -3, min: -20, max: 0, precision: 1 },
      { type: 'field_number', name: 'YMAX', value: 3, min: 0, max: 20, precision: 1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建坐标轴系统',
  },
  {
    type: 'object_graph',
    message0: '在坐标轴 %1 上画函数 %2 = %3',
    args0: [
      { type: 'field_variable', name: 'AXES', variable: 'axes' },
      { type: 'field_variable', name: 'VAR', variable: 'graph' },
      { type: 'field_input', name: 'FUNC', text: 'x**2' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '在坐标轴上绘制函数图像，如 x**2（x 的平方）',
  },
  {
    type: 'object_function_graph',
    message0: '创建函数曲线 %1  函数 %2  x(%3,%4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'fgraph' },
      { type: 'field_input', name: 'FUNC', text: 'lambda x: x**2' },
      { type: 'field_number', name: 'XMIN', value: -3, min: -20, max: 0, precision: 0.5 },
      { type: 'field_number', name: 'XMAX', value: 3, min: 0, max: 20, precision: 0.5 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建独立函数曲线（不依赖坐标轴）',
  },
  {
    type: 'object_bar_chart',
    message0: '创建柱状图 %1  数据 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'chart' },
      { type: 'field_input', name: 'DATA', text: '[3, 7, 5, 9, 4]' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建柱状图，填数值列表',
  },
  {
    type: 'object_vector_field',
    message0: '创建向量场 %1  函数 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'vfield' },
      { type: 'field_input', name: 'FUNC', text: 'lambda p: np.array([-p[1], p[0], 0])' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建向量场（每个点画一个箭头）',
  },
  {
    type: 'object_stream_lines',
    message0: '创建流线场 %1  函数 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'stream' },
      { type: 'field_input', name: 'FUNC', text: 'lambda p: np.array([-p[1], p[0], 0])' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建流线（沿着向量场的曲线）',
  },
  {
    type: 'object_value_tracker',
    message0: '创建值跟踪器 %1  初始值 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'tracker' },
      { type: 'field_number', name: 'VALUE', value: 0, min: -1000, max: 1000, precision: 0.01 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建值跟踪器（可动态更新数值）',
  },
  {
    type: 'object_image',
    message0: '加载图片 %1  路径 %2  坐标 (%3, %4)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'img' },
      { type: 'field_input', name: 'PATH', text: 'image.png' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '加载本地图片文件',
  },
  {
    type: 'object_banner',
    message0: '创建 Manim 标志 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'banner' }],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '创建 Manim 官方标志动画',
  },

  // ════════════════════════════════════════════════════
  // 🟢 属性（Property）—— statement blocks
  // ════════════════════════════════════════════════════

  {
    type: 'property_color',
    message0: '设置 %1 颜色为 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_dropdown', name: 'COLOR',
        options: [
          ['红色', 'RED'], ['蓝色', 'BLUE'], ['绿色', 'GREEN'],
          ['黄色', 'YELLOW'], ['紫色', 'PURPLE'], ['橙色', 'ORANGE'],
          ['粉色', 'PINK'], ['白色', 'WHITE'], ['灰色', 'GREY'], ['黑色', 'BLACK'],
        ],
      },
    ],
    previousStatement: null, nextStatement: null,
    colour: 160, tooltip: '设置物体的颜色',
  },
  {
    type: 'property_color_rgb',
    message0: '设置 %1 填充色 (%2)  描边色 (%3)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_input', name: 'FILL', text: '#FF0000' },
      { type: 'field_input', name: 'STROKE', text: '#FFFFFF' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 160, tooltip: '用十六进制颜色码设置填充和描边色',
  },
  {
    type: 'property_opacity',
    message0: '设置 %1 透明度 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_number', name: 'OPACITY', value: 1, min: 0, max: 1, precision: 0.05 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 160, tooltip: '设置透明度（0 = 全透明，1 = 不透明）',
  },
  {
    type: 'property_scale',
    message0: '设置 %1 缩放 %2 倍',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_number', name: 'SCALE', value: 1, min: 0.01, max: 20, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 160, tooltip: '缩放物体（1 = 原始大小）',
  },
  {
    type: 'property_rotate',
    message0: '设置 %1 旋转 %2 °',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_number', name: 'ANGLE', value: 45, min: -360, max: 360, precision: 5 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 160, tooltip: '旋转物体（角度制）',
  },
  {
    type: 'property_move_to',
    message0: '移动 %1 到坐标 (%2, %3)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 160, tooltip: '将物体移动到指定坐标',
  },
  {
    type: 'property_shift',
    message0: '偏移 %1  (X: %2, Y: %3)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_number', name: 'DX', value: 3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'DY', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 160, tooltip: '相对偏移 (X: 右为正，Y: 上为正)',
  },
  {
    type: 'property_next_to',
    message0: '将 %1 置于 %2 的 %3 侧',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_variable', name: 'TARGET', variable: 'target' },
      { type: 'field_dropdown', name: 'DIR',
        options: [['右侧', 'RIGHT'], ['左侧', 'LEFT'], ['上方', 'UP'], ['下方', 'DOWN']],
      },
    ],
    previousStatement: null, nextStatement: null,
    colour: 160, tooltip: '将物体放在另一物体旁边',
  },

  // ════════════════════════════════════════════════════
  // 🟠 动画（Animation）—— statement blocks
  // ════════════════════════════════════════════════════

  {
    type: 'animate_create',
    message0: '创建动画 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '播放创建动画，展示物体的绘制过程',
  },
  {
    type: 'animate_fade_in',
    message0: '淡入 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '播放淡入动画',
  },
  {
    type: 'animate_fade_out',
    message0: '淡出 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '播放淡出动画',
  },
  {
    type: 'animate_shift',
    message0: '移动动画 %1  (X: %2, Y: %3)',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_number', name: 'DX', value: 3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'DY', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '以动画形式移动物体',
  },
  {
    type: 'animate_scale',
    message0: '缩放动画 %1  倍数 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_number', name: 'SCALE', value: 2, min: 0.01, max: 20, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '以动画形式缩放物体',
  },
  {
    type: 'animate_rotate',
    message0: '旋转动画 %1  %2°',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_number', name: 'ANGLE', value: 180, min: -360, max: 360, precision: 10 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '以动画形式旋转物体',
  },
  {
    type: 'animate_transform',
    message0: '变形 %1 为 %2',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_variable', name: 'TARGET', variable: 'target' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '将物体变形为另一个物体',
  },
  {
    type: 'animate_write',
    message0: '书写显示 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'formula' }],
    previousStatement: null, nextStatement: null,
    colour: 260, tooltip: '播放书写动画，逐字显示公式或文字',
  },
  {
    type: 'animate_unwrite',
    message0: '擦除 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'formula' }],
    previousStatement: null, nextStatement: null,
    colour: 260, tooltip: '擦除公式或文字',
  },
  {
    type: 'animate_grow_from_center',
    message0: '从中心生长 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '物体从中心点向外生长出现',
  },
  {
    type: 'animate_spin',
    message0: '自旋 %1  %2 圈',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_number', name: 'TURNS', value: 1, min: 0.1, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '让物体绕自身中心旋转指定圈数',
  },

  // 高级动画 — 教程覆盖
  {
    type: 'animate_replacement_transform',
    message0: '平滑变形 %1 为 %2',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_variable', name: 'TARGET', variable: 'target' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '平滑地将物体变形为另一个物体（顶点一一对应）',
  },
  {
    type: 'animate_move_along_path',
    message0: '沿路径移动 %1 路径 %2',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_variable', name: 'PATH', variable: 'path' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '让物体沿另一物体（如弧线/线段）移动',
  },
  {
    type: 'animate_lagged_start',
    message0: '依次延迟播放 %1  %2 组',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_number', name: 'COUNT', value: 3, min: 1, max: 50, precision: 1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '错峰播放多个相同物体的动画（依次延迟出现）',
  },
  {
    type: 'animate_draw_then_fill',
    message0: '先画边后填充 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '先绘制边框，再填充内部',
  },
  {
    type: 'animate_uncreate',
    message0: '逆向创建 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '逆向播放 Create 动画（物体消解）',
  },
  {
    type: 'animate_flash',
    message0: '闪烁 %1  %2 次',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_number', name: 'COUNT', value: 3, min: 1, max: 20, precision: 1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '让物体闪烁指定次数',
  },
  {
    type: 'animate_indicate',
    message0: '强调指示 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '放大再缩回，强调物体',
  },
  {
    type: 'animate_spiral_in',
    message0: '螺旋缩小 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '物体螺旋旋转进入并缩小',
  },
  {
    type: 'animate_shrink_to_center',
    message0: '坍缩到中心 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '物体坍缩到中心点消失',
  },
  {
    type: 'animate_fade_transform',
    message0: '淡变 %1 为 %2',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_variable', name: 'TARGET', variable: 'target' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '淡出原物体同时淡入新物体',
  },
  {
    type: 'animate_wiggle',
    message0: '抖动 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '物体左右抖动',
  },
  {
    type: 'animate_apply_method',
    message0: '对 %1 执行 %2',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_input', name: 'METHOD', text: 'set_color, RED' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '通用动画 — 对物体执行任意方法并以动画展示',
  },
  {
    type: 'animate_typewriter',
    message0: '打字机显示 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'text' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '文字逐字打出（打字机效果）',
  },
  {
    type: 'animate_fade_in_letters',
    message0: '字母逐个淡入 %1  流畅度 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'text' },
      { type: 'field_dropdown', name: 'RATIO',
        options: [['丝滑 (0.5)', '0.5'], ['轻快 (0.3)', '0.3'], ['缓慢 (0.8)', '0.8']],
      },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '每个字母依次平滑淡入出现 — 比打字机更流畅',
  },
  {
    type: 'animate_speed',
    message0: '以 %1 倍速播放动画',
    args0: [{ type: 'field_number', name: 'SPEED', value: 2, min: 0.1, max: 20, precision: 0.1 }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '调整下一段动画的播放速度（>1 加速，<1 减速）',
  },
  {
    type: 'animate_group',
    message0: '同时播放动画 %1  %2 次',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_number', name: 'COUNT', value: 3, min: 1, max: 50, precision: 1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '同时播放多个相同物体的创建动画（同步出现）',
  },
  {
    type: 'animate_fade_to_color',
    message0: '淡变颜色 %1 → %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_dropdown', name: 'COLOR',
        options: [
          ['红色', 'RED'], ['蓝色', 'BLUE'], ['绿色', 'GREEN'],
          ['黄色', 'YELLOW'], ['紫色', 'PURPLE'], ['橙色', 'ORANGE'], ['白色', 'WHITE'],
        ],
      },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '物体颜色渐变到目标颜色',
  },
  {
    type: 'animate_transform_from_copy',
    message0: '从副本变形 %1 为 %2',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_variable', name: 'TARGET', variable: 'target' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '从原物体的副本变形为新物体（原物体保留）',
  },
  {
    type: 'animate_grow_from_edge',
    message0: '从边缘生长 %1  方向 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_dropdown', name: 'EDGE',
        options: [['左侧', 'LEFT'], ['右侧', 'RIGHT'], ['上方', 'UP'], ['下方', 'DOWN']],
      },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '物体从指定边缘生长出来',
  },
  {
    type: 'animate_grow_arrow',
    message0: '箭头生长 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'arrow' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '箭头从起点生长到终点',
  },
  {
    type: 'animate_counterclockwise',
    message0: '逆时针变形 %1 为 %2',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_variable', name: 'TARGET', variable: 'target' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '逆时针方向变形为另一物体',
  },
  {
    type: 'animate_swap',
    message0: '交换 %1 和 %2 位置',
    args0: [
      { type: 'field_variable', name: 'A', variable: 'a' },
      { type: 'field_variable', name: 'B', variable: 'b' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '两个物体交换位置（互相对换）',
  },
  {
    type: 'animate_circumscribe',
    message0: '外接框强调 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '在物体周围画外接框并旋转强调',
  },
  {
    type: 'animate_focus_on',
    message0: '聚焦 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '放大物体并照亮它',
  },
  {
    type: 'animate_broadcast',
    message0: '广播 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '从物体向外扩散圆环广播',
  },
  {
    type: 'animate_apply_wave',
    message0: '波浪效果 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '让物体像波浪一样起伏',
  },
  {
    type: 'animate_rotating',
    message0: '持续旋转 %1  %2°',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_number', name: 'ANGLE', value: 360, min: 1, max: 3600, precision: 10 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '物体持续旋转指定角度',
  },
  {
    type: 'animate_move_to_target',
    message0: '移动到目标 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '物体移动到预先设定的目标位置',
  },
  {
    type: 'animate_restore',
    message0: '恢复原状 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '恢复物体到保存的状态',
  },
  {
    type: 'animate_succession',
    message0: '依次播放 %1 的 %2 个动画',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_number', name: 'COUNT', value: 3, min: 1, max: 50, precision: 1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '依次播放多个动画',
  },
  {
    type: 'animate_show_one_by_one',
    message0: '逐个显示 %1 的子物体',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'group' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '逐个显示组合中的每个子物体',
  },
  {
    type: 'animate_change_decimal',
    message0: '数值变化 %1 → %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'num' },
      { type: 'field_number', name: 'VALUE', value: 10, min: -9999, max: 9999, precision: 0.01 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '数字以动画形式变化到新值',
  },
  {
    type: 'animate_apply_function',
    message0: '应用函数 %1  函数 %2',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_input', name: 'FUNC', text: 'lambda m: m.scale(2)' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '对物体应用任意函数并播放动画',
  },
  {
    type: 'animate_blink',
    message0: '眨眼 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '物体快速闪烁',
  },
  {
    type: 'animate_homotopy',
    message0: '同伦变形 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '同伦变换（连续形变）',
  },
  {
    type: 'animate_traced_path',
    message0: '追踪轨迹 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '物体移动时留下轨迹',
  },
  {
    type: 'animate_transform_matching_tex',
    message0: 'TeX 匹配变形 %1 为 %2',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'tex1' },
      { type: 'field_variable', name: 'TARGET', variable: 'tex2' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '按相同 TeX 部分匹配变形（数学演示常用）',
  },
  {
    type: 'animate_transform_matching_shapes',
    message0: '形状匹配变形 %1 为 %2',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_variable', name: 'TARGET', variable: 'target' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '按形状匹配变形两个物体',
  },
  {
    type: 'animate_show_increasing',
    message0: '逐段显示 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '从上到下逐段显示物体的子部分',
  },
  {
    type: 'animate_cyclic_replace',
    message0: '循环替换 %1 %2',
    args0: [
      { type: 'field_variable', name: 'A', variable: 'a' },
      { type: 'field_variable', name: 'B', variable: 'b' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '循环替换两个物体的位置',
  },
  {
    type: 'animate_remove_letter',
    message0: '逐字擦除 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'text' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '文字逐字擦除（打字机反向）',
  },
  {
    type: 'animate_phase_flow',
    message0: '错峰淡入 %1  %2 个副本',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_number', name: 'COUNT', value: 3, min: 1, max: 50, precision: 1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '多个副本依次错峰淡入，形成流动感',
  },
  {
    type: 'animate_lagged_map',
    message0: '错峰映射 %1 的 %2 个副本',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_number', name: 'COUNT', value: 5, min: 1, max: 50, precision: 1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '多个副本错峰依次变换',
  },
  {
    type: 'animate_maintain_relative',
    message0: '保持 %1 相对 %2 位置',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_variable', name: 'TARGET', variable: 'target' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '物体跟随目标物体移动保持相对位置',
  },
  {
    type: 'animate_transform_animations',
    message0: '动画间转换 %1 → %2',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_variable', name: 'TARGET', variable: 'target' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '将第一个动画转换成第二个动画',
  },
  {
    type: 'animate_word_by_word',
    message0: '逐词显示 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'text' }],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '文字逐词显示',
  },
  {
    type: 'animate_show_partial',
    message0: '部分显示 %1  %2%',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_number', name: 'PERCENT', value: 50, min: 0, max: 100, precision: 5 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 330, tooltip: '显示物体的指定百分比部分',
  },

  // 样式属性
  {
    type: 'property_stroke_width',
    message0: '设置 %1 描边宽度 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_number', name: 'W', value: 2, min: 0, max: 20, precision: 0.5 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 160, tooltip: '设置物体边框粗细',
  },
  {
    type: 'property_fill_opacity',
    message0: '设置 %1 填充透明度 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_number', name: 'OPACITY', value: 0.5, min: 0, max: 1, precision: 0.05 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 160, tooltip: '单独设置填充透明度（不影响描边）',
  },
  {
    type: 'property_flip',
    message0: '翻转 %1 方向 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_dropdown', name: 'AXIS',
        options: [['水平', 'RIGHT'], ['垂直', 'UP']],
      },
    ],
    previousStatement: null, nextStatement: null,
    colour: 160, tooltip: '水平或垂直翻转物体',
  },

  // ════════════════════════════════════════════════════
  // 🔴 场景（Scene）—— statement blocks
  // ════════════════════════════════════════════════════

  {
    type: 'scene_wait',
    message0: '等待 %1 秒',
    args0: [{ type: 'field_number', name: 'SECONDS', value: 1, min: 0, max: 999, precision: 0.1 }],
    previousStatement: null, nextStatement: null,
    colour: 0, tooltip: '场景暂停指定秒数',
  },
  {
    type: 'scene_add',
    message0: '添加到场景 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 0, tooltip: '直接将物体添加到场景（不播放动画）',
  },
  {
    type: 'scene_remove',
    message0: '从场景移除 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 0, tooltip: '直接从场景移除物体',
  },
  {
    type: 'scene_play',
    message0: '播放动画 %1 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_dropdown', name: 'ANIM',
        options: [
          ['创建', 'Create'], ['淡入', 'FadeIn'], ['淡出', 'FadeOut'],
          ['书写', 'Write'], ['擦除', 'Unwrite'], ['生长', 'GrowFromCenter'],
          ['旋转', 'Rotate'], ['缩放', 'Scale'], ['逆向创建', 'Uncreate'],
        ],
      },
    ],
    previousStatement: null, nextStatement: null,
    colour: 0, tooltip: '通用动画播放块，选动画类型和目标物体',
  },

  // ════════════════════════════════════════════════════
  // 🎥 相机（Camera）—— 需要 MovingCameraScene
  // ════════════════════════════════════════════════════

  {
    type: 'camera_zoom',
    message0: '相机缩放 %1 倍',
    args0: [{ type: 'field_number', name: 'SCALE', value: 2, min: 0.1, max: 20, precision: 0.1 }],
    previousStatement: null, nextStatement: null,
    colour: 20, tooltip: '缩放相机视野（大于1放大，小于1缩小）',
  },
  {
    type: 'camera_move_to',
    message0: '相机移动到 (%1, %2)',
    args0: [
      { type: 'field_number', name: 'X', value: 3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 20, tooltip: '相机镜头移动到指定坐标',
  },
  {
    type: 'camera_animate_zoom',
    message0: '动画缩放相机至 %1 倍',
    args0: [{ type: 'field_number', name: 'SCALE', value: 2, min: 0.1, max: 20, precision: 0.1 }],
    previousStatement: null, nextStatement: null,
    colour: 20, tooltip: '以动画形式平滑缩放相机',
  },
  {
    type: 'camera_restore',
    message0: '恢复相机初始位置',
    args0: [],
    previousStatement: null, nextStatement: null,
    colour: 20, tooltip: '将相机恢复为初始状态',
  },
  {
    type: 'camera_3d_orientation',
    message0: '设置 3D 相机视角  俯仰角 %1°  水平角 %2°',
    args0: [
      { type: 'field_number', name: 'PHI', value: 75, min: 1, max: 179, precision: 5 },
      { type: 'field_number', name: 'THETA', value: -45, min: -180, max: 180, precision: 5 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 20, tooltip: '设置 3D 相机视角 — 俯仰角（上下看）和水平角（左右转）',
  },

  // ════════════════════════════════════════════════════
  // 🧩 场景类（Scene 类型）—— 高级场景
  // ════════════════════════════════════════════════════

  {
    type: 'scene_linear_transform',
    message0: '线性变换场景 %1  基向量 %2 和 %3',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'linear_scene' },
      { type: 'field_variable', name: 'V1', variable: 'v1' },
      { type: 'field_variable', name: 'V2', variable: 'v2' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 0, tooltip: '创建线性变换场景（配合向量使用）',
  },
  {
    type: 'scene_vector_scene',
    message0: '向量场景 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'vec_scene' }],
    previousStatement: null, nextStatement: null,
    colour: 0, tooltip: '创建向量场景（带网格和向量轴）',
  },
  {
    type: 'scene_zoomed',
    message0: '缩放镜头 %1  放大倍数 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'zoomed' },
      { type: 'field_number', name: 'SCALE', value: 4, min: 1, max: 20, precision: 1 },
    ],
    previousStatement: null, nextStatement: null,
    colour: 0, tooltip: '创建缩放镜头（局部放大显示）',
  },

  // ════════════════════════════════════════════════════
  // ⚙️ 更新器（Updaters）
  // ════════════════════════════════════════════════════

  {
    type: 'updater_add',
    message0: '给 %1 添加更新器 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'obj' },
      { type: 'field_input', name: 'FUNC', text: 'lambda m: m.rotate(0.01)' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 100, tooltip: '给物体添加更新器（每帧自动执行函数）',
  },
  {
    type: 'updater_remove',
    message0: '移除 %1 的更新器',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'obj' }],
    previousStatement: null, nextStatement: null,
    colour: 100, tooltip: '移除物体的所有更新器',
  },

  // ════════════════════════════════════════════════════
  // 🟣 控制（Control）—— C-blocks + statement blocks
  // ════════════════════════════════════════════════════

  {
    type: 'control_repeat',
    message0: '重复 %1 次 { %2 }',
    args0: [
      { type: 'field_number', name: 'TIMES', value: 10, min: 1, max: 999, precision: 1 },
      { type: 'input_statement', name: 'DO' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 40, tooltip: '重复执行内部积木指定次数',
  },
  {
    type: 'control_forever',
    message0: '无限循环 { %1 }',
    args0: [{ type: 'input_statement', name: 'DO' }],
    previousStatement: null, nextStatement: null,
    colour: 40, tooltip: '无限重复执行内部积木',
  },
  {
    type: 'control_if',
    message0: '如果 %1 则 { %2 }',
    args0: [
      { type: 'input_value', name: 'COND', check: 'Boolean' },
      { type: 'input_statement', name: 'DO' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 40, tooltip: '条件判断 — 如果条件成立则执行内部积木',
  },
  {
    type: 'control_if_else',
    message0: '如果 %1 则 { %2 } 否则 { %3 }',
    args0: [
      { type: 'input_value', name: 'COND', check: 'Boolean' },
      { type: 'input_statement', name: 'DO' },
      { type: 'input_statement', name: 'ELSE' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 40, tooltip: '条件判断 — 条件成立执行上分支，否则执行下分支',
  },
  {
    type: 'control_wait_until',
    message0: '等待直到 %1',
    args0: [{ type: 'input_value', name: 'COND', check: 'Boolean' }],
    previousStatement: null, nextStatement: null,
    colour: 40, tooltip: '等待直到条件成立才继续',
  },

  // ════════════════════════════════════════════════════
  // 🟡 运算-数学（Operators Math）—— reporter blocks (output: Number)
  // ════════════════════════════════════════════════════

  {
    type: 'op_add',
    message0: '%1 + %2',
    args0: [
      { type: 'input_value', name: 'A', check: 'Number' },
      { type: 'input_value', name: 'B', check: 'Number' },
    ],
    output: 'Number', colour: 50,
    tooltip: '两个数相加',
  },
  {
    type: 'op_subtract',
    message0: '%1 − %2',
    args0: [
      { type: 'input_value', name: 'A', check: 'Number' },
      { type: 'input_value', name: 'B', check: 'Number' },
    ],
    output: 'Number', colour: 50,
    tooltip: '两个数相减',
  },
  {
    type: 'op_multiply',
    message0: '%1 × %2',
    args0: [
      { type: 'input_value', name: 'A', check: 'Number' },
      { type: 'input_value', name: 'B', check: 'Number' },
    ],
    output: 'Number', colour: 50,
    tooltip: '两个数相乘',
  },
  {
    type: 'op_divide',
    message0: '%1 ÷ %2',
    args0: [
      { type: 'input_value', name: 'A', check: 'Number' },
      { type: 'input_value', name: 'B', check: 'Number' },
    ],
    output: 'Number', colour: 50,
    tooltip: '两个数相除',
  },
  {
    type: 'op_random',
    message0: '在 %1 和 %2 之间取随机数',
    args0: [
      { type: 'input_value', name: 'A', check: 'Number' },
      { type: 'input_value', name: 'B', check: 'Number' },
    ],
    output: 'Number', colour: 50,
    tooltip: '在 A 和 B 之间取随机整数',
  },
  {
    type: 'op_round',
    message0: '四舍五入 %1',
    args0: [{ type: 'input_value', name: 'NUM', check: 'Number' }],
    output: 'Number', colour: 50,
    tooltip: '四舍五入取整',
  },
  {
    type: 'op_abs',
    message0: '绝对值 %1',
    args0: [{ type: 'input_value', name: 'NUM', check: 'Number' }],
    output: 'Number', colour: 50,
    tooltip: '取绝对值',
  },
  {
    type: 'op_sin',
    message0: 'sin %1',
    args0: [{ type: 'input_value', name: 'NUM', check: 'Number' }],
    output: 'Number', colour: 50,
    tooltip: '正弦函数（弧度）',
  },
  {
    type: 'op_cos',
    message0: 'cos %1',
    args0: [{ type: 'input_value', name: 'NUM', check: 'Number' }],
    output: 'Number', colour: 50,
    tooltip: '余弦函数（弧度）',
  },
  {
    type: 'op_tan',
    message0: 'tan %1',
    args0: [{ type: 'input_value', name: 'NUM', check: 'Number' }],
    output: 'Number', colour: 50,
    tooltip: '正切函数（弧度）',
  },
  {
    type: 'op_sqrt',
    message0: '平方根 %1',
    args0: [{ type: 'input_value', name: 'NUM', check: 'Number' }],
    output: 'Number', colour: 50,
    tooltip: '取平方根',
  },
  {
    type: 'op_mod',
    message0: '%1 除以 %2 的余数',
    args0: [
      { type: 'input_value', name: 'A', check: 'Number' },
      { type: 'input_value', name: 'B', check: 'Number' },
    ],
    output: 'Number', colour: 50,
    tooltip: '取模（余数）运算',
  },
  {
    type: 'op_pow',
    message0: '%1 的 %2 次方',
    args0: [
      { type: 'input_value', name: 'A', check: 'Number' },
      { type: 'input_value', name: 'B', check: 'Number' },
    ],
    output: 'Number', colour: 50,
    tooltip: '幂运算',
  },

  // ════════════════════════════════════════════════════
  // 🟡 运算-比较（Operators Compare）—— boolean blocks (output: Boolean)
  // ════════════════════════════════════════════════════

  {
    type: 'op_gt',
    message0: '%1 > %2',
    args0: [
      { type: 'input_value', name: 'A', check: 'Number' },
      { type: 'input_value', name: 'B', check: 'Number' },
    ],
    output: 'Boolean', colour: 50,
    tooltip: '大于比较',
  },
  {
    type: 'op_lt',
    message0: '%1 < %2',
    args0: [
      { type: 'input_value', name: 'A', check: 'Number' },
      { type: 'input_value', name: 'B', check: 'Number' },
    ],
    output: 'Boolean', colour: 50,
    tooltip: '小于比较',
  },
  {
    type: 'op_eq',
    message0: '%1 = %2',
    args0: [
      { type: 'input_value', name: 'A', check: 'Number' },
      { type: 'input_value', name: 'B', check: 'Number' },
    ],
    output: 'Boolean', colour: 50,
    tooltip: '等于比较',
  },
  {
    type: 'op_and',
    message0: '%1 且 %2',
    args0: [
      { type: 'input_value', name: 'A', check: 'Boolean' },
      { type: 'input_value', name: 'B', check: 'Boolean' },
    ],
    output: 'Boolean', colour: 50,
    tooltip: '逻辑与 — 两个条件都成立时才为真',
  },
  {
    type: 'op_or',
    message0: '%1 或 %2',
    args0: [
      { type: 'input_value', name: 'A', check: 'Boolean' },
      { type: 'input_value', name: 'B', check: 'Boolean' },
    ],
    output: 'Boolean', colour: 50,
    tooltip: '逻辑或 — 任一条件成立即为真',
  },
  {
    type: 'op_not',
    message0: '非 %1',
    args0: [{ type: 'input_value', name: 'A', check: 'Boolean' }],
    output: 'Boolean', colour: 50,
    tooltip: '逻辑非 — 取反',
  },

  // ════════════════════════════════════════════════════
  // 🟡 运算-字符串（Operators String）—— reporter blocks (output: String)
  // ════════════════════════════════════════════════════

  {
    type: 'op_join',
    message0: '连接 %1 和 %2',
    args0: [
      { type: 'input_value', name: 'A', check: 'String' },
      { type: 'input_value', name: 'B', check: 'String' },
    ],
    output: 'String', colour: 50,
    tooltip: '将两个字符串拼接',
  },
  {
    type: 'op_string',
    message0: '%1',
    args0: [
      { type: 'field_input', name: 'TEXT', text: 'Hello' },
    ],
    output: 'String', colour: 50,
    tooltip: '字符串字面量',
  },

  // ════════════════════════════════════════════════════
  // 🔷 变量（Variables）—— statement + reporter blocks
  // ════════════════════════════════════════════════════

  {
    type: 'var_set',
    message0: '将 %1 设为 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'x' },
      { type: 'input_value', name: 'VALUE', check: 'Number' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 100, tooltip: '给变量赋值',
  },
  {
    type: 'var_change',
    message0: '将 %1 增加 %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'x' },
      { type: 'input_value', name: 'DELTA', check: 'Number' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 100, tooltip: '将变量增加指定值',
  },
  {
    type: 'var_get',
    message0: '%1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'x' }],
    output: 'Number', colour: 100,
    tooltip: '获取变量的值',
  },

  // ════════════════════════════════════════════════════
  // 📋 列表（Lists）—— statement + reporter + C-block
  // ════════════════════════════════════════════════════

  {
    type: 'list_create',
    message0: '创建列表 %1',
    args0: [{ type: 'field_variable', name: 'VAR', variable: 'mylist' }],
    previousStatement: null, nextStatement: null,
    colour: 140, tooltip: '创建一个空列表',
  },
  {
    type: 'list_append',
    message0: '将 %2 添加到 %1',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'mylist' },
      { type: 'input_value', name: 'ITEM' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 140, tooltip: '将元素添加到列表末尾',
  },
  {
    type: 'list_for_each',
    message0: '对于 %1 中的每个 %2 { %3 }',
    args0: [
      { type: 'field_variable', name: 'LIST', variable: 'mylist' },
      { type: 'field_variable', name: 'ITEM', variable: 'item' },
      { type: 'input_statement', name: 'DO' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 140, tooltip: '遍历列表中的每个元素',
  },

  // ════════════════════════════════════════════════════
  // 🎩 事件（Events）—— hat blocks
  // ════════════════════════════════════════════════════

  {
    type: 'event_start',
    message0: '当场景开始时',
    args0: [],
    nextStatement: null,
    colour: 20, tooltip: '场景启动时触发 — 放在最顶部',
  },

  // ════════════════════════════════════════════════════
  // 🛠 通用积木 —— 实现 Manim 100% 功能
  // ════════════════════════════════════════════════════

  {
    type: 'custom_code',
    message0: '自定义代码 %1',
    args0: [{ type: 'field_input', name: 'CODE', text: 'self.play(Create(PointCloudDot()))' }],
    previousStatement: null, nextStatement: null,
    colour: 20, tooltip: '直接输入任意 Python/Manim 代码行 — 实现任何功能（点云/渲染器/自定义类等）',
  },
  {
    type: 'custom_function',
    message0: '自定义函数 %1',
    args0: [{ type: 'field_input', name: 'FUNC', text: 'def f(x):\n return x**3' }],
    previousStatement: null, nextStatement: null,
    colour: 20, tooltip: '定义自己的 Python 函数（多行用换行分隔）',
  },
  {
    type: 'custom_mobject',
    message0: '自定义物体 %1 = %2',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'custom' },
      { type: 'field_input', name: 'CODE', text: 'PointCloudDot(color=RED)' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 20, tooltip: '用任意 Manim 类创建物体 — 覆盖所有未做成积木的类',
  },
  {
    type: 'custom_call_method',
    message0: '对 %1 调用 %2',
    args0: [
      { type: 'field_variable', name: 'OBJ', variable: 'obj' },
      { type: 'field_input', name: 'METHOD', text: 'set_style(fill_color=BLUE, fill_opacity=0.5)' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 20, tooltip: '对物体调用任意方法 — 覆盖所有未做成积木的属性方法',
  },
  {
    type: 'custom_import',
    message0: '导入 %1',
    args0: [{ type: 'field_input', name: 'IMPORT', text: 'from manim.utils import *' }],
    previousStatement: null, nextStatement: null,
    colour: 20, tooltip: '添加任意 import 语句（在文件头部生效）',
  },

  // ════════════════════════════════════════════════════
  // ⬜ 辅助积木—— 值块占位符
  // ════════════════════════════════════════════════════

  {
    type: 'math_number',
    message0: '%1',
    args0: [{ type: 'field_number', name: 'NUM', value: 0, precision: 0.01 }],
    output: 'Number',
    colour: 50, tooltip: '数字值',
  },
  {
    type: 'logic_boolean',
    message0: '%1',
    args0: [{ type: 'field_dropdown', name: 'BOOL', options: [['真', 'True'], ['假', 'False']] }],
    output: 'Boolean',
    colour: 50, tooltip: '布尔值（真/假）',
  },

];