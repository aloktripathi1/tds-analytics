/**
 * Observation string generators — neutral language only.
 * No "should", "must", "needs to", "recommend", "fix", "broken".
 */

export function timingObs(timing, maxPossible) {
  const diff = (timing.earlyGt6h.avgScore - timing.lastLt1h.avgScore).toFixed(1)
  return (
    `Students who submitted more than 6 hours before the deadline ` +
    `scored an average of ${timing.earlyGt6h.avgScore.toFixed(1)}/${maxPossible}, ` +
    `compared to ${timing.lastLt1h.avgScore.toFixed(1)}/${maxPossible} for ` +
    `students who submitted in the final hour — a difference of ${diff} points.`
  )
}

export function completionObs(questions) {
  const sorted = [...questions].sort((a, b) => a.completionRate - b.completionRate)
  const hardest = sorted.slice(0, 3).map(q => q.label).join(', ')
  const low = sorted[0].completionRate.toFixed(1)
  const high = sorted[sorted.length - 1].completionRate.toFixed(1)
  return (
    `Completion rates across questions ranged from ${low}% to ${high}%. ` +
    `The lowest-completion questions were: ${hardest}.`
  )
}

export function spreadObs(dist) {
  const range = dist.max - dist.min
  return (
    `Score distribution shows a mean of ${dist.mean.toFixed(1)} ` +
    `(median ${dist.median.toFixed(1)}) with a standard deviation of ${dist.stdDev.toFixed(1)}. ` +
    `Scores span a range of ${range} points (${dist.min}–${dist.max}).`
  )
}

export function roeCorrelationObs(r, top, mid, bottom) {
  return (
    `The correlation between GA scores and ROE performance was ${r.toFixed(2)}. ` +
    `Students in the top GA quartile averaged ${top}% on the ROE, ` +
    `mid-tier students averaged ${mid}%, ` +
    `and the bottom quartile averaged ${bottom}%.`
  )
}
