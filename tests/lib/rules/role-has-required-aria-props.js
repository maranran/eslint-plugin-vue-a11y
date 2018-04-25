
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/role-has-required-aria-props');
var RuleTester = require('eslint').RuleTester;

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

tester.run('role-has-required-aria-props', rule, {
  valid: [
    { 
      filename: 'test.vue',
      code: '<template><span role="checkbox" aria-checked="false" aria-labelledby="foo" tabindex="0"></span></template>',
    }
  ],
  invalid: [{
    filename: 'test.vue',
    code: '<template><span role="checkbox" aria-labelledby="foo" tabindex="0"></span></template>',
    errors: [{
      message: `Elements with the ARIA role "checkbox" must have the following attributes defined: aria-checked`
    }]
  },{
    filename: 'test.vue',
    code: '<template><span role="radio" aria-labelledby="foo" tabindex="0"></span></template>',
    errors: [{
      message: `Elements with the ARIA role "radio" must have the following attributes defined: aria-checked`
    }]
  }],
});
