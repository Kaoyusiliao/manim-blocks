import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // 官网落地页（GitHub Pages 入口）
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        // 网页版编辑器（Beta）
        editor: fileURLToPath(new URL('./editor.html', import.meta.url)),
      },
    },
  },
});
