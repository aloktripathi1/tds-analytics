import styles from './BarRow.module.css';

const COLOR_MAP = {
  green: 'var(--green)',
  amber: 'var(--amber)',
  red:   'var(--red)',
  blue:  'var(--blue)',
};

export default function BarRow({ label, value, color = 'green', displayValue }) {
  const barColor = COLOR_MAP[color] ?? color;
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <div className={styles.track}>
        <div className={styles.bar} style={{ width: `${Math.min(value, 100)}%`, background: barColor }} />
      </div>
      {displayValue !== undefined && (
        <span className={styles.display}>{displayValue}</span>
      )}
    </div>
  );
}
