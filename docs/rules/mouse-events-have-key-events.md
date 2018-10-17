# mouse-events-have-key-events

Enforce onmouseenter/onmouseover/onmouseout/onmouseleave/onhover are accompanied by onfocus/onblur. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.

## Rule details

This rule takes no arguments.

### Succeed
```
<div @mouseover="doSth" @focus="doSth"></div>
<div @mouseout="doSth" @blur="doSth"></div>
```

### Fail

```jsx
<div @mouseover="doSth"></div>
```