/**
 * heatColor — maps a completion rate (0-100) to a color triple.
 * Used by QuestionHeatmap cells.
 *
 * Returns CSS variable references so the cells re-tint automatically when
 * the dark-theme overrides redefine those tokens in global.css.
 */
export function heatColor(completionRate) {
  if (completionRate >= 75) {
    return { bg: 'var(--green-bg)', text: 'var(--green-text)', border: 'var(--green-light)' };
  }
  if (completionRate >= 55) {
    // soft lime band — re-use the green family but slightly different
    return { bg: 'var(--green-bg)', text: 'var(--green-text)', border: '#97C459' };
  }
  if (completionRate >= 38) {
    return { bg: 'var(--amber-bg)', text: 'var(--amber-text)', border: 'var(--amber)' };
  }
  if (completionRate >= 22) {
    return { bg: 'var(--orange-bg)', text: 'var(--orange-text)', border: 'var(--orange)' };
  }
  return { bg: 'var(--red-bg)', text: 'var(--red-text)', border: 'var(--red)' };
}
