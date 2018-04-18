var rule = require('../../../lib/rules/label-has-for');
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
const errorMessage = 'Form label must have associated control';

tester.run('label-has-for', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '<template><label for="id"><input type="text" /></label></template>'
    },
    {
      code: `
        export default {
          render (h) {
            return (
             <label htmlFor="firstName">
                <input type="text" id="firstName" />First Name
             </label>
            )
          },
        }`
    },
    {
      filename: 'test.vue',
      code: '<template><label for="id"></label><input type="text" /></template>',
      options: [
        {
          "required": {
            "some": [ "nesting", "id" ]
          }
        }
      ]
    },
    {
      filename: 'test.vue',
      code: '<template><label>name</label></template>',
      options: [
        {
          "components": [],
          "required": {
            "some": [ "nesting", "id" ]
          },
          "allowChildren": true
        }
      ]
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><label for="id" /></template>',
      errors: [{
        message: errorMessage
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><label><input type="text" /></label></template>',
      errors: [{
        message: errorMessage
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><Label for="id" /></template>',
      options: [
        {
          "components": ['Label']
        }
      ],
      errors: [{
        message: errorMessage
      }]
    }
  ]
})