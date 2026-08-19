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
    message0: '在坐标轴 %1 上画函数 %2',
    args0: [
      { type: 'field_variable', name: 'AXES', variable: 'axes' },
      { type: 'field_variable', name: 'VAR', variable: 'graph' },
    ],
    previousStatement: null, nextStatement: null,
    colour: 230, tooltip: '在坐标轴上绘制函数图像',
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

  // 进阶动画 — 教程覆盖
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
          ['旋转', 'Rotate'], ['缩放', 'Scale'], ['变形', 'Transform'],
        ],
      },
    ],
    previousStatement: null, nextStatement: null,
    colour: 0, tooltip: '通用动画播放块，选动画类型和目标物体',
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