const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/alt-text.js');
const { generateObjSchema, arraySchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');

const DEFAULT_ELEMENTS = [
  'img',
  'object',
  'area',
  'input[type="image"]'
]

const schema = generateObjSchema({
  elements: arraySchema,
  img: arraySchema,
  object: arraySchema,
  area: arraySchema,
  'input[type="image"]': arraySchema
})

const ruleByElement = {
  img(context, node) {
    const nodeType = node.name;
    const altAttr = utils.getAttribute(node, 'alt');
    if (altAttr === undefined) {     // Missing alt attr error.
      if (utils.isPresentationRole(node)) {
        context.report({
          node,
          message: 'Prefer alt="" over a presentational role. First rule of aria is to not use aria if it can be achieved via native HTML.'
        });
        return
      }
      context.report({
        node,
        message: `${nodeType} elements must have an alt prop, either with meaningful text, or an empty string for decorative images.`
      })
      return
    }

    // Check if alt value is undefined.
    const altValue = utils.getAttributeValue(altAttr)
    if (altValue || altValue === '') {
      return
    }
    context.report({
      node,
      message: `Invalid alt value for ${nodeType}. Use alt="" for presentational images.`
    });
  },

  object(context, node) {
    const hasLabel = utils.hasLabel(node);
    const hasTitleAttr = utils.getAttribute(node, 'title');
    if (hasLabel || (hasTitleAttr && utils.hasAttributeValue(hasTitleAttr)) || utils.hasAccessibleChild(node)) {
      return
    }

    context.report({
      node,
      message: 'Embedded <object> elements must have alternative text by providing inner text, aria-label or aria-labelledby props.'
    })
  },
  area(context, node) {
    if (utils.hasLabel(node)) {
      return
    }
    const altAttr = utils.getAttribute(node, 'alt'); // <object alt />
    const altValue = altAttr && utils.hasAttributeValue(altAttr);
    if (altValue) {
      return
    }
    context.report({
      node,
      message: 'Each area of an image map must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.',
    });
  },

  'input[type="image"]'(context, node) {
    // Only test input[type="image"]

    if (node.name === 'input') {
      const inputType = utils.getAttribute(node, 'type');
      const value = inputType && utils.getAttributeValue(inputType);
      if (!inputType || value !== 'image') {
        return
      }
      if (utils.hasLabel(node)) {
        return;
      }

      const altAttr = utils.getAttribute(node, 'alt');
      const altValue = altAttr && utils.getAttributeValue(altAttr);
      if (altValue) {
        return;
      }
      context.report({
        node,
        message: '<input> elements with type="image" must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.',
      });
    }
  },
};

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/alt-text.md'
    },
    schema: [schema]
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