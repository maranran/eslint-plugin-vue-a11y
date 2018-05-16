
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/aria-props.js');
const { generateObjSchema, arraySchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');
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
        const name = (!node.directive && node.key.name)
          || (node.directive && node.key.name === 'bind' && node.key.argument);
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
            message: `${name}: This attribute is an invalid ARIA attribute.`
          });
        }
      }
    }, altRule.create(context))
  }
};
