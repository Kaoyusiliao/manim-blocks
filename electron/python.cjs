/**
 * Manim Blocks — Desktop App
 *
 * python.js：Python 运行时管理
 * - 优先检测系统已安装的 Python（不重复安装）
 * - 没有则使用内嵌的 python-build-standalone
 * - 自动安装 manim + sympy（首次运行）
 */

const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

// ── 候选 Python 命令 ────────────────────────────
function getPythonCandidates() {
  const platform = process.platform;
  if (platform === 'win32') {
    return ['python', 'python3', 'py -3'];
  }
  // macOS / Linux
  return ['python3', 'python'];
}

// ── 检测系统 Python ──────────────────────────────
function findSystemPython() {
  for (const cmd of getPythonCandidates()) {
    try {
      const version = execSync(`${cmd} --version`, { timeout: 3000 }).toString().trim();
      // 要求 Python 3.8+
      const match = version.match(/Python (\d+)\.(\d+)/);
      if (match) {
        const major = parseInt(match[1]);
        const minor = parseInt(match[2]);
        if (major === 3 && minor >= 8) {
          console.log(`✅ 检测到系统 Python: ${version}`);
          return { python: cmd, version, source: 'system' };
        }
      }
    } catch { /* try next */ }
  }
  return null;
}

// ── 查找内嵌 Python ──────────────────────────────
function findBundledPython() {
  const appDir = path.dirname(__dirname);
  const candidates = [
    // macOS: 打包在 Resources 下
    path.join(appDir, '..', 'Resources', 'python', 'bin', 'python3'),
    path.join(appDir, '..', 'Resources', 'python', 'bin', 'python'),
    // 开发模式: 在项目根目录
    path.join(appDir, 'python', 'bin', 'python3'),
    path.join(appDir, 'python', 'bin', 'python'),
    // Windows
    path.join(appDir, '..', 'Resources', 'python', 'python.exe'),
    path.join(appDir, 'python', 'python.exe'),
  ];

  for (const pyPath of candidates) {
    if (fs.existsSync(pyPath)) {
      try {
        const version = execSync(`"${pyPath}" --version`, { timeout: 3000 }).toString().trim();
        console.log(`✅ 检测到内嵌 Python: ${version}`);
        return { python: pyPath, version, source: 'bundled' };
      } catch { /* skip */ }
    }
  }
  return null;
}

// ── 检查并安装依赖 ──────────────────────────────
function ensureDependencies(runtime) {
  return new Promise((resolve, reject) => {
    const py = runtime.python;
    const checkCmd = `"${py}" -c "import manim; import sympy; print('ok')"`;

    try {
      execSync(checkCmd, { timeout: 10000 });
      console.log('✅ Manim + SymPy 已安装');
      resolve();
      return;
    } catch {
      console.log('📦 正在安装 Manim + SymPy...');
    }

    const proc = spawn(py, ['-m', 'pip', 'install', 'manim', 'sympy'], {
      stdio: ['ignore', 'inherit', 'inherit'],
      shell: process.platform === 'win32',
    });

    proc.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Manim + SymPy 安装完成');
        resolve();
      } else {
        reject(new Error(`pip install 失败 (exit code: ${code})`));
      }
    });

    proc.on('error', reject);
  });
}

// ── 初始化 Python 运行时 ────────────────────────
async function initPythonRuntime() {
  // 1. 优先系统 Python（不重复安装）
  const system = findSystemPython();
  if (system) {
    try {
      await ensureDependencies(system);
      return system;
    } catch (e) {
      console.warn('⚠️ 系统 Python 依赖安装失败:', e.message);
      // 继续尝试内嵌 Python
    }
  }

  // 2. 尝试内嵌 Python
  const bundled = findBundledPython();
  if (bundled) {
    try {
      await ensureDependencies(bundled);
      return bundled;
    } catch (e) {
      console.warn('⚠️ 内嵌 Python 依赖安装失败:', e.message);
    }
  }

  return null;
}

module.exports = { initPythonRuntime, findSystemPython, findBundledPython, ensureDependencies };