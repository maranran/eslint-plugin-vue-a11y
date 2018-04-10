module.exports = {
  rules: {
    'alt-text': require('./rules/alt-text.js')
  },
  configs: {
    'base': require('./configs/base'),
    'essential': require('./configs/essential'),
    'strongly-recommended': require('./configs/strongly-recommended'),
    'recommended': require('./configs/recommended')
  },
  processors: {
    '.vue': require('eslint-plugin-vue/lib/processor.js')
  }
}