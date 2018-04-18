#!/usr/bin/env node --harmony
const path = require('path');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2)); // eslint-disable-line import/no-extraneous-dependencies
const ruleTemplateGenerator = require('./template/rule');
const testTemplateGenerator = require('./template/test');
const docTemplateGenerator = require('./template/doc');

const ruleName = argv._[0];
const author = argv.author || '$AUTHOR';
const description = argv.description || '$DESCRIPTION';

const rulePath = path.resolve(`../lib/rules/${ruleName}.js`);
const testPath = path.resolve(`../tests/lib/rules/${ruleName}.js`);
const docsPath = path.resolve(`../docs/rules/${ruleName}.md`);
// Validate
if (!ruleName) {
  throw new Error('Rule name is required');
} else if (fs.existsSync(rulePath)) {
  throw new Error('Rule already exists!');
}

// Generate file template
const ruleTemplate = ruleTemplateGenerator(ruleName, author, description);
const testTemplate = testTemplateGenerator(ruleName, author, description);
const docTemplate = docTemplateGenerator(ruleName);

// Create new files
fs.writeFileSync(rulePath, ruleTemplate);
fs.writeFileSync(testPath, testTemplate);
fs.writeFileSync(docsPath, docTemplate);
