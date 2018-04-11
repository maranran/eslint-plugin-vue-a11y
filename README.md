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



