import styles from './Badge.module.css';

export default function Badge({ text, variant = 'gray' }) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{text}</span>;
}
