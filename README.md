# Cold Email Spam Checker & Deliverability Analyzer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![Deliverability](https://img.shields.io/badge/Deliverability-Cold%20Email%20Safety-orange.svg)](https://opstrellis.com)

A fast, zero-dependency Node.js CLI & JavaScript library to score cold outreach email copy against **150+ spam trigger words**, aggressive capitalization, excessive punctuation, and link stuffing before you hit send.

Maintained with ❤️ by [OpsTrellis](https://opstrellis.com) — Cold Outbound Deliverability & Automation.

---

## 🚀 Quick Start

Run instantly from your terminal:

```bash
# Analyze a text file
node bin/cli.js examples/sample-email.txt

# Or pass text directly
node bin/cli.js "Hey! ACT NOW for a 100% FREE miracle deal!!!"
```

---

## 📋 What It Detects

- **Spam Trigger Words**: Scans for high-risk words across Urgency (`act now`, `urgent`, `last chance`), Financial (`100% free`, `make money`, `cash bonus`), Hype (`guaranteed`, `risk free`), and Shady categories.
- **Capitalization Ratio**: Flags emails with >25% uppercase characters that trigger automated Google/Microsoft bulk filters.
- **Exclamation & Punctuation Traps**: Flags aggressive punctuation (`!!!`, `???`).
- **Link Density**: Warns when cold outreach contains multiple links (cold emails with >1 link have a 45% higher spam classification rate).
- **Deliverability Recommendations**: Returns actionable suggestions to improve primary inbox placement.

---

## 💻 Sample Output

```text
=====================================================
  OpsTrellis Cold Email Spam Auditor (v1.0.0)
=====================================================

Spam Score: 98 / 100 [EXCELLENT]
Word Count: 48 words | Uppercase Ratio: 4% | Links: 1

✔ No common spam trigger words detected.

Actionable Recommendations:
  - Great job! Copy is clean, conversational, and spam-trigger free.

-----------------------------------------------------
Check domain SPF/DKIM/DMARC health: https://opstrellis.com/tools/domain-health/
```

---

## 🛠️ Programmatic Usage

```javascript
import { analyzeEmailCopy } from '@opstrellis/cold-email-spam-checker';

const result = analyzeEmailCopy("Hi Alex, loved your recent article on API integrations...");

console.log(result.score); // 95
console.log(result.status); // 'EXCELLENT'
console.log(result.foundTriggers); // []
console.log(result.recommendations);
```

---

## 🌐 Online Audit Suite & Free Tools

- [OpsTrellis Interactive Spam Checker](https://opstrellis.com/tools/spam-checker/)
- [OpsTrellis Domain Health & SPF/DKIM/DMARC Auditor](https://opstrellis.com/tools/domain-health/)
- [OpsTrellis Blacklist Lookup](https://opstrellis.com/tools/blacklist/)

---

## 📄 License

MIT License. Copyright (c) 2026 OpsTrellis.

