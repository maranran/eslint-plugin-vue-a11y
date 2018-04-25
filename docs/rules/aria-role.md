# aria-role

Elements with ARIA roles must use a valid, non-abstract ARIA role. A reference to role defintions can be found at [WAI-ARIA](https://www.w3.org/TR/wai-aria/#role_definitions) site.

### References

 [AX_ARIA_01](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_01)
 [DPUB-ARIA roles](https://www.w3.org/TR/dpub-aria-1.0/)

## Rule details

This rule takes one optional object argument of type object:

```
{
    "rules": {
        "jsx-a11y/aria-role": [ 2, {
            "ignoreNonDOM": true
        }],
    }
}

### Succeed
```template
<div role="button"></div>     <!-- Good: "button" is a valid ARIA role -->
<div :role="role"></div>       <!-- Good: role is a variable & cannot be determined until runtime. -->
<div></div>                   <!-- Good: No ARIA role -->
<Foo role={role}></Foo>       <!-- Good: ignoreNonDOM is set to true -->
```

### Fail
```template
<div role="datepicker"></div> <!-- Bad: "datepicker" is not an ARIA role -->
<div role="range"></div>      <!-- Bad: "range" is an _abstract_ ARIA role -->
```
