import styles from './BarRow.module.css';

const COLOR_MAP = {
  green: { solid: 'var(--green)', light: 'var(--green-bg)' },
  amber: { solid: 'var(--amber)', light: 'var(--amber-bg)' },
  red:   { solid: 'var(--red)',   light: 'var(--red-bg)'   },
  blue:  { solid: 'var(--blue)',  light: 'var(--blue-bg)'  },
};

export default function BarRow({
  label, value, color = 'green', displayValue,
  postTerm = false, isHardest = false, referenceAt,
  retentionRefAt,
}) {
  const c = COLOR_MAP[color] ?? COLOR_MAP.green;
  const barWidth = Math.min(value, 100);

  // Striped gradient for post-term bars
  const barStyle = postTerm
    ? {
        background: `repeating-linear-gradient(
          45deg,
          ${c.solid} 0px,
          ${c.solid} 6px,
          ${c.light} 6px,
          ${c.light} 12px
        )`,
      }
    : { background: c.solid };

  return (
    <div className={styles.row}>
      <span className={styles.label}>
        {isHardest && <span className={styles.flame}>⚑</span>}
        {label}
      </span>
      <div className={styles.trackWrap}>
        {/* Light full-width background track */}
        <div className={styles.trackBg} style={{ background: c.light }} />
        {/* Reference line at 50% (or custom) */}
        {referenceAt != null && (
          <div className={styles.refLine} style={{ left: `${referenceAt}%` }}>
            <span className={styles.refLabel}>{referenceAt}%</span>
          </div>
        )}
        {/* Retention reference band: 80-100% highlighted */}
        {retentionRefAt != null && (
          <div
            className={styles.retentionBand}
            style={{ left: `${retentionRefAt}%`, right: 0 }}
          />
        )}
        <div className={styles.track}>
          <div
            className={styles.bar}
            style={{ width: `${barWidth}%`, ...barStyle }}
          />
        </div>
      </div>
      {displayValue !== undefined && (
        <span className={styles.display}>{displayValue}</span>
      )}
    </div>
  );
}
