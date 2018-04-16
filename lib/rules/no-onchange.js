const VueUtils = require('eslint-plugin-vue/lib/utils')
const utils = require('../utils')
const JsxRule = require('eslint-plugin-jsx-a11y/lib/rules/no-onchange.js')
const { generateObjSchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js')

const errorMessage = 'onBlur must be used instead of onchange, ' +
  'unless absolutely necessary and it causes no negative consequences ' +
  'for keyboard only or screen reader users.';

const applicableTypes = [
  'select',
  'option',
];

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
        const nodeType = utils.getElementType(node);

        if (applicableTypes.indexOf(nodeType) === -1) {
          return;
        }

        const onChange = VueUtils.hasDirective(node, 'on', 'change');
        const hasOnBlur = VueUtils.hasDirective(node, 'on', 'blur');

        if (onChange && !hasOnBlur) {
          context.report({
            node,
            message: errorMessage,
          });
        }
      }
    }, JsxRule.create(context))
  }
}