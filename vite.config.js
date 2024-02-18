
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium';
import path from 'path'
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },

  plugins: [
    vue(),
    cesium(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })],
  server: {
    proxy: {
      '/map': {
        target: 'http://10.2.32.116',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/map/, '/map')
      },
      // 电网地图ip
      '/dw2gis': {
        target: 'http://25.41.42.74:18091',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dw2gis/, '')
      }
    }
  }

});


