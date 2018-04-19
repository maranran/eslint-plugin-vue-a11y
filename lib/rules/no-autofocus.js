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
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/no-autofocus.md'
    },
    schema: [schema]
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