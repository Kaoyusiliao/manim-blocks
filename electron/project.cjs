/**
 * Manim Blocks — Desktop App
 *
 * project.js：项目存储管理
 * - 项目保存在 ~/Documents/ManimBlocks/
 * - 每个项目一个目录：项目名/project.json
 * - project.json 包含名称、描述、积木 XML、生成代码
 * - 可导出 .py（纯代码）/ .json（完整项目）
 * - 可导入 .json
 */

const fs = require('fs');
const path = require('path');
const { dialog } = require('electron');

const APP_NAME = 'ManimBlocks';
const PROJECTS_DIR = path.join(
  require('os').homedir(),
  'Documents',
  APP_NAME
);

// ── 确保项目目录存在 ────────────────────────────
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ── 生成唯一项目 ID ────────────────────────────
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ── 初始化 IPC 处理器 ────────────────────────────
function initProjectHandlers(ipcMain, mainWindow) {
  ensureDir(PROJECTS_DIR);

  // 创建项目
  ipcMain.handle('project:create', async (_, name) => {
    const id = generateId();
    const dir = path.join(PROJECTS_DIR, id);
    ensureDir(dir);
    const project = {
      id,
      name: name || '未命名项目',
      description: '',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      workspaceXml: '',
      lastCode: '',
    };
    fs.writeFileSync(path.join(dir, 'project.json'), JSON.stringify(project, null, 2));
    fs.writeFileSync(path.join(dir, 'scene.py'), '');
    return project;
  });

  // 打开项目
  ipcMain.handle('project:open', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: '打开项目',
      filters: [
        { name: 'Manim Blocks 项目', extensions: ['json'] },
        { name: '所有文件', extensions: ['*'] },
      ],
      properties: ['openFile'],
    });
    if (result.canceled) return null;
    const filePath = result.filePaths[0];
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      const project = JSON.parse(data);
      return { ...project, _filePath: filePath };
    } catch (e) {
      dialog.showErrorBox('打开失败', `无法读取项目文件:\n${e.message}`);
      return null;
    }
  });

  // 保存项目
  ipcMain.handle('project:save', async (_, data) => {
    const { id, _filePath } = data;
    if (_filePath && fs.existsSync(_filePath)) {
      // 保存到已有文件
      const project = { ...data, _filePath: undefined, updated: new Date().toISOString() };
      fs.writeFileSync(_filePath, JSON.stringify(project, null, 2));
      return { ...project, _filePath };
    }
    // 保存到项目目录
    const dir = path.join(PROJECTS_DIR, id);
    ensureDir(dir);
    const filePath = path.join(dir, 'project.json');
    const project = { ...data, _filePath: undefined, updated: new Date().toISOString() };
    fs.writeFileSync(filePath, JSON.stringify(project, null, 2));
    return { ...project, _filePath: filePath };
  });

  // 另存为
  ipcMain.handle('project:saveAs', async (_, data) => {
    const result = await dialog.showSaveDialog(mainWindow, {
      title: '保存项目',
      defaultPath: path.join(PROJECTS_DIR, `${data.name || 'project'}.json`),
      filters: [
        { name: 'Manim Blocks 项目', extensions: ['json'] },
      ],
    });
    if (result.canceled) return null;
    const filePath = result.filePath;
    const project = { ...data, _filePath: undefined, updated: new Date().toISOString() };
    fs.writeFileSync(filePath, JSON.stringify(project, null, 2));
    return { ...project, _filePath: filePath };
  });

  // 列出所有项目
  ipcMain.handle('project:list', async () => {
    ensureDir(PROJECTS_DIR);
    const items = fs.readdirSync(PROJECTS_DIR);
    const projects = [];
    for (const item of items) {
      const projectFile = path.join(PROJECTS_DIR, item, 'project.json');
      if (fs.existsSync(projectFile)) {
        try {
          const data = JSON.parse(fs.readFileSync(projectFile, 'utf-8'));
          projects.push({ ...data, _filePath: projectFile });
        } catch { /* skip corrupted */ }
      }
    }
    // 按更新时间排序
    projects.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    return projects;
  });

  // 删除项目
  ipcMain.handle('project:remove', async (_, id) => {
    const dir = path.join(PROJECTS_DIR, id);
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
    return true;
  });

  // 导出 .py
  ipcMain.handle('project:exportPy', async (_, code) => {
    const result = await dialog.showSaveDialog(mainWindow, {
      title: '导出 Python 代码',
      defaultPath: path.join(PROJECTS_DIR, 'scene.py'),
      filters: [
        { name: 'Python 文件', extensions: ['py'] },
      ],
    });
    if (result.canceled) return null;
    fs.writeFileSync(result.filePath, code, 'utf-8');
    return result.filePath;
  });

  // 导入 .json
  ipcMain.handle('project:import', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: '导入项目',
      filters: [
        { name: 'Manim Blocks 项目', extensions: ['json'] },
        { name: '所有文件', extensions: ['*'] },
      ],
      properties: ['openFile'],
    });
    if (result.canceled) return null;
    const filePath = result.filePaths[0];
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      const project = JSON.parse(data);
      // 确保有 id
      if (!project.id) project.id = generateId();
      // 复制到项目目录
      const dir = path.join(PROJECTS_DIR, project.id);
      ensureDir(dir);
      const dest = path.join(dir, 'project.json');
      fs.writeFileSync(dest, JSON.stringify(project, null, 2));
      return { ...project, _filePath: dest };
    } catch (e) {
      dialog.showErrorBox('导入失败', `无法读取项目文件:\n${e.message}`);
      return null;
    }
  });

  // 获取应用版本
  ipcMain.handle('app:version', () => {
    return require('../package.json').version;
  });
}

module.exports = { initProjectHandlers };