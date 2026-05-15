import { heatColor } from '../../utils/heat-color.js';
import styles from './QuestionHeatmap.module.css';

const LEGEND_COLORS = ['#E24B4A', '#F0997B', '#EF9F27', '#97C459', '#1D9E75'];

function roundPct(value) {
  if (value == null || Number.isNaN(value)) return '-';
  return Math.round(value);
}

function roundAvg(value) {
  if (value == null || Number.isNaN(value)) return '-';
  return Number(value.toFixed(2));
}

export default function QuestionHeatmap({ questions = [], columns = 4, mode = 'completion' }) {
  const sorted = [...questions].sort((a, b) => {
    if (mode === 'anomaly') return (b.anomalyPct ?? 0) - (a.anomalyPct ?? 0);
    return a.completionRate - b.completionRate;
  });

  return (
    <div className={styles.wrap}>
      <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {sorted.map((q) => {
          const rawPct = mode === 'anomaly' ? q.anomalyPct : q.completionRate;
          const colors = mode === 'anomaly' ? heatColor(100 - rawPct) : heatColor(rawPct);
          const pct = roundPct(rawPct);
          const mean = roundAvg(q.meanScore);
          const max = roundAvg(q.maxPossible);
          const tooltip = mode === 'anomaly'
            ? `${q.id} - ${pct}% hack rate - ${q.flaggedCount ?? 0} students`
            : `${q.id} - ${pct}% students scored - avg ${mean} / ${max}`;

          return (
            <div
              key={q.id}
              className={styles.cell}
              title={tooltip}
              style={{ background: colors.bg, '--cell-border': colors.border }}
            >
              <div className={styles.label} style={{ color: colors.text }}>{q.label}</div>
              <div className={styles.pct} style={{ color: colors.text }}>{pct}%</div>
              <div className={styles.avg} style={{ color: colors.text }}>
                {mode === 'anomaly' ? `${q.flaggedCount ?? 0} students` : `avg ${mean}/${max}`}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.legend}>
        <span className={styles.legendLabel}>{mode === 'anomaly' ? 'lower hack %' : 'lower scores'}</span>
        {LEGEND_COLORS.map((c) => (
          <span key={c} className={styles.swatch} style={{ background: c }} />
        ))}
        <span className={styles.legendLabel}>{mode === 'anomaly' ? 'higher hack %' : 'higher scores'}</span>
      </div>
    </div>
  );
}
