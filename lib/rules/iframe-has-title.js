
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/iframe-has-title.js');
const { generateObjSchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');

const errorMessage = '<iframe> elements must have a unique title property.';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/iframe-has-title.md'
    },
    schema: [schema],
  },

  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement[name='iframe']" (node) {
        const title = utils.getAttribute(node, 'title');
        const titleValue = utils.getAttributeValue(node, 'title');
        if (title && typeof titleValue === 'string' || typeof titleValue === 'object') {
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
