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

    // ── 🛠 通用 ──────────────────────────────────────
    {
      kind: 'category',
      name: '🛠 通用',
      colour: '20', // orange-red
      contents: [
        { kind: 'block', type: 'custom_code' },
        { kind: 'block', type: 'custom_mobject' },
        { kind: 'block', type: 'custom_call_method' },
        { kind: 'block', type: 'custom_function' },
        { kind: 'block', type: 'custom_import' },
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
        { kind: 'block', type: 'object_rounded_rectangle' },
        { kind: 'block', type: 'object_triangle' },
        { kind: 'block', type: 'object_polygon' },
        { kind: 'block', type: 'object_regular_polygon' },
        { kind: 'block', type: 'object_ellipse' },
        { kind: 'block', type: 'object_dot' },
        { kind: 'block', type: 'object_line' },
        { kind: 'block', type: 'object_dashed_line' },
        { kind: 'block', type: 'object_arrow' },
        { kind: 'block', type: 'object_arc' },
        { kind: 'block', type: 'object_sector' },
        { kind: 'block', type: 'object_tex' },
        { kind: 'block', type: 'object_math_tex' },
        { kind: 'block', type: 'object_text' },
        { kind: 'block', type: 'object_markup_text' },
        { kind: 'block', type: 'object_title' },
        { kind: 'block', type: 'object_bulleted_list' },
        { kind: 'block', type: 'object_code_block' },
        { kind: 'block', type: 'object_paragraph' },
        { kind: 'block', type: 'object_integer' },
        { kind: 'block', type: 'object_decimal' },
        { kind: 'block', type: 'object_matrix' },
        { kind: 'block', type: 'object_table' },
        { kind: 'block', type: 'object_graph_diagram' },
        { kind: 'block', type: 'object_angle' },
        { kind: 'block', type: 'object_bezier' },
        { kind: 'block', type: 'object_shape_union' },
        { kind: 'block', type: 'object_shape_intersection' },
        { kind: 'block', type: 'object_shape_difference' },
        { kind: 'block', type: 'object_cutout' },
        { kind: 'block', type: 'object_exclusion' },
        { kind: 'block', type: 'object_convex_hull' },
        { kind: 'block', type: 'object_annulus' },
        { kind: 'block', type: 'object_annular_sector' },
        { kind: 'block', type: 'object_arc_between_points' },
        { kind: 'block', type: 'object_double_arrow' },
        { kind: 'block', type: 'object_vector_arrow' },
        { kind: 'block', type: 'object_curved_arrow' },
        { kind: 'block', type: 'object_star' },
        { kind: 'block', type: 'object_cross' },
        { kind: 'block', type: 'object_elbow' },
        { kind: 'block', type: 'object_right_angle' },
        { kind: 'block', type: 'object_surrounding_rect' },
        { kind: 'block', type: 'object_background_rect' },
        { kind: 'block', type: 'object_underline' },
        { kind: 'block', type: 'object_tangent_line' },
        { kind: 'block', type: 'object_brace' },
        { kind: 'block', type: 'object_brace_label' },
        { kind: 'block', type: 'object_group' },
        { kind: 'block', type: 'object_function_graph' },
        { kind: 'block', type: 'object_bar_chart' },
        { kind: 'block', type: 'object_vector_field' },
        { kind: 'block', type: 'object_stream_lines' },
        { kind: 'block', type: 'object_value_tracker' },
        { kind: 'block', type: 'object_image' },
        { kind: 'block', type: 'object_banner' },
      ],
    },

    // ── 🧊 3D 物体 ────────────────────────────────────
    {
      kind: 'category',
      name: '🧊 3D 物体',
      colour: '230', // blue
      contents: [
        { kind: 'block', type: 'object3d_sphere' },
        { kind: 'block', type: 'object3d_cube' },
        { kind: 'block', type: 'object3d_cylinder' },
        { kind: 'block', type: 'object3d_cone' },
        { kind: 'block', type: 'object3d_torus' },
        { kind: 'block', type: 'object3d_prism' },
        { kind: 'block', type: 'object3d_tetrahedron' },
        { kind: 'block', type: 'object3d_octahedron' },
        { kind: 'block', type: 'object3d_dodecahedron' },
        { kind: 'block', type: 'object3d_icosahedron' },
        { kind: 'block', type: 'object3d_dot' },
        { kind: 'block', type: 'object3d_line' },
        { kind: 'block', type: 'object3d_arrow' },
        { kind: 'block', type: 'object3d_surface' },
        { kind: 'block', type: 'object3d_polyhedron' },
        { kind: 'block', type: 'object3d_axes' },
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
        { kind: 'block', type: 'property_fill_opacity' },
        { kind: 'block', type: 'property_stroke_width' },
        { kind: 'block', type: 'property_scale' },
        { kind: 'block', type: 'property_rotate' },
        { kind: 'block', type: 'property_flip' },
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
        { kind: 'block', type: 'animate_uncreate' },
        { kind: 'block', type: 'animate_fade_in' },
        { kind: 'block', type: 'animate_fade_out' },
        { kind: 'block', type: 'animate_fade_transform' },
        { kind: 'block', type: 'animate_grow_from_center' },
        { kind: 'block', type: 'animate_spiral_in' },
        { kind: 'block', type: 'animate_shrink_to_center' },
        { kind: 'block', type: 'animate_write' },
        { kind: 'block', type: 'animate_unwrite' },
        { kind: 'block', type: 'animate_shift' },
        { kind: 'block', type: 'animate_scale' },
        { kind: 'block', type: 'animate_rotate' },
        { kind: 'block', type: 'animate_spin' },
        { kind: 'block', type: 'animate_transform' },
        { kind: 'block', type: 'animate_replacement_transform' },
        { kind: 'block', type: 'animate_move_along_path' },
        { kind: 'block', type: 'animate_lagged_start' },
        { kind: 'block', type: 'animate_draw_then_fill' },
        { kind: 'block', type: 'animate_flash' },
        { kind: 'block', type: 'animate_indicate' },
        { kind: 'block', type: 'animate_wiggle' },
        { kind: 'block', type: 'animate_apply_method' },
        { kind: 'block', type: 'animate_typewriter' },
        { kind: 'block', type: 'animate_speed' },
        { kind: 'block', type: 'animate_group' },
        { kind: 'block', type: 'animate_fade_to_color' },
        { kind: 'block', type: 'animate_transform_from_copy' },
        { kind: 'block', type: 'animate_grow_from_edge' },
        { kind: 'block', type: 'animate_grow_arrow' },
        { kind: 'block', type: 'animate_counterclockwise' },
        { kind: 'block', type: 'animate_swap' },
        { kind: 'block', type: 'animate_circumscribe' },
        { kind: 'block', type: 'animate_focus_on' },
        { kind: 'block', type: 'animate_broadcast' },
        { kind: 'block', type: 'animate_apply_wave' },
        { kind: 'block', type: 'animate_rotating' },
        { kind: 'block', type: 'animate_move_to_target' },
        { kind: 'block', type: 'animate_restore' },
        { kind: 'block', type: 'animate_succession' },
        { kind: 'block', type: 'animate_show_one_by_one' },
        { kind: 'block', type: 'animate_change_decimal' },
        { kind: 'block', type: 'animate_apply_function' },
        { kind: 'block', type: 'animate_blink' },
        { kind: 'block', type: 'animate_homotopy' },
        { kind: 'block', type: 'animate_traced_path' },
        { kind: 'block', type: 'animate_transform_matching_tex' },
        { kind: 'block', type: 'animate_transform_matching_shapes' },
        { kind: 'block', type: 'animate_show_increasing' },
        { kind: 'block', type: 'animate_cyclic_replace' },
        { kind: 'block', type: 'animate_remove_letter' },
        { kind: 'block', type: 'animate_phase_flow' },
        { kind: 'block', type: 'animate_lagged_map' },
        { kind: 'block', type: 'animate_maintain_relative' },
        { kind: 'block', type: 'animate_transform_animations' },
        { kind: 'block', type: 'animate_word_by_word' },
        { kind: 'block', type: 'animate_show_partial' },
      ],
    },

    // ── 🎥 相机 ──────────────────────────────────────
    {
      kind: 'category',
      name: '🎥 相机',
      colour: '20', // orange-red
      contents: [
        { kind: 'block', type: 'camera_3d_orientation' },
        { kind: 'block', type: 'camera_zoom' },
        { kind: 'block', type: 'camera_animate_zoom' },
        { kind: 'block', type: 'camera_move_to' },
        { kind: 'block', type: 'camera_restore' },
      ],
    },

    // ── 📐 坐标系 ────────────────────────────────────
    {
      kind: 'category',
      name: '📐 坐标系',
      colour: '230', // blue
      contents: [
        { kind: 'block', type: 'object_axes' },
        { kind: 'block', type: 'object_graph' },
        { kind: 'block', type: 'object_implicit_graph' },
        { kind: 'block', type: 'object_parametric_curve' },
        { kind: 'block', type: 'object_number_plane' },
        { kind: 'block', type: 'object_number_line' },
        { kind: 'block', type: 'object_polar_plane' },
        { kind: 'block', type: 'object_complex_plane' },
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

    // ── ⚙️ 更新器 ────────────────────────────────────
    {
      kind: 'category',
      name: '⚙️ 更新器',
      colour: '100', // teal
      contents: [
        { kind: 'block', type: 'updater_add' },
        { kind: 'block', type: 'updater_remove' },
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