const VueUtils = require('eslint-plugin-vue/lib/utils')
const utils = require('../utils')
const anchorRule = require('eslint-plugin-jsx-a11y/lib/rules/anchor-has-content.js')
const { generateObjSchema, arraySchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js')


const errorMessage =
  'Anchors must have content and the content must be accessible by a screen reader.';

const schema = generateObjSchema({ components: arraySchema });

module.exports = {
  meta: {
    docs: {
      description: 'anchor should has content',
      schema: [schema]
      // url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v4.4.0/docs/rules/attribute-hyphenation.md'
    }
  },
  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement" (node) {
        const options = context.options[0] || {};
        const componentOptions = options.components || [];
        const typeCheck = ['a'].concat(componentOptions);
        const nodeType = utils.getElementType(node);
        if (typeCheck.indexOf(nodeType) === -1) {
          return;
        } else if (utils.hasAccessibleChild(node.parent)) {
          return;
        }

        context.report({
          node,
          message: errorMessage,
        });
      }
    }, anchorRule.create(context))
  }
}