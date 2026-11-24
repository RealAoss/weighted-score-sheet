import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { transform } from '../transform.mjs';

const sample = readFileSync(new URL('../example.txt', import.meta.url), 'utf8');
const cli = fileURLToPath(new URL('../cli.mjs', import.meta.url));
test('worked example and standard input', () => {
  const result = transform(sample);
  assert.ok(result.includes("3.333"), result);
  const run = spawnSync(process.execPath, [cli, '-'], { input: sample, encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
  assert.equal(run.stdout, result + '\n');
});
test('empty input is rejected', () => {
  assert.throws(() => transform('  '));
  assert.notEqual(spawnSync(process.execPath, [cli], {input: ''}).status, 0);
});
