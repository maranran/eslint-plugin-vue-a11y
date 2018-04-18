
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/anchor-is-valid.js');
const { generateObjSchema, arraySchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');

const errorMessage = '';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create (context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement" (node) {
      }
    }, altRule.create(context))
  }
};
