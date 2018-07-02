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
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/anchor-has-content.md'
    },
    schema: [schema]
  },
  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VStartTag" (node) {
        const options = context.options[0] || {};
        const componentOptions = options.components || [];
        const typeCheck = ['a'].concat(componentOptions);
        const parent = node.parent;
        const nodeType = utils.getElementType(parent);
        if (typeCheck.indexOf(nodeType) === -1) {
          return;
        } else if (utils.hasAccessibleChild(parent)) {
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