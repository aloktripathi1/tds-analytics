import { useParams } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext.jsx';
import KpiCard          from '../components/shared/KpiCard.jsx';
import SectionCard      from '../components/shared/SectionCard.jsx';
import BarRow           from '../components/shared/BarRow.jsx';
import MiniDistribution from '../components/shared/MiniDistribution.jsx';
import ObsBox           from '../components/shared/ObsBox.jsx';
import QuestionHeatmap  from '../components/charts/QuestionHeatmap.jsx';
import { roeCorrelationObs, completionObs, spreadObs } from '../utils/observations.js';
import { toFixed } from '../utils/format-numbers.js';
import styles from './RoePage.module.css';

export default function RoePage() {
  const { term } = useParams();
  const { data } = useDashboard();

  const roe = data.byAssignment?.[term]?.ROE;
  if (!roe) {
    return (
      <div className={styles.empty}>
        No ROE data found for term <strong>{term}</strong>.
      </div>
    );
  }

  const { meta, scoreDistribution: dist, questions = [], roeGaCorrelation, gaQuartileRoeScores } = roe;
  const maxP = meta.maxPossible;

  const corr = roeGaCorrelation?.r ?? 0;
  const quartile = gaQuartileRoeScores ?? {};

  return (
    <div className={styles.page}>
      {/* Row 1 — KPIs */}
      <div className={styles.kpiGrid}>
        <KpiCard
          label="Valid submissions"
          value={meta.validRecords}
          sub="unique students"
        />
        <KpiCard
          label="Mean score"
          value={`${toFixed(dist.mean, 1)}/${maxP}`}
          sub={`median ${dist.median}`}
          accentColor="var(--amber)"
        />
        <KpiCard
          label="GA correlation"
          value={toFixed(corr, 2)}
          sub="Pearson r vs GA avg"
          accentColor="var(--blue)"
        />
        <KpiCard
          label="Questions"
          value={questions.length}
          sub="ROE sections"
          accentColor="var(--green)"
        />
      </div>

      {/* Row 2 — Heatmap (3 columns for ROE) */}
      <SectionCard
        title="Question heatmap"
        sub="completion rate per ROE section — hardest → easiest"
      >
        <QuestionHeatmap questions={questions} columns={3} />
      </SectionCard>

      {/* Row 3 — two-column */}
      <div className={styles.twoCol}>
        {/* Distribution */}
        <SectionCard
          title="Score distribution"
          sub="submission counts per score bracket"
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

        {/* ROE vs GA comparison */}
        <SectionCard
          title="ROE vs GA comparison"
          sub="avg ROE score by GA performance quartile"
        >
          <BarRow
            label="GA top 25%"
            value={quartile.top25 ?? 0}
            color="green"
            displayValue={`${quartile.top25 ?? 0}%`}
          />
          <BarRow
            label="GA mid 50%"
            value={quartile.mid50 ?? 0}
            color="amber"
            displayValue={`${quartile.mid50 ?? 0}%`}
          />
          <BarRow
            label="GA bottom 25%"
            value={quartile.bottom25 ?? 0}
            color="red"
            displayValue={`${quartile.bottom25 ?? 0}%`}
          />
          <div className={styles.corrNote}>
            Pearson r = {toFixed(corr, 2)} (GA avg ↔ ROE score)
          </div>
        </SectionCard>
      </div>

      {/* Row 4 — Observations */}
      <SectionCard title="Observed patterns" sub="generated from ROE submission data">
        <ObsBox tag="question completion">
          {completionObs(questions)}
        </ObsBox>
        <ObsBox tag="score spread">
          {spreadObs(dist)}
        </ObsBox>
        <ObsBox tag="ga correlation">
          {roeCorrelationObs(corr, quartile.top25 ?? 0, quartile.mid50 ?? 0, quartile.bottom25 ?? 0)}
        </ObsBox>
      </SectionCard>
    </div>
  );
}
