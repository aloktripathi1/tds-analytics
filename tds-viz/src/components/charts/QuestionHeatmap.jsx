import { heatColor } from '../../utils/heatColor.js';
import styles from './QuestionHeatmap.module.css';

const LEGEND_COLORS = ['#E24B4A', '#F0997B', '#EF9F27', '#97C459', '#1D9E75'];

export default function QuestionHeatmap({ questions = [], columns = 4 }) {
  const sorted = [...questions].sort((a, b) => a.completionRate - b.completionRate);

  return (
    <div className={styles.wrap}>
      <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {sorted.map((q) => {
          const colors = heatColor(q.completionRate);
          const tooltip = `${q.id} · ${q.completionRate}% students scored · avg ${q.meanScore} / ${q.maxPossible}`;
          return (
            <div
              key={q.id}
              className={styles.cell}
              title={tooltip}
              style={{ background: colors.bg, '--cell-border': colors.border }}
            >
              <div className={styles.label} style={{ color: colors.text }}>{q.label}</div>
              <div className={styles.pct}   style={{ color: colors.text }}>{q.completionRate}%</div>
              <div className={styles.avg}   style={{ color: colors.text }}>
                avg {q.meanScore}/{q.maxPossible}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.legend}>
        <span className={styles.legendLabel}>lower scores</span>
        {LEGEND_COLORS.map((c) => (
          <span key={c} className={styles.swatch} style={{ background: c }} />
        ))}
        <span className={styles.legendLabel}>higher scores</span>
      </div>
    </div>
  );
}
