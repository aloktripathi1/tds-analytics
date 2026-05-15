// ─── Pure transform functions ────────────────────────────────

/**
 * Determine assignment health status
 */
export function getAssignmentStatus(normalizedMean, driftFlag, cvFlag) {
  if (normalizedMean < 0.35 || (driftFlag && normalizedMean < 0.45)) return 'REDESIGN';
  if (normalizedMean < 0.45) return 'ACTION NEEDED';
  if (normalizedMean < 0.60 || cvFlag === 'UNSTABLE') return 'WATCH';
  return 'HEALTHY';
}

/**
 * Determine difficulty trend from chronological [term, value] pairs
 */
export function getTrend(byTermValues) {
  const valid = byTermValues.filter(([, v]) => v != null);
  if (valid.length < 2) return 'stable';
  const first = valid[0][1];
  const last  = valid[valid.length - 1][1];
  if (last > first + 0.05) return 'improving';
  if (last < first - 0.05) return 'declining';
  return 'stable';
}

/**
 * Classify a question by its score distribution stats
 */
export function classifyQuestion(zeroRate, fullRate, partialRate, discriminativeProxy) {
  if (zeroRate > 0.70) return 'BROKEN';
  if (zeroRate > 0.50 && partialRate < 0.15) return 'BINARY';
  if (fullRate > 0.80) return 'EASY';
  if (discriminativeProxy != null && discriminativeProxy >= 0.50) return 'DISCRIMINATIVE';
  return 'CALIBRATED';
}

/**
 * Get CSS color variable for a completion rate
 */
export function getCompletionColor(rate) {
  if (rate < 0.40) return 'var(--color-danger)';
  if (rate < 0.70) return 'var(--color-warn)';
  return 'var(--color-ok)';
}

/**
 * Fill missing terms in a byTerm object with null for line charts
 */
export function normalizeByTerm(byTermObj, terms) {
  return terms.reduce((acc, t) => {
    acc[t] = byTermObj?.[t] ?? null;
    return acc;
  }, {});
}

/**
 * Build health table row for an assignment
 */
export function buildHealthRow(assignment, type, difficultyEntry, latestNormalizedMean) {
  const cv        = difficultyEntry?.cv ?? 0;
  const driftFlag = difficultyEntry?.driftFlag ?? false;
  const cvFlag    = difficultyEntry?.stabilityFlag ?? 'STABLE';

  const nm     = latestNormalizedMean ?? 0;
  const status = getAssignmentStatus(nm, driftFlag, cvFlag);

  // Chronological byTerm pairs
  const byTermValues = Object.entries(difficultyEntry?.byTerm ?? {});
  const trend = getTrend(byTermValues);

  // Biggest problem string
  let biggestProblem = 'None identified';
  if (status === 'REDESIGN')       biggestProblem = 'Extremely low completion — needs full redesign';
  else if (status === 'ACTION NEEDED') biggestProblem = 'Below acceptable threshold';
  else if (cvFlag === 'UNSTABLE')  biggestProblem = `High difficulty variance (CV=${cv.toFixed(2)})`;
  else if (driftFlag)              biggestProblem = 'Significant drift across terms';

  return { assignment, type, normalizedMean: nm, trend, status, biggestProblem };
}

/**
 * Format a number as percentage string
 */
export function pct(val, decimals = 1) {
  if (val == null) return '—';
  return `${(val * 100).toFixed(decimals)}%`;
}

/**
 * Round to N decimal places
 */
export function round(val, n = 2) {
  if (val == null) return null;
  return Math.round(val * Math.pow(10, n)) / Math.pow(10, n);
}

/**
 * Get trend arrow character
 */
export function trendArrow(trend) {
  if (trend === 'improving') return '↑';
  if (trend === 'declining') return '↓';
  if (trend === 'stable')    return '→';
  return '—';
}

/**
 * Get color for trend
 */
export function trendColor(trend) {
  if (trend === 'improving') return 'var(--color-ok)';
  if (trend === 'declining') return 'var(--color-danger)';
  return 'var(--color-text-muted)';
}

/**
 * Get bar color for normalized score
 */
export function difficultyBarColor(normalizedMean) {
  if (normalizedMean < 0.45) return 'var(--color-danger)';
  if (normalizedMean < 0.65) return 'var(--color-warn)';
  return 'var(--color-ok)';
}

export function classifyDistributionShape(mean, median, stdDev, buckets) {
  const skewness = stdDev > 0 ? (mean - median) / stdDev : 0;
  const total = Object.values(buckets).reduce((s, v) => s + v, 0);
  const bottomPct = total > 0 ? (buckets['0_20'] ?? buckets['0_20pct'] ?? 0) / total * 100 : 0;
  const topPct = total > 0 ? (buckets['80_100'] ?? buckets['80_100pct'] ?? 0) / total * 100 : 0;
  let shape;
  if (skewness > 0.2) shape = 'right-skewed';
  else if (skewness < -0.2) shape = 'left-skewed';
  else shape = 'roughly symmetric';
  const vals = Object.values(buckets);
  const bimodal = vals.length >= 4 && (() => {
    const mid = vals.slice(1, -1);
    const midMin = Math.min(...mid);
    const edgeMax = Math.max(vals[0], vals[vals.length - 1]);
    return midMin < edgeMax * 0.4;
  })();
  return { skewness, shape, bottomPct, topPct, bimodal };
}

