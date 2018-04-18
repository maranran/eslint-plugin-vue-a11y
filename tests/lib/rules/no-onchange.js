var rule = require('../../../lib/rules/no-onchange');
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

const errorMessage = 'onBlur must be used instead of onchange, ' +
  'unless absolutely necessary and it causes no negative consequences ' +
  'for keyboard only or screen reader users.';

tester.run('anchor-has-content', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
      <select>
        <option onBlur={handleOnBlur} onChange={handleOnChange} />
      </select>
      `
    },
    {
      code: `
        export default {
          render (h) {
            return (
             <select>
                <option />
            </select>
            )
          },
        };
      `
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template> <select @change="updateModel"><option /></select></template>',
      errors: [{
        message: errorMessage
      }]
    },
    {
      code: `
        export default {
          render (h) {
            return (
             <select onChange={updateModel}>
                <option />
            </select>
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