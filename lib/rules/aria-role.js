
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/aria-role.js');
const { generateObjSchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');
const { dom, roles } = require('aria-query');

const errorMessage = 'Elements with ARIA roles must use a valid, non-abstract ARIA role.';

const schema = generateObjSchema({
  ignoreNonDOM: {
    type: 'boolean',
    default: false,
  },
});


module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/aria-role.md'
    },
    schema: [schema],
  },

  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VAttribute" (node) {
        const options = context.options[0] || {};
        const ignoreNonDOM = !!options.ignoreNonDOM;
        if (ignoreNonDOM) {
          const type = utils.getElementType(node.parent.parent);
          if (!dom.get(type)) {
            return;
          }
        }
        const isRole = (!node.directive && node.key.name ==='role')
          || (node.key.name === 'bind' && node.key.argument === 'role')
        if (!isRole) { return; }

        const value = utils.getAttributeValue(node);
        if (value === null || typeof value !== 'string') {
          return;
        }
        const normalizedValues = String(value).toLowerCase().split(' ');
        const validRoles = [...roles.keys()].filter(role => roles.get(role).abstract === false);
        const isValid = normalizedValues.every(val => validRoles.indexOf(val) > -1);
        if (isValid === true) { return; }

        context.report({
          node: node,
          message: errorMessage
        });
      }
    }, altRule.create(context))
  }
};
