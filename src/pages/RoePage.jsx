import { useParams } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext.jsx';
import KpiCard          from '../components/shared/KpiCard.jsx';
import SectionCard      from '../components/shared/SectionCard.jsx';
import MiniDistribution from '../components/shared/MiniDistribution.jsx';
import ObsBox           from '../components/shared/ObsBox.jsx';
import QuestionHeatmap  from '../components/charts/QuestionHeatmap.jsx';
import { averageQuestionGap, buildObservations } from '../utils/observations.js';
import {
  classifyDistributionShape, computeSurpriseScores, computePartialCreditDepth,
  computeMarkUtilization, computeAllCrossTermDrifts, computeSubmissionConcentration,
  computeSkillTaxonomy, sanitizedMax, previousTermFor, ppComparison,
} from '../utils/transforms.js';
import { clean, formatScore, toFixed, toPercent } from '../utils/format-numbers.js';
import styles from './RoePage.module.css';

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

export default function RoePage() {
  const { term } = useParams();
  const { data } = useDashboard();

  const roe = data.byAssignment?.[term]?.ROE;
  if (!roe) {
    return <div className={styles.empty}>No ROE data found for term <strong>{term}</strong>.</div>;
  }

  const { meta, scoreDistribution: dist, questions: rawQuestions = [] } = roe;
  const maxP = clean(meta.maxPossible);
  const questionsWithPartial = computePartialCreditDepth(rawQuestions);
  const questionsWithSurprise = computeSurpriseScores(questionsWithPartial);
  const questions = questionsWithSurprise.map(q => ({ ...q, skillTaxonomy: computeSkillTaxonomy(q) }));
  const distShape = dist ? classifyDistributionShape(dist.mean, dist.median, dist.stdDev, dist.buckets) : null;
  const utilization = computeMarkUtilization(questions, meta.uniqueStudents ?? meta.validRecords);
  const concentration = computeSubmissionConcentration(roe.timing);

  const allRoeTermsData = Object.entries(data.byAssignment ?? {})
    .filter(([, assignments]) => assignments.ROE)
    .map(([t, assignments]) => ({ term: t, questions: computePartialCreditDepth(assignments.ROE.questions ?? []) }));
  const crossTermDrifts = computeAllCrossTermDrifts(allRoeTermsData);
  const multiTermDrifts = crossTermDrifts.filter(d => Object.keys(d.byTerm).length > 1);

  // Cross-term ROE utilization comparison
  const crossTermUtil = Object.entries(data.byAssignment ?? {})
    .filter(([, assignments]) => assignments.ROE)
    .map(([t, assignments]) => {
      const roeData = assignments.ROE;
      const n = roeData.meta?.uniqueStudents ?? roeData.meta?.validRecords ?? 0;
      const util = computeMarkUtilization(
        computePartialCreditDepth(roeData.questions ?? []),
        n,
      );
      return { term: t, utilization: clean(util.overall * 100) };
    })
    .sort((a, b) => a.term.localeCompare(b.term));
  const maxUtil = Math.max(...crossTermUtil.map(x => x.utilization), 1);
  const outlier = crossTermUtil.find(x => x.utilization >= 70);
  const observations = buildObservations({
    questions,
    dist,
    timing: roe.timing,
    maxPossible: maxP,
    drifts: multiTermDrifts,
    concentration,
    averageGap: averageQuestionGap(data.byAssignment),
    includeSkillTaxonomy: true,
  });

  // Previous-term comparison for KPI cards
  const prevTerm = previousTermFor(data.byAssignment, term, 'ROE');
  const prevRoe = prevTerm ? data.byAssignment[prevTerm].ROE : null;
  const prevNormMean = prevRoe ? (prevRoe.scoreDistribution?.normalized_mean ?? 0) * 100 : 0;
  const prevUtil = prevRoe
    ? clean(
        computeMarkUtilization(
          computePartialCreditDepth(prevRoe.questions ?? []),
          prevRoe.meta?.uniqueStudents ?? prevRoe.meta?.validRecords ?? 0,
        ).overall * 100,
      )
    : 0;
  const meanComparison = ppComparison((dist.normalized_mean ?? 0) * 100, prevNormMean, prevTerm);
  const utilComparison = ppComparison(utilization.overall * 100, prevUtil, prevTerm);

  return (
    <div className={styles.page}>
      {term === '2025-01' && (
        <div className={styles.termContextBanner}>
          <div className={styles.termContextTag}>term context</div>
          <p className={styles.termContextText}>
            The 2025-01 ROE was the highest-difficulty evaluation observed across all four terms — 21% of
            available marks were earned on average across 23 questions. No student scored in the top 20%
            of the score range.
          </p>
        </div>
      )}

      {term === '2025-09' && (
        <div className={`${styles.termContextBanner} ${styles.termContextBannerGreen}`}>
          <div className={styles.termContextTag}>cross-term context</div>
          <p className={styles.termContextText}>
            The 2025-09 ROE had the highest marks utilization of any exam across all four terms —
            74.5%, compared to 21–29% in the other three terms. 357 of 671 students scored in the
            top 20% of the score range.
          </p>
        </div>
      )}

      <div className={styles.kpiGrid5}>
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
          value={toPercent(utilization.overall * 100, 1)}
          sub="of available marks earned"
          accentColor="var(--blue)"
          comparison={utilComparison}
        />
        <KpiCard
          label="Questions"
          value={questions.length}
          sub="ROE sections"
          accentColor="var(--green)"
        />
      </div>

      <SectionCard title="Question heatmap" sub="completion rate per ROE section: hardest to easiest">
        <QuestionHeatmap questions={questions} columns={3} showPartialCredit showTaxonomy />
      </SectionCard>

      {crossTermUtil.length > 1 && (
        <SectionCard
          title="Cross-term ROE difficulty"
          sub="marks utilization across all terms — same evaluation, very different difficulty"
        >
          <div className={styles.crossTermUtil}>
            {crossTermUtil.map(row => {
              const isCurrent = row.term === term;
              const isOutlier = outlier && row.term === outlier.term;
              const width = Math.max(0, Math.min(100, row.utilization));
              const fill = isOutlier
                ? 'var(--red)'
                : isCurrent ? 'var(--amber-text)' : '#9d9b94';
              return (
                <div key={row.term} className={styles.utilRow}>
                  <div className={`${styles.utilLabel}${isCurrent ? ' ' + styles.utilLabelCurrent : ''}`}>
                    {row.term}{isCurrent ? ' (this term)' : ''}
                  </div>
                  <div className={styles.utilBarTrack}>
                    <span className={styles.utilMidpointLine} />
                    <div
                      className={`${styles.utilBar}${isCurrent ? ' ' + styles.utilBarCurrent : ''}`}
                      style={{ width: `${width}%`, background: fill }}
                    />
                  </div>
                  <div className={styles.utilValue}>
                    {row.utilization.toFixed(1)}%
                    {isOutlier && <span className={styles.utilOutlierTag}>outlier</span>}
                  </div>
                </div>
              );
            })}
            <div className={styles.utilAxis}>
              <span />
              <span className={styles.utilAxisTicks}>
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </span>
              <span />
            </div>
          </div>
        </SectionCard>
      )}

      {multiTermDrifts.length > 0 && (
        <SectionCard title="Cross-term question drift" sub="questions appearing in multiple terms: completion rate over time">
          <CrossTermDriftChart drifts={multiTermDrifts} />
        </SectionCard>
      )}

      <SectionCard title="Score distribution" sub="submission counts per score bracket">
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
      </SectionCard>

      <SectionCard
        title="Submission activity across exam window"
        sub={`${toFixed(concentration.deadlineConcentration, 0)}% of submissions in final sixth; amber = deadline buckets`}
      >
        <SubmissionTimeline concentration={concentration} />
      </SectionCard>

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
