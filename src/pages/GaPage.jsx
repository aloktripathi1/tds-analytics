import { useParams } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext.jsx';
import KpiCard          from '../components/shared/KpiCard.jsx';
import SectionCard      from '../components/shared/SectionCard.jsx';
import BarRow           from '../components/shared/BarRow.jsx';
import MiniDistribution from '../components/shared/MiniDistribution.jsx';
import ObsBox           from '../components/shared/ObsBox.jsx';
import QuestionHeatmap  from '../components/charts/QuestionHeatmap.jsx';
import {
  timingObs, completionObs, spreadObs,
  distributionShapeObs, surpriseObs, partialCreditObs,
  markUtilizationObs, crossTermDriftObs, submissionConcentrationObs,
} from '../utils/observations.js';
import {
  classifyDistributionShape, computeSurpriseScores, computePartialCreditDepth,
  computeMarkUtilization, computeAllCrossTermDrifts, computeSubmissionConcentration,
} from '../utils/transforms.js';
import { toFixed, toPercent } from '../utils/format-numbers.js';
import styles from './GaPage.module.css';

function SubmissionTimeline({ concentration }) {
  const { buckets, total } = concentration;
  const max = Math.max(...buckets, 1);
  return (
    <div className={styles.timeline}>
      {buckets.map((count, i) => {
        const height = Math.round((count / max) * 40);
        const isDeadline = i >= 10;
        return (
          <div key={i} className={styles.timelineBucket}>
            <div
              className={styles.timelineBar}
              style={{
                height: `${height}px`,
                background: isDeadline ? 'var(--amber)' : 'var(--blue)',
                opacity: count === 0 ? 0.15 : 0.85,
              }}
              title={`Bucket ${i + 1}: ~${Math.round(count)} submissions`}
            />
          </div>
        );
      })}
    </div>
  );
}

