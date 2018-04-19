const utils = require('eslint-plugin-vue/lib/utils');
const assert = require('assert');

module.exports = {
  isPresentationRole (node) {
    const presentationRoles = new Set([
      'presentation',
      'none'
    ]);
    let role = this.getAttribute(node, 'role');
    let roleValue = role != undefined && this.getAttributeValue(role);
    return  role && presentationRoles.has(roleValue);
  },
  hasAccessibleChild (node) {
    return node.children.some((child) => {
      switch (child.type) {
        case 'VText':
          return Boolean(child.value);
        case 'VElement':
          return !this.isHiddenFromScreenReader(child);
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
    const ariaLabelProp = this.getAttribute(node, 'aria-label');
    const arialLabelledByProp = this.getAttribute(node, 'aria-labelledby');
    return (ariaLabelProp && this.hasAttributeValue(ariaLabelProp)) || (arialLabelledByProp && this.hasAttributeValue(arialLabelledByProp));
  },
  getAttribute (node, attr) {
    return utils.getAttribute(node, attr) || utils.getDirective(node, 'bind', attr);
  },
  getElementType (node) { // return tagName
    if (utils.hasAttribute(node, 'is')) {
      return this.getAttributeValue(node, 'is');
    } else if (utils.hasDirective(node, 'bind', 'is')) {
      return 'component';
    }
    return node.rawName;
  },
  isHiddenFromScreenReader (node) {
    const type = this.getElementType(node);
    if (type.toUpperCase() === 'INPUT') {
      const inputType = this.getAttribute(node, 'type');
      const value = inputType != undefined && this.getAttributeValue(inputType);
      if (inputType && value.toUpperCase() === 'HIDDEN') {
        return true
      }
    }
    const ariaHidden = this.getAttribute(node, 'aria-hidden');
    const hidden = ariaHidden != undefined && this.getAttributeValue(ariaHidden);

    return ariaHidden && hidden === 'true';
  },
  hasAnyDirective (node, keyArray) {
    assert(node && node.type === 'VElement');
    return keyArray.some((key) => {
      return utils.getDirective(node, key);
    });
  },
  hasAnyEvent (node, events) {
    assert(node && node.type === 'VElement');
    return events.some((event) => {
      return utils.getDirective(node, 'on', event);
    });
  },
  hasAttributeValue (node) {
    assert(node && node.type === 'VAttribute');
    return (
      node.value != null &&
      (node.value.value || node.value.expression != null || node.value.syntaxError != null)
    )
  },
  getAttributeValue (node, name) {
    const getValue = function (attr) {
      assert(attr && attr.type === 'VAttribute');
      if (!attr.directive) {
        return attr.value && attr.value.value
      } else {
        let expression = attr.value && attr.value.expression
        if (expression.type === 'Literal') {
          return expression.value
        }
        return expression
      }
    };
    if (name) {
      assert(node && node.type === 'VElement');
      let attr = this.getAttribute(node, name);
      return attr && getValue(attr); // undefined or null/value
    } else {
      return getValue(node);
    }
  }
}