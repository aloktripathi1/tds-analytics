import { useParams } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext.jsx';
import KpiCard          from '../components/shared/KpiCard.jsx';
import SectionCard      from '../components/shared/SectionCard.jsx';
import BarRow           from '../components/shared/BarRow.jsx';
import MiniDistribution from '../components/shared/MiniDistribution.jsx';
import ObsBox           from '../components/shared/ObsBox.jsx';
import QuestionHeatmap  from '../components/charts/QuestionHeatmap.jsx';
import { timingObs, completionObs, spreadObs } from '../utils/observations.js';
import { toFixed, toPercent } from '../utils/format-numbers.js';
import styles from './GaPage.module.css';

export default function GaPage() {
  const { term, gaId } = useParams();
  const { data } = useDashboard();

  const ga = data.byAssignment?.[term]?.[gaId.toUpperCase()];
  if (!ga) {
    return (
      <div className={styles.empty}>
        No data found for <strong>{gaId}</strong> in term <strong>{term}</strong>.
      </div>
    );
  }

  const { meta, scoreDistribution: dist, questions = [], timing } = ga;
  const maxP = meta.maxPossible;

  // KPI: avg completion
  const avgComp = questions.length
    ? questions.reduce((s, q) => s + q.completionRate, 0) / questions.length
    : 0;

  // KPI: perfect scores — students who scored max (approximate from buckets)
  const perfectApprox = dist.buckets?.['80_100'] ?? '—';

  // Percentile BarRows
  const percentiles = ['p10','p25','p50','p75','p90'];

  return (
    <div className={styles.page}>
      {/* Row 1 — KPIs */}
      <div className={styles.kpiGrid}>
        <KpiCard
          label="Valid submissions"
          value={meta.validRecords}
          sub={`${meta.lateSubmissions ?? 0} late`}
        />
        <KpiCard
          label="Mean score"
          value={`${toFixed(dist.mean, 1)}/${maxP}`}
          sub={`median ${dist.median}`}
          accentColor="var(--amber)"
        />
        <KpiCard
          label="Avg completion"
          value={toPercent(avgComp, 1)}
          sub="across all questions"
          accentColor="var(--amber)"
        />
        <KpiCard
          label="80–100% bracket"
          value={perfectApprox}
          sub="students (top bucket)"
          accentColor="var(--green)"
        />
      </div>

      {/* Row 2 — Heatmap */}
      <SectionCard
        title="Question heatmap"
        sub="completion rate per question — hardest (red) → easiest (green)"
      >
        <QuestionHeatmap questions={questions} columns={4} />
      </SectionCard>

      {/* Row 3 — two-column */}
      <div className={styles.twoCol}>
        {/* Distribution */}
        <SectionCard
          title="Score distribution"
          sub="count of submissions per score bracket"
        >
          <MiniDistribution buckets={dist.buckets} />
          <div className={styles.statRow}>
            {[
              ['mean',   toFixed(dist.mean, 1)],
              ['median', toFixed(dist.median, 1)],
              ['σ',      toFixed(dist.stdDev, 2)],
              ['min',    dist.min],
              ['max',    dist.max],
            ].map(([lbl, val]) => (
              <div key={lbl} className={styles.statItem}>
                <span className={styles.statLabel}>{lbl}</span>
                <span className={styles.statValue}>{val}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Timing */}
        {timing && (
          <SectionCard
            title="Submission timing"
            sub="score vs submission window before deadline"
          >
            <div className={styles.timingCells}>
              {[
                { label: 'Early (>6h)',   data: timing.earlyGt6h, color: 'var(--green-bg)',  text: 'var(--green-text)' },
                { label: 'Mid (1–6h)',    data: timing.mid1To6h,  color: 'var(--amber-bg)',  text: 'var(--amber-text)' },
                { label: 'Last-min (<1h)',data: timing.lastLt1h,  color: 'var(--red-bg)',    text: 'var(--red-text)'   },
              ].map(({ label, data: t, color, text }) => (
                <div key={label} className={styles.timingCell} style={{ background: color }}>
                  <div className={styles.timingLabel} style={{ color: text }}>{label}</div>
                  <div className={styles.timingCount} style={{ color: text }}>{t.count}</div>
                  <div className={styles.timingAvg}   style={{ color: text }}>avg {toFixed(t.avgScore, 1)}/{maxP}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '12px' }}>
              {percentiles.map(p => {
                const raw = dist[p] ?? 0;
                return (
                  <BarRow
                    key={p}
                    label={p.toUpperCase()}
                    value={(raw / maxP) * 100}
                    color="blue"
                    displayValue={raw}
                  />
                );
              })}
            </div>
          </SectionCard>
        )}
      </div>

      {/* Row 4 — Observations */}
      <SectionCard title="Observed patterns" sub="generated from submission data">
        <ObsBox tag="question completion">
          {completionObs(questions)}
        </ObsBox>
        {timing && (
          <ObsBox tag="submission timing">
            {timingObs(timing, maxP)}
          </ObsBox>
        )}
        <ObsBox tag="score spread">
          {spreadObs(dist)}
        </ObsBox>
      </SectionCard>
    </div>
  );
}
