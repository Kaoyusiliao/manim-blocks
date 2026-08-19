/**
 * Blockly 工具箱定义 — 8 大分类，对标 Scratch 功能
 *
 * 分类：事件 → 控制 → 物体 → 属性 → 动画 → 场景 → 运算 → 变量
 */
export const toolboxJson = {
  kind: 'categoryToolbox',
  contents: [

    // ── 🎩 事件 ──────────────────────────────────────
    {
      kind: 'category',
      name: '🎩 事件',
      colour: '20', // orange-red
      contents: [
        { kind: 'block', type: 'event_start' },
      ],
    },

    // ── 🟣 控制 ──────────────────────────────────────
    {
      kind: 'category',
      name: '🟣 控制',
      colour: '40', // yellow-orange
      contents: [
        { kind: 'block', type: 'scene_wait' },
        { kind: 'block', type: 'control_wait_until' },
        { kind: 'block', type: 'control_repeat' },
        { kind: 'block', type: 'control_forever' },
        { kind: 'block', type: 'control_if' },
        { kind: 'block', type: 'control_if_else' },
      ],
    },

    // ── 🔵 物体 ──────────────────────────────────────
    {
      kind: 'category',
      name: '🔵 物体',
      colour: '230', // blue
      contents: [
        { kind: 'block', type: 'object_circle' },
        { kind: 'block', type: 'object_square' },
        { kind: 'block', type: 'object_rectangle' },
        { kind: 'block', type: 'object_triangle' },
        { kind: 'block', type: 'object_regular_polygon' },
        { kind: 'block', type: 'object_dot' },
        { kind: 'block', type: 'object_line' },
        { kind: 'block', type: 'object_axes' },
        { kind: 'block', type: 'object_graph' },
        { kind: 'block', type: 'object_tex' },
        { kind: 'block', type: 'object_math_tex' },
        { kind: 'block', type: 'object_text' },
      ],
    },

    // ── 🟢 属性 ──────────────────────────────────────
    {
      kind: 'category',
      name: '🟢 属性',
      colour: '160', // green
      contents: [
        { kind: 'block', type: 'property_color' },
        { kind: 'block', type: 'property_color_rgb' },
        { kind: 'block', type: 'property_opacity' },
        { kind: 'block', type: 'property_scale' },
        { kind: 'block', type: 'property_rotate' },
        { kind: 'block', type: 'property_move_to' },
        { kind: 'block', type: 'property_shift' },
        { kind: 'block', type: 'property_next_to' },
      ],
    },

    // ── 🟠 动画 ──────────────────────────────────────
    {
      kind: 'category',
      name: '🟠 动画',
      colour: '330', // magenta/pink
      contents: [
        { kind: 'block', type: 'animate_create' },
        { kind: 'block', type: 'animate_fade_in' },
        { kind: 'block', type: 'animate_fade_out' },
        { kind: 'block', type: 'animate_grow_from_center' },
        { kind: 'block', type: 'animate_write' },
        { kind: 'block', type: 'animate_unwrite' },
        { kind: 'block', type: 'animate_shift' },
        { kind: 'block', type: 'animate_scale' },
        { kind: 'block', type: 'animate_rotate' },
        { kind: 'block', type: 'animate_spin' },
        { kind: 'block', type: 'animate_transform' },
      ],
    },

    // ── 🔴 场景控制 ──────────────────────────────────
    {
      kind: 'category',
      name: '🔴 场景',
      colour: '0', // red
      contents: [
        { kind: 'block', type: 'scene_add' },
        { kind: 'block', type: 'scene_remove' },
        { kind: 'block', type: 'scene_play' },
      ],
    },

    // ── 🟡 运算 ──────────────────────────────────────
    {
      kind: 'category',
      name: '🟡 运算',
      colour: '50', // warm yellow
      contents: [
        {
          kind: 'category',
          name: '数学运算',
          colour: '50',
          contents: [
            { kind: 'block', type: 'op_add' },
            { kind: 'block', type: 'op_subtract' },
            { kind: 'block', type: 'op_multiply' },
            { kind: 'block', type: 'op_divide' },
            { kind: 'block', type: 'op_mod' },
            { kind: 'block', type: 'op_pow' },
            { kind: 'block', type: 'op_random' },
            { kind: 'block', type: 'op_round' },
            { kind: 'block', type: 'op_abs' },
            { kind: 'block', type: 'op_sin' },
            { kind: 'block', type: 'op_cos' },
            { kind: 'block', type: 'op_tan' },
            { kind: 'block', type: 'op_sqrt' },
          ],
        },
        {
          kind: 'category',
          name: '比较运算',
          colour: '50',
          contents: [
            { kind: 'block', type: 'op_gt' },
            { kind: 'block', type: 'op_lt' },
            { kind: 'block', type: 'op_eq' },
            { kind: 'block', type: 'op_and' },
            { kind: 'block', type: 'op_or' },
            { kind: 'block', type: 'op_not' },
          ],
        },
        {
          kind: 'category',
          name: '字符串',
          colour: '50',
          contents: [
            { kind: 'block', type: 'op_join' },
            { kind: 'block', type: 'op_string' },
            { kind: 'block', type: 'math_number' },
            { kind: 'block', type: 'logic_boolean' },
          ],
        },
      ],
    },

    // ── 🔷 变量 & 列表 ───────────────────────────────
    {
      kind: 'category',
      name: '🔷 变量',
      colour: '100', // teal
      custom: 'VARIABLE',
      contents: [
        {
          kind: 'category',
          name: '变量操作',
          colour: '100',
          contents: [
            { kind: 'block', type: 'var_set' },
            { kind: 'block', type: 'var_change' },
          ],
        },
        {
          kind: 'category',
          name: '列表操作',
          colour: '140',
          contents: [
            { kind: 'block', type: 'list_create' },
            { kind: 'block', type: 'list_append' },
            { kind: 'block', type: 'list_for_each' },
          ],
        },
      ],
    },

  ],
};