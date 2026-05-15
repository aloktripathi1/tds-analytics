import styles from './KpiCard.module.css';

export default function KpiCard({ label, value, sub, accentColor }) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value} style={accentColor ? { color: accentColor } : {}}>
        {value}
      </div>
      {sub && <div className={styles.sub}>{sub}</div>}
    </div>
  );
}
