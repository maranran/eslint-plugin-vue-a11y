const VueUtils = require('eslint-plugin-vue/lib/utils')
const utils = require('../utils')
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/alt-text.js')

const DEFAULT_ELEMENTS = [
  'img',
  'object',
  'area',
  'input[type="image"]'
];

const ruleByElement = {
  img(context, node) {
    const nodeType = node.name
    const altAttr = VueUtils.getAttribute(node, 'alt')
    if (altAttr) {     // Missing alt attr error.
      if (utils.isPresentationRole(node)) {
        context.report({
          node,
          message: 'Prefer alt="" over a presentational role. First rule of aria is to not use aria if it can be achieved via native HTML.',
        });
        return
      }
      context.report({
        node,
        message: `${nodeType} elements must have an alt prop, either with meaningful text, or an empty string for decorative images.`,
      });
      return
    }

    // Check if alt is undefined.
    const altValue = utils.getAttributeValue(node, 'alt')
    const isNullValued = altValue === null; //  <img alt />

    if ((!isNullValued && altValue.value ) || altValue.value === '') {
      return
    }

    // Undefined alt prop error.
    context.report({
      node,
      message: `Invalid alt value for ${nodeType}. Use alt="" for presentational images.`,
    });
  }

  // object(context, node) {
  //   const ariaLabelProp = getProp(node.attributes, 'aria-label');
  //   const arialLabelledByProp = getProp(node.attributes, 'aria-labelledby');
  //   const hasLabel = ariaLabelProp !== undefined || arialLabelledByProp !== undefined;
  //   const titleProp = getLiteralPropValue(getProp(node.attributes, 'title'));
  //   const hasTitleAttr = !!titleProp;
  //
  //   if (hasLabel || hasTitleAttr || hasAccessibleChild(node.parent)) {
  //     return;
  //   }
  //
  //   context.report({
  //     node,
  //     message: 'Embedded <object> elements must have alternative text by providing inner text, aria-label or aria-labelledby props.',
  //   });
  // },
  //
  // area(context, node) {
  //   const ariaLabelPropValue = getPropValue(getProp(node.attributes, 'aria-label'));
  //   const arialLabelledByPropValue = getPropValue(getProp(node.attributes, 'aria-labelledby'));
  //   const hasLabel = ariaLabelPropValue !== undefined || arialLabelledByPropValue !== undefined;
  //
  //   if (hasLabel) {
  //     return;
  //   }
  //
  //   const altProp = getProp(node.attributes, 'alt');
  //   if (altProp === undefined) {
  //     context.report({
  //       node,
  //       message: 'Each area of an image map must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.',
  //     });
  //     return;
  //   }
  //
  //   const altValue = getPropValue(altProp);
  //   const isNullValued = altProp.value === null; // <area alt />
  //
  //   if ((altValue && !isNullValued) || altValue === '') {
  //     return;
  //   }
  //
  //   context.report({
  //     node,
  //     message: 'Each area of an image map must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.',
  //   });
  // },
  //
  // 'input[type="image"]': function inputImage(context, node) {
  //   // Only test input[type="image"]
  //   const nodeType = elementType(node);
  //   if (nodeType === 'input') {
  //     const typePropValue = getPropValue(getProp(node.attributes, 'type'));
  //     if (typePropValue !== 'image') { return; }
  //   }
  //   const ariaLabelPropValue = getPropValue(getProp(node.attributes, 'aria-label'));
  //   const arialLabelledByPropValue = getPropValue(getProp(node.attributes, 'aria-labelledby'));
  //   const hasLabel = ariaLabelPropValue !== undefined || arialLabelledByPropValue !== undefined;
  //
  //   if (hasLabel) {
  //     return;
  //   }
  //
  //   const altProp = getProp(node.attributes, 'alt');
  //   if (altProp === undefined) {
  //     context.report({
  //       node,
  //       message: '<input> elements with type="image" must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.',
  //     });
  //     return;
  //   }
  //
  //   const altValue = getPropValue(altProp);
  //   const isNullValued = altProp.value === null; // <area alt />
  //
  //   if ((altValue && !isNullValued) || altValue === '') {
  //     return;
  //   }
  //
  //   context.report({
  //     node,
  //     message: '<input> elements with type="image" must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.',
  //   });
  // },
};

module.exports = {
  meta: {
    docs: {
      description: 'img should has alt attr in template',
      category: 'base',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/v4.4.0/docs/rules/attribute-hyphenation.md'
    }
  },
  create (context) {
    const options = context.options[0] || {};
    const elementOptions = options.elements || DEFAULT_ELEMENTS;
    const customComponents = elementOptions
      .map(element => options[element])
      .reduce(
      (components, customComponentsForElement) =>
        components.concat(customComponentsForElement || []),
        []
      )
    const typesToValidate = new Set([]
      .concat(customComponents, ...elementOptions)
      .map((type) => {
        if (type === 'input[type="image"]') { return 'input' }
        return type
      }))
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement" (node) {
        const nodeType = node.name
        if (!typesToValidate.has(nodeType)) { return  }
        let DOMElement = nodeType
        if (DOMElement === 'input') {
          DOMElement = 'input[type="image"]'
        }
        if (elementOptions.indexOf(DOMElement) === -1) {
          DOMElement = elementOptions.find((element) => {
            const customComponentsForElement = options[element] || []
            return customComponentsForElement.indexOf(nodeType) > -1
          })
        }
        ruleByElement[DOMElement](context, node)
      }
    }, altRule.create(context))
  }
}