
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/no-access-key');
var RuleTester = require('eslint').RuleTester;

const errorMessage = 'No access key attribute allowed. Inconsistencies ' +
  'between keyboard shortcuts and keyboard comments used by screenreader ' +
  'and keyboard only users create a11y complications.';

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

tester.run('no-access-key', rule, {
  valid: [
    { 
      filename: 'test.vue',
      code: '<template><div></div></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><div accesskey ></div></template>',
    },
  ],
  invalid: [{
    filename: 'test.vue',
    code: '<template><div accesskey="h"></div></template>',
    errors: [{
      message: errorMessage}]
    },
    {
      filename: 'test.vue',
      code: '<template><div :accesskey="h"></div></template>',
      errors: [{
        message: errorMessage}]
    }]
});
