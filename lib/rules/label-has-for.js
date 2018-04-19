const { generateObjSchema, arraySchema, enumArraySchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');
const VueUtils = require('eslint-plugin-vue/lib/utils')
const utils = require('../utils')
const JsxRule = require('eslint-plugin-jsx-a11y/lib/rules/label-has-for.js')

const errorMessage = 'Form label must have associated control';

const enumValues = ['nesting', 'id'];
const schema = {
  type: 'object',
  properties: {
    components: arraySchema,
    required: {
      oneOf: [
        { type: 'string', enum: enumValues },
        generateObjSchema({ some: enumArraySchema(enumValues) }, ['some']),
        generateObjSchema({ every: enumArraySchema(enumValues) }, ['every']),
      ],
    },
    allowChildren: { type: 'boolean' },
  },
};
const validateNesting = node => node.children.some(child => child.type === 'VElement');

const validateId = (node) => {
  const htmlForAttr = utils.getAttribute(node, 'for');
  return htmlForAttr && utils.hasAttributeValue(htmlForAttr);
};

const validate = (node, required, allowChildren) => {
  if (allowChildren === true) {
    return utils.hasAccessibleChild(node);
  }
  if (required === 'nesting') {
    return validateNesting(node);
  }
  return validateId(node);
};

const isValid = (node, required, allowChildren) => {
  if (Array.isArray(required.some)) {
    return required.some.some(rule => validate(node, rule, allowChildren));
  } else if (Array.isArray(required.every)) {
    return required.every.every(rule => validate(node, rule, allowChildren));
  }

  return validate(node, required, allowChildren);
};

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/label-has-for.md'
    },
    schema: [schema]
  },
  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement" (node) {
        const options = context.options[0] || {};
        const componentOptions = options.components || [];
        const typesToValidate = ['label'].concat(componentOptions);
        const nodeType = utils.getElementType(node);

        // Only check 'label' elements and custom types.
        if (typesToValidate.indexOf(nodeType) === -1) {
          return;
        }
        const required = options.required || { every: ['nesting', 'id'] };
        const allowChildren = options.allowChildren || false;
        if (!isValid(node, required, allowChildren)) {
          context.report({
            node,
            message: errorMessage,
          });
        }
      }
    }, JsxRule.create(context))
  }
}