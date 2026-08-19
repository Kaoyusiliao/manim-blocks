/**
 * Blockly 工具箱定义 — JSON 格式
 * 分类顺序：物体 → 属性 → 动画 → 场景
 */
export const toolboxJson = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: '🔵 物体',
      colour: '230',
      contents: [
        { kind: 'block', type: 'object_circle' },
        { kind: 'block', type: 'object_square' },
        { kind: 'block', type: 'object_rectangle' },
        { kind: 'block', type: 'object_triangle' },
        { kind: 'block', type: 'object_regular_polygon' },
        { kind: 'block', type: 'object_dot' },
        { kind: 'block', type: 'object_line' },
        { kind: 'block', type: 'object_tex' },
        { kind: 'block', type: 'object_math_tex' },
        { kind: 'block', type: 'object_text' },
      ],
    },
    {
      kind: 'category',
      name: '🟢 属性',
      colour: '160',
      contents: [
        { kind: 'block', type: 'property_color' },
        { kind: 'block', type: 'property_opacity' },
        { kind: 'block', type: 'property_scale' },
        { kind: 'block', type: 'property_rotate' },
        { kind: 'block', type: 'property_move_to' },
        { kind: 'block', type: 'property_shift' },
        { kind: 'block', type: 'property_next_to' },
      ],
    },
    {
      kind: 'category',
      name: '🟠 动画',
      colour: '330',
      contents: [
        { kind: 'block', type: 'animate_create' },
        { kind: 'block', type: 'animate_fade_in' },
        { kind: 'block', type: 'animate_fade_out' },
        { kind: 'block', type: 'animate_shift' },
        { kind: 'block', type: 'animate_scale' },
        { kind: 'block', type: 'animate_rotate' },
        { kind: 'block', type: 'animate_transform' },
        { kind: 'block', type: 'animate_write' },
        { kind: 'block', type: 'animate_unwrite' },
      ],
    },
    {
      kind: 'category',
      name: '🔴 场景',
      colour: '0',
      contents: [
        { kind: 'block', type: 'scene_wait' },
        { kind: 'block', type: 'scene_add' },
        { kind: 'block', type: 'scene_remove' },
      ],
    },
  ],
};