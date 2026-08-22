/**
 * Manim Blocks 官网 —— 下载区平台选项卡
 * 点击 🍎/🪟/🐧 切换对应平台的安装指引；默认按访问者系统自动选中。
 */

const tabs = Array.from(document.querySelectorAll('.platform-tab'));
const panels = Array.from(document.querySelectorAll('.platform-panel'));

function select(os) {
  for (const t of tabs) {
    const on = t.dataset.os === os;
    t.classList.toggle('active', on);
    t.setAttribute('aria-selected', String(on));
  }
  for (const p of panels) {
    p.hidden = p.dataset.os !== os;
  }
}

for (const t of tabs) {
  t.addEventListener('click', () => select(t.dataset.os));
}

// 按访问者系统预选（纯锦上添花，识别不了就停在 macOS）
const ua = navigator.userAgent;
if (/Windows/i.test(ua)) select('win');
else if (/Linux/i.test(ua) && !/Android/i.test(ua)) select('linux');
else select('mac');
