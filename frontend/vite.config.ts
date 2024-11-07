import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, './../'), "");
  return {
    plugins: [react()],
    resolve: {
      // alias: [ { find: '#common', replacement: fileURLToPath(new URL('../common', import.meta.url)) } ]
      alias: { '#common': path.resolve(__dirname, './../common') }
    },
    // envDir: "../",
    define: {
      __APP_ENV__: env.APP_ENV
    },
    server: {
      proxy: {
        "/api": {
          target: "https://localhost:8080",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    }
    // build: { commonjsOptions: { esmExternals: true, } }
  }
})
