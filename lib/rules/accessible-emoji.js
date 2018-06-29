
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const EmojiRule = require('eslint-plugin-jsx-a11y/lib/rules/accessible-emoji.js');
const { generateObjSchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');
const emojiRegex =require('emoji-regex');
const errorMessage = 'Emojis should be wrapped in <span>, have role="img", and have an accessible description with aria-label or aria-labelledby.';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/accessible-emoji.md'
    },
    schema: [schema],
  },

  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VText" (node) {
        let value = node.value;
        if (value && emojiRegex().test(value)) {
          const parent = node.parent;
          const rolePropValue = utils.getAttributeValue(parent, 'role');
          const ariaLabelProp = utils.getAttributeValue(parent, 'aria-label');
          const arialLabelledByProp =utils.getAttributeValue(parent, 'aria-labelledby');
          const hasLabel = !ariaLabelProp || !arialLabelledByProp;
          const isSpan = utils.getElementType(parent) === 'span';
          if (hasLabel === false || rolePropValue !== 'img' || isSpan === false) {
            context.report({
              node,
              message: errorMessage,
            });
          }
        }
      }
    }, EmojiRule.create(context))
  }
};
