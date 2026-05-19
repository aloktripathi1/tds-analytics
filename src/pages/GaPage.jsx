import { useParams } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext.jsx';
import KpiCard          from '../components/shared/KpiCard.jsx';
import SectionCard      from '../components/shared/SectionCard.jsx';
import BarRow           from '../components/shared/BarRow.jsx';
import MiniDistribution from '../components/shared/MiniDistribution.jsx';
import ObsBox           from '../components/shared/ObsBox.jsx';
import QuestionHeatmap  from '../components/charts/QuestionHeatmap.jsx';
import { averageQuestionGap, buildObservations } from '../utils/observations.js';
import {
  classifyDistributionShape, computeSurpriseScores, computePartialCreditDepth,
  computeMarkUtilization, computeAllCrossTermDrifts, computeSubmissionConcentration,
  sanitizedMax, previousTermFor, ppComparison,
} from '../utils/transforms.js';
import { clean, formatScore, toFixed, toPercent } from '../utils/format-numbers.js';
import styles from './GaPage.module.css';

function SubmissionTimeline({ concentration }) {
  const { buckets, total } = concentration;
  const ceiling = Math.max(...buckets, 1) * 1.2;
  return (
    <div>
      <div className={styles.timeline}>
        {buckets.map((count, i) => {
          const heightPct = (count / ceiling) * 100;
          const isDeadline = i >= 10;
          return (
            <div key={i} className={styles.timelineBucket}>
              <div
                className={styles.timelineBar}
                style={{
                  height: `${heightPct}%`,
                  background: isDeadline ? 'var(--amber)' : 'var(--blue)',
                  opacity: count === 0 ? 0.15 : 0.9,
                }}
                title={`Bucket ${i + 1}: ~${Math.round(count)} submissions`}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.timelineAxis}>
        <span>window opens</span>
        <span>mid-window</span>
        <span className={styles.timelineAxisDeadline}>deadline →</span>
      </div>
      <div className={styles.timelineLegend}>
        <span className={styles.timelineLegendItem}>
          <span className={styles.timelineLegendSwatch} style={{ background: 'var(--blue)' }} />
          earlier in window
        </span>
        <span className={styles.timelineLegendItem}>
          <span className={styles.timelineLegendSwatch} style={{ background: 'var(--amber)' }} />
          final sixth before deadline
        </span>
        {typeof total === 'number' && total > 0 && (
          <span style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>
            {total.toLocaleString()} submissions total
          </span>
        )}
      </div>
    </div>
  );
}

function driftDotColor(value) {
  const v = clean(value);
  if (v < 40) return 'var(--red)';
  if (v <= 65) return 'var(--amber)';
  return 'var(--green)';
}

function CrossTermDriftChart({ drifts }) {
  if (!drifts.length) return null;
  return (
    <div className={styles.driftTable}>
      {drifts.slice(0, 10).map(d => {
        const terms = Object.keys(d.byTerm).sort();
        const driftValue = clean(d.drift);
        const isNearZero = Math.abs(driftValue) < 2;
        const badgeColor = isNearZero
          ? 'var(--text-muted)'
          : driftValue > 0 ? 'var(--green-text)' : 'var(--red-text)';
        const sign = isNearZero ? '~' : driftValue > 0 ? '+' : '';
        const value = isNearZero ? '0' : toFixed(Math.abs(driftValue), 0);
        return (
          <div key={d.questionId} className={styles.driftRow}>
            <div className={styles.driftLabel}>{d.questionId.replace('q-', '').replace(/-/g, ' ')}</div>
            <div className={styles.driftTrack}>
              <span className={styles.driftConnector} />
              {terms.map((t, i) => {
                const pos = terms.length === 1 ? 50 : (i / (terms.length - 1)) * 100;
                const v = d.byTerm[t];
                return (
                  <span
                    key={t}
                    className={styles.driftStop}
                    style={{ left: `${pos}%` }}
                    title={`${t}: ${toFixed(v, 0)}%`}
                  >
                    <span className={styles.driftStopValue}>{toFixed(v, 0)}%</span>
                    <span className={styles.driftStopDot} style={{ background: driftDotColor(v) }} />
                    <span className={styles.driftStopLabel}>{t}</span>
                  </span>
                );
              })}
            </div>
            <div className={styles.driftBadge} style={{ color: badgeColor }}>
              {driftValue < 0 ? `-${value}` : `${sign}${value}`}pp
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

  const gaKey = gaId.toUpperCase();
  const ga = data.byAssignment?.[term]?.[gaKey];
  if (!ga) {
    // Issue 3: GA5 2026-01 cross-term anomaly note when data is missing
    const isGa5_2026 = term === '2026-01' && gaKey === 'GA5';
    return (
      <div className={styles.empty}>
        <p>No data found for <strong>{gaId}</strong> in term <strong>{term}</strong>.</p>
        {isGa5_2026 && (
          <div className={styles.crossTermNote}>
            <div className={styles.crossTermTag}>cross-term context</div>
            <p className={styles.crossTermText}>
              Marks utilization for this assignment is 38% — roughly half the 77–83% seen across
              the three preceding terms (2025-01: 76.6%, 2025-05: 83.4%, 2025-09: 82.8%).
              The question set changed between 2025-09 and 2026-01.
            </p>
          </div>
        )}
      </div>
    );
  }

  const { meta, scoreDistribution: dist, questions: rawQuestions = [], timing } = ga;
  const maxP = clean(meta.maxPossible);
  const questionsWithPartial = computePartialCreditDepth(rawQuestions);
  const questions = computeSurpriseScores(questionsWithPartial);
  const perfectApprox = dist.buckets?.['80_100'] ?? '-';
  const distShape = dist ? classifyDistributionShape(dist.mean, dist.median, dist.stdDev, dist.buckets) : null;

  // Issue 1: if questions=[] (CSV totals-only), fall back to normalized_mean for utilization
  const rawUtilization = computeMarkUtilization(questions, meta.uniqueStudents ?? meta.validRecords);
  const utilizationPct = questions.length > 0
    ? rawUtilization.overall * 100
    : (dist?.normalized_mean ?? 0) * 100;

  const concentration = computeSubmissionConcentration(timing);

  const allGaTermsData = Object.entries(data.byAssignment ?? {})
    .filter(([, assignments]) => assignments[gaKey])
    .map(([t, assignments]) => ({ term: t, questions: computePartialCreditDepth(assignments[gaKey].questions ?? []) }));
  const crossTermDrifts = computeAllCrossTermDrifts(allGaTermsData);
  const multiTermDrifts = crossTermDrifts.filter(d => Object.keys(d.byTerm).length > 1);
  const observations = buildObservations({
    questions,
    dist,
    timing,
    maxPossible: maxP,
    drifts: multiTermDrifts,
    concentration,
    averageGap: averageQuestionGap(data.byAssignment),
  });
  const percentiles = ['p10', 'p25', 'p50', 'p75', 'p90'];

  // Previous-term comparison for percentage-point KPI cards
  const prevTerm = previousTermFor(data.byAssignment, term, gaKey);
  const prevGa = prevTerm ? data.byAssignment[prevTerm][gaKey] : null;
  const prevNormMean = prevGa ? (prevGa.scoreDistribution?.normalized_mean ?? 0) * 100 : 0;
  const prevUtil = prevGa
    ? (() => {
        const u = computeMarkUtilization(
          computePartialCreditDepth(prevGa.questions ?? []),
          prevGa.meta?.uniqueStudents ?? prevGa.meta?.validRecords ?? 0,
        );
        if ((prevGa.questions ?? []).length > 0) return u.overall * 100;
        return (prevGa.scoreDistribution?.normalized_mean ?? 0) * 100;
      })()
    : 0;
  const meanComparison = ppComparison((dist.normalized_mean ?? 0) * 100, prevNormMean, prevTerm);
  const utilComparison = ppComparison(utilizationPct, prevUtil, prevTerm);

  return (
    <div className={styles.page}>
      {/* Issue 4: post-term banner for GA7 / GA8 */}
      {ga.post_term_addition && (
        <div className={styles.postTermBanner}>
          This assignment was added after the term ended. Completion rates reflect late availability,
          not difficulty. Figures should not be compared directly to GA1–GA6.
        </div>
      )}

      <div className={styles.kpiGrid}>
        <KpiCard label="Unique students" value={meta.uniqueStudents ?? meta.validRecords} sub="best submission per student" />
        <KpiCard
          label="Mean score"
          value={`${toFixed(dist.mean, 1)}/${formatScore(maxP)}`}
          sub={`median ${formatScore(dist.median)}`}
          accentColor="var(--amber)"
          comparison={meanComparison}
        />
        <KpiCard
          label="Marks utilization"
          value={toPercent(utilizationPct, 1)}
          sub="of available marks earned"
          accentColor="var(--blue)"
          comparison={utilComparison}
        />
        <KpiCard
          label="80-100% bracket"
          value={perfectApprox}
          sub="students (top bucket)"
          accentColor="var(--green)"
        />
      </div>

      {/* Issue 2: always show heatmap section; show message when no question data */}
      <SectionCard title="Question heatmap" sub="completion rate per question: hardest to easiest">
        {questions.length > 0
          ? <QuestionHeatmap questions={questions} columns={4} showPartialCredit />
          : <p className={styles.csvNote}>Question-level breakdown not available for this assignment — CSV format contains totals only.</p>
        }
      </SectionCard>

      {multiTermDrifts.length > 0 && (
        <SectionCard title="Cross-term question drift" sub="questions appearing in multiple terms: completion rate over time">
          <CrossTermDriftChart drifts={multiTermDrifts} />
        </SectionCard>
      )}

      <SectionCard title="Score distribution" sub="count of submissions per score bracket">
        {distShape && (
          <div className={styles.shapeTags}>
            <span className={styles.shapeTag}>{distShape.bimodal ? 'bimodal' : distShape.shape}</span>
            {distShape.bottomPct > 40 && <span className={styles.shapeTagWarn}>bottom-heavy</span>}
            {distShape.topPct > 40 && <span className={styles.shapeTagGood}>top-heavy</span>}
          </div>
        )}
        <MiniDistribution buckets={dist.buckets} />
        {(dist.buckets?.['80_100'] ?? 0) === 0 && (
          <p className={styles.distNote}>No students scored in the top 20% of the score range in this assignment.</p>
        )}
        <div className={styles.statRow}>
          {[
            ['mean', toFixed(dist.mean, 1)],
            ['median', toFixed(dist.median, 1)],
            ['sigma', toFixed(dist.stdDev, 2)],
            ['min', formatScore(dist.min)],
            ['max', (() => { const m = sanitizedMax(dist.max, dist.mean); return m == null ? 'N/A' : formatScore(m); })()],
          ].map(([lbl, val]) => (
            <div key={lbl} className={styles.statItem}>
              <span className={styles.statLabel}>{lbl}</span>
              <span className={styles.statValue}>{val}</span>
            </div>
          ))}
        </div>
        {percentiles.map(p => {
          const raw = clean(dist[p] ?? 0);
          return (
            <BarRow key={p} label={p.toUpperCase()} value={(raw / maxP) * 100} color="blue" displayValue={formatScore(raw)} />
          );
        })}
      </SectionCard>

      {timing && !timing.skipped && (
        <SectionCard
          title="Submission activity across assignment window"
          sub={`${toFixed(concentration.deadlineConcentration, 0)}% of submissions in final sixth; amber = deadline buckets`}
        >
          <SubmissionTimeline concentration={concentration} />
          <div className={styles.timingCells}>
            {[
              { label: 'Early (>6h)', data: timing.earlyGt6h, color: 'var(--green-bg)', text: 'var(--green-text)' },
              { label: 'Mid (1-6h)', data: timing.mid1To6h, color: 'var(--amber-bg)', text: 'var(--amber-text)' },
              { label: 'Last-min (<1h)', data: timing.lastLt1h, color: 'var(--red-bg)', text: 'var(--red-text)' },
            ].map(({ label, data: t, color, text }) => (
              <div key={label} className={styles.timingCell} style={{ background: color }}>
                <div className={styles.timingLabel} style={{ color: text }}>{label}</div>
                <div className={styles.timingCount} style={{ color: text }}>{t.count}</div>
                <div className={styles.timingAvg} style={{ color: text }}>avg {toFixed(t.avgScore, 1)}/{formatScore(maxP)}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {questions.some(q => q.surpriseFlag) && (
        <SectionCard title="Surprise factor" sub="questions where marks weight and completion rate diverge">
          <div className={styles.surpriseTable}>
            {questions.filter(q => q.surpriseFlag).map(q => (
              <div key={q.id} className={styles.surpriseRow}>
                <div className={styles.surpriseLabel}>{q.label}</div>
                <div className={styles.surpriseMeta}>
                  <span>{formatScore(q.maxPossible ?? 0)} marks</span>
                  <span>{toFixed(q.completionRate ?? 0, 0)}% completion</span>
                  <span className={styles.surpriseScore}>surprise score: {q.surpriseScore}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      <SectionCard title="Observed patterns" sub="what the data actually shows">
        {observations.length
          ? observations.map(obs => <ObsBox key={obs.tag} tag={obs.tag}>{obs.text}</ObsBox>)
          : <ObsBox tag="no unusual pattern">No non-obvious pattern cleared the reporting threshold for this page.</ObsBox>}
      </SectionCard>
    </div>
  );
}
