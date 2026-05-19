/** Round to N decimal places */
export function round(n, decimals = 1) {
  return Math.round(n * 10 ** decimals) / 10 ** decimals
}

/** Remove floating-point display noise from score-like values */
export function clean(val) {
  const num = Number(val)
  if (!Number.isFinite(num)) return 0
  return Math.round(num * 100) / 100
}

/** Format as percentage string, e.g. "73.4%" */
export function toPercent(n, decimals = 1) {
  return `${clean(round(n, decimals))}%`
}

/** Format as fixed decimal string */
export function toFixed(n, decimals = 1) {
  return clean(n).toFixed(decimals)
}

/** Format a score without unnecessary trailing zeroes */
export function formatScore(n, decimals = 2) {
  return String(clean(round(n, decimals)))
}

/** Normalised mean → difficulty colour token name */
export function difficultyColor(normalizedMean) {
  if (normalizedMean < 0.45) return 'red'
  if (normalizedMean < 0.65) return 'amber'
  return 'green'
}

/** Retention colour token name */
export function retentionColor(pct) {
  if (pct >= 85) return 'green'
  if (pct >= 75) return 'amber'
  return 'red'
}
