# eslint-plugin-vue-a11y

Static AST checker for accessibility rules on elements in .vue. it supports <template></template> or JSX


## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-vue-a11y`:

```
$ npm install eslint-plugin-vue-a11y --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-vue-a11y` globally.

## Usage

Add `vue-a11y` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "vue-a11y"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "vue-a11y/rule-name": 2
    }
}
```

## base Supported Rules
- [alt-text](docs/rules/alt-text.md): Enforce all elements that require alternative text have meaningful information to relay back to end user.
- [anchor-has-content](docs/rules/anchor-has-content.md): Enforce all anchors to contain accessible content.
- [click-events-have-key-events](docs/rules/click-events-have-key-events.md): Enforce a clickable non-interactive element has at least one keyboard event listener.
- [label-has-for](docs/rules/label-has-for.md): Enforce that `<label>` elements have the `htmlFor` prop.
- [mouse-events-have-key-events](docs/rules/mouse-events-have-key-events.md): Enforce that `onMouseOver`/`onMouseOut` are accompanied by `onFocus`/`onBlur` for keyboard-only users.
- [no-autofocus](docs/rules/no-autofocus.md): Enforce autoFocus prop is not used.
- [no-onchange](docs/rules/no-onchange.md): Enforce usage of `onBlur` over `onChange` on select menus for accessibility.
- [tabindex-no-positive](docs/rules/tabindex-no-positive.md): Avoid positive tabIndex property values to synchronize the flow of the page with keyboard tab order.
- [no-distracting-elements](docs/rules/no-distracting-elements.md): Enforces that no distracting elements are used. Elements that can be visually distracting can cause accessibility issues with visually impaired users. Such elements are most likely deprecated, and should be avoided. By default, the following elements are visually distracting: `<marquee>` and `<blink>`.
- [heading-has-content](docs/rules/heading-has-content.md): Enforce that heading elements (`h1`, `h2`, etc.) have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the `aria-hidden` prop. Refer to the references to learn about why this is important.
- [media-has-caption](docs/rules/media-has-caption.md): Providing captions for media is essential for deaf users to follow along. Captions should be a transcription or translation of the dialogue, sound effects, relevant musical cues, and other relevant audio information.