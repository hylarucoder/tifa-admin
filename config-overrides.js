/* config-overrides.js */
const { override, fixBabelImports, addLessLoader } = require('customize-cra')

const path = require('path')

module.exports = (config) => {
  config.resolve = {
    ...config.resolve,
    alias: { '@': path.resolve(__dirname, 'src') },
  }
  return override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1890ff', // customize as needed
          'font-size-sm': '12px',
          'text-color': '#333',
          'layout-body-background': '#f0f2f5',
          'layout-header-background': '#1890ff',
          'tab-left-menu': '#5E5E5E',
          black: '#000',
          'close-icon-hover': '#ccc',
        },
      },
    })
  )(config)
}
