
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/tabindex-no-positive');
var RuleTester = require('eslint').RuleTester;

const errorMessage = 'Avoid positive integer values for tabIndex.';
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

tester.run('tabindex-no-positive', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '<template><span tabindex="0"></span></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><span v-if="true" tabindex="0"></span></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><span tabindex="-1"></span></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><span :tabindex="number"></span></template>',
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><span tabindex="1"></span></template>',
      errors: [{
        message: errorMessage
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><span tabindex="2"></span></template>',
      errors: [{
        message: errorMessage
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><span :tabindex="2"></span></template>',
      errors: [{
        message: errorMessage
      }]
    }
   ]
});
