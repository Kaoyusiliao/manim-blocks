#!/usr/bin/env python3
"""
Manim Blocks 渲染服务器

一键启动：  python3 render_server.py
前端发送：  POST /render  { code: "...", scene: "MyScene" }
返回：      video/mp4 或 { "error": "..." }

纯标准库，无需 pip install。
"""

import json
import os
import subprocess
import shutil
import socket
import tempfile
import uuid
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse

PORT = 3081


class RenderHandler(BaseHTTPRequestHandler):
    """接收代码 → 跑 manim → 返回 MP4"""

    # ── CORS 预检 ─────────────────────────────────
    def do_OPTIONS(self):
        self._cors()
        self.send_response(200)
        self.end_headers()

    # ── 渲染入口 ─────────────────────────────────
    def do_GET(self):
        """健康检查"""
        path = urlparse(self.path).path
        if path == '/health':
            self._json(200, {'status': 'ok'})

    def do_POST(self):
        path = urlparse(self.path).path
        if path != '/render':
            self._json(404, {'error': 'use POST /render'})
            return

        # 读取请求体
        try:
            length = int(self.headers.get('Content-Length', 0))
            body = json.loads(self.rfile.read(length))
        except Exception as e:
            self._json(400, {'error': f'bad request: {e}'})
            return

        code = body.get('code', '')
        scene = body.get('scene', 'MyScene')
        quality = body.get('quality', 'l')  # l / m / h / k
        if not code.strip():
            self._json(400, {'error': 'code is required'})
            return

        # 质量参数 → manim 标志
        quality_flags = {
            'l': '-pql',   # 480p15  快速
            'm': '-pqm',   # 720p30  中等
            'h': '-pqh',   # 1080p30 高清
            'k': '-pqk',   # 2160p60 4K
        }
        qflag = quality_flags.get(quality, '-pql')

        # 写入临时目录
        tmp = tempfile.mkdtemp(prefix='manim_blocks_')
        py_file = os.path.join(tmp, 'scene.py')
        try:
            with open(py_file, 'w') as f:
                f.write(code)

            # 跑 manim
            proc = subprocess.run(
                ['manim', qflag, 'scene.py', scene],
                cwd=tmp,
                capture_output=True,
                text=True,
                timeout=180,
            )

            # 找生成的 MP4
            mp4 = None
            for root, _, files in os.walk(tmp):
                for f in files:
                    if f.endswith('.mp4'):
                        mp4 = os.path.join(root, f)
                        break
                if mp4:
                    break

            if mp4 and os.path.getsize(mp4) > 0:
                with open(mp4, 'rb') as f:
                    data = f.read()
                self._video(data)
            else:
                err = proc.stderr[:2000] if proc.stderr else '未知错误（无输出）'
                self._json(500, {'error': err.strip()})

        except subprocess.TimeoutExpired:
            self._json(504, {'error': '渲染超时（>180秒）'})
        except Exception as e:
            self._json(500, {'error': str(e)})
        finally:
            shutil.rmtree(tmp, ignore_errors=True)

    # ── 辅助方法 ─────────────────────────────────
    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def _json(self, status, obj):
        body = json.dumps(obj, ensure_ascii=False).encode()
        self.send_response(status)
        self._cors()
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _video(self, data):
        self.send_response(200)
        self._cors()
        self.send_header('Content-Type', 'video/mp4')
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    # ── 抑制日志 ─────────────────────────────────
    def log_message(self, fmt, *args):
        pass


if __name__ == '__main__':
    # 释放旧端口（如果之前的进程没退干净）
    try:
        # 尝试 kill 占端口的旧进程（macOS / Linux）
        subprocess.run(
            ['lsof', '-ti', f':{PORT}'],
            capture_output=True, text=True, timeout=5
        )
        old_pids = subprocess.run(
            ['lsof', '-ti', f':{PORT}'],
            capture_output=True, text=True, timeout=5
        ).stdout.strip().split()
        for pid in old_pids:
            if pid:
                subprocess.run(['kill', pid], capture_output=True, timeout=3)
                print(f'  🧹 释放端口 {PORT}（已终止旧进程 {pid}）')
    except Exception:
        pass  # 无旧进程或 lsof 不可用

    print(f'🎬  Manim 渲染服务器')
    print(f'    地址: http://127.0.0.1:{PORT}')
    print(f'    API:  POST /render  {{ code, scene }}')
    print(f'    返回: video/mp4')
    print()
    print(f'    启动 Web GUI 后，点击「▶ 运行」即可一键渲染')

    server = HTTPServer(('127.0.0.1', PORT), RenderHandler)
    # 允许端口复用
    server.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.serve_forever()