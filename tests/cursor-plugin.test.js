#!/usr/bin/env node

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pkg = require('../package.json');
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, '.cursor-plugin', 'plugin.json'), 'utf8'),
);
const rule = fs.readFileSync(path.join(root, 'rules', 'ponytail.mdc'), 'utf8');

assert.equal(manifest.name, 'ponytail');
assert.equal(manifest.version, pkg.version, 'Cursor manifest version must match package.json');
assert.equal(manifest.license, 'MIT');
assert.ok(manifest.keywords.includes('cursor'));
assert.ok(fs.existsSync(path.join(root, manifest.logo)), 'Cursor plugin logo must exist');

// Cursor auto-discovers skills/ and rules/ when the manifest does not override
// their paths. Keep Ponytail's shared skills as the source of truth.
assert.ok(fs.existsSync(path.join(root, 'skills', 'ponytail', 'SKILL.md')));
assert.ok(fs.existsSync(path.join(root, 'rules', 'ponytail.mdc')));

assert.match(rule, /^---\n[\s\S]*alwaysApply: true[\s\S]*\n---\n/);
assert.match(rule, /Does this need to exist at all\?/);
assert.match(rule, /trust-boundary validation/);
assert.match(rule, /Default intensity is \*\*full\*\*/);

assert.ok(
  pkg.files.includes('.cursor-plugin/'),
  'npm package must include the Cursor plugin manifest',
);
assert.ok(pkg.files.includes('rules/'), 'npm package must include Cursor rules');
