/**
 * Manim Blocks — Desktop App
 *
 * menu.js：菜单栏
 */

const { Menu, app } = require('electron');

function buildMenu(mainWindow) {
  const template = [
    {
      label: 'Manim Blocks',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        {
          label: '偏好设置',
          accelerator: 'Cmd+,',
          click: () => mainWindow.webContents.send('menu:action', 'settings'),
        },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: '文件',
      submenu: [
        {
          label: '新建项目',
          accelerator: 'Cmd+N',
          click: () => mainWindow.webContents.send('menu:action', 'newProject'),
        },
        {
          label: '打开项目',
          accelerator: 'Cmd+O',
          click: () => mainWindow.webContents.send('menu:action', 'openProject'),
        },
        {
          label: '保存项目',
          accelerator: 'Cmd+S',
          click: () => mainWindow.webContents.send('menu:action', 'saveProject'),
        },
        {
          label: '另存为…',
          accelerator: 'Cmd+Shift+S',
          click: () => mainWindow.webContents.send('menu:action', 'saveAsProject'),
        },
        { type: 'separator' },
        {
          label: '导入项目…',
          click: () => mainWindow.webContents.send('menu:action', 'importProject'),
        },
        {
          label: '导出 Python 代码…',
          accelerator: 'Cmd+E',
          click: () => mainWindow.webContents.send('menu:action', 'exportPy'),
        },
        { type: 'separator' },
        {
          label: '关闭项目',
          accelerator: 'Cmd+W',
          click: () => mainWindow.webContents.send('menu:action', 'closeProject'),
        },
      ],
    },
    {
      label: '编辑',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: '删除积木',
          accelerator: 'Backspace',
          click: () => mainWindow.webContents.send('menu:action', 'deleteBlock'),
        },
      ],
    },
    {
      label: '运行',
      submenu: [
        {
          label: '渲染视频',
          accelerator: 'Cmd+R',
          click: () => mainWindow.webContents.send('menu:action', 'render'),
        },
        {
          label: '停止渲染',
          accelerator: 'Cmd+Shift+R',
          click: () => mainWindow.webContents.send('menu:action', 'stopRender'),
        },
      ],
    },
    {
      label: '视图',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '教程',
          click: () => mainWindow.webContents.send('menu:action', 'tutorials'),
        },
        {
          label: '关于 Manim Blocks',
          click: () => mainWindow.webContents.send('menu:action', 'about'),
        },
      ],
    },
  ];

  return Menu.buildFromTemplate(template);
}

module.exports = { buildMenu };