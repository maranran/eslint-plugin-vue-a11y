module.exports = {
  rules: {
    'alt-text': require('./rules/alt-text.js'),
    'anchor-has-content': require('./rules/anchor-has-content.js'),
    'mouse-events-have-key-events': require('./rules/mouse-events-have-key-events.js'),
    'click-events-have-key-events': require('./rules/click-events-have-key-events.js'),
    'label-has-for': require('./rules/label-has-for.js'),
    'no-autofocus': require('./rules/no-autofocus.js'),
    'no-onchange': require('./rules/no-onchange.js')
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