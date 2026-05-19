const DEFAULT_COLORS = ['#E24B4A', '#EF9F27', '#888780', '#97C459', '#1D9E75'];
const BUCKET_LABELS = ['0–20%', '20–40%', '40–60%', '60–80%', '80–100%'];
const BUCKET_KEYS = ['0_20pct', '20_40pct', '40_60pct', '60_80pct', '80_100pct'];

export default function MiniDistribution({ buckets, colors = DEFAULT_COLORS }) {
  const values = BUCKET_KEYS.map((k) => {
    if (!buckets) return 0;
    if (buckets[k] != null) return buckets[k];
    const fallbackKey = k.replace('pct', '');
    return buckets[fallbackKey] ?? 0;
  });
  const total = values.reduce((sum, v) => sum + v, 0);
  if (total === 0) {
    return (
      <div style={{
        fontSize: 12,
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-muted)',
        padding: '8px 0',
      }}>
        No score distribution data available.
      </div>
    );
  }

  const segments = values.map((v, i) => ({
    value: v,
    share: (v / total) * 100,
    label: BUCKET_LABELS[i],
    color: colors[i],
  }));

  // Heuristic for the at-a-glance verdict beside the bar
  const top = segments[4].share;
  const bottom = segments[0].share + segments[1].share;
  const middle = segments[2].share;
  let verdict;
  if (top >= 50) verdict = { text: 'ceiling-piled — most cleared this', color: 'var(--green-text)' };
  else if (bottom >= 50) verdict = { text: 'floor-piled — most struggled here', color: 'var(--red-text)' };
  else if (middle >= 35) verdict = { text: 'middle-heavy — mixed performance', color: 'var(--amber-text)' };
  else verdict = { text: 'bell-shaped — spread across range', color: 'var(--text-secondary)' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* The single stacked horizontal bar */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: 44,
          borderRadius: 6,
          overflow: 'hidden',
          boxShadow: '0 1px 0 rgba(0,0,0,0.06), inset 0 0 0 0.5px rgba(0,0,0,0.04)',
        }}
        role="img"
        aria-label={`Score distribution: ${segments.map(s => `${s.label} ${Math.round(s.share)}%`).join(', ')}`}
      >
        {segments.map((s, i) => {
          if (s.share === 0) return null;
          const showInline = s.share >= 10;
          return (
            <div
              key={i}
              style={{
                width: `${s.share}%`,
                background: s.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.02em',
                textShadow: '0 1px 0 rgba(0,0,0,0.18)',
                transition: 'width 0.35s ease',
                minWidth: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
              title={`${s.label}: ${s.value.toLocaleString()} students (${Math.round(s.share)}%)`}
            >
              {showInline ? `${Math.round(s.share)}%` : ''}
            </div>
          );
        })}
      </div>

      {/* Verdict line — single sentence summary of the shape */}
      <div
        style={{
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          color: verdict.color,
          fontWeight: 600,
          letterSpacing: '0.02em',
        }}
      >
        {verdict.text}
      </div>

      {/* Legend — colored swatches with bucket range and count */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 8,
          marginTop: 4,
        }}
      >
        {segments.map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              opacity: s.share === 0 ? 0.4 : 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: s.color,
                  flexShrink: 0,
                }}
              />
              <span style={{
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
              }}>
                {s.label}
              </span>
            </div>
            <div style={{
              fontSize: 13,
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}>
              {s.value.toLocaleString()}
              <span style={{
                fontSize: 11,
                fontWeight: 400,
                color: 'var(--text-muted)',
                marginLeft: 5,
              }}>
                {Math.round(s.share)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
