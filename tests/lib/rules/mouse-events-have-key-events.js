var rule = require('../../../lib/rules/mouse-events-have-key-events');
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

const mouseOverErrorMessage = 'mouseover or mouseenter or hover must be accompanied by focusin or focus for accessibility.';
const mouseOutErrorMessage = 'mouseout or mouseleave  must be accompanied by focusout or blur  for accessibility.';

tester.run('mouse-events-have-key-events', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '<template><a @hover="doSth" @focus="doSth"></a></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><a @mouseenter="doSth" @focusin="doSth"></a></template>',
    },
    {
      code: `
        export default {
          render (h) {
            return (
              <div onMouseover={ doSth } onFocus="doSth"></div>
            )
          },
        }
      `
    },
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><a @mouseenter="doSth" ></a></template>',
      errors: [{
        message: mouseOverErrorMessage
      }]
    },
    {
      filename: 'test.vue',
      code: '<template><a @mouseleave="doSth" ></a></template>',
      errors: [{
        message: mouseOutErrorMessage
      }]
    },
    {
      code: `
        export default {
          render (h) {
            return (
             <div onMouseover={ doSth }></div>
            )
          },
        }
      `,
      errors: [{
        message: 'onMouseOver must be accompanied by onFocus for accessibility.'
      }]
    },
    {
      code: `
        export default {
          render (h) {
            return (
              <div onMouseover={ doSth } onBlur="doSth"></div>
            )
          },
        }
      `,
      errors: [{
        message: 'onMouseOver must be accompanied by onFocus for accessibility.'
      }]
    },
  ]
})