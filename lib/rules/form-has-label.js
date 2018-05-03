
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const { generateObjSchema, arraySchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');
const { getProp, getPropValue, elementType, getLiteralPropValue } = require('jsx-ast-utils');

const errorMessage = 'Each form element must have a programmatically associated label element.';

const schema = generateObjSchema();
const uncheckType = ['hidden', 'button', 'image', 'submit', 'reset'];

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/form-has-label.md'
    },
    schema: [schema],
  },

  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement" (node) {
        const type = utils.getElementType(node);
        if (['input', 'textarea'].indexOf(type) === -1) {
          return;
        }
        if (type === 'input') {
          const type = utils.getAttributeValue(node, 'type')
          if (!type) {
            return
          }
          if (uncheckType.indexOf(type) > -1) {
            return
          }
        }
        const hasLabel = utils.hasLabel(node);
        const hasLabelElement = (node) => {
          const parent = node.parent;
          if (parent.type === 'VElement' && utils.getElementType(parent) === 'label') { // parent
            return true;
          }
          const siblingNode = parent && parent.children || [];
          return [...siblingNode].some((sibling) => {
            return sibling.type === 'VElement' && utils.getElementType(sibling) === 'label'
          })
        }
        if (!hasLabel && !hasLabelElement(node)) {
          context.report({
            node,
            loc: node.loc,
            message: errorMessage
          });
        }
      }
    }, {
      'JSXOpeningElement' (node) {
        const type = elementType(node);
        if (['input', 'textarea'].indexOf(type) === -1) {
          return;
        }
        if (type === 'input') {
          const type = getPropValue(getProp(node.attributes, 'type'));
          if (!type) {
            return
          }
          if (uncheckType.indexOf(type) > -1) {
            return
          }
        }
        const hasLabel = getPropValue(getProp(node.attributes, 'aria-label')) || getPropValue(getProp(node.attributes, 'aria-labelledby'));

        const hasLabelElement = (node) => {
          const parent = node.parent;
          if (parent.type === 'JSXElement' && elementType(parent.openingElement) === 'label') { // parent
            return true;
          }
          const siblingNode = parent && parent.children || [];
          return [...siblingNode].some((sibling) => {
            return sibling.type === 'JSXElement' && elementType(sibling.openingElement) === 'label'
          })
        }
        if (!hasLabel && !hasLabelElement(node.parent)) {
          context.report({
            node,
            loc: node.loc,
            message: errorMessage
          });
        }
      }
    })
  }
};