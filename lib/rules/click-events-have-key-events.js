const VueUtils = require('eslint-plugin-vue/lib/utils')
const utils = require('../utils')
const JsxRule = require('eslint-plugin-jsx-a11y/lib/rules/click-events-have-key-events.js')
const { generateObjSchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js')


const errorMessage = 'Visible, non-interactive elements with click handlers' +
  ' must have at least one keyboard listener.';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/click-events-have-key-events.md'
    },
    schema: [schema]
  },
  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement" (node) {
        if (!VueUtils.hasDirective(node, 'on', 'click')) {
          return;
        }
        const requiredEvents = ['keydown', 'keyup', 'keypress'];
        if (VueUtils.isCustomComponent(node)) {
          return;
        } else if (
          utils.isHiddenFromScreenReader(node)
          || utils.isPresentationRole(node)
        ) {
          return;
        // } else if (isInteractiveElement(type, props)) {  // todo
        //   return;
        } else if (utils.hasAnyEvent(node, requiredEvents)) {
          return;
        }

        // Visible, non-interactive elements with click handlers require one keyboard event listener.
        context.report({
          node,
          message: errorMessage,
        });
      }
    }, JsxRule.create(context))
  }
}