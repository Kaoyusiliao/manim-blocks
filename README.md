# 🧊 Manim Blocks

拖积木生成 [Manim](https://github.com/ManimCommunity/manim) Python 动画脚本。用法和 Scratch 一样，不需要会编程。

在线使用：**https://kaoyusiliao.github.io/manim-blocks/**

## 怎么用

1. 从左侧工具箱把积木拖到工作区
2. 积木上下拼接成一段程序（没拼的积木不会运行）
3. 右侧实时显示生成的 Python 代码
4. 「📥 下载 .py」保存文件
5. 终端运行：

```bash
pip install manim        # 第一次需要
manim -pql manim_scene.py MyScene
```

不会搭？点页面顶部的「🧩 示例」按钮，内置 7 个现成作品，加载后改数字就能用。

## 积木

210 种积木，13 个分类：

| 分类 | 说明 |
|------|------|
| 🎩 事件 | 场景开始 |
| 🛠 通用 | 自定义代码/函数，可写任意 Manim 代码 |
| 🟣 控制 | 重复、循环、条件判断 |
| 🔵 物体 | 几何图形、文字、公式、矩阵、表格、图 |
| 🧊 3D 物体 | 球体、立方体、圆锥、正多面体等 |
| 🟢 属性 | 颜色、透明度、缩放、旋转、定位 |
| 🟠 动画 | 创建、淡入淡出、变形、书写、闪烁等 60+ 种 |
| 🎥 相机 | 缩放、移动镜头 |
| 📐 坐标系 | 数轴、平面、极坐标、函数图像 |
| 🔴 场景 | 添加/移除物体 |
| ⚙️ 更新器 | 让物体持续运动 |
| 🟡 运算 | 数学、比较、逻辑 |
| 🔷 变量 | 变量、列表 |

通用分类可以写任意 Manim 代码，所以工具的覆盖面等同于 Manim 本身，不用等积木更新。

## 本地开发

```bash
pnpm install
pnpm dev       # http://localhost:5173
pnpm build     # 输出到 dist/
```

## 部署

仓库已配置 GitHub Actions，推送 `main` 分支自动构建并部署到 GitHub Pages。

## 技术栈

- [Google Blockly](https://developers.google.com/blockly) — 积木编辑器
- [highlight.js](https://highlightjs.org/) — 代码高亮
- [Vite](https://vitejs.dev/) — 构建
- 纯前端，无后端，浏览器运行

## 许可

[MIT](LICENSE) © 2026 Kaoyusiliao

依赖的许可证：Blockly（Apache 2.0）、highlight.js（BSD 3-Clause）、Vite（MIT）、Manim（MIT）。
