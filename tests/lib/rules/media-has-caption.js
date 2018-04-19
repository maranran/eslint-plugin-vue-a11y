
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/media-has-caption');
var RuleTester = require('eslint').RuleTester;

const errorMessage = 'Media elements such as <audio> and <video> must have a <track> for captions.';
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

tester.run('media-has-caption', rule, {
  valid: [
    { 
      filename: 'test.vue',
      code: '<template><audio><track kind="captions"  /></audio></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><audio muted="true"></audio></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><video><track kind="captions"  /></video></template>',
    },
  ],
  invalid: [{
    filename: 'test.vue',
    code: '<template><video><track  /></video></template>',
    errors: [{
      message: errorMessage
    }]
  },{
    filename: 'test.vue',
    code: '<template><video><track kind="test"  /></video></template>',
    errors: [{
      message: errorMessage
    }]
  },{
    filename: 'test.vue',
    code: '<template><video></video></template>',
    errors: [{
      message: errorMessage
    }]
  },{
    filename: 'test.vue',
    code: '<template><audio></audio></template>',
    errors: [{
      message: errorMessage
    }]
  }, {
      filename: 'test.vue',
      code: '<template><audio muted="false"></audio></template>',
      errors: [{
        message: errorMessage
      }]
  }]
});
