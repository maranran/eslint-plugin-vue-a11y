
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/accessible-emoji');
var RuleTester = require('eslint').RuleTester;

const errorMessage = 'Emojis should be wrapped in <span>, have role="img", and have an accessible description with aria-label or aria-labelledby.';
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

tester.run('accessible-emoji', rule, {
  valid: [
    { 
      filename: 'test.vue',
      code: '<template><div /></template>',
    },
    { filename: 'test.vue',
      code: '<template><span /></template>;'
    },
    { filename: 'test.vue',
      code: '<template><span role="img" aria-label="Panda face">😰</span></template>'
    },
    {
      code: '<template><span role="img" aria-label="Snowman">&#9731;</span></template>'
    },
    {
      code: `
        export default {
          render (h) {
            return (
              <span role="img" aria-label="Panda face">😰</span>
            )
          },
        };
      `
    }
  ],
  invalid: [{
    filename: 'test.vue',
    code: '<template><span>😰</span></template>',
    errors: [{
      message: errorMessage
    }]
  },{
    filename: 'test.vue',
    code: '<template><i role="img" aria-label="Panda face">😰</i></template>',
    errors: [{
      message: errorMessage
    }]
  },{
    filename: 'test.vue',
    code: '<template><Foo>😰</Foo></template>',
    errors: [{
      message: errorMessage
    }]
  },{
    filename: 'test.vue',
    code: '<template><span>foo 😰 bar</span></template>',
    errors: [{
      message: errorMessage
    }]
  },{
    code: `
        export default {
          render (h) {
            return (
              <span>😰</span>
            )
          },
        };
      `,
    errors: [{
      message: errorMessage
    }]
  }],
});
