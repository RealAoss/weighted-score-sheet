#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { transform } from './transform.mjs';

const args = process.argv.slice(2);
if (args.length === 1 && args[0] === '--help') {
  console.log('Usage: node cli.mjs [input.txt|-]   (default: standard input)');
} else {
  try {
    if (args.length > 1) throw new Error('Expected a single input file or standard input.');
    const source = readFileSync(!args.length || args[0] === '-' ? 0 : args[0], 'utf8');
    console.log(transform(source.replace(/^\uFEFF/, '')));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
