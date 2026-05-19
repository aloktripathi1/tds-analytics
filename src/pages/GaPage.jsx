import { useParams } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext.jsx';
import KpiCard          from '../components/shared/KpiCard.jsx';
import SectionCard      from '../components/shared/SectionCard.jsx';
import BarRow           from '../components/shared/BarRow.jsx';
import MiniDistribution from '../components/shared/MiniDistribution.jsx';
import PercentileBox    from '../components/shared/PercentileBox.jsx';
import ObsBox           from '../components/shared/ObsBox.jsx';
import QuestionHeatmap  from '../components/charts/QuestionHeatmap.jsx';
import SparklineDrift   from '../components/charts/SparklineDrift.jsx';
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
        <KpiCard label="Students" value={meta.uniqueStudents ?? meta.validRecords} sub="best submission per student" />
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
          <SparklineDrift drifts={multiTermDrifts} />
        </SectionCard>
      )}

      <SectionCard title="Score distribution" sub="count of submissions per score bracket">
        <MiniDistribution
          buckets={dist.buckets}
          distShape={distShape}
          medianPct={maxP > 0 ? (clean(dist.median ?? 0) / maxP) * 100 : null}
        />
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
        {dist.p10 != null && (
          <PercentileBox
            p10={clean(dist.p10)}
            p25={clean(dist.p25 ?? 0)}
            p50={clean(dist.p50 ?? dist.median ?? 0)}
            p75={clean(dist.p75 ?? 0)}
            p90={clean(dist.p90 ?? 0)}
            maxScore={maxP}
            color={(() => {
              const nm = (dist.normalized_mean ?? 0);
              if (nm < 0.45) return 'red';
              if (nm < 0.65) return 'amber';
              return 'green';
            })()}
          />
        )}
      </SectionCard>

      {timing && !timing.skipped && (
        <SectionCard
          title="Submission activity across assignment window"
          sub={`${toFixed(concentration.deadlineConcentration, 0)}% of submissions in final sixth; amber = deadline buckets`}
        >
          <SubmissionTimeline concentration={concentration} />
          {(() => {
            const early = timing.earlyGt6h;
            const mid   = timing.mid1To6h;
            const last  = timing.lastLt1h;
            const totalCount = (early?.count ?? 0) + (mid?.count ?? 0) + (last?.count ?? 0);
            const isDegenerate = (mid?.count ?? 0) === 0 && (last?.count ?? 0) <= 1;

            if (isDegenerate || totalCount === 0) {
              return (
                <p className={styles.timingUnavailable}>
                  Timing breakdown unavailable — deadline could not be reliably inferred from this dataset.
                </p>
              );
            }

            const segments = [
              { label: 'Early (>6h)',    data: early, bg: 'var(--green)',  text: '#fff' },
              { label: 'Mid (1–6h)',     data: mid,   bg: 'var(--blue)',   text: '#fff' },
              { label: 'Last-min (<1h)', data: last,  bg: 'var(--amber)',  text: '#fff' },
            ];

            const earlyAvg  = clean(early?.avgScore ?? 0);
            const lastAvg   = clean(last?.avgScore ?? 0);
            const scoreDiff = earlyAvg - lastAvg;

            return (
              <div style={{ marginTop: 14 }}>
                {/* Proportional bar */}
                <div style={{ display: 'flex', height: 44, borderRadius: 6, overflow: 'hidden', boxShadow: '0 1px 0 rgba(0,0,0,0.06), inset 0 0 0 0.5px rgba(0,0,0,0.04)' }}>
                  {segments.map(({ label, data: t, bg, text }) => {
                    const pct = totalCount > 0 ? (t.count / totalCount) * 100 : 0;
                    if (pct === 0) return null;
                    const showLabel = pct >= 16;
                    return (
                      <div
                        key={label}
                        title={`${label}: ${t.count} students, avg ${toFixed(t.avgScore, 1)}/${formatScore(maxP)}`}
                        style={{
                          width: `${pct}%`,
                          background: bg,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: text,
                          fontSize: 11,
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          minWidth: 0,
                          padding: '0 4px',
                          transition: 'width 0.35s ease',
                        }}
                      >
                        {showLabel && (
                          <>
                            <span>{t.count}</span>
                            <span style={{ fontSize: 9, fontWeight: 400, opacity: 0.85 }}>{label}</span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Stat cards below */}
                <div className={styles.timingCells} style={{ marginTop: 10 }}>
                  {segments.map(({ label, data: t, bg }) => (
                    <div key={label} className={styles.timingCell} style={{ background: bg + '22', border: `1px solid ${bg}44` }}>
                      <div className={styles.timingLabel}>{label}</div>
                      <div className={styles.timingCount}>{t.count}</div>
                      <div className={styles.timingAvg}>avg {toFixed(t.avgScore, 1)}/{formatScore(maxP)}</div>
                    </div>
                  ))}
                </div>

                {/* Score diff annotation */}
                {Math.abs(scoreDiff) > 2 && (
                  <div className={styles.timingScoreDiff}>
                    {scoreDiff > 0
                      ? `↑ Early submitters scored ${toFixed(scoreDiff, 1)} pts higher on average than last-minute ones`
                      : `↓ Last-minute submitters scored ${toFixed(Math.abs(scoreDiff), 1)} pts higher than early ones`}
                  </div>
                )}
              </div>
            );
          })()}
        </SectionCard>
      )}

      {(() => {
        const surprisingQs = questions.filter(q => q.surpriseFlag && q.surpriseScore >= 5);
        if (!surprisingQs.length) return null;
        const maxMarks = Math.max(...questions.map(q => q.maxPossible ?? 0), 1);
        return (
          <SectionCard title="Surprise factor" sub="questions where marks weight and completion rate diverge">
            <div className={styles.surpriseTable}>
              {surprisingQs.map(q => {
                const marksW = ((q.maxPossible ?? 0) / maxMarks) * 100;
                const compW = clean(q.completionRate ?? 0);
                const isHard = compW < marksW;
                const label = q.surpriseScore >= 10 ? 'very unexpected' : 'somewhat unexpected';
                const explanation = isHard
                  ? `Worth ${formatScore(q.maxPossible ?? 0)} marks but only ${toFixed(compW, 0)}% of students completed it — harder than its weight suggests`
                  : `Worth ${formatScore(q.maxPossible ?? 0)} marks and ${toFixed(compW, 0)}% completed it — easier than its weight suggests`;
                return (
                  <div key={q.id} className={styles.surpriseRow}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div className={styles.surpriseLabel}>{q.label?.replace(/^q-/i, '').replace(/-/g, ' ')}</div>
                      <span className={`${styles.surpriseBadge} ${q.surpriseScore >= 10 ? styles.surpriseBadgeHigh : styles.surpriseBadgeMed}`}>{label}</span>
                    </div>
                    {/* Two-bar comparison */}
                    <div className={styles.surpriseCompare}>
                      <div className={styles.surpriseCompareRow}>
                        <span className={styles.surpriseCompareLabel}>by weight</span>
                        <div className={styles.surpriseTrack}>
                          <div className={styles.surpriseBar} style={{ width: `${marksW}%`, background: 'var(--blue)' }} />
                        </div>
                        <span className={styles.surpriseCompareVal}>{formatScore(q.maxPossible ?? 0)} marks</span>
                      </div>
                      <div className={styles.surpriseCompareRow}>
                        <span className={styles.surpriseCompareLabel}>completion</span>
                        <div className={styles.surpriseTrack}>
                          <div className={styles.surpriseBar} style={{ width: `${compW}%`, background: isHard ? 'var(--red)' : 'var(--green)' }} />
                        </div>
                        <span className={styles.surpriseCompareVal}>{toFixed(compW, 0)}%</span>
                      </div>
                    </div>
                    <div className={styles.surpriseExplanation}>{explanation}</div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        );
      })()}

      <SectionCard title="Observed patterns" sub="what the data actually shows">
        {observations.length
          ? observations.map(obs => <ObsBox key={obs.tag} tag={obs.tag}>{obs.text}</ObsBox>)
          : <ObsBox tag="no unusual pattern">No non-obvious pattern cleared the reporting threshold for this page.</ObsBox>}
      </SectionCard>
    </div>
  );
}
