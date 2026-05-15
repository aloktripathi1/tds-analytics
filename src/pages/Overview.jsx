import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';
import KpiCard          from '../components/shared/KpiCard.jsx';
import SectionCard      from '../components/shared/SectionCard.jsx';
import BarRow           from '../components/shared/BarRow.jsx';
import MiniDistribution from '../components/shared/MiniDistribution.jsx';
import { difficultyColor, retentionColor, toPercent } from '../utils/format-numbers.js';
import styles from './Overview.module.css';

export default function Overview() {
  const { data, selectedTerm } = useDashboard();
  const ov = data.overview?.[selectedTerm] ?? {};
  const assignments = data.assignmentsByTerm?.[selectedTerm] ?? [];
  const difficulty  = [...(ov.difficultyRanking ?? [])].sort((a, b) => a.normalizedMean - b.normalizedMean);
  const regularDifficulty = [...(ov.regularDifficultyRanking ?? ov.difficultyRanking ?? [])]
    .sort((a, b) => a.normalizedMean - b.normalizedMean);
  const retention   = ov.retention ?? [];
  const hasPostTermRetention = retention.some(r => r.postTerm);
  const [dismissed, setDismissed] = useState(() => localStorage.getItem('tds-disclaimer-dismissed') === '1');

  // KPI: avg completion — mean of all question completionRates across all GAs
  let totalComp = 0, compCount = 0;
  assignments.forEach(a => {
    const ga = data.byAssignment?.[selectedTerm]?.[a];
    if (!ga?.questions) return;
    ga.questions.forEach(q => { totalComp += q.completionRate; compCount++; });
  });
  const avgCompletion = compCount ? totalComp / compCount : 0;

  // Hardest assignment
  const hardest = regularDifficulty[0] ?? {};

  return (
    <div className={styles.page}>
      <div style={{
        background: 'var(--amber-bg)',
        borderBottom: '0.5px solid var(--amber-dark)',
        padding: '10px 20px',
        display: dismissed ? 'none' : 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 13,
        color: 'var(--amber-text)',
        fontFamily: 'var(--font-mono)',
      }}>
        <span>
          Aggregated data only — no individual student information is stored
          or displayed. All figures are cohort-level statistics.
        </span>
        <button
          onClick={() => {
            setDismissed(true);
            localStorage.setItem('tds-disclaimer-dismissed', '1');
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            color: 'var(--amber-text)',
          }}
        >
          ×
        </button>
      </div>
      {/* Row 1 — KPI grid */}
      <div className={styles.kpiGrid}>
        <KpiCard
          label="Assignments tracked"
          value={assignments.length}
          sub={`in ${selectedTerm}`}
        />
        <KpiCard
          label="Total students"
          value={ov.totalStudents ?? '—'}
          sub="unique learners"
        />
        <KpiCard
          label="Hardest assignment"
          value={hardest.assignment ?? '—'}
          sub={hardest.normalizedMean ? `${toPercent(hardest.normalizedMean * 100, 0)} avg score` : ''}
          accentColor="var(--red)"
        />
        <KpiCard
          label="Avg completion"
          value={toPercent(avgCompletion, 1)}
          sub="across all questions"
          accentColor="var(--amber)"
        />
      </div>

      {/* Row 2 — Assignment difficulty */}
      <SectionCard
        title="Assignment difficulty"
        sub="normalised mean score — sorted hardest → easiest"
      >
        {difficulty.map(d => (
          <BarRow
            key={d.assignment}
            label={d.assignment}
            value={d.normalizedMean * 100}
            color={difficultyColor(d.normalizedMean)}
            displayValue={toPercent(d.normalizedMean * 100, 0)}
          />
        ))}
      </SectionCard>

      {/* Row 3 — two-column */}
      <div className={styles.twoCol}>
        <SectionCard
          title="Score distribution — all GAs combined"
          sub="percentage of submissions per score bracket"
        >
          <MiniDistribution
            buckets={ov.combinedBuckets}
            colors={['#E24B4A', '#EF9F27', '#888780', '#97C459', '#1D9E75']}
          />
        </SectionCard>

        <SectionCard
          title="Student retention"
          sub="% of largest cohort submitting each assignment"
        >
          {retention.map(r => (
            <BarRow
              key={r.assignment}
              label={r.postTerm ? `${r.assignment}*` : r.assignment}
              value={r.pct}
              color={retentionColor(r.pct)}
              displayValue={`${r.pct}%`}
            />
          ))}
          {hasPostTermRetention && (
            <div style={{
              marginTop: 6,
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
            }}>
              * Post-term assignments (GA7/GA8) included for visibility.
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
