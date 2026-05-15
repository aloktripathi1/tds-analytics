const DEFAULT_COLORS = ['#E24B4A', '#EF9F27', '#888780', '#97C459', '#1D9E75'];
const BUCKET_LABELS = ['0–20', '20–40', '40–60', '60–80', '80–100'];
const BUCKET_KEYS = ['0_20pct', '20_40pct', '40_60pct', '60_80pct', '80_100pct'];

export default function MiniDistribution({ buckets, colors = DEFAULT_COLORS }) {
  const values = BUCKET_KEYS.map((k) => {
    if (!buckets) return 0;
    if (buckets[k] != null) return buckets[k];
    const fallbackKey = k.replace('pct', '');
    return buckets[fallbackKey] ?? 0;
  });
  const max = Math.max(...values);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 6,
          height: 100,
          width: '100%',
        }}
      >
        {values.map((v, i) => {
          const heightPct = max > 0 ? (v / max) * 100 : 0;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                height: '100%',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: `${Math.max(heightPct, 2)}%`,
                  background: colors[i],
                  borderRadius: '3px 3px 0 0',
                  transition: 'height 0.4s ease',
                }}
              />
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 6 }}>
        {values.map((v, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
            }}>
              {v.toLocaleString()}
            </div>
            <div style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              marginTop: 2,
            }}>
              {BUCKET_LABELS[i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
