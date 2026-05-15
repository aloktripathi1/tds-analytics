import styles from './ObsBox.module.css';

export default function ObsBox({ tag, children }) {
  return (
    <div className={styles.box}>
      {tag && <div className={styles.tag}>{tag}</div>}
      <p className={styles.text}>{children}</p>
    </div>
  );
}
