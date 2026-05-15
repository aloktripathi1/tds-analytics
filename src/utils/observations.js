/**
 * Observation generators — neutral language only.
 * Rules: no should/must/needs/broken/easy/hard/bad
 * Use: observed, shows, ranged, averaged, suggests
 * Every sentence must contain at least one number.
 * Max 2 sentences per function.
 */

export function timingObs(timing, maxPossible) {
  const diff = (timing.earlyGt6h.avgScore - timing.lastLt1h.avgScore).toFixed(1);
  return (
    `Students who submitted more than 6 hours before the deadline averaged ` +
    `${timing.earlyGt6h.avgScore.toFixed(1)}/${maxPossible}, compared to ` +
    `${timing.lastLt1h.avgScore.toFixed(1)}/${maxPossible} for last-minute submitters ` +
    `— a difference of ${diff} points.`
  );
}

export function completionObs(questions) {
  if (!questions?.length) return 'No per-question completion data is available for this assignment.';
  const sorted = [...questions].sort((a, b) => a.completionRate - b.completionRate);
  const hardest = sorted.slice(0, 3).map(q => q.label).join(', ');
  const low = sorted[0].completionRate.toFixed(1);
  const high = sorted[sorted.length - 1].completionRate.toFixed(1);
  return (
    `Completion rates ranged from ${low}% to ${high}% across ${questions.length} questions. ` +
    `The 3 lowest-completion questions were: ${hardest}.`
  );
}

export function spreadObs(dist) {
  const range = (dist.max - dist.min).toFixed(1);
  return (
    `Score distribution shows a mean of ${dist.mean.toFixed(1)} ` +
    `(median ${dist.median.toFixed(1)}) with a standard deviation of ${dist.stdDev.toFixed(1)}. ` +
    `Scores ranged across ${range} points (${dist.min}–${dist.max}).`
  );
}

export function roeCorrelationObs(r, top, mid, bottom) {
  return (
    `The correlation between GA scores and ROE performance observed a Pearson r of ${r.toFixed(2)}. ` +
    `Students in the top GA quartile averaged ${top}% on the ROE, ` +
    `mid-tier students averaged ${mid}%, and the bottom quartile averaged ${bottom}%.`
  );
}

export function distributionShapeObs(shape, bottomPct, topPct, assignmentName) {
  return (
    `Score distribution for ${assignmentName} is ${shape}. ` +
    `${bottomPct.toFixed(0)}% of students scored in the bottom 20% of the score range, ` +
    `and ${topPct.toFixed(0)}% scored in the top 20%.`
  );
}

export function surpriseObs(questions) {
  const surprising = questions.filter(q => q.surpriseFlag);
  if (!surprising.length) return null;
  const q = surprising[0];
  const cr = (q.completionRate ?? 0).toFixed(0);
  const marks = (q.maxPossible ?? 0).toFixed(1);
  return (
    `${surprising.length} question(s) showed unexpected completion rates given their marks weight. ` +
    `${q.label} (worth ${marks} marks) observed a ${cr}% completion rate.`
  );
}

export function partialCreditObs(questions) {
  const withPartial = questions.filter(q => (q.partialScorerPct ?? 0) > 20);
  if (!withPartial.length) return null;
  const q = withPartial[0];
  return (
    `${withPartial.length} question(s) showed meaningful partial credit distribution. ` +
    `${q.label} observed ${q.fullScorerPct}% full scores and ${q.partialScorerPct}% partial scores.`
  );
}

export function markUtilizationObs(utilization) {
  const pct = (utilization * 100).toFixed(1);
  return `Cohort-wide marks utilization averaged ${pct}% of available marks earned across all questions.`;
}

export function crossTermDriftObs(drifts) {
  const notable = drifts.filter(d => Math.abs(d.drift) > 10);
  if (!notable.length) return null;
  const d = notable[0];
  const terms = Object.keys(d.byTerm).sort();
  const from = (d.byTerm[terms[0]] ?? 0).toFixed(0);
  const to = (d.byTerm[terms[terms.length - 1]] ?? 0).toFixed(0);
  return (
    `${notable.length} question(s) showed notable completion rate drift across terms. ` +
    `${d.questionId} moved from ${from}% (${terms[0]}) to ${to}% (${terms[terms.length - 1]}).`
  );
}

export function submissionConcentrationObs(concentration) {
  if (!concentration || concentration.deadlineConcentration <= 40) return null;
  return (
    `${concentration.deadlineConcentration.toFixed(0)}% of submissions occurred in the final sixth of the submission window. ` +
    `${concentration.total} total submissions were observed across the exam window.`
  );
}

export function skillTaxonomyObs(questions) {
  const counts = {};
  for (const q of questions) {
    const t = q.skillTaxonomy ?? 'standard';
    counts[t] = (counts[t] ?? 0) + 1;
  }
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const top = entries.slice(0, 3).map(([t, n]) => `${n} ${t}`).join(', ');
  return `Across ${questions.length} ROE questions, skill taxonomy classification observed: ${top}.`;
}

export function gaPredictiveObs(predictiveCount, notPredictiveCount) {
  const total = predictiveCount + notPredictiveCount;
  if (total === 0) return null;
  return (
    `${predictiveCount} of ${total} questions showed a completion rate difference greater than 20 points ` +
    `between high-GA and low-GA students. ` +
    `${notPredictiveCount} questions observed similar rates across GA performance groups.`
  );
}
