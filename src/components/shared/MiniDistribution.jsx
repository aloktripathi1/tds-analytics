const DEFAULT_COLORS = ['#E24B4A', '#EF9F27', '#888780', '#97C459', '#1D9E75'];
const BUCKET_LABELS = ['0–20%', '20–40%', '40–60%', '60–80%', '80–100%'];
const BUCKET_KEYS = ['0_20pct', '20_40pct', '40_60pct', '60_80pct', '80_100pct'];

const CHART_H = 140;
const BAR_W_PCT = 0.6;

const SHAPE_PILL = {
  bimodal:             { label: 'bimodal',     bg: '#5B21B6', text: '#ede9fe' },
  'top-heavy':         { label: 'top-heavy',   bg: '#166534', text: '#bbf7d0' },
  'bottom-heavy':      { label: 'bottom-heavy',bg: '#7f1d1d', text: '#fecaca' },
  'right-skewed':      { label: 'right-skewed',bg: '#78350f', text: '#fde68a' },
  'left-skewed':       { label: 'left-skewed', bg: '#0c4a6e', text: '#bae6fd' },
  'roughly symmetric': { label: 'symmetric',   bg: 'var(--gray-bg)', text: 'var(--text-secondary)' },
};

function shapeKey(distShape) {
  if (!distShape) return null;
  if (distShape.bimodal) return 'bimodal';
  if (distShape.topPct > 40) return 'top-heavy';
  if (distShape.bottomPct > 40) return 'bottom-heavy';
  return distShape.shape ?? null;
}

// Cubic bezier through bar-top midpoints — all coords in viewBox units (0–1000 wide)
function buildCurvePath(points) {
  if (points.length < 2) return null;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpX = (prev.x + curr.x) / 2;
    d += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

// Fixed viewBox width so all coordinates are in the same space — no % stretching
const VB_W = 1000;

export default function MiniDistribution({ buckets, colors = DEFAULT_COLORS, distShape, medianPct }) {
  const values = BUCKET_KEYS.map((k) => {
    if (!buckets) return 0;
    if (buckets[k] != null) return buckets[k];
    return buckets[k.replace('pct', '')] ?? 0;
  });
  const total = values.reduce((sum, v) => sum + v, 0);
  if (total === 0) {
    return (
      <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', padding: '8px 0' }}>
        No score distribution data available.
      </div>
    );
  }

  const maxVal = Math.max(...values, 1);
  const segments = values.map((v, i) => ({
    value: v,
    share: (v / total) * 100,
    heightPct: (v / maxVal) * 100,
    label: BUCKET_LABELS[i],
    color: colors[i],
  }));

  // Bar slot center x in VB coords: slot i → center at (i * 200 + 100) out of 1000
  const barCenters = segments.map((_, i) => i * 200 + 100);

  // Curve points in VB coords
  const curvePoints = segments.map((s, i) => ({
    x: barCenters[i],
    y: CHART_H - (s.heightPct / 100) * CHART_H,
  }));

  const dominantIdx = segments.reduce((best, s, i) => s.value > segments[best].value ? i : best, 0);
  const curvePath = buildCurvePath(curvePoints);

  // Median line x in VB coords
  // medianPct = normalized median * 100 → maps directly to 0–100% of score range → 0–1000 VB
  const medianX = medianPct != null
    ? Math.min(980, Math.max(20, (medianPct / 100) * VB_W))
    : null;

  const pillKey = shapeKey(distShape);
  const pill = pillKey ? SHAPE_PILL[pillKey] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Median label — floats above chart, outside the chart area */}
      {medianX != null && (
        <div style={{ position: 'relative', height: 18 }}>
          <div style={{
            position: 'absolute',
            // offset slightly right if near left edge
            left: `calc(${(medianX / VB_W) * 100}% + ${medianX / VB_W < 0.15 ? 8 : 0}px)`,
            transform: 'translateX(-50%)',
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}>
            ↓ median
          </div>
        </div>
      )}

      {/* Chart area */}
      <div style={{ position: 'relative', width: '100%', height: CHART_H }}>
        {/* Median line — behind bars, z-index 0 */}
        {medianX != null && (
          <div style={{
            position: 'absolute',
            left: `${(medianX / VB_W) * 100}%`,
            top: 0,
            bottom: 0,
            width: 1,
            background: 'rgba(0,0,0,0.22)',
            zIndex: 0,
            pointerEvents: 'none',
          }} />
        )}

        {/* Bars — z-index 1, sit on top of the median line */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex',
          alignItems: 'flex-end',
          zIndex: 1,
        }}>
          {segments.map((s, i) => {
            const barH = (s.heightPct / 100) * CHART_H;
            const showInside = barH > 30;
            const showAbove = !showInside && s.value > 0;
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
                  position: 'relative',
                }}
                title={`${s.label}: ${s.value.toLocaleString()} students (${Math.round(s.share)}%)`}
              >
                {showAbove && (
                  <div style={{
                    position: 'absolute',
                    bottom: barH + 4,
                    fontSize: 10,
                    fontFamily: 'var(--font-mono)',
                    color: s.color,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}>
                    {Math.round(s.share)}%
                  </div>
                )}
                <div style={{
                  width: `${BAR_W_PCT * 100}%`,
                  height: barH,
                  background: s.color,
                  borderRadius: '4px 4px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  minHeight: s.value > 0 ? 2 : 0,
                  opacity: s.value === 0 ? 0 : 1,
                }}>
                  {showInside && (
                    <span style={{
                      color: '#fff',
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      textShadow: '0 1px 0 rgba(0,0,0,0.2)',
                    }}>
                      {Math.round(s.share)}%
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* SVG overlay — bezier curve only, z-index 2 */}
        <svg
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}
          width="100%"
          height={CHART_H}
          viewBox={`0 0 ${VB_W} ${CHART_H}`}
          preserveAspectRatio="none"
          overflow="visible"
        >
          {curvePath && (
            <path
              d={curvePath}
              fill="none"
              stroke={colors[dominantIdx]}
              strokeWidth="2"
              strokeOpacity="0.35"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>

        {/* Shape pill — overlaid top-left */}
        {pill && (
          <div style={{
            position: 'absolute',
            top: 6,
            left: 6,
            background: pill.bg,
            color: pill.text,
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: 20,
            letterSpacing: '0.03em',
            pointerEvents: 'none',
            zIndex: 3,
          }}>
            {pill.label}
          </div>
        )}
      </div>

      {/* X-axis labels */}
      <div style={{ display: 'flex' }}>
        {segments.map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}
