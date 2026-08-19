# 🧊 Manim Blocks

**积木式数学动画创作工具** —— 像 Scratch 一样拖拽积木，生成 [Manim](https://github.com/3b1b/manim) Python 动画脚本。

## 快速开始

### 本地开发

```bash
pnpm install
pnpm dev         # 启动开发服务器，默认 http://localhost:5173
```

### 构建 & 预览

```bash
pnpm build       # 输出到 dist/
pnpm preview     # 预览构建产物
```

### 部署到 GitHub Pages

本项目已配置 GitHub Actions 自动部署。

1. 将本仓库推送到你的 GitHub
2. 仓库 **Settings → Pages → Source**: 选择 **GitHub Actions**
3. 每次推送到 `main` 分支，自动构建并部署
4. 部署完成后访问：`https://你的用户名.github.io/manim-blocks/`

也可以手动触发：**Actions → Deploy to GitHub Pages → Run workflow**

> ⚡ Vite 配置了 `base: './'`，确保在子路径下资源加载正常。

## 使用方法

1. 从左侧工具箱拖拽积木到工作区
2. 积木按从上到下的顺序组成场景脚本
3. 右侧实时预览生成的 Python 代码
4. 点击 **📥 下载 .py 文件** 保存，然后用 Manim 渲染：

```bash
manim -pql manim_scene.py MyScene
```

## 积木分类

| 分类 | 说明 | 积木数 |
|------|------|--------|
| 🔵 **物体** | 创建几何体、公式、文字 | 10 |
| 🟢 **属性** | 设置颜色、透明度、位置、缩放 | 7 |
| 🟠 **动画** | 创建/淡入/淡出/变形/书写等 | 9 |
| 🔴 **场景** | 等待、添加/移除物体 | 3 |

### 示例：画一个红色圆形并显示公式

```
创建圆形    →  变量: c
设置 c 颜色 →  红色
创建动画 c  →  Create(c)
等待 1 秒
创建 LaTeX 公式 → 变量: f  内容: E = mc^2
书写显示 f  →  Write(f)
等待 2 秒
```

生成的代码：

```python
from manim import *

class MyScene(Scene):
    def construct(self):
        c = Circle()
        c.set_color(RED)
        self.play(Create(c))
        self.wait(1)
        f = Tex(r"E = mc^2")
        self.play(Write(f))
        self.wait(2)
```

## 技术栈

- [Google Blockly](https://developers.google.com/blockly) —— 积木编辑器
- [highlight.js](https://highlightjs.org/) —— Python 语法高亮
- [Vite](https://vitejs.dev/) —— 构建工具（纯静态输出）
- 零后端，零运维，全在浏览器中运行

## 许可

MIT