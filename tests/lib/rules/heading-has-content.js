
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/heading-has-content');
var RuleTester = require('eslint').RuleTester;

const errorMessage =
  'Headings must have content and the content must be accessible by a screen reader.';

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

tester.run('heading-has-content', rule, {
  valid: [
    { 
      filename: 'test.vue',
      code: '<template><h1 v-text="msg"></h1></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><h1><span>test</span></h1></template>',
    },
  ],
  invalid: [{
    filename: 'test.vue',
    code: '<template><h1></h1></template>',
    errors: [{
      message: errorMessage
    }]
  },{
    code: `
        export default {
          render (h) {
            return (
             <h2></h2>
            )
          },
        }
      `,
    errors: [{
      message: errorMessage
    }]
  }],
});
