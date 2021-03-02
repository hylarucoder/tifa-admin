import path from 'path'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '~antd', replacement: path.resolve(__dirname, 'node_modules/antd') },
      {
        find: '~antd/lib/style/themes/default',
        replacement: path.resolve(__dirname, 'node_modules/antd/lib/style/themes/default.less'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `true;@import "${require.resolve('antd/lib/style/color/colorPalette.less')}";`,
          '@primary-color': '#41adff',
        },
      },
    },
  },
})




