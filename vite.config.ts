import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "src/**/*.{ts,tsx}"',
        cache: false,
      },
      overlay: false,
    }),
  ],

  server: {
    port: 4200,
    open: true,
    strictPort: true,
  },

  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
    },
  },

  css: {
    modules: {
      // аналог: [name]__[local]--[hash:base64:5]
      generateScopedName: '[name]__[local]--[hash:base64:5]',
    },

    preprocessorOptions: {
      scss: {
        includePaths: [path.resolve(__dirname), path.resolve(__dirname, 'src')],
      },
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,

    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
});
