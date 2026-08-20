# 🧊 Manim Blocks

拖积木生成 [Manim](https://github.com/ManimCommunity/manim) Python 动画脚本。用法和 Scratch 一样，不需要编程语言基础，可以同时学习数学和编程。在此特别感谢 [Scratch](https://scratch.mit.edu/) 为本项目提供的灵感，它是我儿时的玩伴（可能没那么要好）。

在线使用：**https://kaoyusiliao.github.io/manim-blocks/**

## 怎么用

### 🖥 网页版

直接打开 [https://kaoyusiliao.github.io/manim-blocks/](https://kaoyusiliao.github.io/manim-blocks/)，拖积木 → 复制代码 → 终端运行：

```bash
pip install manim sympy  # 首次需要
manim -pql manim_scene.py MyScene
```

### ⚡ 本地版（推荐：一键渲染）

搭好积木后，点「▶ 运行」按钮，动画直接在浏览器里播放，无需复制代码。

**需要：** Python 3.8+，[Manim](https://docs.manim.community/) 已安装

```bash
# 1. 克隆项目
git clone https://github.com/Kaoyusiliao/manim-blocks.git
cd manim-blocks

# 2. 安装前端依赖
pnpm install

# 3. 一键启动（自动启动 Web GUI + 渲染服务器）
pnpm dev
```

浏览器打开后，搭积木 → 展开「🎬 一键渲染」面板 → 点「▶ 运行」。

> 💡 **Mac 用户：** 项目文件夹里有 `start.command`，双击即可启动，无需打开终端。

### 📥 传统方式（无需渲染服务器）

1. 从左侧工具箱把积木拖到工作区
2. 积木上下拼接成一段程序
3. 右侧实时显示生成的 Python 代码
4. 「📥 下载 .py」保存文件
5. 终端运行：

```bash
pip install manim sympy  # 首次需要
manim -pql manim_scene.py MyScene
```

不会搭？点页面顶部的「🧩 **教程**」按钮，内置 **33 课**，分三大类：

| 分类 | 课程数 | 说明 |
|------|--------|------|
| 📘 **基础** | 9 课 | 拖积木即可用，新手友好 |
| 🚀 **进阶** | 12 课 | 参数曲线、3D、变速动画等 |
| 🧮 **SymPy** | 12 课 | 需 `pip install sympy`，使用自定义代码积木 |

## 特色功能

- **🔍 积木搜索**：工作区顶部搜索框，输入关键词（如"圆""旋转"）即时找到积木，点击添加到工作区
- **📤 导入 .py**：把已有的 manim_scene.py 传回来，自动反解成积木（支持 30+ 种常用模式，识别不了的保留为自定义代码积木）
- **🎛 自制积木**：像 Scratch 一样定义自己的积木（支持参数），复用你的动画片段
- **🛠 通用积木**：直接写任意 Manim 代码，覆盖面等同于 Manim 本身
- **🧮 SymPy 集成**：12 课专门用 SymPy 做符号计算（求导/积分/解方程/微分方程），代码自动生成

## 积木

200+ 种积木，14 个分类：

| 分类 | 说明 |
|------|------|
| 🎛 自制积木 | 定义和调用自己的积木（支持参数） |
| 🎩 事件 | 场景开始 |
| 🛠 通用 | 自定义代码/函数/多行代码，可写任意 Manim/SymPy 代码 |
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

## 本地开发

```bash
# 需要 Node.js 18+ 和 pnpm
pnpm install
pnpm dev       # 启动 Web GUI + 渲染服务器（自动），http://localhost:5173
pnpm build     # 输出到 dist/
```

`pnpm dev` 通过 `dev.js` 同时启动：
- **Vite 开发服务器**（端口 3080，提供 Web GUI）
- **Python 渲染服务器**（端口 3081，接收代码 → 运行 manim → 返回视频）

按 Ctrl+C 同时退出两个进程。

> 渲染服务器需要 Python 3.8+ 和 Manim。也可单独运行：`python3 render_server.py`

## 部署

仓库已配置 GitHub Actions，推送 `main` 分支自动构建并部署到 GitHub Pages。

## 技术栈

- [Google Blockly](https://developers.google.com/blockly) — 积木编辑器
- [highlight.js](https://highlightjs.org/) — 代码高亮
- [Vite](https://vitejs.dev/) — 构建
- `render_server.py` — 本地渲染服务器（Python 标准库，零依赖）
- `dev.js` — 开发服务器启动器（同时启动 Vite + 渲染服务器）
- 前端 + 本地渲染服务器，搭积木到动画一站式完成

## 课程来源

课程改编自 wang_yb 的《Manim 动画教程》[合集](https://www.cnblogs.com/wang_yb/collections/13744)，共 43 篇文章，已全部做成课程。特此鸣谢！

## 赞助

如果这个工具帮到了你，请作者喝一杯咖啡吧☕️ ❤️

![微信 / 支付宝收款码](https://raw.githubusercontent.com/Kaoyusiliao/manim-blocks/main/public/sponsor/defund.png)

网页版在「💖 赞助」按钮也能看到。

## 许可

[MIT](LICENSE) © 2026 Kaoyusiliao

依赖的许可证：Blockly（Apache 2.0）、highlight.js（BSD 3-Clause）、Vite（MIT）、Manim（MIT）。
