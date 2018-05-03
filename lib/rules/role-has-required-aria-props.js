
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/role-has-required-aria-props.js');
const { generateObjSchema, arraySchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');
const { dom, roles } = require('aria-query');

const errorMessage = (role, requiredProps) =>
`Elements with the ARIA role "${role}" must have the following ` +
`attributes defined: ${String(requiredProps).toLowerCase()}`;

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/role-has-required-aria-props.md'
    },
    schema: [schema],
  },

  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VStartTag" (node) {
        const element = node.parent;
        const type = utils.getElementType(element);
        const role = utils.getRoleValue(element)
        if (!role) {
          return
        }
        if (!dom.get(type)) {
          return;
        }
        const normalizedRoles = String(role).toLowerCase().split(' ');
        const roleArray = [...roles.keys()];
        const validRoles = normalizedRoles.filter(value => roleArray.indexOf(value) >  -1)
        validRoles.forEach((role) => {
          const { requiredProps: requiredPropKeyValues } = roles.get(role);
          const requiredProps = Object.keys(requiredPropKeyValues);

          if (requiredProps.length > 0) {
            const hasRequiredProps = requiredProps.every(prop => utils.getAttribute(element, prop) !== undefined)
            if (!hasRequiredProps) {
              context.report({
                node,
                message: errorMessage(role.toLowerCase(), requiredProps),
              });
            }
          }
        })
      }
    }, altRule.create(context))
  }
};
