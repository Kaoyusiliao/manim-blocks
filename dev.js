#!/usr/bin/env node
/**
 * Manim Blocks — 开发服务器
 * 同时启动 Vite (Web GUI) + Python 渲染服务器
 * 按 Ctrl+C 一起退出，无需手动管理。
 * 支持 macOS / Linux / Windows。
 */

import { spawn } from 'child_process';
import { platform } from 'os';
import { existsSync } from 'fs';
import { createServer } from 'vite';

const PORT = parseInt(process.env.PORT) || 3080;
const RENDER_PORT = parseInt(process.env.RENDER_PORT) || 3081;

// ── 跨平台 Python 检测 ──────────────────────────
function findPython() {
  if (platform() === 'win32') {
    // Conda/便携 Python 没有 py 启动器
    return ['python'];
  }
  // macOS / Linux
  return ['python3'];
}

// ── 1. 启动渲染服务器 ─────────────────────────
async function main() {
  console.log('📡 启动渲染服务器...');
  const [pyCmd, ...pyArgs] = findPython();
  const render = spawn(pyCmd, [...pyArgs, 'render_server.py'], {
    stdio: ['ignore', 'inherit', 'inherit'],
  });
  render.on('error', (err) => {
    if (err.code === 'ENOENT') {
      console.error(`❌ 未找到 ${pyCmd}，请先安装 Python 3.8+`);
      console.error('   下载: https://www.python.org/downloads/');
      console.error('   安装时务必勾选 "Add Python to PATH"');
    } else {
      console.error(`❌ 启动渲染服务器失败: ${err.message}`);
    }
    process.exit(1);
  });

  // 等待渲染服务器就绪
  await waitForPort(RENDER_PORT, 3000);

  // ── 2. 启动 Vite ──────────────────────────────
  console.log('🌐 启动 Web GUI...\n');
  const server = await createServer({
    root: '.',
    server: { port: PORT, open: '/editor.html' },
  });
  await server.listen();

  console.log(`\n  ⏩ 浏览器: http://localhost:${PORT}`);
  console.log(`  📡 渲染:    http://localhost:${RENDER_PORT}`);
  console.log(`  🧩 搭好积木后点「▶ 运行」一键渲染`);
  console.log(`  🛑 按 Ctrl+C 退出\n`);

  // ── 3. 退出时清理 ─────────────────────────────
  const cleanup = () => {
    console.log('\n🛑 正在关闭...');
    render.kill();
    server.close();
    process.exit(0);
  };
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  render.on('exit', () => { server.close(); process.exit(0); });
}

// ── 工具：等待端口就绪 ──────────────────────────
async function waitForPort(port, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await fetch(`http://127.0.0.1:${port}/health`, {
        signal: AbortSignal.timeout(500),
      });
      return; // 服务器就绪
    } catch {
      await new Promise(r => setTimeout(r, 200));
    }
  }
  console.warn('  ⚠️ 渲染服务器未在预期内就绪，但会继续尝试');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});