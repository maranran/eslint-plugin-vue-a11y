
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/no-redundant-roles.js');

const DEFAULT_ROLE_EXCEPTIONS = { nav: ['navigation'] };

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/no-redundant-roles.md'
    },
    schema: [{
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: {
          type: 'string',
        },
        uniqueItems: true,
      },
    }],
  },

  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement" (node) {
        const { options } = context;
        const type = utils.getElementType(node);
        let implicitRoleSet = utils.getImplicitRole(node);
        let implicitRole = implicitRoleSet && [...implicitRoleSet][0] || null;
        let roleValue = utils.getRoleValue(node)
        if (!implicitRole || !roleValue) {
          return
        }

        let redundantRolesForElement;
        if (implicitRole === roleValue) {
          const allowedRedundantRoles = (options[0] || {});
          if (allowedRedundantRoles[type]) {
            redundantRolesForElement = redundantRolesForElement[type]
          } else {
            redundantRolesForElement = DEFAULT_ROLE_EXCEPTIONS[type] || [];
          }
          if (redundantRolesForElement.indexOf(roleValue) > -1) {
            return
          }
          context.report({
            node,
            message: `The element ${type} has an implicit role of ${implicitRole}. Defining this explicitly is redundant and should be avoided.`
          });
        }
      }
    }, altRule.create(context))
  }
};
