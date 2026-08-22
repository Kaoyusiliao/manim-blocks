/**
 * Manim Blocks — 课程/示例数据（网页版和桌面版共用）
 */
export const EXAMPLES = [
  {
    name: '第 1 课 · 第一个动画',
    level: 'basic',
    emoji: '🌈',
    desc: '红色圆形从中心画出 —— 学会「物体 + 动画」两步走',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">第一个动画</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_circle" x="30" y="30">
<field name="VAR">circle</field><field name="X">0</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">circle</field><field name="COLOR">RED</field><next>
<block type="animate_create">
<field name="VAR">circle</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 2 课 · 公式书写',
    level: 'basic',
    emoji: '📝',
    desc: '输入数学公式并设置样式、颜色（对应：文本/公式/属性）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_formula" x="30" y="30">
<field name="VAR">eq</field><field name="EXPR">E = mc^2</field><field name="X">0</field><field name="Y">0</field><field name="SIZE">large</field><next>
<block type="property_color">
<field name="VAR">eq</field><field name="COLOR">BLUE</field><next>
<block type="animate_write">
<field name="VAR">eq</field><field name="DURATION">2</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 3 课 · 坐标轴与网格',
    level: 'basic',
    emoji: '📐',
    desc: '绘制坐标轴、添加刻度和标签（对应：坐标系）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_grid" x="30" y="30">
<field name="VAR">grid</field><field name="X">-4</field><field name="Y">-3</field><field name="W">8</field><field name="H">6</field><next>
<block type="animate_create">
<field name="VAR">grid</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field><next>
<block type="object_axis" x="30" y="30">
<field name="VAR">axis</field><field name="X_MIN">-4</field><field name="Y_MIN">-3</field><field name="X_MAX">4</field><field name="Y_MAX">3</field><next>
<block type="animate_create">
<field name="VAR">axis</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 4 课 · 几何图形变换',
    level: 'basic',
    emoji: '🔺',
    desc: '三角形平移、旋转、缩放（对应：平移/旋转/缩放）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_triangle" x="30" y="30">
<field name="VAR">tri</field><field name="A_X">0</field><field name="A_Y">2</field><field name="B_X">-2</field><field name="B_Y">-1</field><field name="C_X">2</field><field name="C_Y">-1</field><next>
<block type="property_color">
<field name="VAR">tri</field><field name="COLOR">ORANGE</field><next>
<block type="animate_create">
<field name="VAR">tri</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_shift">
<field name="VAR">tri</field><field name="DX">3</field><field name="DY">0</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_rotate">
<field name="VAR">tri</field><field name="ANGLE">90</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_scale">
<field name="VAR">tri</field><field name="SCALE">0.5</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 5 课 · 多项式函数绘图',
    level: 'basic',
    emoji: '📈',
    desc: 'y = x² 的图像动态绘制（对应：math_plot / math_func）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_grid" x="30" y="30">
<field name="VAR">grid</field><field name="X">-4</field><field name="Y">-3</field><field name="W">8</field><field name="H">6</field><next>
<block type="animate_create">
<field name="VAR">grid</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="object_math_func" x="30" y="30">
<field name="VAR">curve</field><field name="EXPR">x^2</field><field name="XMIN">-3</field><field name="XMAX">3</field><field name="COLOR">GREEN</field><field name="WIDTH">3</field><next>
<block type="animate_draw_line">
<field name="VAR">curve</field><field name="DURATION">3</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 6 课 · 正弦波动画',
    level: 'basic',
    emoji: '〰️',
    desc: 'sin(x) 随时间变化的动态效果（对应：参数方程动画）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_grid" x="30" y="30">
<field name="VAR">grid</field><field name="X">-4</field><field name="Y">-2</field><field name="W">8</field><field name="H">4</field><next>
<block type="animate_create">
<field name="VAR">grid</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="object_math_param" x="30" y="30">
<field name="VAR">wave</field><field name="XEXPR">t</field><field name="YEXPR">sin(2*pi*t)</field><field name="TMIN">0</field><field name="TMAX">2</field><field name="COLOR">RED</field><field name="WIDTH">3</field><next>
<block type="animate_draw_line">
<field name="VAR">wave</field><field name="DURATION">4</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 7 课 · 多函数对比图',
    level: 'basic',
    emoji: '📊',
    desc: '在同一个坐标系里画 sin 和 cos 对比（对应：VGroup）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_grid" x="30" y="30">
<field name="VAR">grid</field><field name="X">-4</field><field name="Y">-2</field><field name="W">8</field><field name="H">4</field><next>
<block type="animate_create">
<field name="VAR">grid</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="object_math_func" x="30" y="30">
<field name="VAR">sin</field><field name="EXPR">sin(x)</field><field name="XMIN">-3</field><field name="XMAX">3</field><field name="COLOR">RED</field><field name="WIDTH">3</field><next>
<block type="animate_draw_line">
<field name="VAR">sin</field><field name="DURATION">3</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="object_math_func" x="30" y="30">
<field name="VAR">cos</field><field name="EXPR">cos(x)</field><field name="XMIN">-3</field><field name="XMAX">3</field><field name="COLOR">BLUE</field><field name="WIDTH">3</field><next>
<block type="animate_draw_line">
<field name="VAR">cos</field><field name="DURATION">3</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 8 课 · 粒子运动模拟',
    level: 'advanced',
    emoji: '✨',
    desc: '多个圆点做圆周运动（对应：updater / update 机制）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="custom_code" x="30" y="30">
<field name="VAR">particles</field><field name="CODE"># 创建 8 个粒子</field><next>
<block type="custom_mobject" x="30" y="30">
<field name="VAR">p</field><field name="CODE">self.dots = [Dot(r*LEFT+r*UP, color=YELLOW, radius=0.1) for r in range(1, 9)]
for d in self.dots:
    self.add(d)</field><next>
<block type="animate_write" x="30" y="30">
<field name="VAR">p</field><field name="DURATION">2</field><next>
<block type="scene_wait" x="30" y="30">
<field name="SECONDS">1</field><next>
<block type="custom_code" x="30" y="30">
<field name="VAR">anim</field><field name="CODE"># 自定义 updater 实现圆周运动</field><next>
<block type="custom_mobject" x="30" y="30">
<field name="VAR">p</field><field name="CODE">for i, d in enumerate(self.dots):
    def updater(dot, t):
        angle = t * pi / 2 + i * pi / 4
        dot.set_x(2.5 * cos(angle))
        dot.set_y(2.5 * sin(angle))
        dot.set_color(HSVColor(hue=i/8))
    d.add_updater(updater)</field><next>
<block type="scene_wait" x="30" y="30">
<field name="SECONDS">10</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 9 课 · 向量场可视化',
    level: 'advanced',
    emoji: '➡️',
    desc: '展示二维向量场 (x,y) → (-y,x) 的旋转效应',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_grid" x="30" y="30">
<field name="VAR">grid</field><field name="X">-3</field><field name="Y">-3</field><field name="W">6</field><field name="H">6</field><next>
<block type="animate_create">
<field name="VAR">grid</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="custom_code" x="30" y="30">
<field name="VAR">quiver</field><field name="CODE"># 绘制箭头场</field><next>
<block type="custom_mobject" x="30" y="30">
<field name="VAR">arrows</field><field name="CODE">self.arrows = VGroup()
for x_val in np.arange(-2, 2.1, 1):
    for y_val in np.arange(-2, 2.1, 1):
        arrow = Arrow(np.array([x_val, y_val, 0]),
                      np.array([x_val - y_val*0.3, y_val + x_val*0.3, 0]),
                      buff=0, stroke_width=2)
        self.arrows.add(arrow)
self.add(self.arrows)</field><next>
<block type="animate_create">
<field name="VAR">arrows</field><field name="DURATION">3</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 10 课 · 傅里叶级数逼近',
    level: 'advanced',
    emoji: '🌀',
    desc: '用多个正弦波叠加逼近方波（经典数学可视化）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="custom_code" x="30" y="30">
<field name="VAR">fft</field><field name="CODE"># 傅里叶级数可视化</field><next>
<block type="custom_mobject" x="30" y="30">
<field name="VAR">curves</field><field name="CODE">n_terms = 5
self.curves = []
for n in range(1, n_terms+1):
    k = 2*n - 1
    func = lambda x: (4/pi) * sin(k*x) / k
    curve = FunctionGraph(func, x_min=-pi, x_max=pi, color=COLORS[n % len(COLORS)])
    self.curves.append(curve)
    self.add(curve)</field><next>
<block type="animate_create">
<field name="VAR">curves</field><field name="DURATION">5</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field><next>
<block type="custom_mobject" x="30" y="30">
<field name="VAR">sq</field><field name="CODE"># 最终逼近——方波
def square_wave(x):
    return np.sign(np.sin(x))
self.target = FunctionGraph(square_wave, x_min=-pi, x_max=pi, color=WHITE, stroke_width=4)
self.add(self.target)</field><next>
<block type="scene_wait">
<field name="SECONDS">5</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 11 课 · 分形树',
    level: 'advanced',
    emoji: '🌳',
    desc: '递归生成谢尔宾斯基三角形（分形几何入门）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="custom_code" x="30" y="30">
<field name="VAR">frac</field><field name="CODE"># 谢尔宾斯基三角形递归生成</field><next>
<block type="custom_mobject" x="30" y="30">
<field name="VAR">tri</field><field name="CODE">from copy import deepcopy
def sierpinski(points, depth, color=RED):
    if depth == 0:
        return Polygon(*points, fill_color=color, fill_opacity=0.6, stroke_width=1)
    mid = [(points[i][0]+points[(i+1)%3][0])/2, (points[i][1]+points[(i+1)%1][3][1])/2]
    mids = [[(points[0][j]+points[1][j])/2 for j in range(2)],
            [(points[1][j]+points[2][j])/2 for j in range(2)],
            [(points[0][j]+points[2][j])/2 for j in range(2)]]
    return VGroup(*[sierpinski(mids[i], depth-1, COLORS[i]) for i in range(3)])
self.tree = sierpinski([[-3,-2,0],[3,-2,0],[0,3,0]], 4)
self.add(self.tree)</field><next>
<block type="animate_create">
<field name="VAR">tri</field><field name="DURATION">5</field><next>
<block type="scene_wait">
<field name="SECONDS">3</field></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 12 课 · 微积分基础演示',
    level: 'sympy',
    emoji: '∫',
    desc: '求导 f\'(x) 和积分 ∫f(x)dx 的可视化过程',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="sympy_import" x="30" y="30">
<field name="MODS">*</field><next>
<block type="sympy_expr" x="30" y="30">
<field name="VAR">f</field><field name="EXPR">x**3 - 3*x</field><next>
<block type="sympy_solve" x="30" y="30">
<field name="VAR">roots</field><field name="EXPR">f</field><field name="VARS">x</field><next>
<block type="object_text" x="30" y="30">
<field name="VAR">txt1</field><field name="CONTENT">f(x) = x³ - 3x</field><field name="X">-3</field><field name="Y">3</field></block><next>
<block type="object_text" x="30" y="30">
<field name="VAR">txt2</field><field name="CONTENT">根: sympy.solve(f) = roots</field><field name="X">-3</field><field name="Y">2</field></block><next>
<block type="sympy_diff" x="30" y="30">
<field name="RESULT">df</field><field name="EXPR">f</field><field name="VAR">x</field><next>
<block type="object_math_func" x="30" y="30">
<field name="VAR">orig</field><field name="EXPR">str(f)</field><field name="XMIN">-3</field><field name="XMAX">3</field><field name="COLOR">BLUE</field><field name="WIDTH">3</field><next>
<block type="animate_draw_line">
<field name="VAR">orig</field><field name="DURATION">3</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="object_math_func" x="30" y="30">
<field name="VAR">deriv</field><field name="EXPR">str(df)</field><field name="XMIN">-3</field><field name="XMAX">3</field><field name="COLOR">RED</field><field name="WIDTH">3</field><next>
<block type="animate_draw_line">
<field name="VAR">deriv</field><field name="DURATION">3</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 13 课 · 方程求解可视化',
    level: 'sympy',
    emoji: '⚖️',
    desc: '使用 sympy.solve 解方程并在图上标注解的位置',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="sympy_import" x="30" y="30">
<field name="MODS">*</field><next>
<block type="object_text" x="30" y="30">
<field name="VAR">eq</field><field name="CONTENT">求解 x² - 4 = 0</field><field name="X">-3</field><field name="Y">3</field></block><next>
<block type="sympy_solve" x="30" y="30">
<field name="VAR">sols</field><field name="EXPR">x**2 - 4</field><field name="VARS">x</field><next>
<block type="object_text" x="30" y="30">
<field name="VAR">res</field><field name="CONTENT">解: x = [-2, 2]</field><field name="X">-3</field><field name="Y">2</field></block><next>
<block type="object_math_func" x="30" y="30">
<field name="VAR">graph</field><field name="EXPR">x**2 - 4</field><field name="XMIN">-3</field><field name="XMAX">3</field><field name="COLOR">BLUE</field><field name="WIDTH">3</field><next>
<block type="animate_draw_line">
<field name="VAR">graph</field><field name="DURATION">3</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="custom_code" x="30" y="30">
<field name="VAR">dots</field><field name="CODE"># 在解处添加标记点
sol_vals = [-2, 2]
for s in sol_vals:
    dot = Dot(np.array([s, 0, 0]), color=RED, radius=0.15)
    label = MathTex(f"x={int(s)}").next_to(dot, UP)
    self.play(Create(dot), Write(label))</field><next>
<block type="scene_wait">
<field name="SECONDS">3</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
];

// 课程总数
EXAMPLES.total = EXAMPLES.length;