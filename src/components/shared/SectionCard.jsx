import styles from './SectionCard.module.css';

export default function SectionCard({ title, sub, children }) {
  return (
    <div className={styles.card}>
      {title && (
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          {sub && <div className={styles.sub}>{sub}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
