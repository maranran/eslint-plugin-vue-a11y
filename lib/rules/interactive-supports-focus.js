const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/interactive-supports-focus.js');
const { generateObjSchema, arraySchema, enumArraySchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');
const { dom, roles } = require('aria-query');
const { eventHandlersByType } = require('jsx-ast-utils');
const errorMessage = '';


const schema = generateObjSchema({
    tabbable: enumArraySchema([...roles.keys()]
    .filter(name => !roles.get(name).abstract)
    .filter(name => roles.get(name).superClass.some(klasses => klasses.indexOf('widget') != -1)))
});
const domElements = [...dom.keys()];

const interactiveProps = [...eventHandlersByType.mouse, ...eventHandlersByType.keyboard]
.map(event => event.toLowerCase().match(/on(.*)/)[1])

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/interactive-supports-focus.md'
    },
    schema: [schema],
  },

  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement" (node) {
        const tabbable = (
            context.options && context.options[0] && context.options[0].tabbable
        ) || [];
        const type = utils.getElementType(node);
        const hasInteractiveProps = utils.hasAnyEvent(node, interactiveProps);
        const hasTabindex = utils.getAttribute(node, 'tabindex') !== undefined;
        if (domElements.indexOf(type) === -1) {
          return;
        } else if (
            !hasInteractiveProps
            || utils.isDisabledElement(node)
            || utils.isHiddenFromScreenReader(node)
            || utils.isPresentationRole(node)
        ) {
          return;
        }

        if (
          hasInteractiveProps
          && !hasTabindex
          && utils.isInteractiveRole(node)
          && !utils.isInteractiveElement(node)
        ) {
          const role = utils.getRoleValue(node);
          if (role && tabbable.indexOf(role) !== -1) {
            // Always tabbable, tabIndex = 0
            context.report({
              node,
              message: `Elements with the '${role}' interactive role must be tabbable.`,
            });
          } else {
            // Focusable, tabIndex = -1 or 0
            context.report({
              node,
              message: `Elements with the '${role}' interactive role must be focusable.`,
            });
          }
        }
      }
    }, altRule.create(context))
  }
};
