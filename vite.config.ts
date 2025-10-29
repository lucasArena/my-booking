import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      'process.env': env,
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: '@/tests',
          replacement: path.resolve(__dirname, 'tests'),
        },
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src'),
        },
      ],
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './setupTests.ts',
      coverage: {
        reporter: ['text', 'html'],
      },
    },
  }
})
