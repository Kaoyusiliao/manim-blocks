/**
 * Manim Blocks — Blockly 积木定义
 *
 * 每种积木的格式规范：
 * - message0: 积木上显示的文本，%1 %2 … 为参数占位
 * - args0: 参数数组（field_variable 变量选择 / field_dropdown 下拉 / field_number 数值）
 * - previousStatement / nextStatement: 语句块连接（null = 可连接）
 * - colour: 颜色（Blockly 色环 0–360）
 * - extensions: 可选扩展
 */

/** @type {Array} 全部积木 JSON 定义 */
export const blockDefs = [
  // ── 🔵 物体 ──────────────────────────────────────────

  {
    type: 'object_circle',
    message0: '创建圆形 %1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'circle',
        variableTypes: [''],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: '创建一个圆形',
    helpUrl: '',
  },
  {
    type: 'object_square',
    message0: '创建正方形 %1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'square',
        variableTypes: [''],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: '创建一个正方形',
  },
  {
    type: 'object_rectangle',
    message0: '创建矩形 %1  宽度 %2  高度 %3',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'rect',
        variableTypes: [''],
      },
      { type: 'field_number', name: 'W', value: 3, min: 0.1, max: 20, precision: 0.1 },
      { type: 'field_number', name: 'H', value: 2, min: 0.1, max: 20, precision: 0.1 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: '创建指定宽高的矩形',
  },
  {
    type: 'object_triangle',
    message0: '创建三角形 %1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'triangle',
        variableTypes: [''],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: '创建一个等边三角形',
  },
  {
    type: 'object_regular_polygon',
    message0: '创建正多边形 %1  边数 %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'polygon',
        variableTypes: [''],
      },
      { type: 'field_number', name: 'N', value: 6, min: 3, max: 24, precision: 1 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: '创建正 N 边形（N = 边数）',
  },
  {
    type: 'object_dot',
    message0: '创建点 %1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'dot',
        variableTypes: [''],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: '创建一个点',
  },
  {
    type: 'object_line',
    message0: '创建线段 %1  起点 (%2, %3) → (%4, %5)',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'line',
        variableTypes: [''],
      },
      { type: 'field_number', name: 'X1', value: -3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y1', value: -2, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'X2', value: 3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y2', value: 2, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: '创建从 (x1,y1) 到 (x2,y2) 的线段',
  },
  {
    type: 'object_tex',
    message0: '创建 LaTeX 公式 %1  内容 %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'formula',
        variableTypes: [''],
      },
      {
        type: 'field_input',
        name: 'TEX',
        text: 'x^2 + y^2 = 1',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip: '用 LaTeX 公式创建公式对象',
  },
  {
    type: 'object_math_tex',
    message0: '创建 MathTex %1  内容 %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'math',
        variableTypes: [''],
      },
      {
        type: 'field_input',
        name: 'TEX',
        text: '\\sum_{k=1}^{n} k^2',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip: '用 LaTeX 创建数学公式（默认斜体）',
  },
  {
    type: 'object_text',
    message0: '创建文字 %1  内容 %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'text',
        variableTypes: [''],
      },
      {
        type: 'field_input',
        name: 'CONTENT',
        text: 'Hello, Manim!',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip: '创建普通文字',
  },

  // ── 🟢 属性 ──────────────────────────────────────────

  {
    type: 'property_color',
    message0: '设置 %1 颜色为 %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'obj',
        variableTypes: [''],
      },
      {
        type: 'field_dropdown',
        name: 'COLOR',
        options: [
          ['红色', 'RED'],
          ['蓝色', 'BLUE'],
          ['绿色', 'GREEN'],
          ['黄色', 'YELLOW'],
          ['紫色', 'PURPLE'],
          ['橙色', 'ORANGE'],
          ['粉色', 'PINK'],
          ['白色', 'WHITE'],
          ['灰色', 'GREY'],
          ['黑色', 'BLACK'],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: '设置物体的颜色',
  },
  {
    type: 'property_opacity',
    message0: '设置 %1 透明度 %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'obj',
        variableTypes: [''],
      },
      { type: 'field_number', name: 'OPACITY', value: 1, min: 0, max: 1, precision: 0.05 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: '设置透明度（0 = 全透明，1 = 不透明）',
  },
  {
    type: 'property_scale',
    message0: '设置 %1 缩放 %2 倍',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'obj',
        variableTypes: [''],
      },
      { type: 'field_number', name: 'SCALE', value: 1, min: 0.01, max: 20, precision: 0.1 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: '缩放物体（1 = 原始大小）',
  },
  {
    type: 'property_rotate',
    message0: '设置 %1 旋转 %2 °',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'obj',
        variableTypes: [''],
      },
      { type: 'field_number', name: 'ANGLE', value: 45, min: -360, max: 360, precision: 5 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: '旋转物体（角度制）',
  },
  {
    type: 'property_move_to',
    message0: '移动 %1 到坐标 (%2, %3)',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'obj',
        variableTypes: [''],
      },
      { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: '将物体移动到指定坐标',
  },
  {
    type: 'property_shift',
    message0: '偏移 %1  (X: %2, Y: %3)',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'obj',
        variableTypes: [''],
      },
      { type: 'field_number', name: 'DX', value: 3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'DY', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: '相对偏移 (X: 右为正，Y: 上为正)',
  },
  {
    type: 'property_next_to',
    message0: '将 %1 置于 %2 的 %3 侧',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'obj',
        variableTypes: [''],
      },
      {
        type: 'field_variable',
        name: 'TARGET',
        variable: 'target',
        variableTypes: [''],
      },
      {
        type: 'field_dropdown',
        name: 'DIR',
        options: [
          ['右侧', 'RIGHT'],
          ['左侧', 'LEFT'],
          ['上方', 'UP'],
          ['下方', 'DOWN'],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: '将物体放在另一物体旁边',
  },

  // ── 🟠 动画 ──────────────────────────────────────────

  {
    type: 'animate_create',
    message0: '创建动画 %1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'obj',
        variableTypes: [''],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: '播放创建动画，展示物体的绘制过程',
  },
  {
    type: 'animate_fade_in',
    message0: '淡入 %1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'obj',
        variableTypes: [''],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: '播放淡入动画',
  },
  {
    type: 'animate_fade_out',
    message0: '淡出 %1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'obj',
        variableTypes: [''],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: '播放淡出动画',
  },
  {
    type: 'animate_shift',
    message0: '移动动画 %1  (X: %2, Y: %3)',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'obj',
        variableTypes: [''],
      },
      { type: 'field_number', name: 'DX', value: 3, min: -10, max: 10, precision: 0.1 },
      { type: 'field_number', name: 'DY', value: 0, min: -10, max: 10, precision: 0.1 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: '以动画形式移动物体',
  },
  {
    type: 'animate_scale',
    message0: '缩放动画 %1  倍数 %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'obj',
        variableTypes: [''],
      },
      { type: 'field_number', name: 'SCALE', value: 2, min: 0.01, max: 20, precision: 0.1 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: '以动画形式缩放物体',
  },
  {
    type: 'animate_rotate',
    message0: '旋转动画 %1  %2°',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'obj',
        variableTypes: [''],
      },
      { type: 'field_number', name: 'ANGLE', value: 180, min: -360, max: 360, precision: 10 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: '以动画形式旋转物体',
  },
  {
    type: 'animate_transform',
    message0: '变形 %1 为 %2',
    args0: [
      {
        type: 'field_variable',
        name: 'OBJ',
        variable: 'obj',
        variableTypes: [''],
      },
      {
        type: 'field_variable',
        name: 'TARGET',
        variable: 'target',
        variableTypes: [''],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: '将物体变形为另一个物体',
  },
  {
    type: 'animate_write',
    message0: '书写显示 %1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'formula',
        variableTypes: [''],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip: '播放书写动画，逐字显示公式或文字',
  },
  {
    type: 'animate_unwrite',
    message0: '擦除 %1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'formula',
        variableTypes: [''],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip: '擦除公式或文字',
  },

  // ── 🔴 场景 ──────────────────────────────────────────

  {
    type: 'scene_wait',
    message0: '等待 %1 秒',
    args0: [
      { type: 'field_number', name: 'SECONDS', value: 1, min: 0, max: 999, precision: 0.1 },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 0,
    tooltip: '场景暂停指定秒数',
  },
  {
    type: 'scene_add',
    message0: '添加到场景 %1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'obj',
        variableTypes: [''],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 0,
    tooltip: '直接将物体添加到场景（不播放动画）',
  },
  {
    type: 'scene_remove',
    message0: '从场景移除 %1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: 'obj',
        variableTypes: [''],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 0,
    tooltip: '直接从场景移除物体',
  },
];