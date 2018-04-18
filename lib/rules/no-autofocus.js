const VueUtils = require('eslint-plugin-vue/lib/utils')
const utils = require('../utils')
const JsxRule = require('eslint-plugin-jsx-a11y/lib/rules/no-autofocus.js')
const { generateObjSchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js')
const { dom } = require('aria-query');

const errorMessage =
  'The autoFocus prop should not be used, as it can reduce usability and accessibility for users.';

const schema = generateObjSchema({
  ignoreNonDOM: {
    type: 'boolean',
    default: false,
  },
});

module.exports = {
  meta: {
    docs: {
      schema: [schema]
      // url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v4.4.0/docs/rules/attribute-hyphenation.md'
    }
  },
  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VAttribute" (node) {
        const isAutofocus = (!node.directive && node.key.name ==='autofocus')
          || (node.key.name === 'bind' && node.key.argument === 'autofocus')
        if (!isAutofocus) {
          return;
        }
        const options = context.options[0] || {};
        const ignoreNonDOM = !!options.ignoreNonDOM;

        if (ignoreNonDOM) {
          const type = utils.getElementType(node.parent.parent);
          if (!dom.get(type)) {
            return;
          }
        }
        context.report({
          node,
          loc: node.loc,
          message: errorMessage
        });
      }
    }, JsxRule.create(context))
  }
}