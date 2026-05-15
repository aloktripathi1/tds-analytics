/** Round to N decimal places */
export function round(n, decimals = 1) {
  return Math.round(n * 10 ** decimals) / 10 ** decimals
}

/** Format as percentage string, e.g. "73.4%" */
export function toPercent(n, decimals = 1) {
  return `${round(n, decimals)}%`
}

/** Format as fixed decimal string */
export function toFixed(n, decimals = 1) {
  return Number(n).toFixed(decimals)
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
