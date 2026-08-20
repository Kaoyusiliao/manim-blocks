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

/**
 * 获取积木字段值。
 * 关键：field_variable 的 getValue() 返回 Blockly 内部变量 ID（如 bQUH{I|...}），
 * 必须用 getVariable().name 获取用户看到的变量名（如 circle）。
 * 判断方式：只有变量字段有 getVariable() 方法（field.type 在压缩后不可靠）。
 * 其他字段（number/input/dropdown）直接 getValue()。
 */
function _v(b, n) {
  const field = b.getField(n);
  if (!field) return '';
  if (typeof field.getVariable === 'function') {
    const variable = field.getVariable();
    return variable ? variable.name : field.getText();
  }
  return field.getValue();
}

function indent(n) { return '    '.repeat(n); }

/**
 * 转义用户输入的文本，防止破坏生成的 Python 字符串字面量。
 * 用于放进双引号字符串的字段（CONTENT/TEXT/TEX 等）。
 */
function esc(s) {
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

// ── 值积木生成器（返回 Python 表达式字符串）───────────

const valueGens = {};

/** 解析任意值积木 → Python 表达式 */
function valueBlock(block) {
  if (!block) return '0';

  // var_get / variables_get — 变量名直接作为表达式（支持 Blockly 内置变量块）
  if (block.type === 'var_get' || block.type === 'variables_get') return _v(block, 'VAR');

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

  // procedures_callreturn — 有返回值的自制积木调用
  if (block.type === 'procedures_callreturn') {
    const name = procName(block);
    const args = [];
    for (let i = 0; i < block.getVars().length; i++) {
      const target = block.getInputTargetBlock(`arg${i}`);
      args.push(target ? valueBlock(target) : '0');
    }
    return `self.${name}(${args.join(', ')})`;
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
  const x = parseFloat(_v(block, 'X')) || 0, y = parseFloat(_v(block, 'Y')) || 0;
  if (x !== 0 || y !== 0) {
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
  indent(n) + `${_v(b, 'VAR')} = Text("${esc(_v(b, 'CONTENT'))}")` + maybeMoveTo(b, n);

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
  indent(n) + `${_v(b, 'VAR')} = MarkupText("${esc(_v(b, 'CONTENT'))}")` + maybeMoveTo(b, n);

codeGens.object_title = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Title("${esc(_v(b, 'CONTENT'))}")` + maybeMoveTo(b, n);

codeGens.object_bulleted_list = (b, n) => {
  const items = _v(b, 'CONTENT').split(',').map(s => s.trim()).filter(Boolean);
  const quoted = items.map(s => `"${esc(s)}"`).join(', ');
  return indent(n) + `${_v(b, 'VAR')} = BulletedList(${quoted})` + maybeMoveTo(b, n);
};

codeGens.object_code_block = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Code(code_string="${esc(_v(b, 'CONTENT'))}", language="python")` +
  maybeMoveTo(b, n);

// ── 进阶文字2 ─────────────────────────────────────────

codeGens.object_paragraph = (b, n) => {
  const lines = _v(b, 'CONTENT').split(',').map(s => s.trim()).filter(Boolean);
  const quoted = lines.map(s => `"${esc(s)}"`).join(', ');
  return indent(n) + `${_v(b, 'VAR')} = Paragraph(${quoted})` + maybeMoveTo(b, n);
};

codeGens.object_integer = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Integer(${_v(b, 'VALUE')})` + maybeMoveTo(b, n);

codeGens.object_decimal = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = DecimalNumber(${_v(b, 'VALUE')})` + maybeMoveTo(b, n);

codeGens.object_matrix = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Matrix(${_v(b, 'CONTENT')})` +
  maybeMoveTo(b, n);

codeGens.object_table = (b, n) => {
  // 将 "["a","b"],["c","d"]" 转成 Python 列表
  const raw = _v(b, 'CONTENT');
  return indent(n) + `${_v(b, 'VAR')} = Table(${raw}, row_labels=[])` + maybeMoveTo(b, n);
};

codeGens.object_graph_diagram = (b, n) => {
  const graphType = b.getFieldValue('DIRECTED');
  return indent(n) +
    `${_v(b, 'VAR')} = ${graphType}(vertices=${_v(b, 'VERTS')}, edges=${_v(b, 'EDGES')}, layout="circular")`;
};

codeGens.object_angle = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Angle(${_v(b, 'V2')}, ${_v(b, 'V3')}, radius=0.5)` +
  `\n${indent(n)}${_v(b, 'VAR')}.move_to(${_v(b, 'V1')})`;

codeGens.object_bezier = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = CubicBezier(${_v(b, 'POINTS')})`;

codeGens.object_shape_union = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Union(${_v(b, 'A')}, ${_v(b, 'B')})`;

codeGens.object_shape_intersection = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Intersection(${_v(b, 'A')}, ${_v(b, 'B')})`;

codeGens.object_shape_difference = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Difference(${_v(b, 'A')}, ${_v(b, 'B')})`;

// ── 更多几何 ──────────────────────────────────────────

codeGens.object_annulus = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Annulus(inner_radius=${_v(b, 'R2')}, outer_radius=${_v(b, 'R1')})` +
  maybeMoveTo(b, n);

codeGens.object_annular_sector = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = AnnularSector(inner_radius=${_v(b, 'R2')}, outer_radius=${_v(b, 'R1')}, angle=${_v(b, 'ANGLE')} * DEGREES)`;

codeGens.object_arc_between_points = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = ArcBetweenPoints([${_v(b, 'X1')}, ${_v(b, 'Y1')}, 0], [${_v(b, 'X2')}, ${_v(b, 'Y2')}, 0])`;

codeGens.object_double_arrow = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = DoubleArrow([${_v(b, 'X1')}, ${_v(b, 'Y1')}, 0], [${_v(b, 'X2')}, ${_v(b, 'Y2')}, 0])`;

codeGens.object_vector_arrow = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Vector([${_v(b, 'DX')}, ${_v(b, 'DY')}, 0])` +
  `\n${indent(n)}${_v(b, 'VAR')}.move_to([${_v(b, 'X1')}, ${_v(b, 'Y1')}, 0])`;

codeGens.object_curved_arrow = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = CurvedArrow(start_angle=-${_v(b, 'ANGLE')} * DEGREES / 2, end_angle=${_v(b, 'ANGLE')} * DEGREES / 2)`;

codeGens.object_star = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Star(n=5, outer_radius=${_v(b, 'R')}, inner_radius=${_v(b, 'R')} * 0.38)` +
  maybeMoveTo(b, n);

codeGens.object_cross = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Cross()` + maybeMoveTo(b, n);

codeGens.object_elbow = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Elbow()` + maybeMoveTo(b, n);

codeGens.object_right_angle = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = RightAngle(${_v(b, 'V2')}, ${_v(b, 'V3')})` +
  `\n${indent(n)}${_v(b, 'VAR')}.move_to(${_v(b, 'V1')})`;

codeGens.object_surrounding_rect = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = SurroundingRectangle(${_v(b, 'TARGET')}, color=${b.getFieldValue('COLOR')})`;

codeGens.object_background_rect = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = BackgroundRectangle(${_v(b, 'TARGET')})`;

codeGens.object_underline = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Underline(${_v(b, 'TARGET')})`;

codeGens.object_cutout = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Cutout(${_v(b, 'A')}, ${_v(b, 'B')})`;

codeGens.object_exclusion = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Exclusion(${_v(b, 'A')}, ${_v(b, 'B')})`;

codeGens.object_convex_hull = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = ConvexHull(${_v(b, 'A')})`;

codeGens.object_tangent_line = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = TangentLine(${_v(b, 'CURVE')}, length=${_v(b, 'LEN')})`;

codeGens.object_brace = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Brace(${_v(b, 'TARGET')})`;

codeGens.object_brace_label = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = BraceLabel(${_v(b, 'TARGET')}, "${esc(_v(b, 'TEXT'))}")`;

codeGens.object_group = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = VGroup(${_v(b, 'A')}, ${_v(b, 'B')})`;

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

codeGens.object_complex_plane = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = ComplexPlane(x_range=[${_v(b, 'XMIN')}, ${_v(b, 'XMAX')}], ` +
  `y_range=[${_v(b, 'YMIN')}, ${_v(b, 'YMAX')}], ` +
  `background_line_style={"stroke_opacity": 0.4})`;

codeGens.object_implicit_graph = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = ${_v(b, 'AXES')}.plot_implicit_curve(lambda x, y: ${_v(b, 'FUNC')})`;

codeGens.object_parametric_curve = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = ${_v(b, 'AXES')}.plot_parametric_curve(${_v(b, 'FUNC')}, ` +
  `t_range=[${_v(b, 'T0')}, ${_v(b, 'T1')}], color=YELLOW)`;

// 参数曲线·匀速绘制：纯 numpy 等弧长参数化（无需 sympy/scipy）
codeGens.object_parametric_curve_uniform = (b, n) => {
  const fn = _v(b, 'FUNC');
  const t0 = _v(b, 'T0');
  const t1 = _v(b, 'T1');
  const N = _v(b, 'N');
  const varName = _v(b, 'VAR');
  const axes = _v(b, 'AXES');
  const lines = [
    indent(n) + `# 等弧长参数化：让 Create 绘制速度均匀`,
    indent(n) + `${varName}_fn = ${fn}`,
    indent(n) + `_t_dense = np.linspace(${t0}, ${t1}, 2000)`,
    indent(n) + `_pts_dense = np.array([${varName}_fn(tt) for tt in _t_dense])`,
    indent(n) + `_seg = np.linalg.norm(np.diff(_pts_dense, axis=0), axis=1)`,
    indent(n) + `_arc = np.concatenate([[0], np.cumsum(_seg)])`,
    indent(n) + `_t_uniform = np.interp(np.linspace(0, _arc[-1], ${N}), _arc, _t_dense)`,
    indent(n) + `${varName} = VMobject(color=PINK, stroke_width=3)`,
    indent(n) + `${varName}.set_points_as_corners([${axes}.c2p(*${varName}_fn(t)) for t in _t_uniform])`,
  ];
  return lines.join('\n');
};

// 独立参数曲线（ParametricFunction，2D/心形线等）
codeGens.object_parametric_function = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = ParametricFunction(\n` +
  indent(n + 1) + `${_v(b, 'FUNC')},\n` +
  indent(n + 1) + `t_range=[${_v(b, 'T0')}, ${_v(b, 'T1')}, ${_v(b, 'STEP')}],\n` +
  indent(n + 1) + `color=${b.getFieldValue('COLOR')},\n` +
  indent(n) + `)`;

// 3D 参数曲线（螺旋线等，自动立体着色 + ThreeDScene）
codeGens.object_parametric_function_3d = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = ParametricFunction(\n` +
  indent(n + 1) + `${_v(b, 'FUNC')},\n` +
  indent(n + 1) + `t_range=[${_v(b, 'T0')}, ${_v(b, 'T1')}, ${_v(b, 'STEP')}],\n` +
  indent(n + 1) + `color=${b.getFieldValue('COLOR')},\n` +
  indent(n) + `).set_shade_in_3d(True)`;

// ── 3D 物体 ──────────────────────────────────────────

function maybeMoveTo3D(block, n) {
  const x = _v(block, 'X'), y = _v(block, 'Y'), z = _v(block, 'Z');
  if (x !== '0' || y !== '0' || z !== '0') {
    return `\n${indent(n)}${_v(block, 'VAR')}.move_to([${x}, ${y}, ${z}])`;
  }
  return '';
}

codeGens.object3d_sphere = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Sphere(radius=${_v(b, 'R')})` + maybeMoveTo3D(b, n);

codeGens.object3d_cube = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Cube(side_length=${_v(b, 'L')})` + maybeMoveTo3D(b, n);

codeGens.object3d_cylinder = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Cylinder(radius=${_v(b, 'R')}, height=${_v(b, 'H')})` +
  maybeMoveTo3D(b, n);

codeGens.object3d_cone = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Cone(base_radius=${_v(b, 'R')}, height=${_v(b, 'H')})` +
  maybeMoveTo3D(b, n);

codeGens.object3d_torus = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Torus(major_radius=${_v(b, 'R')}, minor_radius=${_v(b, 'R2')})` +
  maybeMoveTo3D(b, n);

codeGens.object3d_prism = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Prism(dimensions=[${_v(b, 'W')}, ${_v(b, 'H')}, ${_v(b, 'D')}])` +
  maybeMoveTo3D(b, n);

codeGens.object3d_dot = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Dot3D()` + maybeMoveTo3D(b, n);

codeGens.object3d_line = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Line3D([${_v(b, 'X1')}, ${_v(b, 'Y1')}, ${_v(b, 'Z1')}], [${_v(b, 'X2')}, ${_v(b, 'Y2')}, ${_v(b, 'Z2')}])`;

codeGens.object3d_arrow = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Arrow3D([${_v(b, 'X1')}, ${_v(b, 'Y1')}, ${_v(b, 'Z1')}], [${_v(b, 'X2')}, ${_v(b, 'Y2')}, ${_v(b, 'Z2')}])`;

codeGens.object3d_tetrahedron = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Tetrahedron(side_length=${_v(b, 'L')})` + maybeMoveTo3D(b, n);

codeGens.object3d_octahedron = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Octahedron(side_length=${_v(b, 'L')})` + maybeMoveTo3D(b, n);

codeGens.object3d_dodecahedron = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Dodecahedron(side_length=${_v(b, 'L')})` + maybeMoveTo3D(b, n);

codeGens.object3d_icosahedron = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Icosahedron(side_length=${_v(b, 'L')})` + maybeMoveTo3D(b, n);

codeGens.object3d_surface = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Surface(${_v(b, 'FUNC')}, u_range=[${_v(b, 'U0')}, ${_v(b, 'U1')}], v_range=[${_v(b, 'V0')}, ${_v(b, 'V1')}], resolution=32)`;

codeGens.object3d_polyhedron = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Polyhedron(vertex_coords=${_v(b, 'VERTS')}, faces_list=${_v(b, 'FACES')})`;

codeGens.object3d_axes = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = ThreeDAxes(x_range=[${_v(b, 'XMIN')}, ${_v(b, 'XMAX')}], ` +
  `y_range=[${_v(b, 'YMIN')}, ${_v(b, 'YMAX')}], ` +
  `z_range=[${_v(b, 'ZMIN')}, ${_v(b, 'ZMAX')}], ` +
  `x_length=6, y_length=4, z_length=3)`;

codeGens.object_axes = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = Axes(x_range=[${_v(b, 'XMIN')}, ${_v(b, 'XMAX')}], ` +
  `y_range=[${_v(b, 'YMIN')}, ${_v(b, 'YMAX')}], ` +
  // y_length 按 x/y 范围比例计算，保持纵横比一致（圆不变形）
  `x_length=6, y_length=6 * (${_v(b, 'YMAX')} - ${_v(b, 'YMIN')}) / (${_v(b, 'XMAX')} - ${_v(b, 'XMIN')}), ` +
  `axis_config={"include_numbers": True})`;
codeGens.object_graph = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = ${_v(b, 'AXES')}.plot(lambda x: ${_v(b, 'FUNC')}, color=YELLOW)`;

codeGens.object_function_graph = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = FunctionGraph(${_v(b, 'FUNC')}, x_range=[${_v(b, 'XMIN')}, ${_v(b, 'XMAX')}], color=YELLOW)`;

codeGens.object_bar_chart = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = BarChart(values=${_v(b, 'DATA')})`;

codeGens.object_vector_field = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = ArrowVectorField(${_v(b, 'FUNC')}, x_range=[-4, 4], y_range=[-3, 3])`;

codeGens.object_stream_lines = (b, n) =>
  indent(n) +
  `${_v(b, 'VAR')} = StreamLines(${_v(b, 'FUNC')}, x_range=[-4, 4], y_range=[-3, 3])`;

codeGens.object_value_tracker = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = ValueTracker(${_v(b, 'VALUE')})`;

codeGens.object_image = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = ImageMobject("${esc(_v(b, 'PATH'))}")` + maybeMoveTo(b, n);

codeGens.object_banner = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = ManimBanner()`;

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
  indent(n) + `self.play(Create(${_v(b, 'VAR')}), run_time=${_v(b, 'DURATION')})`;
codeGens.animate_fade_in = (b, n) =>
  indent(n) + `self.play(FadeIn(${_v(b, 'VAR')}))`;
codeGens.animate_fade_out = (b, n) =>
  indent(n) + `self.play(FadeOut(${_v(b, 'VAR')}))`;
codeGens.animate_grow_from_center = (b, n) =>
  indent(n) + `self.play(GrowFromCenter(${_v(b, 'VAR')}))`;
codeGens.animate_write = (b, n) =>
  indent(n) + `self.play(Write(${_v(b, 'VAR')}), run_time=${_v(b, 'DURATION')})`;
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

codeGens.animate_move_along_path = (b, n) =>
  indent(n) + `self.play(MoveAlongPath(${_v(b, 'OBJ')}, ${_v(b, 'PATH')}))`;

codeGens.animate_lagged_start = (b, n) => {
  const count = _v(b, 'COUNT');
  const varName = _v(b, 'OBJ');
  const lines = [];
  lines.push(indent(n) + `${varName}_group = VGroup()`);
  lines.push(indent(n) + `for _ in range(${count}):`);
  lines.push(indent(n + 1) + `${varName}_group.add(${varName}.copy())`);
  lines.push(indent(n) + `self.play(LaggedStart(*[Create(m) for m in ${varName}_group]))`);
  return lines.join('\n');
};

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

codeGens.animate_typewriter = (b, n) =>
  indent(n) + `self.play(AddTextLetterByLetter(${_v(b, 'VAR')}))`;

codeGens.animate_fade_in_letters = (b, n) =>
  indent(n) + `self.play(FadeIn(${_v(b, 'VAR')}, lag_ratio=${b.getFieldValue('RATIO')}))`;

codeGens.animate_speed = (b, n) =>
  indent(n) + `self.play(self.camera.frame.animate.set_rate_func(smoothstep), run_time=0.001)` +
  `\n${indent(n)}# 提示：速度调整通过 run_time 实现，可在下方动画加 run_time=1/${_v(b, 'SPEED')}`;

codeGens.animate_group = (b, n) => {
  const count = _v(b, 'COUNT');
  const varName = _v(b, 'OBJ');
  const lines = [];
  lines.push(indent(n) + `${varName}_group = VGroup(*[${varName}.copy() for _ in range(${count})])`);
  lines.push(indent(n) + `${varName}_group.arrange(RIGHT, buff=0.5)`);
  lines.push(indent(n) + `self.play(AnimationGroup(*[Create(m) for m in ${varName}_group]))`);
  return lines.join('\n');
};

// 两个物体同时移动（合集「多动画齐步走」方法一）
codeGens.animate_together = (b, n) =>
  indent(n) +
  `self.play(\n` +
  indent(n + 1) + `${_v(b, 'A')}.animate.shift(${_v(b, 'DX1')} * RIGHT + ${_v(b, 'DY1')} * UP),\n` +
  indent(n + 1) + `${_v(b, 'B')}.animate.shift(${_v(b, 'DX2')} * RIGHT + ${_v(b, 'DY2')} * UP),\n` +
  indent(n) + `)`;

// 变速沿路径移动（合集：掌握ChangeSpeed类）
codeGens.animate_change_speed = (b, n) =>
  indent(n) +
  `self.play(\n` +
  indent(n + 1) + `ChangeSpeed(\n` +
  indent(n + 2) + `MoveAlongPath(${_v(b, 'VAR')}, ${_v(b, 'PATH')}),\n` +
  indent(n + 2) + `speedinfo=${b.getFieldValue('SPEEDINFO')},\n` +
  indent(n + 1) + `),\n` +
  indent(n + 1) + `run_time=${_v(b, 'DURATION')},\n` +
  indent(n) + `)`;

// 节奏移动（rate_func）— 合集：Rate Functions 节奏控制
codeGens.animate_rhythm = (b, n) =>
  indent(n) +
  `self.play(\n` +
  indent(n + 1) +
  `${_v(b, 'VAR')}.animate(rate_func=${b.getFieldValue('RATE')}, run_time=${_v(b, 'DURATION')})\n` +
  indent(n + 2) + `.shift(${_v(b, 'DX')} * RIGHT + ${_v(b, 'DY')} * UP),\n` +
  indent(n) + `)`;

// 背景图片 — 合集：背景图片
codeGens.object_background = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = ImageMobject("${esc(_v(b, 'PATH'))}")` +
  `\n${indent(n)}${_v(b, 'VAR')}.scale_to_fit_height(config.frame_height)` +
  `\n${indent(n)}${_v(b, 'VAR')}.scale_to_fit_width(config.frame_width)` +
  `\n${indent(n)}${_v(b, 'VAR')}.set_z_index(-100)` +
  `\n${indent(n)}self.add(${_v(b, 'VAR')})`;

// 公式分段着色 — 合集：公式各部分颜色
codeGens.object_formula_colors = (b, n) => {
  const parts = _v(b, 'PARTS').split(',').map(s => s.trim()).filter(Boolean);
  const colors = b.getFieldValue('COLOR').split(',');
  const varName = _v(b, 'VAR');
  const lines = [];
  const quoted = parts.map(p => `"${esc(p)}"`).join(', ');
  lines.push(indent(n) + `${varName} = MathTex(${quoted})`);
  let colorIdx = 0;
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0 && colors[colorIdx]) { // 给第 0,2,4... 段着色（符号保持默认）
      lines.push(indent(n) + `${varName}[${i}].set_color(${colors[colorIdx]})`);
      colorIdx++;
    }
  }
  return lines.join('\n');
};

// ── 更多动画 ──────────────────────────────────────────

codeGens.animate_fade_to_color = (b, n) =>
  indent(n) + `self.play(FadeToColor(${_v(b, 'VAR')}, ${b.getFieldValue('COLOR')}))`;

codeGens.animate_transform_from_copy = (b, n) =>
  indent(n) + `self.play(TransformFromCopy(${_v(b, 'OBJ')}, ${_v(b, 'TARGET')}))`;

codeGens.animate_grow_from_edge = (b, n) =>
  indent(n) + `self.play(GrowFromEdge(${_v(b, 'VAR')}, ${b.getFieldValue('EDGE')}))`;

codeGens.animate_grow_arrow = (b, n) =>
  indent(n) + `self.play(GrowArrow(${_v(b, 'VAR')}))`;

codeGens.animate_counterclockwise = (b, n) =>
  indent(n) + `self.play(CounterclockwiseTransform(${_v(b, 'OBJ')}, ${_v(b, 'TARGET')}))`;

codeGens.animate_swap = (b, n) =>
  indent(n) + `self.play(Swap(${_v(b, 'A')}, ${_v(b, 'B')}))`;

codeGens.animate_circumscribe = (b, n) =>
  indent(n) + `self.play(Circumscribe(${_v(b, 'VAR')}))`;

codeGens.animate_focus_on = (b, n) =>
  indent(n) + `self.play(FocusOn(${_v(b, 'VAR')}))`;

codeGens.animate_broadcast = (b, n) =>
  indent(n) + `self.play(Broadcast(${_v(b, 'VAR')}))`;

codeGens.animate_apply_wave = (b, n) =>
  indent(n) + `self.play(ApplyWave(${_v(b, 'VAR')}))`;

codeGens.animate_rotating = (b, n) =>
  indent(n) + `self.play(Rotating(${_v(b, 'VAR')}, angle=${_v(b, 'ANGLE')} * DEGREES))`;

codeGens.animate_move_to_target = (b, n) =>
  indent(n) + `self.play(MoveToTarget(${_v(b, 'VAR')}))`;

codeGens.animate_restore = (b, n) =>
  indent(n) + `self.play(Restore(${_v(b, 'VAR')}))`;

codeGens.animate_succession = (b, n) => {
  const count = _v(b, 'COUNT');
  const varName = _v(b, 'OBJ');
  const lines = [];
  lines.push(indent(n) + `${varName}_group = VGroup()`);
  lines.push(indent(n) + `for _ in range(${count}):`);
  lines.push(indent(n + 1) + `${varName}_group.add(${varName}.copy())`);
  lines.push(indent(n) + `self.play(Succession(*[Create(m) for m in ${varName}_group]))`);
  return lines.join('\n');
};

codeGens.animate_show_one_by_one = (b, n) =>
  indent(n) + `self.play(ShowSubmobjectsOneByOne(${_v(b, 'VAR')}))`;

codeGens.animate_change_decimal = (b, n) =>
  indent(n) + `self.play(ChangeDecimalToValue(${_v(b, 'VAR')}, ${_v(b, 'VALUE')}))`;

codeGens.animate_apply_function = (b, n) =>
  indent(n) + `self.play(ApplyFunction(${_v(b, 'FUNC')}, ${_v(b, 'OBJ')}))`;

codeGens.animate_blink = (b, n) =>
  indent(n) + `self.play(Blink(${_v(b, 'VAR')}))`;

codeGens.animate_homotopy = (b, n) =>
  indent(n) + `self.play(Homotopy(lambda x, y, z, t: [x, y + 0.5 * np.sin(2 * np.pi * t), z], ${_v(b, 'VAR')}))`;

codeGens.animate_traced_path = (b, n) =>
  indent(n) + `self.play(TracedPath(${_v(b, 'VAR')}.get_center))`;

// ── 匹配变换等动画 ────────────────────────────────────

codeGens.animate_transform_matching_tex = (b, n) =>
  indent(n) + `self.play(TransformMatchingTex(${_v(b, 'OBJ')}, ${_v(b, 'TARGET')}))`;

codeGens.animate_transform_matching_shapes = (b, n) =>
  indent(n) + `self.play(TransformMatchingShapes(${_v(b, 'OBJ')}, ${_v(b, 'TARGET')}))`;

codeGens.animate_show_increasing = (b, n) =>
  indent(n) + `self.play(ShowIncreasingSubsets(${_v(b, 'VAR')}))`;

codeGens.animate_cyclic_replace = (b, n) =>
  indent(n) + `self.play(CyclicReplace(${_v(b, 'A')}, ${_v(b, 'B')}))`;

codeGens.animate_remove_letter = (b, n) =>
  indent(n) + `self.play(RemoveTextLetterByLetter(${_v(b, 'VAR')}))`;

codeGens.animate_phase_flow = (b, n) => {
  const count = _v(b, 'COUNT');
  const varName = _v(b, 'VAR');
  const lines = [];
  lines.push(indent(n) + `${varName}_group = VGroup()`);
  lines.push(indent(n) + `for _ in range(${count}):`);
  lines.push(indent(n + 1) + `${varName}_group.add(${varName}.copy())`);
  lines.push(indent(n) + `self.play(LaggedStart(*[FadeIn(m) for m in ${varName}_group]))`);
  return lines.join('\n');
};

codeGens.animate_lagged_map = (b, n) => {
  const count = _v(b, 'COUNT');
  const varName = _v(b, 'OBJ');
  const lines = [];
  lines.push(indent(n) + `${varName}_group = VGroup()`);
  lines.push(indent(n) + `for _ in range(${count}):`);
  lines.push(indent(n + 1) + `${varName}_group.add(${varName}.copy())`);
  lines.push(indent(n) + `self.play(LaggedStartMap(Create, ${varName}_group))`);
  return lines.join('\n');
};

codeGens.animate_maintain_relative = (b, n) =>
  indent(n) + `self.play(MaintainPositionRelativeTo(${_v(b, 'OBJ')}, ${_v(b, 'TARGET')}))`;

codeGens.animate_transform_animations = (b, n) =>
  indent(n) + `self.play(TransformAnimations(${_v(b, 'OBJ')}, ${_v(b, 'TARGET')}))`;

codeGens.animate_word_by_word = (b, n) =>
  indent(n) + `self.play(AddTextWordByWord(${_v(b, 'VAR')}))`;

codeGens.animate_show_partial = (b, n) =>
  indent(n) + `self.play(ShowPartial(${_v(b, 'VAR')}, fraction=${_v(b, 'PERCENT')} / 100))`;

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

// ── 🎥 相机 ──────────────────────────────────────────

codeGens.camera_zoom = (b, n) =>
  indent(n) + `self.camera.frame.scale(${_v(b, 'SCALE')})`;

codeGens.camera_move_to = (b, n) =>
  indent(n) + `self.camera.frame.move_to(${_v(b, 'X')} * RIGHT + ${_v(b, 'Y')} * UP)`;

codeGens.camera_animate_zoom = (b, n) =>
  indent(n) + `self.play(self.camera.frame.animate.scale(${_v(b, 'SCALE')}))`;

codeGens.camera_restore = (b, n) =>
  indent(n) + `self.camera.frame.restore()`;

codeGens.camera_3d_orientation = (b, n) =>
  indent(n) +
  `self.set_camera_orientation(phi=${_v(b, 'PHI')} * DEGREES, theta=${_v(b, 'THETA')} * DEGREES)`;

// ── 🧩 场景类 ─────────────────────────────────────────
// 场景类（VectorScene/ThreeDScene/ZoomedScene 等）由 generateCode 根据积木自动切换，
// 这里只生成场景内的辅助代码。

codeGens.scene_vector_scene = (b, n) =>
  indent(n) + '# 向量场景已启用（VectorScene）\n' +
  indent(n) + 'self.add(self.plane)';

codeGens.scene_linear_transform = (b, n) =>
  indent(n) + '# 线性变换场景\n' +
  indent(n) + 'self.add(self.plane)';

codeGens.scene_zoomed = (b, n) =>
  indent(n) + '# 缩放镜头场景（ZoomedScene）\n' +
  indent(n) + `self.zoomed_camera.frame.scale(${_v(b, 'SCALE')})`;

// ── ⚙️ 更新器 ────────────────────────────────────────

codeGens.updater_add = (b, n) =>
  indent(n) + `${_v(b, 'VAR')}.add_updater(${_v(b, 'FUNC')})`;

codeGens.updater_remove = (b, n) =>
  indent(n) + `if ${_v(b, 'VAR')}.updaters:\n` +
  indent(n + 1) + `${_v(b, 'VAR')}.remove_updater(${_v(b, 'VAR')}.updaters[-1])`;

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

// Blockly 内置「将变量设为」块
codeGens.variables_set = (b, n) => {
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

// ── 🎛 自制积木（Scratch 过程块）─────────────────────
// 定义块生成 class 内的方法（不在 construct 里），由 generateCode 收集后放到类层级。
// 收集器：procedureDefLines（class 内、construct 外的方法定义）

const procedureDefLines = [];

/** 获取过程名（处理 Blockly 内置字段） */
function procName(block) {
  const field = block.getField('NAME');
  return field ? field.getValue() : 'unnamed';
}

/** 生成无返回值过程定义 */
function procDefNoReturn(block, n) {
  const name = procName(block);
  const params = block.getVars(); // 参数名数组
  const inner = block.getInputTargetBlock('STACK');
  const body = inner ? blockChainToCode(inner, n + 1) : indent(n + 1) + 'pass';
  const paramStr = params.length > 0 ? params.join(', ') : '';
  const lines = [];
  lines.push(indent(n) + `def ${name}(self${paramStr ? ', ' + paramStr : ''}):`);
  lines.push(body);
  return lines.join('\n');
}

/** 生成有返回值过程定义 */
function procDefReturn(block, n) {
  const name = procName(block);
  const params = block.getVars();
  const inner = block.getInputTargetBlock('STACK');
  const retBlock = block.getInputTargetBlock('RETURN');
  let body = inner ? blockChainToCode(inner, n + 1) : indent(n + 1) + 'pass';
  if (retBlock) {
    body += '\n' + indent(n + 1) + 'return ' + valueBlock(retBlock);
  }
  const paramStr = params.length > 0 ? params.join(', ') : '';
  const lines = [];
  lines.push(indent(n) + `def ${name}(self${paramStr ? ', ' + paramStr : ''}):`);
  lines.push(body);
  return lines.join('\n');
}

codeGens.procedures_defnoreturn = (b, n) => {
  procedureDefLines.push(procDefNoReturn(b, 1));
  return null; // 不在 construct 里输出
};

codeGens.procedures_defreturn = (b, n) => {
  procedureDefLines.push(procDefReturn(b, 1));
  return null;
};

/** 无返回值调用：self.名称(参数...) */
codeGens.procedures_callnoreturn = (b, n) => {
  const name = procName(b);
  const args = [];
  for (let i = 0; i < b.getVars().length; i++) {
    const target = b.getInputTargetBlock(`arg${i}`);
    args.push(target ? valueBlock(target) : '0');
  }
  const argStr = args.length > 0 ? args.join(', ') : '';
  return indent(n) + `self.${name}(${argStr})`;
};

/** 有返回值调用：作为值块 */
codeGens.procedures_callreturn = (b, n) => {
  const name = procName(b);
  const args = [];
  for (let i = 0; i < b.getVars().length; i++) {
    const target = b.getInputTargetBlock(`arg${i}`);
    args.push(target ? valueBlock(target) : '0');
  }
  const argStr = args.length > 0 ? args.join(', ') : '';
  return indent(n) + `self.${name}(${argStr})`;
};

// procedures_ifreturn 只在 defreturn 内出现，随 body 一起生成
codeGens.procedures_ifreturn = (b, n) => {
  const cond = valueBlock(b.getInputTargetBlock('CONDITION'));
  const ret = b.getInputTargetBlock('VALUE');
  const retStr = ret ? valueBlock(ret) : 'None';
  return `${indent(n)}if ${cond}:\n${indent(n + 1)}return ${retStr}`;
};

// ── 🛠 通用积木 ───────────────────────────────────────

codeGens.custom_code = (b, n) => {
  const code = _v(b, 'CODE').trim();
  if (!code) return '';
  // 多行代码逐行加缩进
  return code.split('\n').map(line => indent(n) + line).join('\n');
};

codeGens.custom_function = (b, n) => {
  const func = _v(b, 'FUNC').trim();
  if (!func) return '';
  return func.split('\n').map(line => indent(n) + line).join('\n');
};

codeGens.custom_mobject = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = ${_v(b, 'CODE')}`;

codeGens.custom_call_method = (b, n) =>
  indent(n) + `${_v(b, 'OBJ')}.${_v(b, 'METHOD')}`;

codeGens.custom_import = (b, n) => {
  // 导入语句收集到文件头（通过标记变量，主生成函数处理）
  const imp = _v(b, 'IMPORT').trim();
  if (imp) pendingImports.add(imp);
  return indent(n) + `# import: ${imp}`;
};

// ── ⬜ 辅助 — 值块放在语句中视为独立表达式 ──────────────

codeGens.math_number   = (b, n) => indent(n) + `_ = ${_v(b, 'NUM')}`;
codeGens.logic_boolean  = (b, n) => indent(n) + `_ = ${_v(b, 'BOOL') === 'True' ? 'True' : 'False'}`;

// ── 主生成函数 ────────────────────────────────────────

// 收集自定义 import（custom_import 积木产生）
const pendingImports = new Set();

/**
 * 将 Blockly 工作区中的顶层积木转换为完整的 Manim Python 脚本。
 * @param {Blockly.Workspace} workspace
 * @returns {string} 完整的 .py 文件内容
 */
export function generateCode(workspace) {
  const topBlocks = workspace.getTopBlocks(true);
  // 只有咬合的链才是程序，孤立积木是草稿
  const chainHeads = topBlocks.filter(b => b.getNextBlock());

  // 检测需要的 imports 和场景类型（只看咬合的链）
  let needsRandom = false;
  let needsMath = false;
  let needsMovingCamera = false;
  let needs3D = false;
  let needsVectorScene = false;
  let needsZoomed = false;

  for (const block of chainHeads) {
    const types = collectBlockTypes(block);
    if (types.has('op_random')) needsRandom = true;
    if (types.has('op_sin') || types.has('op_cos') || types.has('op_tan') || types.has('op_sqrt'))
      needsMath = true;
    if (types.has('camera_zoom') || types.has('camera_move_to') ||
        types.has('camera_animate_zoom') || types.has('camera_restore'))
      needsMovingCamera = true;
    if (types.has('scene_vector_scene') || types.has('scene_linear_transform'))
      needsVectorScene = true;
    if (types.has('scene_zoomed')) needsZoomed = true;
    for (const t of types) {
      if (t.startsWith('object3d_') || t === 'camera_3d_orientation' || t === 'object_parametric_function_3d') needs3D = true;
    }
  }

  // 生成 imports
  const imports = ['from manim import *'];
  if (needsRandom) imports.push('import random');
  if (needsMath) imports.push('import math');
  for (const imp of pendingImports) imports.push(imp);
  pendingImports.clear();

  // 生成 body：只处理「咬合」的积木链。
  // 规则：程序 = 通过 next 连接在一起的积木链。
  // 孤立的积木（没有和任何积木连接）视为「移开的草稿」，不写入程序。
  // 这与 Scratch 一致：只有拼在脚本里的积木才执行。
  // 例外：自制积木「定义块」即使独立放置也要收集（变成 class 方法）。
  let body;

  // 先收集「自制积木定义块」— 只收集孤立的（链内的由 blockChainToCode 收集，避免重复）
  for (const b of topBlocks) {
    if (!b.getNextBlock() && !b.getPreviousBlock()) {
      if (b.type === 'procedures_defnoreturn') procedureDefLines.push(procDefNoReturn(b, 1));
      else if (b.type === 'procedures_defreturn') procedureDefLines.push(procDefReturn(b, 1));
    }
  }

  if (chainHeads.length > 0) {
    // 有咬合的链 → 只生成这些链
    body = chainHeads.map(b => blockChainToCode(b, 2)).filter(Boolean).join('\n');
    if (!body.trim()) body = indent(2) + 'pass';
  } else if (topBlocks.length === 0) {
    body = indent(2) + 'pass  # 拖拽左侧积木开始创作';
  } else {
    // 有积木但都没有咬合 → 提示用户接起来
    body = indent(2) + 'pass  # ⚠️ 积木还没有连接成程序 — 把积木上下拼在一起';
  }

  // ═══ 智能修正：解决小白常见错误 ═══
  // 1. 引用未定义的变量（如创建了 sphere 但动画块选的是 circle）→ 自动匹配已创建的物体
  // 2. 创建了但从未显示过的物体 → 自动 self.add()，否则场景里看不到
  // 3. 依赖顺序错误（先画图后建坐标轴）→ 自动重排
  // 4. 坐标类对象误用 set_fill/set_stroke → 改为 set_color
  if (body.trim() && !body.includes('pass  #')) {
    body = autoFixVariables(body);
    body = reorderDependencies(body);
    body = fixCoordinateFill(body);
  }

  // 用了 np.xxx 但没导入 numpy → 自动补 import
  if (body.includes('np.') && !imports.includes('import numpy as np')) {
    imports.push('import numpy as np');
  }

  // 3D 场景：默认给一个倾斜视角，否则立方体等正对镜头会看不出立体感（看起来像平面正方形）
  if (needs3D && body.trim() && !body.includes('set_camera_orientation')) {
    body = indent(2) + 'self.set_camera_orientation(phi=75 * DEGREES, theta=-45 * DEGREES)\n' + body;
  }

  // 3D 场景相机兼容：ThreeDCamera 没有 frame 属性，frame.* 会崩 → 替换为 3D 兼容写法
  if (needs3D && body.includes('self.camera.frame')) {
    // camera_restore → 重置视角
    body = body.replace(
      /self\.camera\.frame\.restore\(\)/g,
      'self.set_camera_orientation(phi=75 * DEGREES, theta=-45 * DEGREES)'
    );
    // camera_zoom / camera_animate_zoom → move_camera(zoom=...)
    body = body.replace(
      /self\.play\(self\.camera\.frame\.animate\.scale\(([^)]*)\)\)/g,
      'self.move_camera(zoom=$1)'
    );
    body = body.replace(
      /self\.camera\.frame\.scale\(([^)]*)\)/g,
      'self.move_camera(zoom=$1)'
    );
    // camera_move_to → 提示不支持（3D 相机没有直接 frame.move_to）
    body = body.replace(
      /self\.camera\.frame\.move_to\(([^)]*)\)/g,
      '# ⚠️ 3D 场景下相机移动请用「3D 相机视角」积木调整角度'
    );
  }

  // 自动补 wait：只考虑已咬合的链
  let lastBlock = null;
  for (const b of chainHeads) {
    let cur = b;
    while (cur.getNextBlock()) cur = cur.getNextBlock();
    lastBlock = cur;
  }
  const extraWait = lastBlock && lastBlock.type !== 'scene_wait'
    ? indent(2) + 'self.wait(1)'
    : '';

  // 场景类型：3D > 移动相机 > 缩放镜头 > 向量 > 普通
  let sceneClass = 'Scene';
  if (needs3D) sceneClass = 'ThreeDScene';
  else if (needsMovingCamera) sceneClass = 'MovingCameraScene';
  else if (needsZoomed) sceneClass = 'ZoomedScene';
  else if (needsVectorScene) sceneClass = 'VectorScene';

  // 自制积木定义（class 内、construct 外的方法）
  let methodsBlock = '';
  if (procedureDefLines.length > 0) {
    methodsBlock = '\n' + procedureDefLines.join('\n\n');
    procedureDefLines.length = 0; // 清空，防止多次生成重复
  }

  return `${imports.join('\n')}

class MyScene(${sceneClass}):
    def construct(self):
${body}
${extraWait}
${methodsBlock}
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

/**
 * 智能修正生成代码中的小白常见错误：
 * 1. 把「引用但从未创建」的变量名替换成第一个创建的物体变量
 * 2. 给「创建了但从未显示」的物体自动补 self.add()
 */
function autoFixVariables(body) {
  const P = '    '.repeat(2); // 8 空格缩进

  // ── 0. 保护字符串字面量（"..." 和 r"..."），防止字符串里的词被误当变量 ──
  const strMap = [];
  const strRe = /r?"((?:[^"\\]|\\.)*)"/g;
  body = body.replace(strRe, (full) => {
    strMap.push(full);
    return `__STR${strMap.length - 1}__`;
  });

  // ── 1. 找出所有「创建物体」语句及其变量名 ──
  // 匹配形如:  var = Circle() / var = Sphere(radius=1) / var = VGroup(...)
  // 注意：代码行有 8 空格缩进，用 ^\s* 匹配
  const created = new Map(); // 变量名 -> 类名
  const createRe = /^\s*([a-zA-Z_][a-zA-Z0-9_]*) = ([A-Z][A-Za-z0-9_]*)\(/gm;
  let m;
  while ((m = createRe.exec(body)) !== null) {
    created.set(m[1], m[2]);
  }
  if (created.size === 0) return body;

  // ── 2. 收集代码中「被引用」的变量（稳健版：排除关键字/方法/参数名等） ──
  const skipWords = new Set([
    'self', 'for', 'in', 'range', 'lambda', 'def', 'return', 'pass',
    'import', 'from', 'as', 'and', 'or', 'not', 'if', 'else', 'while',
    'break', 'continue', 'True', 'False', 'None', '_', 'np', 'math', 'random',
    // rate_func 节奏函数名（避免被误当成变量）
    'smooth', 'linear', 'rush_into', 'rush_from', 'there_and_back', 'wiggle',
    'ease_out_bounce', 'rate_functions', 'running_start', 'smoothstep', 'config',
  ]);
  // 排除 for 循环变量 / 列表推导变量（for x in ...）
  let loopRe = /\bfor\s+([a-zA-Z_][a-zA-Z0-9_]*)/g;
  let lm2;
  while ((lm2 = loopRe.exec(body)) !== null) skipWords.add(lm2[1]);

  // 排除 .方法名 / self.属性 / 属性链中间名（.word 任意位置）
  const methodWords = new Set();
  let methRe = /\.([a-zA-Z_][a-zA-Z0-9_]*)|self\.([a-zA-Z_][a-zA-Z0-9_]*)/g;
  let mm;
  while ((mm = methRe.exec(body)) !== null) {
    if (mm[1]) methodWords.add(mm[1]);
    if (mm[2]) methodWords.add(mm[2]);
  }
  // 排除 kwargs 参数名（= 前）和字典键名（: 前）
  const kwWords = new Set();
  let kwRe = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*=|["']?([a-zA-Z_][a-zA-Z0-9_]*)["']?\s*:/g;
  let km;
  while ((km = kwRe.exec(body)) !== null) {
    if (km[1]) kwWords.add(km[1]);
    if (km[2]) kwWords.add(km[2]);
  }
  // 排除 lambda 参数
  const lamWords = new Set();
  let lamRe = /lambda\s+([a-zA-Z_][a-zA-Z0-9_]*)/g;
  let lm;
  while ((lm = lamRe.exec(body)) !== null) lamWords.add(lm[1]);

  // 扫描所有小写开头的标识符（变量名都是小写，类名/常量大写）
  const used = new Set();
  const idRe = /\b([a-z_][a-z0-9_]*)\b/g;
  let im;
  while ((im = idRe.exec(body)) !== null) {
    const w = im[1];
    if (skipWords.has(w) || methodWords.has(w) || kwWords.has(w) || lamWords.has(w)) continue;
    used.add(w);
  }

  // ── 3. 修正未定义的引用：用第一个创建的物体替代 ──
  const firstCreated = [...created.keys()][0];
  for (const u of used) {
    if (!created.has(u)) {
      const re = new RegExp(`\\b${u}\\b`, 'g');
      body = body.replace(re, firstCreated);
    }
  }

  // ── 4. 找出「创建了但从未显示」的物体，自动补 self.add() ──
  const displayed = new Set();
  // self.add(x) / self.remove(x)
  let re1 = /self\.(?:add|remove)\(\s*([a-zA-Z_][a-zA-Z0-9_]*)/g;
  // self.play(AnimName(x, ...)) — 动画第一个参数是物体
  let re2 = /self\.play\(\s*[A-Za-z_][A-Za-z0-9_]*\s*\(\s*([a-zA-Z_][a-zA-Z0-9_]*)/g;
  // self.play(x.animate...) — 直接方法链
  let re3 = /self\.play\(\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\.animate/g;
  // 组合动画中的组变量：AnimationGroup(*[Create(m) for m in X]) / LaggedStart(...) / Succession(...)
  let re4 = /for\s+[a-zA-Z_][a-zA-Z0-9_]*\s+in\s+([a-zA-Z_][a-zA-Z0-9_]*)\]/g;
  let xm;
  for (const re of [re1, re2, re3, re4]) {
    while ((xm = re.exec(body)) !== null) displayed.add(xm[1]);
  }
  // VGroup 组合中的成员算已处理
  const vgroupRe = /VGroup\(([^)]*)\)/g;
  let vm;
  while ((vm = vgroupRe.exec(body)) !== null) {
    vm[1].split(',').forEach(s => {
      const name = s.trim();
      if (name) displayed.add(name);
    });
  }

  const toAdd = [];
  for (const name of created.keys()) {
    if (!displayed.has(name)) toAdd.push(name);
  }

  // 自动 add 要紧跟对应变量的「创建语句」之后（不能在动画之后/之前乱插）
  if (toAdd.length > 0) {
    const lines = body.split('\n');
    const additions = [];
    for (const v of toAdd) {
      const idx = lines.findIndex(l => new RegExp(`^\\s*${v}\\s*=`).test(l));
      additions.push([idx > -1 ? idx : lines.length - 1, `${P}self.add(${v})`]);
    }
    // 从后往前插入，避免索引错乱
    additions.sort((a, b) => a[0] - b[0]);
    for (let i = additions.length - 1; i >= 0; i--) {
      lines.splice(additions[i][0] + 1, 0, additions[i][1]);
    }
    body = lines.join('\n');
  }

  // ── 5. 还原被保护的字符串字面量 ──
  body = body.replace(/__STR(\d+)__/g, (_, i) => strMap[Number(i)] || '');

  return body;
}

/**
 * 依赖重排：如果 `graph = axes.plot(...)` 出现在 `axes = Axes(...)` 之前，
 * 把被依赖的创建语句（axes）移到引用它的语句之前，避免 NameError。
 */
function reorderDependencies(body) {
  const lines = body.split('\n');

  // 找所有「创建语句」：var = ClassName(  和  var = other.method(
  const createIdx = new Map(); // var -> 行 index
  lines.forEach((line, i) => {
    const m = /^\s*([a-zA-Z_][a-zA-Z0-9_]*) = ([A-Za-z_][A-Za-z0-9_]*)\(/.exec(line);
    if (m) createIdx.set(m[1], i);
  });

  // 找依赖：var = dep.method(...) — 引用另一个创建变量
  // deps 记录 [引用者行号, 被依赖变量名]
  const deps = [];
  lines.forEach((line, i) => {
    const m = /^\s*([a-zA-Z_][a-zA-Z0-9_]*) = ([a-zA-Z_][a-zA-Z0-9_]*)\.\w+\(/.exec(line);
    if (m && createIdx.has(m[2]) && m[1] !== m[2]) {
      deps.push([i, m[2]]);
    }
  });

  let changed = true;
  let guard = 0;
  while (changed && guard++ < 30) {
    changed = false;
    for (const [refLine, depOn] of deps) {
      const b = refLine;                 // 引用者行号（如 graph 行）
      const a = createIdx.get(depOn);    // 依赖创建行号（如 axes 行）
      if (a === undefined || a < b) continue; // 依赖已在引用者之前，OK
      // 把 depOn 的创建行（a）移到引用者（b）之前
      const lineA = lines[a];
      lines.splice(a, 1);
      lines.splice(b, 0, lineA);
      // 重建索引
      createIdx.clear();
      lines.forEach((line, i) => {
        const m = /^\s*([a-zA-Z_][a-zA-Z0-9_]*) = ([A-Za-z_][A-Za-z0-9_]*)\(/.exec(line);
        if (m) createIdx.set(m[1], i);
      });
      // 更新 deps 里的行号引用
      for (let k = 0; k < deps.length; k++) {
        if (deps[k][0] > a) deps[k][0] -= 1;
        else if (deps[k][0] >= b && deps[k][0] < a) deps[k][0] += 1;
      }
      changed = true;
      break; // 重新扫描
    }
  }

  return lines.join('\n');
}

/**
 * 坐标类对象（Axes/NumberPlane/PolarPlane/ComplexPlane/ThreeDAxes）不支持 set_fill/set_stroke，
 * 误用时改为 set_color(第一个颜色参数)。
 */
function fixCoordinateFill(body) {
  const coordClasses = new Set([
    'Axes', 'NumberPlane', 'NumberLine', 'PolarPlane', 'ComplexPlane', 'ThreeDAxes',
  ]);
  // 找创建语句对应的变量类型
  const varType = new Map();
  const createRe = /^\s*([a-zA-Z_][a-zA-Z0-9_]*) = ([A-Z][A-Za-z0-9_]*)\(/gm;
  let m;
  while ((m = createRe.exec(body)) !== null) varType.set(m[1], m[2]);

  // 对每个坐标类变量，把 .set_fill(...).set_stroke(...) 替换为 .set_color(第一个颜色)
  for (const [v, cls] of varType) {
    if (coordClasses.has(cls)) {
      const re = new RegExp(
        `\\b${v}\\.set_fill\\(\\s*["']?([^"',)]+)["']?\\s*\\)\\.set_stroke\\([^)]*\\)`,
        'g'
      );
      body = body.replace(re, `${v}.set_color("$1")`);
    }
  }
  return body;
}