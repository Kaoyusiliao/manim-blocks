/**
 * Manim Blocks — Desktop App
 *
 * preload.js：安全桥接，暴露 IPC 到渲染进程
 * 使用 contextBridge 而非 nodeIntegration
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // ── 项目操作 ──────────────────────────────────
  project: {
    create: (name) => ipcRenderer.invoke('project:create', name),
    open: () => ipcRenderer.invoke('project:open'),
    save: (data) => ipcRenderer.invoke('project:save', data),
    saveAs: (data) => ipcRenderer.invoke('project:saveAs', data),
    list: () => ipcRenderer.invoke('project:list'),
    remove: (name) => ipcRenderer.invoke('project:remove', name),
    exportPy: (code) => ipcRenderer.invoke('project:exportPy', code),
    importFile: () => ipcRenderer.invoke('project:import'),
  },

  // ── 渲染 ──────────────────────────────────────
  render: {
    code: (opts) => ipcRenderer.invoke('render:code', opts),
    status: () => ipcRenderer.invoke('render:status'),
  },

  // ── 应用信息 ──────────────────────────────────
  app: {
    getVersion: () => ipcRenderer.invoke('app:version'),
    getPlatform: () => process.platform,
  },

  // ── 事件监听 ──────────────────────────────────
  onMenuAction: (callback) => {
    ipcRenderer.on('menu:action', (_, action) => callback(action));
  },
});