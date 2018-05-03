
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/form-has-label');
var RuleTester = require('eslint').RuleTester;

const errorMessage = 'Each form element must have a programmatically associated label element.';
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

tester.run('form-has-label', rule, {
  valid: [
    { 
      filename: 'test.vue',
      code: '<template><label for=""><input type="text"></label></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><input type="text" aria-label="test" /></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><label for="">text</label><input type="text"></template>',
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          render (h) {
            return (
                <label for="">text</label><input type="text">
            )
          },
        }; `,
    },
    {
      filename: 'test.vue',
      code: '<template><input type="button"></template>',
    },
    {
      code: `
        export default {
          render (h) {
            return (
             <label><input type="text" /></label>
            )
          },
        }; `
    },
    {
      code: `
        export default {
          render (h) {
            return (
            <input type="text" aria-label="test" />
            )
          },
        }; `
    }
  ],
  invalid: [{
    filename: 'test.vue',
    code: '<template><input type="text" /></template>',
    errors: [{
      message: errorMessage
    }]
  },{
    filename: 'test.vue',
    code: '<template><textarea type="text"></textarea></template>',
    errors: [{
      message: errorMessage
    }]
  },{
    code: `
        export default {
          render (h) {
            return (
              <input type="text" />  
            )
          },
        }; `,
    errors: [{
      message: errorMessage
    }]
  }],
});
