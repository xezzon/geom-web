import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  /**
   * @type {Record<string, string>}
   */
  const env = loadEnv(mode, process.cwd())
  /**
   * @type {Record<string, Record<string, string | import("vite").ProxyOptions>}
   */
  const proxy = {
    development: {
      '/api': {
        target: `${env.VITE_ADMIN_SERVER}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    mock: {
      '/api': {
        target: 'http://127.0.0.1:4523/m1/615240-0-default',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }

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
        less: {
          javascriptEnabled: true,
        },
      },
    },
    server: {
      proxy: proxy[mode] || {},
    },
  })
}
