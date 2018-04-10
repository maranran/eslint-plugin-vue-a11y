# eslint-plugin-18

a11y

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-18`:

```
$ npm install eslint-plugin-18 --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-18` globally.

## Usage

Add `18` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "18"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "18/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





