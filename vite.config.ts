const { resolve } = require('path')
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      "@/": "src/",
      '~antd/': "node_modules/antd/",
      '~antd/lib/style/themes/default': "node_modules/antd/lib/style/themes/default.less"
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `true;@import "${require.resolve('antd/lib/style/color/colorPalette.less')}";`,
          '@primary-color': '#41adff',
        }
      },
    }
  }
})
