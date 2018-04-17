# eslint-plugin-vue-a11y

eslint-plugin-vue-a11y will coming soon


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

