
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/iframe-has-title');
var RuleTester = require('eslint').RuleTester;

const errorMessage = '<iframe> elements must have a unique title property.';
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

tester.run('iframe-has-title', rule, {
  valid: [
    { 
      filename: 'test.vue',
      code: '<template><iframe title="maran"></iframe></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><iframe :title="msg"></iframe></template>',
    }
  ],
  invalid: [{
    filename: 'test.vue',
    code: '<template><iframe :title="true"></iframe></template>',
    errors: [{
      message: errorMessage
    }]
  }, {
    filename: 'test.vue',
    code: '<template><iframe :title="2"></iframe></template>',
    errors: [{
      message: errorMessage
    }]
  }],
});
