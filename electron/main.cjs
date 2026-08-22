#!/usr/bin/env node
/**
 * Manim Blocks — Desktop App (macOS / Linux / Windows)
 *
 * Electron 主进程
 * 管理窗口、渲染服务器、Python 运行时、项目文件
 */

const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const { initProjectHandlers } = require('./project');
const { initPythonRuntime } = require('./python');
const { buildMenu } = require('./menu');

// ── 全局状态 ──────────────────────────────────────
let mainWindow = null;
let renderProcess = null;
let pythonRuntime = null;
const RENDER_PORT = 3081;

// ── 窗口创建 ──────────────────────────────────────
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 640,
    title: 'Manim Blocks',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // 开发模式从 Vite 加载，生产模式从打包文件加载
  if (process.env.DEV || process.argv.includes('--dev')) {
    mainWindow.loadURL('http://localhost:3080');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  mainWindow.on('closed', () => { mainWindow = null; });
}

// ── 应用启动 ──────────────────────────────────────
app.whenReady().then(async () => {
  // 1. 初始化 Python 运行时
  pythonRuntime = await initPythonRuntime();
  if (!pythonRuntime) {
    dialog.showErrorBox('Python 错误', '无法找到 Python 运行时，请安装 Python 3.8+');
    app.quit();
    return;
  }

  // 2. 注册 IPC 处理器
  initProjectHandlers(ipcMain, mainWindow);
  registerRenderHandlers();

  // 3. 创建窗口
  createWindow();
  Menu.setApplicationMenu(buildMenu(mainWindow));

  // 4. 启动渲染服务器
  startRenderServer();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  stopRenderServer();
  if (process.platform !== 'darwin') app.quit();
});

// ── 渲染服务器管理 ────────────────────────────────
function startRenderServer() {
  if (renderProcess) return;

  const pyPath = pythonRuntime.python;
  const serverScript = path.join(__dirname, '..', 'render_server.py');

  renderProcess = spawn(pyPath, [serverScript], {
    stdio: ['ignore', 'inherit', 'inherit'],
    env: { ...process.env, PORT: String(RENDER_PORT) },
  });

  renderProcess.on('error', (err) => {
    console.error('渲染服务器启动失败:', err.message);
  });

  renderProcess.on('exit', (code) => {
    console.log('渲染服务器已退出, code:', code);
    renderProcess = null;
  });

  app.on('before-quit', () => stopRenderServer());
}

function stopRenderServer() {
  if (renderProcess) {
    renderProcess.kill();
    renderProcess = null;
  }
}

// ── IPC：渲染 ────────────────────────────────────
function registerRenderHandlers() {
  ipcMain.handle('render:code', async (event, { code, quality }) => {
    try {
      const res = await fetch(`http://127.0.0.1:${RENDER_PORT}/render`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, scene: 'MyScene', quality }),
      });
      if (!res.ok) {
        const err = await res.json();
        return { error: err.error || `HTTP ${res.status}` };
      }
      const buffer = await res.arrayBuffer();
      return { video: Buffer.from(buffer) };
    } catch (e) {
      return { error: e.message };
    }
  });

  ipcMain.handle('render:status', async () => {
    try {
      const res = await fetch(`http://127.0.0.1:${RENDER_PORT}/health`);
      return { online: res.ok };
    } catch {
      return { online: false };
    }
  });
}