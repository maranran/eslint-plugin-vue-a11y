
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/aria-unsupported-elements.js');
const { generateObjSchema, arraySchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');
const { aria, dom } = require('aria-query');

const schema = generateObjSchema();
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/aria-unsupported-elements.md'
    },
    schema: [schema],
  },

  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement" (node) {
        const type = utils.getElementType(node);
        const nodeAttrs = dom.get(type) || {};
        if (!nodeAttrs.reserved) {
          return
        }
        const invalidAttributes = [...aria.keys()].concat('role');
        node.startTag.attributes.forEach((attr) => {
          const name = utils.getAttributeName(attr);
          if (invalidAttributes.indexOf(name) > -1) {
            context.report({
              node,
              message: `This element does not support ARIA roles, states and properties.
               Try removing the prop '${name}'.`
            });
          }
        })
      }
    }, altRule.create(context))
  }
};
