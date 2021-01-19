/* config-overrides.js */
const path = require('path')

module.exports = function override(config) {
  //do stuff with the webpack config...
  config.resolve = {
    ...config.resolve,
    alias: { '@': path.resolve(__dirname, 'src') },
  }

  return config
}
