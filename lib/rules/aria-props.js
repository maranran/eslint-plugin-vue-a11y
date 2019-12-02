
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/aria-props.js');
const { generateObjSchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');
const { aria } = require('aria-query');
const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/aria-props.md'
    },
    schema: [schema],
  },

  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VAttribute" (node) {
        const name = utils.getAttributeName(node);
        if (name) {
          const normalizedName = name.toLowerCase();
          if (normalizedName.indexOf('aria-') !== 0) {
            return;
          }
          const isValid = [...aria.keys()].indexOf(normalizedName) > -1;
          if (isValid) {
            return
          }
          context.report({
            node,
            message: `Attribute '{{name}}' is an invalid ARIA attribute.`,
            data: { name }
          });
        }
      }
    }, altRule.create(context))
  }
};
