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

  optimizeDeps: {
    entries: [
      '@ant-design/icons',
      '@ant-design/pro-card',
      '@ant-design/pro-descriptions',
      '@ant-design/pro-form',
      '@ant-design/pro-field/es',
      '@ant-design/pro-layout',
      '@ant-design/pro-list',
      '@ant-design/pro-skeleton',
      '@ant-design/pro-table',
      '@ant-design/pro-utils',
      '@antv/data-set',
      '@antv/l7',
      '@antv/l7-maps',
      '@antv/l7-react',
      'antd',
      'omit.js',
      'axios',
      'bizcharts',
      'bizcharts-plugin-slider',
      'mobx',
      'mobx-react',
      'moment',
      'numeral',
      'nzh',
      'omit.js',
      'prism-react-renderer',
      'qs',
      'react',
      'react-canvas-nest',
      'react-dom',
      'react-fittext',
      'react-helmet-async',
      'react-router',
      'react-router-dom',
      'react-sortable-hoc',
      'lodash',
      'classnames',
      'fast-deep-equal',
      '@umijs/use-params',
      'path-to-regexp',
    ],
  },
})




