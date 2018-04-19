
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/no-distracting-elements');
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

tester.run('no-distracting-elements', rule, {
  valid: [
    { 
      filename: 'test.vue',
      code: '<template><div></div></template>',
    },
  ],
  invalid: [{
    filename: 'test.vue',
    code: '<template><blink /></template>',
    errors: [{
      message: 'Do not use <blink> elements as they can create visual accessibility issues and are deprecated.'
    }]
  }, {
      filename: 'test.vue',
      code: '<template><marquee /></template>',
      errors: [{
        message: 'Do not use <marquee> elements as they can create visual accessibility issues and are deprecated.'
      }]
   }]
});
