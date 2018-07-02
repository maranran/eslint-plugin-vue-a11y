module.exports = {
  rules: {
    'accessible-emoji': require('./rules/accessible-emoji.js'),
    'alt-text': require('./rules/alt-text.js'),
    'anchor-has-content': require('./rules/anchor-has-content.js'),
    'mouse-events-have-key-events': require('./rules/mouse-events-have-key-events.js'),
    'click-events-have-key-events': require('./rules/click-events-have-key-events.js'),
    'label-has-for': require('./rules/label-has-for.js'),
    'no-autofocus': require('./rules/no-autofocus.js'),
    'no-onchange': require('./rules/no-onchange.js'),
    'tabindex-no-positive': require('./rules/tabindex-no-positive.js'),
    'heading-has-content': require('./rules/heading-has-content.js'),
    'no-distracting-elements': require('./rules/no-distracting-elements.js'),
    'media-has-caption': require('./rules/media-has-caption.js'),
    'no-access-key': require('./rules/no-access-key.js'),
    'iframe-has-title': require('./rules/iframe-has-title.js'),
    'form-has-label': require('./rules/form-has-label.js'),
    'interactive-supports-focus': require('./rules/interactive-supports-focus.js'),
    'aria-role': require('./rules/aria-role.js'),
    'aria-props': require('./rules/aria-props.js'),
    'aria-unsupported-elements': require('./rules/aria-unsupported-elements.js'),
    'no-redundant-roles': require('./rules/no-redundant-roles.js'),
    'role-has-required-aria-props': require('./rules/role-has-required-aria-props.js')
  },
  configs: {
    'base': require('./configs/base'),
    'recommended': require('./configs/recommended')
    //  'essential': require('./configs/essential'),
  }
  // processors: {
  //   '.vue': './processor.js'
  // }
}