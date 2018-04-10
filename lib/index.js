module.exports = {
  rules: {
    'jsx-alt-text': require('eslint-plugin-jsx-a11y/lib/rules/alt-text.js')
  },
  configs: {
    'base': require('./configs/base'),
    'essential': require('./configs/essential'),
    'strongly-recommended': require('./configs/strongly-recommended'),
    'recommended': require('./configs/recommended')
  },
  processors: {
    '.vue': require('./processor')
  }
}