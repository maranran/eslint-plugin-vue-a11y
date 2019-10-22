const utils = require('eslint-plugin-vue/lib/utils');
const assert = require('assert');
const { roles, elementRoles, dom } = require('aria-query');
const rolesArray = [...roles.keys()];
const validRoles = rolesArray.filter(name => !roles.get(name).abstract)
const interactiveRoles = validRoles
  .filter(name => roles.get(name).superClass.some(klasses => klasses.indexOf('widget') !== -1));
interactiveRoles.push('toolbar');

const nonInteractiveRoles = validRoles
  .filter(name => !roles.get(name).superClass.some(klasses => klasses.indexOf('widget') !== -1));

const nonInteractiveElementRole = [...elementRoles].reduce((accumulator, [element, roles]) => {
  if ([...roles].every(role => nonInteractiveRoles.indexOf(role) !== -1)) {
    accumulator.push(element);
  }
  return accumulator;
  }, []);
const interactiveElementRole = [...elementRoles].reduce((accumulator, [element, roles]) => {
  if ([...roles].some(role => interactiveRoles.indexOf(role) !== -1)) {
    accumulator.push(element);
  }
  return accumulator;
}, []);
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
    return utils.getAttribute(node, attr) || utils.getDirective(node, 'bind', attr);  // todo eslint-plugin-vue util.getDirective 稳定后换回
  },
  getDirective (node, name, argument) {
    assert(node && node.type === 'VElement')
    return node.startTag.attributes.find(a => {
      return (
        a.directive &&
        a.key.name.name === name &&
        (argument === undefined || (a.key.argument && a.key.argument.name) === argument)
      );
    })
  },
  getElementType (node) { // return tagName
    assert(node && node.type === 'VElement');
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

    return ariaHidden && hidden.toString() === 'true';
  },
  hasAnyDirective (node, keyArray) {
    assert(node && node.type === 'VElement');
    return keyArray.some((key) => {
      return this.getDirective(node, key);
    });
  },
  hasAnyEvent (node, events) {
    assert(node && node.type === 'VElement');
    return events.some((event) => {
      return this.getDirective(node, 'on', event);
    });
  },
  isAttribute(node, attr) {
    assert(node && node.type === 'VAttribute');
    return (!node.directive && node.key.name === attr)
        || (node.key.name.name === 'bind' && (node.key.argument && node.key.argument.name === attr))
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
  },
  isDisabledElement (node) {
    const disabledAttr = this.getAttribute(node, 'disabled');
    const disabledAttrValue = disabledAttr && this.getAttributeValue(disabledAttr);
    if (disabledAttr && disabledAttrValue) {
      return true;
    }
    const ariaDisabledAttr = this.getAttribute(node, 'aria-disabled');
    const ariaDisabledAttrValue = ariaDisabledAttr && this.getAttributeValue(ariaDisabledAttr);

    if (ariaDisabledAttr && ariaDisabledAttrValue.toString() === 'true') {
      return true;
    }
    return false;
  },
  getRoleValue (node) {
    assert(node && node.type === 'VElement');
    const roleAttr = this.getAttribute(node, 'role')
    const roleValue = roleAttr && this.getAttributeValue(roleAttr)
    return roleAttr && typeof roleValue === 'string' && roleValue;
  },
  isInteractiveRole (node) {
    const roleValue = this.getRoleValue(node);
    if (!roleValue) {
      return false;
    }
    const normalizedValues = roleValue.toLowerCase().split(' ');
    const validRole = normalizedValues.reduce((accumulator, value) => {
      if (rolesArray.indexOf(value) !== -1) {
        accumulator.push(value)
      }
      return accumulator;
    }, []);
    if (!validRole.length) {
      return false
    }
    return interactiveRoles.indexOf(validRole[0]) !== -1;
  },
  isNonInteractiveRole (node) {
    const roleValue = this.getRoleValue(node);
    if (!roleValue) {
      return false;
    }
    const normalizedValues = roleValue.toLowerCase().split(' ');
    const validRole = normalizedValues.reduce((accumulator, value) => {
      if (rolesArray.indexOf(value) !== -1) {
      accumulator.push(value)
    }
    return accumulator;
  }, []);
    if (!validRole.length) {
      return false
    }
    return nonInteractiveRoles.indexOf(validRole[0]) !== -1;
  },
  isNonInteractiveElement (node) {
    const type = this.getElementType(node);
    if (!dom.has(type)) {
      return false;
    }
    const elementSchemaMatcher = (element) => {
      return type === element.name && this.attributesComparator(element.attributes, node);
    };

    if (nonInteractiveElementRole.some(elementSchemaMatcher)) {
      return true;
    }
    return false;
  },
  isInteractiveElement(node) {
    const type = this.getElementType(node);
    if (!dom.has(type)) {
      return false;
    }
    const elementSchemaMatcher = (element) => {
      return type === element.name && this.attributesComparator(element.attributes, node);
    };
    if (interactiveElementRole.some(elementSchemaMatcher)) {
      return true;
    }
    return false;
  },
  attributesComparator (baseAttr = [], node) {
    return baseAttr.every(attr => {
      const prop = this.getAttribute(node, attr.name);
      const value = prop && this.getAttributeValue(prop);
      if (attr.value) {
        return value === attr.value
      }
      return prop && value;
    })
  },
  getAttributeName (node) {
    assert(node && node.type === 'VAttribute');
    return (!node.directive && node.key.name)
      || (node.key.name.name === 'bind' && (node.key.argument && node.key.argument.name))
  },
  getImplicitRole (node) {
    assert(node && node.type === 'VElement');
    const type = this.getElementType(node);
    let implicitRole = null;
    [...elementRoles.keys()].forEach((element) => {
      let { name, attributes} = element;
      if (name === type && this.attributesComparator(attributes, node)) {
        implicitRole = elementRoles.get(element)
      }
    })
    return implicitRole
  }
}
