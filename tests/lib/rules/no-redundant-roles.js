
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/no-redundant-roles');
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

tester.run('no-redundant-roles', rule, {
  valid: [
    { 
      filename: 'test.vue',
      code: '<template><a role="link"></a></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><div role="link"></div></template>',
    }
  ],
  invalid: [{
    filename: 'test.vue',
    code: '<template><img role="img" src="foo.jpg" /></template>',
    errors: [{
      message: `The element img has an implicit role of img. Defining this explicitly is redundant and should be avoided.`
    }]
  },{
    filename: 'test.vue',
    code: '<template><a role="link" href="#" /></template>',
    errors: [{
      message: `The element a has an implicit role of link. Defining this explicitly is redundant and should be avoided.`
    }]
  }, {
    filename: 'test.vue',
    code: '<template><button role="button" /></template>',
    errors: [{
      message: `The element button has an implicit role of button. Defining this explicitly is redundant and should be avoided.`
    }]
  }],
});
