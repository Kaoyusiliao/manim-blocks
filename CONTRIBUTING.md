# 贡献指南 Contributing

感谢你愿意帮助改进 **Manim Blocks**！🎉

本仓库是 **网页版（Beta）** 的开源代码：官网 + 积木编辑器 + 本地渲染服务器。桌面版（macOS / Windows / Linux 稳定发行）基于同一套积木引擎打包，网页版被合入的新功能会定期进入桌面稳定版——你的贡献会同时惠及两边。

无论你是开发者、设计师还是用户，都可以参与。

---

## 📌 目录

- [如何反馈问题](#如何反馈问题)
- [如何贡献代码](#如何贡献代码)
- [开发环境搭建](#开发环境搭建)
- [代码结构](#代码结构)
- [新增积木的步骤](#新增积木的步骤)
- [提交规范](#提交规范)

---

## 如何反馈问题

发现 bug 或有功能建议？请到 [Issues](https://github.com/Kaoyusiliao/manim-blocks/issues) 提交，尽量包含：

- **问题描述**：发生了什么，期望什么
- **操作步骤**：怎么复现
- **环境**：浏览器 / 系统 / Manim 版本
- **截图或报错信息**（如有）

## 如何贡献代码

1. **Fork** 本仓库
2. 创建你的分支：`git checkout -b feat/你的功能`
3. 修改代码
4. 提交（遵循下方提交规范）
5. 推送并创建 **Pull Request**，描述你的改动
6. **签署 CLA** — 首次提交 PR 时，CLA 机器人会自动引导你签署贡献者许可协议（只需一次）

> 如果你不确定怎么做，先在 Issue 里讨论，我们很乐意引导。

## 开发环境搭建

```bash
# 需要 Node.js 18+ 和 pnpm
git clone https://github.com/Kaoyusiliao/manim-blocks.git
cd manim-blocks
pnpm install
pnpm dev        # 本地开发，自动启动 Web GUI + 渲染服务器
pnpm build      # 构建到 dist/
```

> 渲染服务器需要 Python 3.9+ 和 [Manim](https://docs.manim.community/)。
> 如果只需前端开发，可单独运行 `pnpm build` 后打开 `dist/editor.html`（编辑器）或 `dist/index.html`（官网），无需渲染服务器。

## 代码结构

```
├── index.html         # 官网（落地页）
├── editor.html        # 编辑器主页面 HTML
├── dev.js             # 开发启动器（同时启动 Vite + 渲染服务器）
├── render_server.py   # 渲染服务器（接收代码 → 跑 manim → 返回视频）
├── start.command      # macOS 双击启动文件
├── package.json
├── src/
│   ├── main.js        # 编辑器入口：Blockly 初始化、按钮事件、示例模板
│   ├── blocks.js      # 全部积木的 JSON 定义（类型、参数、颜色）
│   ├── toolbox.js     # 工具箱分类编排
│   ├── generator.js   # 积木 → Python 代码的生成器
│   ├── style.css      # 编辑器样式
│   ├── landing.css    # 官网样式
│   └── landing.js     # 官网交互（下载区平台选项卡）
└── dist/              # 构建输出（GitHub Pages 部署）
```

## 新增积木的步骤

要加一个积木，需要同步修改 **4 个文件**：

1. **`src/blocks.js`** — 定义积木：类型名、显示文字、参数、颜色
2. **`src/toolbox.js`** — 把积木加入对应分类
3. **`src/generator.js`** — 写代码生成函数（积木 → Python 代码）
4. **`src/main.js`** — 在「导入 .py 反解」的 `matchLine()` 里加反向匹配规则，让生成的代码能反解回积木；也可在 `EXAMPLES` 数组里加新课程

> 新增积木后，建议在 `main.js` 的 `matchLine()` 里补一条对应的正则反向规则，这样「📤 导入 .py」也能识别它。参考已有的匹配模式。

### 示例：加一个「创建菱形」积木

```js
// 1. blocks.js — 加定义
{
  type: 'object_rhombus',
  message0: '创建菱形 %1  边长 %2  坐标 (%3, %4)',
  args0: [
    { type: 'field_variable', name: 'VAR', variable: 'rhombus' },
    { type: 'field_number', name: 'L', value: 2, min: 0.1, max: 10, precision: 0.1 },
    { type: 'field_number', name: 'X', value: 0, min: -10, max: 10, precision: 0.1 },
    { type: 'field_number', name: 'Y', value: 0, min: -10, max: 10, precision: 0.1 },
  ],
  previousStatement: null, nextStatement: null,
  colour: 230, tooltip: '创建一个菱形',
}

// 2. toolbox.js — 加进「🔵 物体」分类
{ kind: 'block', type: 'object_rhombus' },

// 3. generator.js — 写生成函数
codeGens.object_rhombus = (b, n) =>
  indent(n) + `${_v(b, 'VAR')} = Polygon(...)` + maybeMoveTo(b, n);
```

> ⚠️ 重要：变量字段（field_variable）取值必须用 `_v()`（会自动处理 Blockly 内部 ID），不要直接 `getFieldValue()`。

## 提交规范

使用约定式提交（Conventional Commits）：

| 类型 | 用途 | 示例 |
|------|------|------|
| `feat:` | 新功能 | `feat: 添加菱形积木` |
| `fix:` | 修 bug | `fix: 变量名乱码问题` |
| `docs:` | 文档 | `docs: 更新快速开始` |
| `style:` | 样式 | `style: 优化按钮配色` |
| `refactor:` | 重构 | `refactor: 简化生成器` |
| `chore:` | 杂项 | `chore: 更新依赖` |

## 贡献者许可协议（CLA）

为了保护项目和维护者的权益，所有贡献者在首次提交 PR 时需签署贡献者许可协议（CLA）。

**签署方式：** 提交 PR 后，CLA 机器人会自动引导您在 PR 评论中签署。只需一次，终身有效。

**协议要点：**
- ✅ 您保留贡献的**完全著作权**
- ✅ 您授予维护者使用您的贡献申请软著、维权、商业化的许可
- ✅ 协议温和、尊重贡献者，遵循开源精神
- 📄 完整协议见 [CLA.md](CLA.md)

## 感谢

你的每一次贡献都让这个工具离「人人能做数学动画」更近一步 💪

如果觉得项目有用，也可以通过下面的收款码请维护者喝杯咖啡 ☕

![微信 / 支付宝收款码](https://raw.githubusercontent.com/Kaoyusiliao/manim-blocks/main/public/sponsor/defund.png)
