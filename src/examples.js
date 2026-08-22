export const EXAMPLES = [
  {
    name: '第 1 课 · 第一个动画',
    level: 'basic',
    emoji: '🌈',
    desc: '红色圆形从中心画出 —— 学会「物体 + 动画」两步走（对应：基本图形/常用动画）',
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
</xml>`,
  },
  {
    name: '第 2 课 · 公式书写',
    level: 'basic',
    emoji: '∑',
    desc: '爱因斯坦公式逐字写出（对应：文字和公式）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">公式书写</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_math_tex" x="30" y="30">
<field name="VAR">formula</field><field name="TEX">E = mc^2</field><field name="X">0</field><field name="Y">1</field><next>
<block type="property_color">
<field name="VAR">formula</field><field name="COLOR">YELLOW</field><next>
<block type="animate_write">
<field name="VAR">formula</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 3 课 · 旋转星形',
    level: 'basic',
    emoji: '⭐',
    desc: '五角星重复旋转 5 次 —— 学会「重复」积木（对应：常用动画/图形样式）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">旋转星形</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_star" x="30" y="30">
<field name="VAR">star</field><field name="R">2</field><field name="X">0</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">star</field><field name="COLOR">ORANGE</field><next>
<block type="animate_create">
<field name="VAR">star</field><next>
<block type="control_repeat">
<field name="TIMES">5</field><statement name="DO">
<block type="animate_rotate">
<field name="VAR">star</field><field name="ANGLE">72</field></block>
</statement><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 4 课 · 3D 立方体',
    level: 'basic',
    emoji: '🧊',
    desc: '三维立方体旋转 —— 自动启用 3D 场景和相机视角',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">第一个动画</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="camera_3d_orientation" x="30" y="30">
<field name="PHI">75</field><field name="THETA">-45</field><next>
<block type="object3d_cube">
<field name="VAR">cube</field><field name="L">2</field><field name="X">0</field><field name="Y">0</field><field name="Z">0</field><next>
<block type="property_color">
<field name="VAR">cube</field><field name="COLOR">BLUE</field><next>
<block type="animate_create">
<field name="VAR">cube</field><next>
<block type="animate_rotating">
<field name="VAR">cube</field><field name="ANGLE">360</field><next>
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
    name: '第 5 课 · 函数曲线',
    level: 'basic',
    emoji: '📈',
    desc: '坐标轴 + 网格平面 + 抛物线（对应：坐标系）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">函数曲线</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_number_plane" x="30" y="30">
<field name="VAR">plane</field><field name="XMIN">-4</field><field name="XMAX">4</field><field name="YMIN">-1</field><field name="YMAX">5</field><field name="X">0</field><field name="Y">0</field><next>
<block type="object_axes">
<field name="VAR">axes</field><field name="XMIN">-4</field><field name="XMAX">4</field><field name="YMIN">-1</field><field name="YMAX">5</field><next>
<block type="object_graph">
<field name="AXES">axes</field><field name="VAR">graph</field><field name="FUNC">x**2</field><next>
<block type="animate_create">
<field name="VAR">plane</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">axes</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">graph</field><next>
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
    name: '第 6 课 · 文字动画',
    level: 'basic',
    emoji: '🎨',
    desc: '字母逐个平滑淡入 + 移动 + 淡出（对应：文本样式）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">文字动画</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_text" x="30" y="30">
<field name="VAR">text</field><field name="CONTENT">Hello, Manim!</field><field name="X">0</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">text</field><field name="COLOR">PURPLE</field><next>
<block type="animate_fade_in_letters">
<field name="VAR">text</field><field name="RATIO">0.5</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_shift">
<field name="VAR">text</field><field name="DX">2</field><field name="DY">1</field><next>
<block type="animate_fade_out">
<field name="VAR">text</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 7 课 · 变形动画',
    level: 'basic',
    emoji: '🔄',
    desc: '圆形平滑变形为正方形（对应：高级动画/变换效果）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">变形动画</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_circle" x="30" y="30">
<field name="VAR">circle</field><field name="X">-2</field><field name="Y">0</field><next>
<block type="object_square">
<field name="VAR">square</field><field name="X">2</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">circle</field><field name="COLOR">RED</field><next>
<block type="property_color">
<field name="VAR">square</field><field name="COLOR">BLUE</field><next>
<block type="animate_create">
<field name="VAR">circle</field><next>
<block type="animate_create">
<field name="VAR">square</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_transform">
<field name="VAR">circle</field><field name="TARGET">square</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 8 课 · 滚动字幕',
    level: 'basic',
    emoji: '📜',
    desc: '文字从屏幕底部滚入再滚出（合集经典：滚动字幕）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">滚动字幕</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_text" x="30" y="30">
<field name="VAR">text</field><field name="CONTENT">谢谢观看！</field><field name="X">0</field><field name="Y">-4</field><next>
<block type="property_color">
<field name="VAR">text</field><field name="COLOR">YELLOW</field><next>
<block type="animate_shift">
<field name="VAR">text</field><field name="DX">0</field><field name="DY">8</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 9 课 · 圆规动画',
    level: 'basic',
    emoji: '🧭',
    desc: '用弧线画圆 —— 动态几何演示（合集经典：圆规动画）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">圆规动画</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_dot" x="30" y="30">
<field name="VAR">center</field><field name="X">0</field><field name="Y">0</field><next>
<block type="object_arc" x="30" y="100">
<field name="VAR">arc</field><field name="R">2</field><field name="ANGLE">360</field><field name="X">0</field><field name="Y">0</field><next>
<block type="animate_create">
<field name="VAR">arc</field><next>
<block type="animate_create">
<field name="VAR">center</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 10 课 · 匀速玫瑰线',
    level: 'advanced',
    emoji: '🌹',
    desc: '五瓣玫瑰线匀速画出（等弧长参数化，对应：参数曲线/弧长文章）',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">匀速玫瑰线</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_axes" x="30" y="30">
<field name="VAR">axes</field><field name="XMIN">-2.5</field><field name="XMAX">2.5</field><field name="YMIN">-2.5</field><field name="YMAX">2.5</field><next>
<block type="object_parametric_curve_uniform">
<field name="VAR">curve</field><field name="AXES">axes</field><field name="FUNC">lambda t: (2*np.cos(5*t)*np.cos(t), 2*np.cos(5*t)*np.sin(t))</field><field name="T0">0</field><field name="T1">3.14</field><field name="N">800</field><next>
<block type="animate_create">
<field name="VAR">curve</field><field name="DURATION">6</field><next>
<block type="scene_wait">
<field name="SECONDS">6</field></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 11 课 · 心形线',
    emoji: '❤️',
    desc: '用独立参数曲线画心形（对应合集：参数化曲线篇）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">心形线</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_parametric_function" x="30" y="30">
<field name="VAR">heart</field><field name="FUNC">lambda t: (16*np.sin(t)**3, 13*np.cos(t) - 5*np.cos(2*t) - 2*np.cos(3*t) - np.cos(4*t), 0)</field><field name="T0">0</field><field name="T1">6.28</field><field name="STEP">0.01</field><field name="COLOR">PINK</field><next>
<block type="animate_create">
<field name="VAR">heart</field><field name="DURATION">3</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 12 课 · 3D 螺旋线',
    emoji: '🌀',
    desc: '三维空间中的螺旋线（自动 3D 场景 + 立体着色）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">3D 螺旋线</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_parametric_function_3d" x="30" y="30">
<field name="VAR">curve</field><field name="FUNC">lambda u: (1.2*np.cos(u), 1.2*np.sin(u), u*0.05)</field><field name="T0">-18.8</field><field name="T1">31.4</field><field name="STEP">0.01</field><field name="COLOR">RED</field><next>
<block type="animate_create">
<field name="VAR">curve</field><field name="DURATION">3</field><next>
<block type="scene_wait">
<field name="SECONDS">3</field></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 13 课 · 齐步走',
    emoji: '👯',
    desc: '圆和方形同时移动：圆上移、方下移（对应合集：如何让多个动画齐步走·方法一）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">齐步走</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_circle" x="30" y="30">
<field name="VAR">circle</field><field name="X">-2</field><field name="Y">0</field><next>
<block type="object_square">
<field name="VAR">square</field><field name="X">2</field><field name="Y">0</field><next>
<block type="animate_create">
<field name="VAR">circle</field><field name="DURATION">1</field><next>
<block type="animate_create">
<field name="VAR">square</field><field name="DURATION">1</field><next>
<block type="animate_together">
<field name="A">circle</field><field name="B">square</field><field name="DX1">0</field><field name="DY1">2</field><field name="DX2">0</field><field name="DY2">-2</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 14 课 · 错峰淡入',
    emoji: '⏱️',
    desc: '多个副本依次错峰淡入，形成流动感（对应合集：动画组合/节奏控制）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">错峰淡入</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_square" x="30" y="30">
<field name="VAR">sq</field><field name="X">0</field><field name="Y">0</field><next>
<block type="animate_create">
<field name="VAR">sq</field><field name="DURATION">1</field><next>
<block type="animate_lagged_start">
<field name="VAR">sq</field><field name="COUNT">5</field><next>
<block type="scene_wait">
<field name="SECONDS">3</field></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 15 课 · 变速动画',
    emoji: '🎢',
    desc: '小球自由落体越来越快（ChangeSpeed 变速，对应合集：掌握ChangeSpeed类）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">变速动画</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_dot" x="30" y="30">
<field name="VAR">ball</field><field name="X">0</field><field name="Y">3</field><next>
<block type="property_color">
<field name="VAR">ball</field><field name="COLOR">YELLOW</field><next>
<block type="object_line" x="30" y="100">
<field name="VAR">path</field><field name="X1">0</field><field name="Y1">3</field><field name="X2">0</field><field name="Y2">-3</field><next>
<block type="animate_change_speed">
<field name="VAR">ball</field><field name="PATH">path</field><field name="SPEEDINFO">{0: 0.1, 0.3: 0.5, 1: 2.0}</field><field name="DURATION">3</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 16 课 · 动画节奏',
    emoji: '🎵',
    desc: '小球往返移动（there_and_back 节奏，对应合集：Rate Functions 节奏控制）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">动画节奏</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_dot" x="30" y="30">
<field name="VAR">ball</field><field name="X">-3</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">ball</field><field name="COLOR">TEAL</field><next>
<block type="animate_create">
<field name="VAR">ball</field><field name="DURATION">1</field><next>
<block type="animate_rhythm">
<field name="VAR">ball</field><field name="DX">6</field><field name="DY">0</field><field name="RATE">there_and_back</field><field name="DURATION">3</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 17 课 · 背景图片',
    emoji: '🖼️',
    desc: '给动画加背景图 + 前景公式（对应合集：背景图片·方法一）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">背景图片</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_background" x="30" y="30">
<field name="VAR">bg</field><field name="PATH">./assets/background.jpg</field><next>
<block type="object_math_tex" x="30" y="100">
<field name="VAR">math</field><field name="TEX">\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}</field><field name="X">0</field><field name="Y">0</field><next>
<block type="animate_write">
<field name="VAR">math</field><next>
<block type="scene_wait">
<field name="SECONDS">3</field></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 18 课 · 公式着色',
    emoji: '🎨',
    desc: '勾股定理各段不同颜色（对应合集：公式各部分颜色·拆分法）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">公式着色</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_formula_colors" x="30" y="30">
<field name="VAR">tex</field><field name="PARTS">a^2, +, b^2, =, c^2</field><field name="COLOR">YELLOW,GREEN,RED</field><next>
<block type="animate_write">
<field name="VAR">tex</field><field name="DURATION">2</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 19 课 · 目录动画',
    emoji: '📑',
    desc: '创建目录列表并指示当前项（对应合集：目录动画）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">目录动画</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_bulleted_list" x="30" y="30">
<field name="VAR">catalog</field><field name="CONTENT">manim 是什么, 多平台支持, 基于 Python, 重要依赖</field><field name="X">0</field><field name="Y">1</field><next>
<block type="animate_write">
<field name="VAR">catalog</field><field name="DURATION">2</field><next>
<block type="animate_indicate">
<field name="VAR">catalog</field><next>
<block type="scene_wait">
<field name="SECONDS">3</field></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 20 课 · 切线动画（SymPy）',
    emoji: '📉',
    desc: 'SymPy 自动求导 + Manim 画切线（对应合集：切线魔法·SymPy导数）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">切线动画</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="sympy_import">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x</field><next>
<block type="sympy_expr">
<field name="VAR">f_sym</field><field name="EXPR">x**3 - 2*x + 1</field><next>
<block type="sympy_diff">
<field name="EXPR">f_sym</field><field name="VAR">x</field><field name="RESULT">df</field><next>
<block type="sympy_subs">
<field name="EXPR">df</field><field name="VAR">x</field><field name="VALUE">1</field><field name="RESULT">k_val</field><next>
<block type="sympy_subs">
<field name="EXPR">f_sym</field><field name="VAR">x</field><field name="VALUE">1</field><field name="RESULT">f1_val</field><next>
<block type="sympy_expr">
<field name="VAR">tangent_expr</field><field name="EXPR">k_val*(x-1) + f1_val</field><next>
<block type="sympy_lambdify">
<field name="EXPR">f_sym</field><field name="VARS">x</field><field name="VAR">f</field><next>
<block type="sympy_lambdify">
<field name="EXPR">tangent_expr</field><field name="VARS">x</field><field name="VAR">tangent_func</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">-1</field><field name="XMAX">3</field><field name="YMIN">-2</field><field name="YMAX">3</field><next>
<block type="object_graph_func">
<field name="AXES">ax</field><field name="FUNC">f</field><field name="COLOR">YELLOW</field><field name="VAR">graph</field><next>
<block type="object_graph_func">
<field name="AXES">ax</field><field name="FUNC">tangent_func</field><field name="COLOR">RED</field><field name="VAR">tangent</field><next>
<block type="animate_create">
<field name="VAR">ax</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">graph</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">tangent</field><field name="DURATION">2</field><next>
<block type="scene_wait">
<field name="SECONDS">3</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 21 课 · 积分面积（SymPy）',
    emoji: '📊',
    desc: 'SymPy 精确积分 + 黎曼矩形逼近（对应合集：填充与积累：积分与面积的可视化）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">积分面积</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="sympy_import">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x</field><next>
<block type="sympy_expr">
<field name="VAR">f_sym</field><field name="EXPR">x**2</field><next>
<block type="sympy_integrate">
<field name="EXPR">x**2</field><field name="VAR">x</field><field name="LOWER">0</field><field name="UPPER">2</field><field name="RESULT">area</field><next>
<block type="sympy_evalf">
<field name="EXPR">area</field><field name="VAR">area_val</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">-1</field><field name="XMAX">3</field><field name="YMIN">-1</field><field name="YMAX">5</field><next>
<block type="object_graph">
<field name="AXES">ax</field><field name="VAR">graph</field><field name="FUNC">x**2</field><next>
<block type="custom_mobject">
<field name="VAR">riemann</field><field name="CODE">ax.get_riemann_rectangles(graph, x_range=[0, 2], dx=0.5, stroke_color=WHITE)</field><next>
<block type="object_label">
<field name="VAR">label</field><field name="CONTENT">\\int_0^2 x^2 \\, dx = {area_val:.4f}</field><field name="TARGET">ax</field><field name="DIRECTION">DOWN</field><field name="BUFF">0.5</field><next>
<block type="animate_create">
<field name="VAR">ax</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">graph</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">riemann</field><field name="DURATION">2</field><next>
<block type="animate_write">
<field name="VAR">label</field><field name="DURATION">2</field><next>
<block type="scene_wait">
<field name="SECONDS">3</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 22 课 · 追及问题（SymPy）',
    emoji: '🚗',
    desc: 'SymPy 解方程求两车相遇时间和位置（对应合集：用SymPy自动求解追及问题的方程）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">追及问题</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">t</field><next>
<block type="sympy_expr">
<field name="VAR">pos_a</field><field name="EXPR">30*t</field><next>
<block type="sympy_expr">
<field name="VAR">pos_b</field><field name="EXPR">20*(t - 1) + 20</field><next>
<block type="sympy_solve">
<field name="EXPR">pos_a - pos_b</field><field name="VARS">t</field><field name="VAR">solutions</field><next>
<block type="sympy_evalf">
<field name="EXPR">solutions[0]</field><field name="VAR">meet_t</field><next>
<block type="sympy_lambdify">
<field name="EXPR">pos_a</field><field name="VARS">t</field><field name="VAR">a_func</field><next>
<block type="sympy_lambdify">
<field name="EXPR">pos_b</field><field name="VARS">t</field><field name="VAR">b_func</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">0</field><field name="XMAX">5</field><field name="YMIN">0</field><field name="YMAX">120</field><next>
<block type="object_graph_func">
<field name="VAR">a_line</field><field name="AXES">ax</field><field name="FUNC">a_func</field><field name="COLOR">BLUE</field><next>
<block type="object_graph_func">
<field name="VAR">b_line</field><field name="AXES">ax</field><field name="FUNC">b_func</field><field name="COLOR">RED</field><next>
<block type="object_dot_axes">
<field name="AXES">ax</field><field name="X">meet_t</field><field name="Y">30*meet_t</field><field name="COLOR">YELLOW</field><field name="VAR">dot</field><next>
<block type="custom_mobject">
<field name="VAR">label</field><field name="CODE">MathTex(f"t={meet_t:.2f}s, s={30*meet_t:.1f}m").to_corner(UR)</field><next>
<block type="animate_create">
<field name="VAR">ax</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">a_line</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">b_line</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">dot</field><field name="DURATION">1.5</field><next>
<block type="animate_write">
<field name="VAR">label</field><field name="DURATION">1.5</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 23 课 · 抛物线求根（SymPy）',
    emoji: '📈',
    desc: 'SymPy 自动计算抛物线求根、判别式与顶点（对应合集：用SymPy自动计算抛物线求根）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">抛物线求根</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x</field><next>
<block type="sympy_expr">
<field name="VAR">f_sym</field><field name="EXPR">x**2 - 4*x + 3</field><next>
<block type="sympy_solve">
<field name="EXPR">f_sym</field><field name="VARS">x</field><field name="VAR">roots</field><next>
<block type="sympy_latex">
<field name="EXPR">f_sym</field><field name="VAR">f_latex</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">-1</field><field name="XMAX">5</field><field name="YMIN">-2</field><field name="YMAX">5</field><next>
<block type="object_graph">
<field name="AXES">ax</field><field name="VAR">graph</field><field name="FUNC">x**2 - 4*x + 3</field><next>
<block type="custom_mobject">
<field name="VAR">root_dots</field><field name="CODE">VGroup(*[Dot(ax.c2p(float(r), 0), color=RED) for r in roots])</field><next>
<block type="custom_mobject">
<field name="VAR">root_labels</field><field name="CODE">VGroup(*[MathTex(f"x={float(r):.1f}").next_to(ax.c2p(float(r), 0), DOWN) for r in roots])</field><next>
<block type="object_math_tex">
<field name="VAR">formula</field><field name="TEX">f(x) = x^2 - 4x + 3</field><next>
<block type="animate_create">
<field name="VAR">ax</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">graph</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">root_dots</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">root_labels</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">formula</field><field name="DURATION">1.5</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 24 课 · SymPy 初识与联动',
    emoji: '📐',
    desc: 'SymPy 数值解方程求 sin(x)=x/2 交点 + 坐标轴标注（对应合集：告别手动计算，SymPy 初识与 Manim 联动）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">SymPy 初识与联动</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x</field><next>
<block type="sympy_nsolve">
<field name="EXPR">sin(x) - x/2</field><field name="GUESS">1.8</field><field name="VAR">root</field><next>
<block type="sympy_evalf">
<field name="EXPR">root</field><field name="VAR">root_val</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">-1</field><field name="XMAX">5</field><field name="YMIN">-1</field><field name="YMAX">3</field><next>
<block type="custom_mobject">
<field name="VAR">sin_graph</field><field name="CODE">sin_graph = ax.plot(lambda x: float(sin(x)), color=BLUE)</field><next>
<block type="custom_mobject">
<field name="VAR">line_graph</field><field name="CODE">line_graph = ax.plot(lambda x: x/2, color=RED)</field><next>
<block type="custom_mobject">
<field name="VAR">dot</field><field name="CODE">dot = Dot(ax.c2p(root_val, float(sin(root_val))), color=YELLOW)</field><next>
<block type="custom_mobject">
<field name="VAR">label</field><field name="CODE">label = MathTex(f"x \\\\approx {root_val:.4f}").next_to(dot, UR)</field><next>
<block type="animate_create">
<field name="VAR">ax</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">sin_graph</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">line_graph</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">dot</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">label</field><field name="DURATION">1.5</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 25 课 · 公式自动推导',
    emoji: '🤖',
    desc: 'SymPy 展开/因式分解/化简，自动推导数学公式（对应合集：让数学公式自动推导）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">heading</field><field name="CONTENT">公式自动推导</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x, y</field><next>
<block type="sympy_expr">
<field name="VAR">expr</field><field name="EXPR">(x+2)*(x+3)</field><next>
<block type="sympy_expand">
<field name="EXPR">(x+2)*(x+3)</field><field name="VAR">expanded</field><next>
<block type="sympy_factor">
<field name="EXPR">expanded</field><field name="VAR">factored</field><next>
<block type="object_math_tex">
<field name="VAR">f1</field><field name="TEX">(x+2)(x+3) = x^2 + 5x + 6</field><field name="X">0</field><field name="Y">1</field><next>
<block type="object_math_tex">
<field name="VAR">f2</field><field name="TEX">x^2 + 5x + 6 = (x+2)(x+3)</field><field name="X">0</field><field name="Y">0</field><next>
<block type="object_math_tex">
<field name="VAR">f3</field><field name="TEX">sin^2 x + cos^2 x = 1</field><field name="X">0</field><field name="Y">-1</field><next>
<block type="custom_mobject">
<field name="VAR">heading</field><field name="CODE">heading = Text("SymPy 自动公式推导", font_size=36).to_edge(UP)</field><next>
<block type="animate_create">
<field name="VAR">title</field><field name="DURATION">1.5</field><next>
<block type="scene_play">
<field name="VAR">f1</field><field name="ANIM">Write</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="scene_play">
<field name="VAR">f2</field><field name="ANIM">Write</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="scene_play">
<field name="VAR">f3</field><field name="ANIM">Write</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 26 课 · 轨迹交点',
    emoji: '🎯',
    desc: 'SymPy 联立方程求解两条直线交点（对应合集：轨迹的蓝图：方程求解与交点计算）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">轨迹交点</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x, y</field><next>
<block type="custom_mobject">
<field name="VAR">sol</field><field name="CODE">sol = solve([0.5*x+1-y, -0.8*x+4-y], (x,y), dict=True)[0]; cx, cy = float(sol[x]), float(sol[y])</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">-1</field><field name="XMAX">5</field><field name="YMIN">-1</field><field name="YMAX">5</field><next>
<block type="custom_mobject">
<field name="VAR">l1</field><field name="CODE">l1 = ax.plot(lambda x: 0.5*x+1, color=BLUE)</field><next>
<block type="custom_mobject">
<field name="VAR">l2</field><field name="CODE">l2 = ax.plot(lambda x: -0.8*x+4, color=RED)</field><next>
<block type="custom_mobject">
<field name="VAR">dot</field><field name="CODE">dot = Dot(ax.c2p(cx, cy), color=YELLOW); label = MathTex(f"({cx:.2f}, {cy:.2f})").next_to(dot, UR)</field><next>
<block type="animate_create">
<field name="VAR">ax</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">l1</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">l2</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">dot</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">label</field><field name="DURATION">1.5</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 27 课 · 物理模拟',
    emoji: '🏗️',
    desc: 'SymPy dsolve 解微分方程得解析解，代替数值积分做弹簧振子动画（对应合集：别自己写欧拉了！）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">物理模拟</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">t, k, m</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">0</field><field name="XMAX">10</field><field name="YMIN">-2</field><field name="YMAX">2</field><next>
<block type="custom_mobject">
<field name="VAR">x_fn</field><field name="CODE">x_fn = lambda t: float(cos(sqrt(2/1)*t)); graph = ax.plot(x_fn, color=YELLOW)</field><next>
<block type="custom_mobject">
<field name="VAR">tracker</field><field name="CODE">tracker = ValueTracker(0); dot = always_redraw(lambda: Dot(ax.c2p(tracker.get_value(), x_fn(tracker.get_value())), color=RED))</field><next>
<block type="custom_mobject">
<field name="VAR">label</field><field name="CODE">label = always_redraw(lambda: MathTex(f"t={tracker.get_value():.1f}").to_corner(UL))</field><next>
<block type="animate_create">
<field name="VAR">ax</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">graph</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">dot</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">label</field><field name="DURATION">1.5</field><next>
<block type="custom_mobject">
<field name="VAR">custom</field><field name="CODE">self.play(tracker.animate.set_value(10), run_time=6, rate_func=linear)</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 28 课 · 弧长参数化（SymPy）',
    emoji: '🌀',
    desc: 'SymPy 弧长积分 + 等弧长参数化，解决曲线绘制速度不均（对应合集：用 SymPy 解决曲线速度不均）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">弧长参数化</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_axes" x="30" y="30">
<field name="VAR">axes</field><field name="XMIN">-3</field><field name="XMAX">3</field><field name="YMIN">-3</field><field name="YMAX">3</field><next>
<block type="object_parametric_curve_uniform">
<field name="VAR">curve</field><field name="AXES">axes</field><field name="FUNC">lambda t: (2*np.cos(5*t)*np.cos(t), 2*np.cos(5*t)*np.sin(t))</field><field name="T0">0</field><field name="T1">3.14</field><field name="N">1000</field><next>
<block type="animate_create">
<field name="VAR">axes</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">curve</field><field name="DURATION">5</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block>
</next></block>
</next></block>
</next></block>
</next></block>
</xml>`,
  },
  {
    name: '第 29 课 · 一次函数工厂',
    emoji: '🏭',
    desc: 'SymPy 自动计算截距，在坐标轴上绘制 y=2x+1 并标注截距点（对应合集：一次函数图像工厂）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">一次函数工厂</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x</field><next>
<block type="custom_mobject">
<field name="VAR">x_int</field><field name="CODE">x_int = float(solve(2*x+1, x)[0]); y_int = float(2*0+1)</field><next>
<block type="object_axes">
<field name="VAR">ax</field><field name="XMIN">-5</field><field name="XMAX">5</field><field name="YMIN">-5</field><field name="YMAX">5</field><next>
<block type="object_graph">
<field name="AXES">ax</field><field name="VAR">line</field><field name="FUNC">2*x+1</field><next>
<block type="custom_mobject">
<field name="VAR">x_dot</field><field name="CODE">x_dot = Dot(ax.c2p(x_int, 0), color=RED); y_dot = Dot(ax.c2p(0, y_int), color=GREEN)</field><next>
<block type="object_math_tex">
<field name="VAR">label</field><field name="TEX">y = 2x + 1</field><field name="X">0</field><field name="Y">3.5</field><next>
<block type="animate_create">
<field name="VAR">ax</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">line</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">x_dot</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">y_dot</field><field name="DURATION">1.5</field><next>
<block type="animate_create">
<field name="VAR">label</field><field name="DURATION">1.5</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 30 课 · 三角形构造',
    emoji: '🔺',
    desc: 'SymPy 解方程组求三角形顶点，SSS 全等判定可视化（对应合集：三角形构造与全等条件验证）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">三角形构造</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x, y</field><next>
<block type="custom_mobject">
<field name="VAR">sol</field><field name="CODE">sol = solve([Eq(x**2+y**2,25), Eq((x-4)**2+y**2,9)], (x,y)); C = [s for s in sol if s[1]>0][0]; C_pt = np.array([float(C[0]), float(C[1]), 0])</field><next>
<block type="custom_mobject">
<field name="VAR">tri</field><field name="CODE">tri = Polygon([0,0,0], [4,0,0], C_pt, color=YELLOW, fill_opacity=0.3)</field><next>
<block type="custom_mobject">
<field name="VAR">labels</field><field name="CODE">labels = VGroup(MathTex('A(0,0)').next_to([0,0,0], DL), MathTex('B(4,0)').next_to([4,0,0], DR), MathTex(f'C({float(C[0]):.1f},{float(C[1]):.1f})').next_to(C_pt, UP))</field><next>
<block type="animate_create">
<field name="VAR">tri</field><field name="DURATION">2</field><next>
<block type="animate_write">
<field name="VAR">labels</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 31 课 · 因式分解拼图（SymPy）',
    emoji: '🧩',
    desc: 'SymPy 因式分解 + 自动生成矩形面积拼图，展示十字相乘几何意义（对应合集：用SymPy自动因式分解）',
    level: 'sympy',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">因式分解拼图</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_rectangle" x="30" y="30">
<field name="VAR">sq_x2</field><field name="W">2</field><field name="H">2</field><field name="X">0</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">sq_x2</field><field name="COLOR">BLUE</field><next>
<block type="property_fill_opacity">
<field name="VAR">sq_x2</field><field name="OPACITY">0.4</field><next>
<block type="object_rectangle">
<field name="VAR">rec_3x</field><field name="W">3</field><field name="H">2</field><field name="X">2.5</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">rec_3x</field><field name="COLOR">RED</field><next>
<block type="property_fill_opacity">
<field name="VAR">rec_3x</field><field name="OPACITY">0.4</field><next>
<block type="object_rectangle">
<field name="VAR">rec_2x</field><field name="W">2</field><field name="H">2</field><field name="X">0</field><field name="Y">2</field><next>
<block type="property_color">
<field name="VAR">rec_2x</field><field name="COLOR">RED</field><next>
<block type="property_fill_opacity">
<field name="VAR">rec_2x</field><field name="OPACITY">0.4</field><next>
<block type="object_rectangle">
<field name="VAR">rec_6</field><field name="W">3</field><field name="H">2</field><field name="X">2.5</field><field name="Y">2</field><next>
<block type="property_color">
<field name="VAR">rec_6</field><field name="COLOR">GREEN</field><next>
<block type="property_fill_opacity">
<field name="VAR">rec_6</field><field name="OPACITY">0.4</field><next>
<block type="object_math_tex">
<field name="VAR">formula</field><field name="TEX">x^2 + 5x + 6 = (x+2)(x+3)</field><field name="X">0</field><field name="Y">3.5</field><next>
<block type="object_math_tex">
<field name="VAR">label_x2</field><field name="TEX">x^2</field><field name="X">0</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">label_x2</field><field name="COLOR">BLUE</field><next>
<block type="object_math_tex">
<field name="VAR">label_3x</field><field name="TEX">3x</field><field name="X">2.5</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">label_3x</field><field name="COLOR">RED</field><next>
<block type="object_math_tex">
<field name="VAR">label_2x</field><field name="TEX">2x</field><field name="X">0</field><field name="Y">2</field><next>
<block type="property_color">
<field name="VAR">label_2x</field><field name="COLOR">RED</field><next>
<block type="object_math_tex">
<field name="VAR">label_6</field><field name="TEX">6</field><field name="X">2.5</field><field name="Y">2</field><next>
<block type="property_color">
<field name="VAR">label_6</field><field name="COLOR">GREEN</field><next>
<block type="scene_play">
<field name="VAR">formula</field><field name="ANIM">Write</field><next>
<block type="scene_play">
<field name="VAR">sq_x2</field><field name="ANIM">Create</field><next>
<block type="scene_play">
<field name="VAR">rec_3x</field><field name="ANIM">Create</field><next>
<block type="scene_play">
<field name="VAR">rec_2x</field><field name="ANIM">Create</field><next>
<block type="scene_play">
<field name="VAR">rec_6</field><field name="ANIM">Create</field><next>
<block type="scene_play">
<field name="VAR">label_x2</field><field name="ANIM">Write</field><next>
<block type="scene_play">
<field name="VAR">label_3x</field><field name="ANIM">Write</field><next>
<block type="scene_play">
<field name="VAR">label_2x</field><field name="ANIM">Write</field><next>
<block type="scene_play">
<field name="VAR">label_6</field><field name="ANIM">Write</field><next>
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
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
</next></block>
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
    name: '第 32 课 · 知觉错觉',
    emoji: '👁️',
    desc: '用积木搭建动态艾宾浩斯错觉——橙色圆大小不变，周围圆大小变化让人产生错觉（对应合集：探索视觉的边界）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">知觉错觉</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="object_circle" x="30" y="30">
<field name="VAR">center1</field><field name="X">-2</field><field name="Y">2</field><next>
<block type="property_color">
<field name="VAR">center1</field><field name="COLOR">ORANGE</field><next>
<block type="property_fill_opacity">
<field name="VAR">center1</field><field name="OPACITY">1</field><next>
<block type="property_stroke_width">
<field name="VAR">center1</field><field name="W">0</field><next>
<block type="object_circle">
<field name="VAR">center2</field><field name="X">0</field><field name="Y">0</field><next>
<block type="property_color">
<field name="VAR">center2</field><field name="COLOR">ORANGE</field><next>
<block type="property_fill_opacity">
<field name="VAR">center2</field><field name="OPACITY">1</field><next>
<block type="property_stroke_width">
<field name="VAR">center2</field><field name="W">0</field><next>
<block type="object_circular_arrangement">
<field name="CENTER">center1</field><field name="COUNT">6</field><field name="RADIUS">0.4</field><field name="CRADIUS">0.1</field><field name="COLOR">PURE_BLUE</field><field name="VAR">ring_small</field><next>
<block type="object_group">
<field name="A">center1</field><field name="B">ring_small</field><field name="VAR">group_a</field><next>
<block type="object_circular_arrangement">
<field name="CENTER">center2</field><field name="COUNT">6</field><field name="RADIUS">1.5</field><field name="CRADIUS">0.7</field><field name="COLOR">PURE_BLUE</field><field name="VAR">ring_large</field><next>
<block type="object_group">
<field name="A">center2</field><field name="B">ring_large</field><field name="VAR">group_b</field><next>
<block type="animate_create">
<field name="VAR">group_a</field><field name="DURATION">1.5</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_replacement_transform">
<field name="VAR">group_a</field><field name="TARGET">group_b</field><next>
<block type="animate_replacement_transform">
<field name="VAR">group_b</field><field name="TARGET">group_a</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
  {
    name: '第 33 课 · 动态交点',
    emoji: '📐',
    desc: 'SymPy 解直线方程 + Manim 更新器实现动态交点计算（对应合集：用Manim实现动态交点计算）',
    level: 'advanced',
    xml: `<xml xmlns="https://developers.google.com/blockly/xml">
<block type="object_title" x="30" y="30">
<field name="VAR">title</field><field name="CONTENT">动态交点</field><field name="X">0</field><field name="Y">3</field><next>
<block type="animate_write">
<field name="VAR">title</field><field name="DURATION">1</field><next>
<block type="scene_wait">
<field name="SECONDS">1</field><next>
<block type="animate_fade_out">
<field name="VAR">title</field><field name="DURATION">0.5</field><next>
<block type="sympy_import" x="30" y="30">
<field name="MODULES">from sympy import *</field><field name="SYMBOLS">x, y, k, b</field><next>
<block type="custom_mobject">
<field name="VAR">custom</field><field name="CODE">def get_line(p1,p2): sol=solve([Eq(p1[0]*k+b,p1[1]),Eq(p2[0]*k+b,p2[1])],(k,b),dict=True)[0]; return float(sol[k]),float(sol[b])</field><next>
<block type="custom_mobject">
<field name="VAR">custom</field><field name="CODE">def cross_point(l1k,l1b,l2k,l2b): sol=solve([Eq(l1k*x+l1b,y),Eq(l2k*x+l2b,y)],(x,y),dict=True)[0]; return np.array([float(sol[x]),float(sol[y]),0])</field><next>
<block type="custom_mobject">
<field name="VAR">pts</field><field name="CODE">pts = {"A":[-2.5,2,0],"B":[-2.5,-3,0],"C":[2.5,-3,0],"D":[2.5,2,0]}; rect = Polygon(*[pts[k] for k in ["A","B","C","D"]], stroke_width=3, color=GREEN)</field><next>
<block type="custom_mobject">
<field name="VAR">E</field><field name="CODE">E = Dot([-0.52,2,0], color=BLUE); F = Dot([0.52,2,0], color=BLUE); H = Dot([0,0,0], color=YELLOW)</field><next>
<block type="custom_mobject">
<field name="VAR">custom</field><field name="CODE">F.add_updater(lambda z: z.become(Dot(pts["D"]-(E.get_center()-pts["A"]), color=BLUE))); H.add_updater(lambda z: z.become(Dot(cross_point(*get_line(pts["B"],E.get_center()),*get_line(pts["C"],F.get_center())), color=YELLOW)))</field><next>
<block type="custom_mobject">
<field name="VAR">custom</field><field name="CODE">self.play(Create(rect), Create(VGroup(E, F, H)))</field><next>
<block type="custom_mobject">
<field name="VAR">custom</field><field name="CODE">self.play(E.animate.shift(LEFT*1.5), run_time=3)</field><next>
<block type="scene_wait">
<field name="SECONDS">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>`,
  },
];


// Total lessons
EXAMPLES.total = EXAMPLES.length;
