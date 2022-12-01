/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  /**
   * @type {Record<string, string>}
   */
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, './src') },
        { find: /^~/, replacement: '' },
      ],
    },
    css: {
      preprocessorOptions: {
      },
    },
    server: {
      proxy: {
        [env.VITE_ADMIN_CONTEXT_PATH]: {
          target: env.VITE_ADMIN_SERVER,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}
