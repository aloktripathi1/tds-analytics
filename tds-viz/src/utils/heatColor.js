/**
 * heatColor — maps a completion rate (0-100) to a color triple.
 * Used by QuestionHeatmap cells.
 */
export function heatColor(completionRate) {
  if (completionRate >= 75) return { bg: '#E1F5EE', text: '#085041', border: '#5DCAA5' }
  if (completionRate >= 55) return { bg: '#EAF3DE', text: '#27500A', border: '#97C459' }
  if (completionRate >= 38) return { bg: '#FAEEDA', text: '#633806', border: '#EF9F27' }
  if (completionRate >= 22) return { bg: '#FAECE7', text: '#712B13', border: '#F0997B' }
  return { bg: '#FCEBEB', text: '#791F1F', border: '#E24B4A' }
}
