
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/interactive-supports-focus');
var RuleTester = require('eslint').RuleTester;

const errorMessage = '';
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

tester.run('interactive-supports-focus', rule, {
  valid: [
    { 
      filename: 'test.vue',
      code: '<template><div aria-hidden="true" @click="doSth" /></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><span @click="doSomething();" tabindex="0" role="button">Click me!</span></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><span @click="doSomething();" :tabindex="tabindex" role="button">Click me!</span></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><span @click="doSomething();" role="presentation">Click me!</span></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><a href="javascript:void(0);" @click="doSomething();">Click ALL the things!</a></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><button @click="doSomething();">Click the button</button></template>',
    },
  ],
  invalid: [{
    filename: 'test.vue',
    code: '<template><span @click="submitForm();" role="button">Submit</span></template>',
    errors: [{
      message: `Elements with the 'button' interactive role must be focusable.`
    }]
  },{
    filename: 'test.vue',
    code: '<template><a @click="submitForm();" role="button">Submit</a></template>',
    errors: [{
      message: `Elements with the 'button' interactive role must be focusable.`
    }]
  }],
});
