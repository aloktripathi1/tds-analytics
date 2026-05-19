import { useParams } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext.jsx';
import KpiCard          from '../components/shared/KpiCard.jsx';
import SectionCard      from '../components/shared/SectionCard.jsx';
import MiniDistribution from '../components/shared/MiniDistribution.jsx';
import ObsBox           from '../components/shared/ObsBox.jsx';
import QuestionHeatmap  from '../components/charts/QuestionHeatmap.jsx';
import SparklineDrift   from '../components/charts/SparklineDrift.jsx';
import { averageQuestionGap, buildObservations } from '../utils/observations.js';
import {
  classifyDistributionShape, computeSurpriseScores, computePartialCreditDepth,
  computeMarkUtilization, computeAllCrossTermDrifts,
  computeSkillTaxonomy, sanitizedMax, previousTermFor, ppComparison,
} from '../utils/transforms.js';
import { clean, formatScore, toFixed, toPercent } from '../utils/format-numbers.js';
import styles from './RoePage.module.css';

// SVG arc progress card for cross-term ROE comparison
const ARC_R = 36;
const ARC_CX = 48;
const ARC_CY = 48;
const ARC_CIRCUMFERENCE = 2 * Math.PI * ARC_R;

function arcColor(util) {
  if (util < 35) return 'var(--red)';
  if (util < 50) return 'var(--amber)';
  return 'var(--green)';
}

function ArcCard({ term, utilization, students, questionCount, isCurrent }) {
  const clampedUtil = Math.min(100, Math.max(0, utilization));
  const filled = (clampedUtil / 100) * ARC_CIRCUMFERENCE;
  const stroke = arcColor(utilization);

  return (
    <div className={`${styles.arcCard}${isCurrent ? ' ' + styles.arcCardCurrent : ''}`}>
      <div className={styles.arcTerm}>{term}</div>
      <div className={styles.arcSvgWrap}>
        <svg width="96" height="96" viewBox="0 0 96 96" style={{ display: 'block' }}>
          {/* Track */}
          <circle
            cx={ARC_CX} cy={ARC_CY} r={ARC_R}
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth="7"
          />
          {/* Progress arc — starts at 12 o'clock */}
          <circle
            cx={ARC_CX} cy={ARC_CY} r={ARC_R}
            fill="none"
            stroke={stroke}
            strokeWidth="7"
            strokeDasharray={`${filled} ${ARC_CIRCUMFERENCE - filled}`}
            strokeDashoffset={ARC_CIRCUMFERENCE / 4}
            strokeLinecap="round"
          />
        </svg>
        <div className={styles.arcNumber}>
          <span className={styles.arcPct}>
            {utilization.toFixed(0)}<span className={styles.arcPctSymbol}>%</span>
          </span>
        </div>
      </div>
      <div className={`${styles.arcMeta}${isCurrent ? ' ' + styles.arcMetaCurrent : ''}`}>
        {students > 0 && <div>{students.toLocaleString()} students</div>}
        {questionCount > 0 && <div>{questionCount} questions</div>}
        {isCurrent && <div>← this term</div>}
      </div>
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
          sub="marks utilization — same evaluation, very different difficulty across terms"
        >
          <div className={styles.arcGrid}>
            {crossTermUtil.map(row => {
              const roeData = data.byAssignment?.[row.term]?.ROE;
              const students = roeData?.meta?.uniqueStudents ?? roeData?.meta?.validRecords ?? 0;
              const questionCount = computePartialCreditDepth(roeData?.questions ?? []).length;
              return (
                <ArcCard
                  key={row.term}
                  term={row.term}
                  utilization={row.utilization}
                  students={students}
                  questionCount={questionCount}
                  isCurrent={row.term === term}
                />
              );
            })}
          </div>
        </SectionCard>
      )}

      {multiTermDrifts.length > 0 && (
        <SectionCard title="Cross-term question drift" sub="questions appearing in multiple terms: completion rate over time">
          <SparklineDrift drifts={multiTermDrifts} />
        </SectionCard>
      )}

      <SectionCard title="Score distribution" sub="submission counts per score bracket">
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
      </SectionCard>


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
