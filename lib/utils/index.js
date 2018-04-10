module.exports = {
  defineTemplateBodyVisitor (context, templateBodyVisitor, scriptVisitor) {
    if (context.parserServices.defineTemplateBodyVisitor == null) {
      context.report({
        loc: { line: 1, column: 0 },
        message: 'Use the latest vue-eslint-parser. See also https://github.com/vuejs/eslint-plugin-vue#what-is-the-use-the-latest-vue-eslint-parser-error'
      })
      return {}
    }
    return context.parserServices.defineTemplateBodyVisitor(templateBodyVisitor, scriptVisitor)
  },
  hasAttribute(node, name) {
    return node.startTag.attributes.some(a =>
      !a.directive &&
      a.key.name === name && a.value.value
    )
  }
}