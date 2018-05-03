
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/no-access-key.js');
const { generateObjSchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');


const errorMessage = 'No access key attribute allowed. Inconsistencies ' +
  'between keyboard shortcuts and keyboard comments used by screenreader ' +
  'and keyboard only users create a11y complications.';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/no-access-key.md'
    },
    schema: [schema],
  },

  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VAttribute" (node) {
        const isAccesskey = (!node.directive && node.key.name ==='accesskey')
          || (node.key.name === 'bind' && node.key.argument === 'accesskey')
        if (!isAccesskey) {
          return;
        }
        const accessKeyValue = utils.getAttributeValue(node);

        if (accessKeyValue) {
          context.report({
            node,
            message: errorMessage,
          });
        }
      }
    }, altRule.create(context))
  }
};
