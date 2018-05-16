
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/aria-role');
var RuleTester = require('eslint').RuleTester;

const errorMessage = 'Elements with ARIA roles must use a valid, non-abstract ARIA role.';
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

tester.run('aria-role', rule, {
  valid: [
    { 
      filename: 'test.vue',
      code: '<template><div role="button"></div></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><div :role={role}></div></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><div></div></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><Foo role="maran"></Foo></template>',
      options: [{
        ignoreNonDOM: true
      }]
    },
    {
      code: `
        export default {
          render (h) {
            return (
            <Foo role={role}></Foo> 
            )
          },
        };`
    }
  ],
  invalid: [{
    filename: 'test.vue',
    code: '<template><div role="datepicker"></div></template>',
    errors: [{
      message: errorMessage
    }]
  },{
    filename: 'test.vue',
    code: '<template><div role=""></div></template>',
    errors: [{
      message: errorMessage
    }]
  }],
});
