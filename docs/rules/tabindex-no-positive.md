# tabindex-no-positive

Avoid positive tabIndex property values to synchronize the flow of the page with keyboard tab order.

#### References
1. [AX_FOCUS_03](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_focus_03)

## Rule details

This rule takes no arguments.

### Succeed
```template
<span tabindex="0">foo</span>
<span tabindex="-1">bar</span>
```
```jsx
<span tabIndex="0">foo</span>
<span tabIndex="-1">bar</span>
<span tabIndex={0}>baz</span>
```
### Fail
```template
<span tabindex="2">foo</span>
```
```jsx
<span tabIndex="5">foo</span>
<span tabIndex="3">bar</span>
<span tabIndex="1">baz</span>
<span tabIndex="2">never really sure what goes after baz</span>
```
