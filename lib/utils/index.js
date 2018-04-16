const utils = require('eslint-plugin-vue/lib/utils');
const assert = require('assert');

function getAttributeValue(node, name) {
  assert(node && node.type === 'VElement');
  let attr = node.startTag.attributes.find(a =>
    !a.directive && a.key.name === name
  )
  return attr && attr.value; // 不存在 或者 值null 或 不为null
}
module.exports = {
  isPresentationRole (node) {
    const presentationRoles = new Set([
      'presentation',
      'none'
    ]);
    let roleValue = getAttributeValue(node, 'role');
    return  roleValue && presentationRoles.has(roleValue.value);
  },
  hasAccessibleChild (node) {
    return node.children.some((child) => {
      switch (child.type) {
        case 'VText':
          return Boolean(child.value);
        case 'VElement':
          return !this.isHiddenFromScreenReader(child)
        case 'VExpressionContainer':
          if (child.expression && child.expression.type === 'Identifier') {
            return child.expression.name !== 'undefined';
          }
          return true;
        default:
          return false;
      }
    }) || this.hasAnyDirective(node, ['text', 'html']);
  },
  hasLabel (node) {
    const ariaLabelProp = utils.getAttribute(node, 'aria-label');
    const arialLabelledByProp = utils.getAttribute(node, 'aria-labelledby');
    return !ariaLabelProp  || !arialLabelledByProp;
  },
  getElementType (node) { // return tagName
    if (utils.hasAttribute(node, 'is')) {
      return this.getAttributeValue(node, 'is').value;
    } else if (utils.hasDirective(node, 'bind', 'is')) {
      return 'expression';
    }
    return node.name.toLowerCase();
  },
  isHiddenFromScreenReader (node) {
    const type = this.getElementType(node);
    if (type.toUpperCase() === 'INPUT') {
      const hidden = getAttributeValue(node, 'type');
      if (hidden && hidden.value.toUpperCase() === 'HIDDEN') {
        return true
      }
    }
    const ariaHidden = getAttributeValue(node, 'aria-hidden');
    return ariaHidden && !!ariaHidden.value === true;
  },
  hasAnyDirective (node, keyArray) {
    assert(node && node.type === 'VElement')
    return keyArray.some((key) => {
      return utils.getDirective(node, key);
    });
  },
  getAttributeValue
}