export function computeSurpriseScores(questions) {
  if (!questions.length) return [];
  const byMarks = [...questions].sort((a, b) => (b.maxPossible ?? 0) - (a.maxPossible ?? 0));
  const byCompletion = [...questions].sort((a, b) => a.completionRate - b.completionRate);
  return questions.map(q => {
    const expectedRank = byMarks.findIndex(x => x.id === q.id);
    const actualRank = byCompletion.findIndex(x => x.id === q.id);
    const surpriseScore = Math.abs(expectedRank - actualRank);
    return { ...q, surpriseScore, surpriseFlag: surpriseScore > 3 };
  });
}

export function computePartialCreditDepth(questions) {
  return questions.map(q => ({
    ...q,
    fullScorerPct: Math.round((q.full_rate ?? 0) * 100),
    partialScorerPct: Math.round((q.partial_rate ?? 0) * 100),
    zeroScorerPct: Math.round((q.zero_rate ?? 0) * 100),
  }));
}

export function computeMarkUtilization(questions, uniqueStudents) {
  if (!questions.length || !uniqueStudents) return { overall: 0, byQuestion: {} };
  let totalEarned = 0, totalPossible = 0;
  const byQuestion = {};
  for (const q of questions) {
    const maxP = q.maxPossible ?? 0;
    const earned = (q.meanScore ?? 0) * uniqueStudents;
    const possible = maxP * uniqueStudents;
    totalEarned += earned;
    totalPossible += possible;
    byQuestion[q.id] = possible > 0 ? earned / possible : 0;
  }
  return { overall: totalPossible > 0 ? totalEarned / totalPossible : 0, byQuestion };
}

export function computeCrossTermDrift(questionId, allTermsData) {
  const byTerm = {};
  for (const { term, questions } of allTermsData) {
    const q = questions.find(x => x.id === questionId);
    if (q) byTerm[term] = q.completionRate ?? 0;
  }
  const terms = Object.keys(byTerm).sort();
  if (terms.length < 2) return { questionId, drift: 0, classification: 'stable', byTerm };
  const drift = byTerm[terms[terms.length - 1]] - byTerm[terms[0]];
  return { questionId, drift, classification: drift > 10 ? 'improving' : drift < -10 ? 'declining' : 'stable', byTerm };
}

export function computeAllCrossTermDrifts(allTermsData) {
  const allIds = new Set();
  for (const { questions } of allTermsData) {
    for (const q of questions) allIds.add(q.id);
  }
  return [...allIds]
    .map(id => computeCrossTermDrift(id, allTermsData))
    .filter(d => Object.keys(d.byTerm).length > 1);
}

export function computeSubmissionConcentration(timingData) {
  if (!timingData || timingData.skipped) {
    return { buckets: Array(12).fill(0), peakBucket: 0, deadlineConcentration: 0, total: 0 };
  }
  const early = timingData?.earlyGt6h?.count ?? 0;
  const mid = timingData?.mid1To6h?.count ?? 0;
  const late = timingData?.lastLt1h?.count ?? 0;
  const total = early + mid + late;
  const buckets = Array(12).fill(0);
  if (total > 0) {
    for (let i = 0; i < 4; i++) buckets[i] = early / 4;
    for (let i = 4; i < 10; i++) buckets[i] = mid / 6;
    for (let i = 10; i < 12; i++) buckets[i] = late / 2;
  }
  const peakBucket = buckets.indexOf(Math.max(...buckets));
  const deadlineConcentration = total > 0 ? ((buckets[10] + buckets[11]) / total) * 100 : 0;
  return { buckets, peakBucket, deadlineConcentration, total };
}

export function computeSkillTaxonomy(q) {
  const crFrac = (q.completionRate ?? 0) / 100;
  const fullRate = q.full_rate ?? 0;
  const partialRate = q.partial_rate ?? 0;
  const zeroRate = q.zero_rate ?? 0;
  const maxPossible = q.maxPossible ?? 0;
  if (crFrac >= 0.20 && crFrac <= 0.50 && zeroRate > 0.40 && partialRate < 0.10 && maxPossible >= 5)
    return 'collaboration-type';
  if (crFrac > 0.50 && fullRate > 0.40 && partialRate < 0.20)
    return 'tool-execution';
  if (partialRate > 0.25 && fullRate < 0.40)
    return 'iterative-effort';
  if (crFrac < 0.15 && zeroRate > 0.85)
    return 'high-barrier';
  return 'standard';
}
