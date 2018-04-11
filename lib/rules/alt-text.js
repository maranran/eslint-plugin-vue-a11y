const utils = require('eslint-plugin-vue/lib/utils')
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/alt-text.js')

module.exports = {
  meta: {
    docs: {
      description: 'img should has alt attr in template',
      category: 'base',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v4.4.0/docs/rules/attribute-hyphenation.md'
    }
  },
  create (context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='img']" (node) {
        if (node.name !== 'img') return
        if (!utils.hasAttribute(node, 'alt')) {
          context.report({
            node,
            loc: node.loc,
            message: "Img should has alt attr in template."
          })
        }
      }
    }, altRule.create(context))
  }
}