import { useParams } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext.jsx';
import KpiCard          from '../components/shared/KpiCard.jsx';
import SectionCard      from '../components/shared/SectionCard.jsx';
import MiniDistribution from '../components/shared/MiniDistribution.jsx';
import ObsBox           from '../components/shared/ObsBox.jsx';
import QuestionHeatmap  from '../components/charts/QuestionHeatmap.jsx';
import {
  completionObs, spreadObs,
  distributionShapeObs, surpriseObs, partialCreditObs,
  markUtilizationObs, crossTermDriftObs, submissionConcentrationObs,
  skillTaxonomyObs,
} from '../utils/observations.js';
import {
  classifyDistributionShape, computeSurpriseScores, computePartialCreditDepth,
  computeMarkUtilization, computeAllCrossTermDrifts, computeSubmissionConcentration,
  computeSkillTaxonomy,
} from '../utils/transforms.js';
import { toFixed, toPercent } from '../utils/format-numbers.js';
import styles from './RoePage.module.css';

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

export default function RoePage() {
  const { term } = useParams();
  const { data } = useDashboard();

  const roe = data.byAssignment?.[term]?.ROE;
  if (!roe) {
    return <div className={styles.empty}>No ROE data found for term <strong>{term}</strong>.</div>;
  }

  const { meta, scoreDistribution: dist, questions: rawQuestions = [] } = roe;
  const maxP = meta.maxPossible;

  // Enrich questions with all analytical layers
  const questionsWithPartial = computePartialCreditDepth(rawQuestions);
  const questionsWithSurprise = computeSurpriseScores(questionsWithPartial);
  const questions = questionsWithSurprise.map(q => ({ ...q, skillTaxonomy: computeSkillTaxonomy(q) }));

  // Distribution shape
  const distShape = dist ? classifyDistributionShape(dist.mean, dist.median, dist.stdDev, dist.buckets) : null;

  // Mark utilization
  const utilization = computeMarkUtilization(questions, meta.uniqueStudents ?? meta.validRecords);

  // Submission concentration
  const concentration = computeSubmissionConcentration(roe.timing);

  // Cross-term drift — gather all ROE data across terms
  const allRoeTermsData = Object.entries(data.byAssignment ?? {})
    .filter(([, assignments]) => assignments.ROE)
    .map(([t, assignments]) => ({ term: t, questions: computePartialCreditDepth(assignments.ROE.questions ?? []) }));
  const crossTermDrifts = computeAllCrossTermDrifts(allRoeTermsData);
  const multiTermDrifts = crossTermDrifts.filter(d => Object.keys(d.byTerm).length > 1);

  // Observations
  const distObs = distShape
    ? distributionShapeObs(distShape.bimodal ? 'bimodal' : distShape.shape, distShape.bottomPct, distShape.topPct, `ROE ${term}`)
    : null;
  const surpriseText = surpriseObs(questions);
  const partialText = partialCreditObs(questions);
  const utilObs = markUtilizationObs(utilization.overall);
  const driftObs = crossTermDriftObs(multiTermDrifts);
  const concObs = submissionConcentrationObs(concentration);
  const taxObs = skillTaxonomyObs(questions);

  return (
    <div className={styles.page}>
      {/* 1. KPI row — 5 cards */}
      <div className={styles.kpiGrid5}>
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
          label="Questions"
          value={questions.length}
          sub="ROE sections"
          accentColor="var(--green)"
        />
      </div>

      {/* 2. Heatmap with enriched cells */}
      <SectionCard title="Question heatmap" sub="completion rate per ROE section — hardest → easiest">
        <QuestionHeatmap questions={questions} columns={3} showPartialCredit showTaxonomy />
      </SectionCard>

      {/* 3. Cross-term drift — only if recurring questions exist */}
      {multiTermDrifts.length > 0 && (
        <SectionCard title="Cross-term question drift" sub="questions appearing in multiple terms — completion rate over time">
          <CrossTermDriftChart drifts={multiTermDrifts} />
        </SectionCard>
      )}

      {/* 4. Distribution with shape classification */}
      <SectionCard title="Score distribution" sub="submission counts per score bracket">
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
      </SectionCard>

      {/* 5. Submission concentration timeline */}
      <SectionCard
        title="Submission activity across exam window"
        sub={`${concentration.deadlineConcentration.toFixed(0)}% of submissions in final sixth — amber = deadline buckets`}
      >
        <SubmissionTimeline concentration={concentration} />
      </SectionCard>


      {/* 7. Surprise factor */}
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

      {/* 8. Observed patterns */}
      <SectionCard title="Observed patterns" sub="generated from ROE submission data — all analytical lenses">
        <ObsBox tag="question completion">{completionObs(questions)}</ObsBox>
        <ObsBox tag="score spread">{spreadObs(dist)}</ObsBox>
        {distObs && <ObsBox tag="distribution shape">{distObs}</ObsBox>}
        <ObsBox tag="marks utilization">{utilObs}</ObsBox>
        {surpriseText && <ObsBox tag="surprise factor">{surpriseText}</ObsBox>}
        {partialText && <ObsBox tag="partial credit">{partialText}</ObsBox>}
        {driftObs && <ObsBox tag="cross-term drift">{driftObs}</ObsBox>}
        {concObs && <ObsBox tag="submission concentration">{concObs}</ObsBox>}
        <ObsBox tag="skill taxonomy">{taxObs}</ObsBox>
      </SectionCard>
    </div>
  );
}