function CrossTermDriftChart({ drifts }) {
  if (!drifts.length) return null;
  return (
    <div className={styles.driftTable}>
      {drifts.slice(0, 10).map(d => {
        const terms = Object.keys(d.byTerm).sort();
        const color = d.classification === 'improving'
          ? 'var(--green)'
          : d.classification === 'declining'
            ? 'var(--red)'
            : 'var(--text-muted)';
        return (
          <div key={d.questionId} className={styles.driftRow}>
            <div className={styles.driftLabel}>{d.questionId.replace('q-', '').replace(/-/g, ' ')}</div>
            <div className={styles.driftSparkline}>
              {terms.map(t => (
                <span key={t} className={styles.driftDot} style={{ opacity: 0.4 + (d.byTerm[t] / 100) * 0.6 }}>
                  {Math.round(d.byTerm[t])}%
                </span>
              ))}
            </div>
            <div className={styles.driftBadge} style={{ color }}>
              {d.classification === 'improving' ? '↑' : d.classification === 'declining' ? '↓' : '→'} {d.drift > 0 ? '+' : ''}{Math.round(d.drift)}pp
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function GaPage() {
  const { term, gaId } = useParams();
  const { data } = useDashboard();

  const ga = data.byAssignment?.[term]?.[gaId.toUpperCase()];
  if (!ga) {
    return <div className={styles.empty}>No data found for <strong>{gaId}</strong> in term <strong>{term}</strong>.</div>;
  }

  const { meta, scoreDistribution: dist, questions: rawQuestions = [], timing } = ga;
  const maxP = meta.maxPossible;

  // Enrich questions
  const questionsWithPartial = computePartialCreditDepth(rawQuestions);
  const questions = computeSurpriseScores(questionsWithPartial);

  // KPI: top bracket
  const perfectApprox = dist.buckets?.['80_100'] ?? '—';

  // Distribution shape
  const distShape = dist ? classifyDistributionShape(dist.mean, dist.median, dist.stdDev, dist.buckets) : null;

  // Mark utilization
  const utilization = computeMarkUtilization(questions, meta.uniqueStudents ?? meta.validRecords);

  // Submission concentration
  const concentration = computeSubmissionConcentration(timing);

  // Cross-term drift — gather all data for this GA ID across terms
  const gaKey = gaId.toUpperCase();
  const allGaTermsData = Object.entries(data.byAssignment ?? {})
    .filter(([, assignments]) => assignments[gaKey])
    .map(([t, assignments]) => ({ term: t, questions: computePartialCreditDepth(assignments[gaKey].questions ?? []) }));
  const crossTermDrifts = computeAllCrossTermDrifts(allGaTermsData);
  const multiTermDrifts = crossTermDrifts.filter(d => Object.keys(d.byTerm).length > 1);

  const percentiles = ['p10', 'p25', 'p50', 'p75', 'p90'];

  // Observations
  const distObs = distShape
    ? distributionShapeObs(distShape.bimodal ? 'bimodal' : distShape.shape, distShape.bottomPct, distShape.topPct, `${gaKey} ${term}`)
    : null;
  const surpriseText = surpriseObs(questions);
  const partialText = partialCreditObs(questions);
  const utilObs = markUtilizationObs(utilization.overall);
  const driftObs = crossTermDriftObs(multiTermDrifts);
  const concObs = submissionConcentrationObs(concentration);

  return (
    <div className={styles.page}>
      {/* 1. KPI row — 4 cards */}
      <div className={styles.kpiGrid}>
        <KpiCard label="Unique students" value={meta.uniqueStudents ?? meta.validRecords} sub="best submission per student" />
        <KpiCard
          label="Mean score"
          value={`${toFixed(dist.mean, 1)}/${maxP}`}
          sub={`median ${dist.median}`}
          accentColor="var(--amber)"
        />
        <KpiCard
          label="Marks utilization"
          value={toPercent(utilization.overall * 100, 1)}
          sub="of available marks earned"
          accentColor="var(--blue)"
        />
        <KpiCard
          label="80–100% bracket"
          value={perfectApprox}
          sub="students (top bucket)"
          accentColor="var(--green)"
        />
      </div>

      {/* 2. Heatmap — only if there are questions */}
      {questions.length > 0 && (
        <SectionCard title="Question heatmap" sub="completion rate per question — hardest (red) → easiest (green)">
          <QuestionHeatmap questions={questions} columns={4} showPartialCredit />
        </SectionCard>
      )}

      {/* 3. Cross-term drift */}
      {multiTermDrifts.length > 0 && (
        <SectionCard title="Cross-term question drift" sub="questions appearing in multiple terms — completion rate over time">
          <CrossTermDriftChart drifts={multiTermDrifts} />
        </SectionCard>
      )}

      {/* 4. Distribution with shape classification */}
      <SectionCard title="Score distribution" sub="count of submissions per score bracket">
        {distShape && (
          <div className={styles.shapeTags}>
            <span className={styles.shapeTag}>{distShape.bimodal ? 'bimodal' : distShape.shape}</span>
            {distShape.bottomPct > 40 && <span className={styles.shapeTagWarn}>bottom-heavy</span>}
            {distShape.topPct > 40 && <span className={styles.shapeTagGood}>top-heavy</span>}
          </div>
        )}
        <MiniDistribution buckets={dist.buckets} />
        <div className={styles.statRow}>
          {[['mean', toFixed(dist.mean, 1)], ['median', toFixed(dist.median, 1)], ['σ', toFixed(dist.stdDev, 2)], ['min', dist.min], ['max', dist.max]].map(([lbl, val]) => (
            <div key={lbl} className={styles.statItem}>
              <span className={styles.statLabel}>{lbl}</span>
              <span className={styles.statValue}>{val}</span>
            </div>
          ))}
        </div>
        {/* Percentile bars */}
        {percentiles.map(p => {
          const raw = dist[p] ?? 0;
          return (
            <BarRow key={p} label={p.toUpperCase()} value={(raw / maxP) * 100} color="blue" displayValue={raw} />
          );
        })}
      </SectionCard>

      {/* 5. Submission concentration timeline — only when timing data exists */}
      {timing && !timing.skipped && (
        <SectionCard
          title="Submission activity across assignment window"
          sub={`${concentration.deadlineConcentration.toFixed(0)}% of submissions in final sixth — amber = deadline buckets`}
        >
          <SubmissionTimeline concentration={concentration} />
          <div className={styles.timingCells}>
            {[
              { label: 'Early (>6h)',    data: timing.earlyGt6h, color: 'var(--green-bg)',  text: 'var(--green-text)' },
              { label: 'Mid (1–6h)',     data: timing.mid1To6h,  color: 'var(--amber-bg)',  text: 'var(--amber-text)' },
              { label: 'Last-min (<1h)', data: timing.lastLt1h,  color: 'var(--red-bg)',    text: 'var(--red-text)'   },
            ].map(({ label, data: t, color, text }) => (
              <div key={label} className={styles.timingCell} style={{ background: color }}>
                <div className={styles.timingLabel} style={{ color: text }}>{label}</div>
                <div className={styles.timingCount} style={{ color: text }}>{t.count}</div>
                <div className={styles.timingAvg} style={{ color: text }}>avg {toFixed(t.avgScore, 1)}/{maxP}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* 6. Surprise factor */}
      {questions.some(q => q.surpriseFlag) && (
        <SectionCard title="Surprise factor" sub="questions where marks weight and completion rate diverge">
          <div className={styles.surpriseTable}>
            {questions.filter(q => q.surpriseFlag).map(q => (
              <div key={q.id} className={styles.surpriseRow}>
                <div className={styles.surpriseLabel}>{q.label}</div>
                <div className={styles.surpriseMeta}>
                  <span>{(q.maxPossible ?? 0).toFixed(1)} marks</span>
                  <span>{(q.completionRate ?? 0).toFixed(0)}% completion</span>
                  <span className={styles.surpriseScore}>surprise score: {q.surpriseScore}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* 7. Observed patterns */}
      <SectionCard title="Observed patterns" sub="generated from submission data — analytical lenses">
        {questions.length > 0 && <ObsBox tag="question completion">{completionObs(questions)}</ObsBox>}
        {timing && !timing.skipped && <ObsBox tag="submission timing">{timingObs(timing, maxP)}</ObsBox>}
        <ObsBox tag="score spread">{spreadObs(dist)}</ObsBox>
        {distObs && <ObsBox tag="distribution shape">{distObs}</ObsBox>}
        <ObsBox tag="marks utilization">{utilObs}</ObsBox>
        {surpriseText && <ObsBox tag="surprise factor">{surpriseText}</ObsBox>}
        {partialText && <ObsBox tag="partial credit">{partialText}</ObsBox>}
        {driftObs && <ObsBox tag="cross-term drift">{driftObs}</ObsBox>}
        {concObs && <ObsBox tag="submission concentration">{concObs}</ObsBox>}
      </SectionCard>
    </div>
  );
}
