// 生成每个积木单独使用的代码，收集到一个文件供 Python 验证
import * as Blockly from 'blockly';
import { blockDefs } from './src/blocks.js';
import { generateCode } from './src/generator.js';
import fs from 'fs';
Blockly.common.defineBlocksWithJsonArray(blockDefs);

const results = [];
const tests = [
  ['object_rectangle', '<block type="object_rectangle" x="30" y="30"><field name="VAR">r</field><field name="W">3</field><field name="H">2</field><field name="X">0</field><field name="Y">0</field></block>'],
  ['object_regular_polygon', '<block type="object_regular_polygon" x="30" y="30"><field name="VAR">p</field><field name="N">6</field><field name="X">0</field><field name="Y">0</field></block>'],
  ['object_tex', '<block type="object_tex" x="30" y="30"><field name="VAR">f</field><field name="TEX">x^2</field><field name="X">0</field><field name="Y">0</field></block>'],
  ['object_bulleted_list', '<block type="object_bulleted_list" x="30" y="30"><field name="VAR">l</field><field name="CONTENT">a, b, c</field><field name="X">0</field><field name="Y">0</field></block>'],
  ['object_matrix', '<block type="object_matrix" x="30" y="30"><field name="VAR">m</field><field name="CONTENT">[[1,2],[3,4]]</field><field name="X">0</field><field name="Y">0</field></block>'],
  ['object_graph_diagram', '<block type="object_graph_diagram" x="30" y="30"><field name="VAR">g</field><field name="VERTS">["A","B"]</field><field name="EDGES">[("A","B")]</field><field name="DIRECTED">Graph</field></block>'],
  ['object_angle', '<block type="object_angle" x="30" y="30"><field name="VAR">a</field><field name="V1">v</field><field name="V2">a1</field><field name="V3">a2</field></block>'],
  ['object_bezier', '<block type="object_bezier" x="30" y="30"><field name="VAR">b</field><field name="POINTS">[0,0,0],[1,2,0],[3,0,0],[4,2,0]</field></block>'],
  ['object_annulus', '<block type="object_annulus" x="30" y="30"><field name="VAR">a</field><field name="R1">2</field><field name="R2">1</field><field name="X">0</field><field name="Y">0</field></block>'],
  ['object_annular_sector', '<block type="object_annular_sector" x="30" y="30"><field name="VAR">a</field><field name="R1">2</field><field name="R2">1</field><field name="ANGLE">90</field></block>'],
  ['object_double_arrow', '<block type="object_double_arrow" x="30" y="30"><field name="VAR">d</field><field name="X1">-3</field><field name="Y1">0</field><field name="X2">3</field><field name="Y2">0</field></block>'],
  ['object_vector_arrow', '<block type="object_vector_arrow" x="30" y="30"><field name="VAR">v</field><field name="X1">0</field><field name="Y1">0</field><field name="DX">3</field><field name="DY">2</field></block>'],
  ['object_curved_arrow', '<block type="object_curved_arrow" x="30" y="30"><field name="VAR">c</field><field name="ANGLE">180</field></block>'],
  ['object_star', '<block type="object_star" x="30" y="30"><field name="VAR">s</field><field name="R">2</field><field name="X">0</field><field name="Y">0</field></block>'],
  ['object_cross', '<block type="object_cross" x="30" y="30"><field name="VAR">c</field><field name="X">0</field><field name="Y">0</field></block>'],
  ['object_surrounding_rect', '<block type="object_surrounding_rect" x="30" y="30"><field name="VAR">b</field><field name="TARGET">t</field><field name="COLOR">YELLOW</field></block>'],
  ['object_background_rect', '<block type="object_background_rect" x="30" y="30"><field name="VAR">b</field><field name="TARGET">t</field></block>'],
  ['object_underline', '<block type="object_underline" x="30" y="30"><field name="VAR">u</field><field name="TARGET">t</field></block>'],
  ['object_cutout', '<block type="object_cutout" x="30" y="30"><field name="A">a</field><field name="B">b</field><field name="VAR">r</field></block>'],
  ['object_exclusion', '<block type="object_exclusion" x="30" y="30"><field name="A">a</field><field name="B">b</field><field name="VAR">r</field></block>'],
  ['object_convex_hull', '<block type="object_convex_hull" x="30" y="30"><field name="A">p</field><field name="VAR">h</field></block>'],
  ['object_tangent_line', '<block type="object_tangent_line" x="30" y="30"><field name="VAR">t</field><field name="CURVE">c</field><field name="LEN">2</field></block>'],
  ['object_brace', '<block type="object_brace" x="30" y="30"><field name="VAR">b</field><field name="TARGET">t</field></block>'],
  ['object_brace_label', '<block type="object_brace_label" x="30" y="30"><field name="VAR">b</field><field name="TARGET">t</field><field name="TEXT">hi</field></block>'],
  ['object_group', '<block type="object_group" x="30" y="30"><field name="A">a</field><field name="B">b</field><field name="VAR">g</field></block>'],
  ['object3d_torus', '<block type="object3d_torus" x="30" y="30"><field name="VAR">t</field><field name="R">1.5</field><field name="R2">0.5</field><field name="X">0</field><field name="Y">0</field><field name="Z">0</field></block>'],
  ['object3d_surface', '<block type="object3d_surface" x="30" y="30"><field name="VAR">s</field><field name="FUNC">lambda u, v: np.array([u, v, u**2 - v**2])</field><field name="U0">-2</field><field name="U1">2</field><field name="V0">-2</field><field name="V1">2</field></block>'],
  ['object3d_polyhedron', '<block type="object3d_polyhedron" x="30" y="30"><field name="VAR">p</field><field name="VERTS">[[0,0,0],[2,0,0],[2,2,0],[0,2,0]]</field><field name="FACES">[[0,1,2,3]]</field></block>'],
  ['object_parametric_curve', '<block type="object_parametric_curve" x="30" y="30"><field name="VAR">c</field><field name="AXES">axes</field><field name="FUNC">lambda t: (np.cos(2*t), np.sin(3*t))</field><field name="T0">0</field><field name="T1">6.28</field></block>'],
  ['object_implicit_graph', '<block type="object_implicit_graph" x="30" y="30"><field name="VAR">g</field><field name="AXES">axes</field><field name="FUNC">x**2 + y**2 - 1</field></block>'],
  ['object_bar_chart', '<block type="object_bar_chart" x="30" y="30"><field name="VAR">b</field><field name="DATA">[3, 7, 5]</field></block>'],
  ['object_vector_field', '<block type="object_vector_field" x="30" y="30"><field name="VAR">v</field><field name="FUNC">lambda p: np.array([-p[1], p[0], 0])</field></block>'],
  ['object_stream_lines', '<block type="object_stream_lines" x="30" y="30"><field name="VAR">s</field><field name="FUNC">lambda p: np.array([-p[1], p[0], 0])</field></block>'],
  ['object_image', '<block type="object_image" x="30" y="30"><field name="VAR">i</field><field name="PATH">img.png</field><field name="X">0</field><field name="Y">0</field></block>'],
  ['object_banner', '<block type="object_banner" x="30" y="30"><field name="VAR">b</field></block>'],
  ['property_color_rgb', '<block type="property_color_rgb" x="30" y="30"><field name="VAR">o</field><field name="FILL">#FF0000</field><field name="STROKE">#FFFFFF</field></block>'],
  ['animate_apply_method', '<block type="animate_apply_method" x="30" y="30"><field name="OBJ">o</field><field name="METHOD">set_color, RED</field></block>'],
  ['animate_apply_function', '<block type="animate_apply_function" x="30" y="30"><field name="OBJ">o</field><field name="FUNC">lambda m: m.scale(2)</field></block>'],
  ['animate_lagged_start', '<block type="animate_lagged_start" x="30" y="30"><field name="OBJ">o</field><field name="COUNT">3</field></block>'],
  ['animate_group', '<block type="animate_group" x="30" y="30"><field name="OBJ">o</field><field name="COUNT">3</field></block>'],
  ['animate_succession', '<block type="animate_succession" x="30" y="30"><field name="OBJ">o</field><field name="COUNT">3</field></block>'],
  ['animate_phase_flow', '<block type="animate_phase_flow" x="30" y="30"><field name="VAR">o</field><field name="COUNT">3</field></block>'],
  ['animate_lagged_map', '<block type="animate_lagged_map" x="30" y="30"><field name="OBJ">o</field><field name="COUNT">3</field></block>'],
  ['scene_linear_transform', '<block type="scene_linear_transform" x="30" y="30"><field name="VAR">s</field><field name="V1">v1</field><field name="V2">v2</field></block>'],
  ['scene_vector_scene', '<block type="scene_vector_scene" x="30" y="30"><field name="VAR">s</field></block>'],
  ['scene_zoomed', '<block type="scene_zoomed" x="30" y="30"><field name="VAR">s</field><field name="SCALE">4</field></block>'],
  ['updater_add', '<block type="updater_add" x="30" y="30"><field name="VAR">o</field><field name="FUNC">lambda m: m.rotate(0.01)</field></block>'],
  ['updater_remove', '<block type="updater_remove" x="30" y="30"><field name="VAR">o</field></block>'],
];

let out = [];
for (const [name, blockXml] of tests) {
  const ws = new Blockly.Workspace();
  Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(`<xml xmlns="https://developers.google.com/blockly/xml">${blockXml}</xml>`), ws);
  out.push(`# === ${name} ===`);
  out.push(generateCode(ws));
}
fs.writeFileSync('/tmp/gen_all.py', out.join('\n\n'));
console.log('written, lines:', out.join('\n\n').split('\n').length);
