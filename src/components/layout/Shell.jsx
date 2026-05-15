import styles from './Shell.module.css';

export default function Shell({ sidebar, topbar, children }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.aside}>{sidebar}</aside>
      <div className={styles.main}>
        <div className={styles.topbar}>{topbar}</div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
