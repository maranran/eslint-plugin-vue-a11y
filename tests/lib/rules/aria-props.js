
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/aria-props');
var RuleTester = require('eslint').RuleTester;

const errorMessage = '';
var tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
});

tester.run('aria-props', rule, {
  valid: [
    { 
      filename: 'test.vue',
      code: '<template><input aria-labelledby="address_label"></template>',
    },
  ],
  invalid: [{
    filename: 'test.vue',
    code: '<template><input aria-test="address_label"></template>',
    errors: [{
      message: 'aria-test: This attribute is an invalid ARIA attribute.'
    }]
  }, {
    code: `
        export default {
          render (h) {
            return (
            <input aria-labeledby="address_label" />
            )
          },
        };`,
    errors: [{
      message: 'aria-labeledby: This attribute is an invalid ARIA attribute. Did you mean to use aria-labelledby?'
    }]
  }],
});
