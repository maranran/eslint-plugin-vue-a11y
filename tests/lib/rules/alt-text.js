var rule = require('../../../lib/rules/alt-text');
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

tester.run('alt-text', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '<template><img src="foo" alt="Foo eating a sandwich." /></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><img src="foo" alt="" /></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><img src="foo" :alt="msg" /></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><object aria-label="foo" /></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><object :aria-label="foo" /></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><object aria-labelledby="id1" /></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><object title="foo" /></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><object>test</object></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><input :type="image" alt="This is descriptive!" /></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><input :type="true" /></template>'
    },
    {
      code: `
        export default {
          render (h) {
            return (
              <img alt="Hello world" />
            )
          },
        };
      `
    }
  ],
  invalid: [
      {
        filename: 'test.vue',
        code: '<template><img src="foo" /></template>',
        errors: [{
          message: 'img elements must have an alt prop, either with meaningful text, or an empty string for decorative images.'
        }]
      },
      {
        code: `
        export default {
          render (h) {
            return (
              <img  />
            )
          },
        };`,
        errors: [{
          message: 'img elements must have an alt prop, either with meaningful text, or an empty string for decorative images.'
        }]
      },
      {
        filename: 'test.vue',
        code: '<template><img src="foo" alt /></template>',
        errors: [{
          message: 'Invalid alt value for img. Use alt="" for presentational images.'
        }]
      },
      {
        filename: 'test.vue',
        code: '<template><img src="foo" role="presentation" /></template>',
        errors: [{
          message: 'Prefer alt="" over a presentational role. First rule of aria is to not use aria if it can be achieved via native HTML.'
        }]
      },
      {
        filename: 'test.vue',
        code: '<template><object {...props} /></template>',
        errors: [{
          message: 'Embedded <object> elements must have alternative text by providing inner text, aria-label or aria-labelledby props.'
        }]
      },
      {
        filename: 'test.vue',
        code: '<template><input type="image" /></template>',
        errors: [{
          message: '<input> elements with type="image" must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.'
        }]
      },
    {
      filename: 'test.vue',
      code: '<template><area /></template>',
      errors: [{
        message: 'Each area of an image map must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.'
      }]
    }
  ]
});
