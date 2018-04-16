# click-events-have-key-events

Enforce `onClick` is accompanied by at least one of the following: `onKeyUp`, `onKeyDown`, `onKeyPress`. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.

## Rule details

This rule takes no arguments.

### Succeed
```template
<div @click="doSth" @keydown="doSth" />
<div @click="doSth" @keyup="doSth" />
<div @click="doSth" @keypress="doSth" />
```

### Fail
```template
<div @click="doSth"  />
```
