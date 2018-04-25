# aria-props

Elements cannot use an invalid ARIA attribute. This will fail if it finds an `aria-*` property that is not listed in [WAI-ARIA States and Properties spec](https://www.w3.org/TR/wai-aria/states_and_properties#state_prop_def).

## Rule details

This rule takes no arguments.

### Succeed
```template
<input aria-labelledby="address_label">
```

### Fail
```template
<input aria-labeledby="address_label"> <!-- Bad: Labeled using incorrectly spelled aria-labeledby -->
```
