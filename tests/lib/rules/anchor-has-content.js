var rule = require('../../../lib/rules/anchor-has-content');
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

const error = 'Anchors must have content and the content must be accessible by a screen reader.';
tester.run('anchor-has-content', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '<template><a>Anchor Content!</a></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><a is="TextWrapper" /></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><a v-text="msg" /></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><a v-html="msg" /></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><Anchor  /></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><a></a></template>',
      errors: [{
        message: error
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><a><span aria-hidden="true"></span></a></template>',
      errors: [{
        message: error
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><a><input type="hidden" /></a></template>',
      errors: [{
        message: error
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><Anchor  /></template>',
      options: [
        {
          "components": [ "Anchor" ]
        }
      ],
      errors: [{
        message: error
      }]
    }
  ]
})