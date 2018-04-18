
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/alt-text');
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

RuleTester.run('heading-has-content', rule, {
  valid: [
    { 
      filename: 'test.vue',
      code: '<template></template>',
    },
  ],
  invalid: [{
    filename: 'test.vue',
    code: '<template></template>',
    errors: [{
      message: errorMessage
    }]
  }],
});
