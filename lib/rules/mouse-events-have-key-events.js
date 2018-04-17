const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const JsxRule = require('eslint-plugin-jsx-a11y/lib/rules/mouse-events-have-key-events.js');
const { generateObjSchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');

const mouseOverErrorMessage = 'mouseover or mouseenter or hover must be accompanied by focusin or focus for accessibility.';
const mouseOutErrorMessage = 'mouseout or mouseleave  must be accompanied by focusout or blur  for accessibility.';
const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      schema: [schema]
      // url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v4.4.0/docs/rules/attribute-hyphenation.md'
    }
  },
  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement" (node) {
        const enterEvent = ['mouseover', 'mouseenter', 'hover']
        if (utils.hasAnyEvent(node, enterEvent)) {
          if (!utils.hasAnyEvent(node, ['focus', 'focusin'])) {
            context.report({
              node,
              message: mouseOverErrorMessage,
            });
          }
        }

        const outEvent = ['mouseout', 'mouseleave']
        if (utils.hasAnyEvent(node, outEvent)) {
          if (!utils.hasAnyEvent(node, ['blur', 'focusout'])) {
            context.report({
              node,
              message: mouseOutErrorMessage,
            });
          }
        }
      }
    }, JsxRule.create(context)) // todo rewrite
  }
}