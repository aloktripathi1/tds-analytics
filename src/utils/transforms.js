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
