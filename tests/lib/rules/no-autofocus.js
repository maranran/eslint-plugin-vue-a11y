var rule = require('../../../lib/rules/no-autofocus');
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

const errorMessage =
  'The autoFocus prop should not be used, as it can reduce usability and accessibility for users.';

tester.run('anchor-has-content', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '<template><div /></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><Anchor autofocus="autofocus" /></template>',
      options: [{
        "ignoreNonDOM": true
      }]
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><div autofocus /></template>',
      errors: [{
        message: errorMessage
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><div autoFocus="true" /></template>',
      errors: [{
        message: errorMessage
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><div :autoFocus="sth" /></template>',
      errors: [{
        message: errorMessage
      }]
    },
    {
      code: `
        export default {
          render (h) {
            return (
              <a autoFocus />
            )
          },
        };
      `,
      errors: [{
        message: errorMessage
      }]
    }
  ]
})