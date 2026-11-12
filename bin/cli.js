#!/usr/bin/env node

/**
 * OpsTrellis Cold Email Spam Checker CLI
 * Copyright (c) 2026 OpsTrellis (https://opstrellis.com)
 */

import * as fs from 'node:fs';
import { analyzeEmailCopy } from '../src/index.js';

const targetArg = process.argv[2];

if (!targetArg || targetArg === '--help' || targetArg === '-h') {
  console.log(`
OpsTrellis Cold Email Spam Checker
Analyze your cold outreach email copy for spam triggers and deliverability risks.

USAGE:
  node bin/cli.js <path-to-email.txt>
  node bin/cli.js "Your email text content here"

WEB ANALYZER:
  Interactive web checker: https://opstrellis.com/tools/spam-checker/
`);
  process.exit(targetArg ? 0 : 1);
}

let contentToAnalyze = targetArg;
if (fs.existsSync(targetArg)) {
  contentToAnalyze = fs.readFileSync(targetArg, 'utf-8');
}

const result = analyzeEmailCopy(contentToAnalyze);

console.log(`\n=====================================================`);
console.log(`  OpsTrellis Cold Email Spam Auditor (v1.0.0)`);
console.log(`=====================================================\n`);

console.log(`Spam Score: ${result.score} / 100 [${result.status}]`);
console.log(`Word Count: ${result.totalWords} words | Uppercase Ratio: ${result.capsRatio}% | Links: ${result.linksDetected}`);

if (result.foundTriggers.length > 0) {
  console.log(`\nFlagged Spam Triggers (${result.foundTriggers.length}):`);
  result.foundTriggers.forEach(t => {
    console.log(`  ✖ "${t.phrase}" (${t.category}, ${t.count}x)`);
  });
} else {
  console.log(`\n✔ No common spam trigger words detected.`);
}

console.log(`\nActionable Recommendations:`);
result.recommendations.forEach(r => console.log(`  - ${r}`));

console.log(`\n-----------------------------------------------------`);
console.log(`Check domain SPF/DKIM/DMARC health: https://opstrellis.com/tools/domain-health/\n`);
