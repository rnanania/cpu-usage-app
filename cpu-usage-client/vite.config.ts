/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path"
import react from "@vitejs/plugin-react"
import { configDefaults } from 'vitest/config'
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  // Thanks to -> https://www.youtube.com/watch?v=G-4zgIPsjkU
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['html'],
      exclude: [...configDefaults.exclude, './src/components/**', './src/shadcn/**', './src/services/**'],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Configuration to talk to local server for development.
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
