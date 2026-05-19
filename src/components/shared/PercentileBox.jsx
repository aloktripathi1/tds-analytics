import { formatScore } from '../../utils/format-numbers.js';

// Fixed viewBox width — all x coords computed in these units, no % strings
const VB_W = 500;
const TRACK_H = 32;
const BOX_H = 20;
const BOX_Y = (TRACK_H - BOX_H) / 2;

// Amber for the IQR box regardless of assignment color — clearer at a glance
const IQR_FILL   = 'rgba(240,160,60,0.20)';
const IQR_STROKE = 'rgba(240,160,60,0.65)';
const MEDIAN_COLOR = 'rgba(240,160,60,0.90)';

export default function PercentileBox({ p10, p25, p50, p75, p90, maxScore }) {
  const norm = v => maxScore > 0 ? Math.min(VB_W, Math.max(0, (v / maxScore) * VB_W)) : 0;
  const x10 = norm(p10);
  const x25 = norm(p25);
  const x50 = norm(p50);
  const x75 = norm(p75);
  const x90 = norm(p90);

  const boxW = Math.max(x75 - x25, 2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
      {/* SVG track — fixed viewBox, no stretching of shapes */}
      <div style={{ position: 'relative', width: '100%', height: TRACK_H + 28 }}>
        <svg
          width="100%"
          height={TRACK_H}
          viewBox={`0 0 ${VB_W} ${TRACK_H}`}
          preserveAspectRatio="none"
          style={{ display: 'block', overflow: 'visible' }}
        >
          {/* Whisker: P10 → P90 */}
          <line
            x1={x10} y1={TRACK_H / 2}
            x2={x90} y2={TRACK_H / 2}
            stroke="var(--border-strong)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          {/* End caps at P10 and P90 */}
          {[x10, x90].map((x, i) => (
            <line
              key={i}
              x1={x} y1={BOX_Y + 4}
              x2={x} y2={BOX_Y + BOX_H - 4}
              stroke="var(--border-strong)"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* IQR box: P25 → P75 — amber fill, amber border */}
          <rect
            x={x25}
            y={BOX_Y}
            width={boxW}
            height={BOX_H}
            fill={IQR_FILL}
            stroke={IQR_STROKE}
            strokeWidth="1.5"
            rx="3"
            vectorEffect="non-scaling-stroke"
          />

          {/* Median tick: P50 */}
          <line
            x1={x50} y1={BOX_Y + 2}
            x2={x50} y2={BOX_Y + BOX_H - 2}
            stroke={MEDIAN_COLOR}
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Labels below the track — positioned as % of container width */}
        {/* P10 */}
        <div style={{
          position: 'absolute',
          left: `${(x10 / VB_W) * 100}%`,
          top: TRACK_H + 4,
          transform: 'translateX(-50%)',
          textAlign: 'center',
          lineHeight: 1.2,
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            {formatScore(p10)}
          </div>
          <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>P10</div>
        </div>

        {/* P50 */}
        <div style={{
          position: 'absolute',
          left: `${(x50 / VB_W) * 100}%`,
          top: TRACK_H + 4,
          transform: 'translateX(-50%)',
          textAlign: 'center',
          lineHeight: 1.2,
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            {formatScore(p50)}
          </div>
          <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>P50</div>
        </div>

        {/* P90 */}
        <div style={{
          position: 'absolute',
          left: `${(x90 / VB_W) * 100}%`,
          top: TRACK_H + 4,
          transform: 'translateX(-50%)',
          textAlign: 'center',
          lineHeight: 1.2,
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            {formatScore(p90)}
          </div>
          <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>P90</div>
        </div>
      </div>

      {/* Summary line */}
      <div style={{
        fontSize: 12,
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-secondary)',
        paddingTop: 2,
      }}>
        Half of students scored between{' '}
        <span style={{ color: 'var(--amber-text)', fontWeight: 600 }}>{formatScore(p25)}</span>
        {' '}and{' '}
        <span style={{ color: 'var(--amber-text)', fontWeight: 600 }}>{formatScore(p75)}</span>
      </div>
    </div>
  );
}
