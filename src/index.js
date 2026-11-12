import { spamCategories } from './dictionary/spamWords.js';

/**
 * Cold Email Spam & Deliverability Analyzer
 * Maintained by OpsTrellis (https://opstrellis.com)
 */

export function analyzeEmailCopy(text) {
  if (!text || typeof text !== 'string') {
    throw new Error('Input text must be a non-empty string.');
  }

  const cleanText = text.trim();
  const lowerText = cleanText.toLowerCase();
  const words = cleanText.split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  const foundTriggers = [];
  let penaltyPoints = 0;

  for (const [category, triggerList] of Object.entries(spamCategories)) {
    for (const phrase of triggerList) {
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {
        foundTriggers.push({ phrase, category, count: matches.length });
        penaltyPoints += matches.length * 6;
      }
    }
  }

  const upperChars = (cleanText.match(/[A-Z]/g) || []).length;
  const alphaChars = (cleanText.match(/[a-zA-Z]/g) || []).length;
  const capsRatio = alphaChars > 0 ? (upperChars / alphaChars) : 0;
  let capsWarning = false;

  if (capsRatio > 0.25 && totalWords > 10) {
    capsWarning = true;
    penaltyPoints += 15;
  }

  const exclamationCount = (cleanText.match(/!/g) || []).length;
  let exclamationWarning = false;
  if (exclamationCount > 2) {
    exclamationWarning = true;
    penaltyPoints += (exclamationCount - 2) * 4;
  }

  const links = cleanText.match(/https?:\/\/[^\s]+/gi) || [];
  let linkWarning = false;
  if (links.length > 2) {
    linkWarning = true;
    penaltyPoints += (links.length - 2) * 8;
  }

  const score = Math.max(0, Math.min(100, 100 - penaltyPoints));

  let status = 'EXCELLENT';
  if (score < 50) status = 'HIGH_RISK';
  else if (score < 75) status = 'MODERATE_RISK';
  else if (score < 90) status = 'GOOD';

  return {
    score,
    status,
    totalWords,
    capsRatio: Math.round(capsRatio * 100),
    capsWarning,
    exclamationCount,
    exclamationWarning,
    linksDetected: links.length,
    linkWarning,
    foundTriggers,
    recommendations: generateRecommendations({
      score,
      capsWarning,
      exclamationWarning,
      linkWarning,
      foundTriggers,
      totalWords
    })
  };
}

function generateRecommendations(data) {
  const recs = [];
  if (data.foundTriggers.length > 0) {
    recs.push(`Remove or rephrase flagged spam trigger words (${data.foundTriggers.slice(0, 3).map(t => `"${t.phrase}"`).join(', ')}).`);
  }
  if (data.capsWarning) {
    recs.push(`Reduce uppercase letters; excessive capitals trigger aggressive spam filters.`);
  }
  if (data.exclamationWarning) {
    recs.push('Remove multiple exclamation marks (!); maintain a professional, conversational tone.');
  }
  if (data.linkWarning) {
    recs.push('Limit email to 1 link (or zero links in initial outreach).');
  }
  if (data.totalWords > 250) {
    recs.push('Optimal B2B cold emails perform best between 50 and 125 words.');
  }
  if (recs.length === 0) {
    recs.push('Great job! Copy is clean, conversational, and deliverability-safe.');
  }
  return recs;
}
