import s from './shared.module.css';

export function MetricCard({ label, value, sub, accentColor }) {
  return (
    <div className={s.metricCard}>
      <div className={s.metricLabel}>{label}</div>
      <div className={s.metricValue} style={accentColor ? { color: accentColor } : {}}>{value}</div>
      {sub && <div className={s.metricSub}>{sub}</div>}
    </div>
  );
}

export function Badge({ text, variant = 'gray' }) {
  return <span className={`${s.badge} ${s[`badge-${variant}`]}`}>{text}</span>;
}

export function SectionHeader({ label, title, sub }) {
  return (
    <div className={s.sectionHeader}>
      {label && <div className={s.sectionHeaderLabel}>{label}</div>}
      <div className={s.sectionHeaderTitle}>{title}</div>
      {sub && <div className={s.sectionHeaderSub}>{sub}</div>}
    </div>
  );
}

export function BarProgress({ value, colorVar, height = 6 }) {
  const bg = colorVar || 'var(--color-ok)';
  return (
    <div className={s.barProgressOuter} style={{ height }}>
      <div className={s.barProgressInner} style={{ width: `${Math.min(100, (value || 0) * 100)}%`, background: bg, height }} />
    </div>
  );
}

export function Recommendation({ rank, title, body, tag, variant = 'student' }) {
  return (
    <div className={`${s.recommendation} ${s[`recommendation-${variant}`]}`}>
      <span className={s.recRank}>#{rank}</span>
      <div className={s.recTitle}>{title}</div>
      <div className={s.recBody}>{body}</div>
      {tag && <div className={s.recFooter}>{tag}</div>}
    </div>
  );
}
