const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/heading-has-content.js');
const { generateObjSchema, arraySchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');

const errorMessage =
  'Headings must have content and the content must be accessible by a screen reader.';

const headings = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
];

const schema = generateObjSchema({ components: arraySchema });

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/heading-has-content.md'
    },
    schema: [schema]
  },

  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement" (node) {
        const typeCheck = headings.concat(context.options[0]);
        const nodeType = utils.getElementType(node);
        if (typeCheck.indexOf(nodeType) === -1) {
          return;
        } else if (utils.hasAccessibleChild(node)) {
          return;
        }

        context.report({
          node,
          message: errorMessage,
        });
      }
    }, altRule.create(context))
  }
};
