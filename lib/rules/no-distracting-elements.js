
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/no-distracting-elements.js');
const { generateObjSchema, enumArraySchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');

const errorMessage = element =>
  `Do not use <${element}> elements as they can create visual accessibility issues and are deprecated.`;

const DEFAULT_ELEMENTS = [
  'marquee',
  'blink',
];

const schema = generateObjSchema({
  elements: enumArraySchema(DEFAULT_ELEMENTS),
});

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/no-distracting-elements.md'
    },
    schema: [schema],
  },

  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement" (node) {
        const options = context.options[0] || {};
        const elementOptions = options.elements || DEFAULT_ELEMENTS;
        const type = utils.getElementType(node);
        const distractingElement = elementOptions.find(element => type === element);

        if (distractingElement) {
          context.report({
            node,
            message: errorMessage(distractingElement),
          });
        }
      }
    }, altRule.create(context))
  }
};
