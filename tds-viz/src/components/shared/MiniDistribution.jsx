import styles from './MiniDistribution.module.css';

const BUCKET_COLORS = ['var(--red)', 'var(--amber)', 'var(--gray-mid)', 'var(--green-light)', 'var(--green)'];
const BUCKET_LABELS = ['0–20', '20–40', '40–60', '60–80', '80–100'];
const BUCKET_KEYS   = ['0_20', '20_40', '40_60', '60_80', '80_100'];

export default function MiniDistribution({ buckets }) {
  const values = BUCKET_KEYS.map(k => buckets?.[k] ?? 0);
  const max = Math.max(...values, 1);

  return (
    <div className={styles.wrap}>
      <div className={styles.bars}>
        {values.map((v, i) => (
          <div key={i} className={styles.col}>
            <div className={styles.barWrap}>
              <div
                className={styles.bar}
                style={{ height: `${(v / max) * 100}%`, background: BUCKET_COLORS[i] }}
              />
            </div>
            <span className={styles.count}>{v}</span>
            <span className={styles.label}>{BUCKET_LABELS[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
