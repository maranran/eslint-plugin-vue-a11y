# anchor-has-content

Enforce that anchors have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the `aria-hidden` prop. Refer to the references to learn about why this is important.

#### References
1. [Deque University](https://dequeuniversity.com/rules/axe/1.1/link-name)

## Rule details

This rule takes one optional object argument of type object:

```json
{
    "rules": {
        "jsx-a11y/anchor-has-content": [ 2, {
            "components": [ "Anchor" ],
          }],
    }
}
```

For the `components` option, these strings determine which JSX elements (**always including** `<a>`) should be checked for having content. This is a good use case when you have a wrapper component that simply renders an `a` element (like in React):

```js
render (h) {
  return <a>{ props.children }</a>
}
```


### Succeed
```jsx
<a>Anchor Content!</a>
<a><TextWrapper /></a>
<a is="TextWrapper" />
<a v-text="msg" />
<a v-html="msg" />
```

### Fail
```jsx
<a />
<a><TextWrapper aria-hidden /></a>
```
