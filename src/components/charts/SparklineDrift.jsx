import { clean, toFixed } from '../../utils/format-numbers.js';
import styles from './SparklineDrift.module.css';

function dotColor(v) {
  if (v < 40) return 'var(--red)';
  if (v <= 65) return 'var(--amber)';
  return 'var(--green)';
}

const SPARK_H = 28;
const SPARK_PAD = 5;
// Fixed viewBox width — prevents % coordinates from being interpreted in stretched space
const VB_W = 300;

function Sparkline({ byTerm }) {
  const terms = Object.keys(byTerm).sort();
  const values = terms.map(t => clean(byTerm[t]));
  const n = terms.length;

  // X positions in VB units: evenly spread across VB_W with padding
  const PAD_X = 12; // px padding left/right in VB coords
  const xVB = terms.map((_, i) =>
    n === 1 ? VB_W / 2 : PAD_X + (i / (n - 1)) * (VB_W - PAD_X * 2)
  );

  // Y in px: invert so high value = top
  const yPx = (v) => SPARK_PAD + ((100 - Math.min(100, Math.max(0, v))) / 100) * (SPARK_H - SPARK_PAD * 2);

  // Polyline points in VB units
  const linePoints = xVB.map((x, i) => `${x},${yPx(values[i])}`).join(' ');

  return (
    <div className={styles.sparkWrap}>
      {/* Fixed viewBox SVG — shapes won't stretch */}
      <svg
        width="100%"
        height={SPARK_H}
        viewBox={`0 0 ${VB_W} ${SPARK_H}`}
        preserveAspectRatio="none"
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* Connector line — rendered first, behind dots */}
        {n > 1 && (
          <polyline
            points={linePoints}
            fill="none"
            stroke="rgba(0,0,0,0.20)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        )}

        {/* Dots — rendered after line so they sit on top */}
        {xVB.map((x, i) => {
          const isLast = i === n - 1;
          const cy = yPx(values[i]);
          const color = dotColor(values[i]);

          // Use vectorEffect="non-scaling-stroke" + fixed r in VB units.
          // Because preserveAspectRatio="none" scales x and y independently,
          // we can't use a simple <circle> with a radius that looks round —
          // the radius gets scaled differently on each axis.
          // Solution: render each dot as a tiny SVG nested with its own uniform scale.
          // Simpler: use a viewBox where VB_W / SPARK_H ratio matches the rendered ratio.
          // Since we can't know the rendered width at build time, we instead use
          // vectorEffect="non-scaling-stroke" for the line and accept that circle
          // radii will scale with the viewBox — but we compensate by using an
          // explicit <circle> that has the correct radius in the *viewBox* coordinate system.
          // The r value in VB units: we want ~4px visually. Container is ~200–400px wide.
          // VB_W=300, so 1 VBU ≈ container_px / 300. For a 300px container, 1VBU=1px.
          // r=4 in VB units → looks correct at 300px wide. Fine at other widths too.
          const r = isLast ? 6 : 4.5;
          return (
            <g key={terms[i]}>
              {isLast ? (
                <>
                  <circle cx={x} cy={cy} r={r} fill={color} />
                  <circle cx={x} cy={cy} r={2.5} fill="var(--bg-primary)" />
                </>
              ) : (
                <circle cx={x} cy={cy} r={r} fill={color} />
              )}
            </g>
          );
        })}
      </svg>

      {/* Term labels below sparkline — positioned by % of container */}
      <div className={styles.sparkTerms}>
        {terms.map((t, i) => (
          <div
            key={t}
            className={styles.sparkTerm}
            style={{ left: `${(xVB[i] / VB_W) * 100}%` }}
            title={`${t}: ${toFixed(byTerm[t], 0)}%`}
          >
            {t.slice(-2)}
          </div>
        ))}
      </div>
    </div>
  );
}

function DriftPill({ drift }) {
  const abs = Math.abs(drift);
  if (abs < 5) {
    return <span className={`${styles.pill} ${styles.pillNeutral}`}>~0pp</span>;
  }
  if (drift > 0) {
    return <span className={`${styles.pill} ${styles.pillPos}`}>+{toFixed(abs, 0)}pp</span>;
  }
  return <span className={`${styles.pill} ${styles.pillNeg}`}>-{toFixed(abs, 0)}pp</span>;
}

export default function SparklineDrift({ drifts }) {
  if (!drifts || drifts.length === 0) return null;

  const sorted = [...drifts]
    .filter(d => Object.keys(d.byTerm).length > 1)
    .sort((a, b) => Math.abs(clean(b.drift)) - Math.abs(clean(a.drift)))
    .slice(0, 12);

  const bigThreshold = 10;
  const hasBig = sorted.some(d => Math.abs(clean(d.drift)) >= bigThreshold);
  const hasSmall = sorted.some(d => Math.abs(clean(d.drift)) < bigThreshold);
  let passedSeparator = false;

  return (
    <div className={styles.table}>
      {sorted.map((d) => {
        const drift = clean(d.drift);
        const isBig = Math.abs(drift) >= bigThreshold;
        const needsSeparator = hasBig && hasSmall && !isBig && !passedSeparator;
        if (needsSeparator) passedSeparator = true;

        const label = d.questionId.replace(/^q-/, '').replace(/-/g, ' ');

        return (
          <div key={d.questionId}>
            {needsSeparator && <div className={styles.separator} />}
            <div className={styles.row}>
              <div className={styles.label} title={label}>{label}</div>
              <Sparkline byTerm={d.byTerm} />
              <DriftPill drift={drift} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
