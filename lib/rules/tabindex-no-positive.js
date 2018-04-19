
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/tabindex-no-positive.js');
const { generateObjSchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');

const errorMessage = 'Avoid positive integer values for tabIndex.';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/tabindex-no-positive.md'
    },
    schema: [schema],
  },

  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VAttribute" (node) {
        const tabindex = (!node.directive && node.key.name ==='tabindex')
          || (node.key.name === 'bind' && node.key.argument === 'tabindex')
        if (!tabindex) {
          return;
        }
        const value = utils.getAttributeValue(node);
        // 获得value
        if (value.type || +value <= 0) {
          return;
        }

        context.report({
          node: node,
          message: errorMessage,
        });
      }
    }, altRule.create(context))
  }
};
