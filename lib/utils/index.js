// const utils = require('eslint-plugin-vue/lib/utils')
const assert = require('assert')

function getAttributeValue(node, name) {
  assert(node && node.type === 'VElement')
  let attr = node.startTag.attributes.find(a =>
    !a.directive && a.key.name === name
  )
  return attr && attr.value
}
module.exports = {
  isPresentationRole (node) {
    const presentationRoles = new Set([
      'presentation',
      'none'
    ])
    let roleValue = getAttributeValue(node, 'role')
    return  roleValue && presentationRoles.has(roleValue.value)
  },
  getAttributeValue,
}