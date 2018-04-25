
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/aria-unsupported-elements');
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

tester.run('aria-unsupported-elements', rule, {
  valid: [
    { 
      filename: 'test.vue',
      code: '<template><html></html></template>',
    },
  ],
  invalid: [{
    filename: 'test.vue',
    code: '<template><meta charset="UTF-8" aria-hidden="false" /></template>',
    errors: [{
      message: `This element does not support ARIA roles, states and properties.
               Try removing the prop 'aria-hidden'.`
    }]
  }],
});
