/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'

const envPrefix = ['GEOM_']

// https://vitejs.dev/config/
export default ({ mode }) => {
  /**
   * @type {Record<string, string>}
   */
  const env = loadEnv(mode, process.cwd(), envPrefix)

  return defineConfig({
    plugins: [react()],
    base: env.GEOM_CONTEXT_PATH,
    resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, './src') },
        { find: /^~/, replacement: '' },
      ],
    },
    envPrefix,
    server: {
      proxy: {
        [env.GEOM_ADMIN_API]: {
          target: env.GEOM_ADMIN_HOST,
          changeOrigin: true,
          rewrite: (path) => path.replace(env.GEOM_ADMIN_API, ''),
        },
        [env.GEOM_OPENAPI_API]: {
          target: env.GEOM_OPENAPI_HOST,
          changeOrigin: true,
          rewrite: (path) => path.replace(env.GEOM_OPENAPI_API, ''),
        },
      },
    },
  })
}
