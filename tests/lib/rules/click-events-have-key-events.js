var rule = require('../../../lib/rules/click-events-have-key-events');
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

const errorMessage = 'Visible, non-interactive elements with click handlers' +
  ' must have at least one keyboard listener.';

tester.run('click-events-have-key-events', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '<template><a @click="doSth" @keydown="doSth"></a></template>',
    },
    {
      code: `
        export default {
          render (h) {
            return (
              <div onClick={ doSth } onKeyup="doSth"></div>
            )
          },
        }
      `
    },
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><a @click="doSth"></a></template>',
      errors: [{
        message: errorMessage
      }]
    },
    {
      code: `
        export default {
          render (h) {
            return (
              <div onClick={ doSth }></div>
            )
          },
        }
      `,
      errors: [{
        message: errorMessage
      }]
    }
  ]
})