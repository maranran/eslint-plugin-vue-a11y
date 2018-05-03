const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const JsxRule = require('eslint-plugin-jsx-a11y/lib/rules/no-onchange.js');
const { generateObjSchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');

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
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/no-onchange.md'
    },
    schema: [schema]
  },
  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VAttribute[directive=true][key.name='on'][key.argument='change']" (node) {
        const element = node.parent.parent;
        const nodeType = utils.getElementType(element);

        if (applicableTypes.indexOf(nodeType) === -1) {
          return;
        }
        const hasOnBlur = VueUtils.hasDirective(element, 'on', 'blur');

        if (!hasOnBlur) {
          context.report({
            node,
            message: errorMessage,
          });
        }
      }
    }, JsxRule.create(context))
  }
}