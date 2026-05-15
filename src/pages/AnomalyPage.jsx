import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDashboard } from '../context/DashboardContext.jsx';
import KpiCard from '../components/shared/KpiCard.jsx';
import ObsBox from '../components/shared/ObsBox.jsx';
import QuestionHeatmap from '../components/charts/QuestionHeatmap.jsx';
import SectionCard from '../components/shared/SectionCard.jsx';
import styles from './AnomalyPage.module.css';

const PATTERN_LABELS = {
  empty_submission: 'Scored on empty answer',
  hacked_by_marker: 'Scored on hack marker',
};

const DISCLAIMER = 'Hack % counts students whose best submission received marks for at least one question where the submitted answer was empty or contained a hack marker such as "hacked by". This is a data-quality signal from submissions and scores; review the underlying records before taking any action.';

function colorForPct(value) {
  if (value > 20) return 'var(--red)';
  if (value >= 10) return 'var(--amber)';
  return 'var(--green)';
}

function patternEntries(anomalies) {
  const byPattern = anomalies?.by_pattern ?? {};
  return Object.keys(PATTERN_LABELS).map(key => ({
    key,
    label: PATTERN_LABELS[key],
    count: byPattern[key] || 0,
  }));
}

function collectRows(data, termFilter, assignmentFilter) {
  const terms = termFilter === 'ALL' ? data.terms : [termFilter];
  const rows = [];

  for (const term of terms) {
    const assignments = data.assignmentsByTerm[term] ?? [];
    for (const assignment of assignments) {
      if (assignmentFilter !== 'ALL' && assignment !== assignmentFilter) continue;
      const item = data.byAssignment[term]?.[assignment];
      if (!item) continue;
      rows.push({
        term,
        assignment,
        key: `${term}-${assignment}`,
        totalStudents: item.meta?.unique_students || 0,
        postTerm: Boolean(item.post_term_addition),
        anomalies: item.anomalies,
      });
    }
  }
  return rows;
}

export default function AnomalyPage() {
  const { data } = useDashboard();
  const [termFilter, setTermFilter] = useState('ALL');
  const [assignmentFilter, setAssignmentFilter] = useState('ALL');

  const assignmentOptions = useMemo(() => {
    const terms = termFilter === 'ALL' ? data.terms : [termFilter];
    return [...new Set(terms.flatMap(term => data.assignmentsByTerm[term] ?? []))].sort();
  }, [data, termFilter]);

  const rows = useMemo(
    () => collectRows(data, termFilter, assignmentFilter),
    [data, termFilter, assignmentFilter],
  );

  const totals = rows.reduce((acc, row) => {
    const flagged = row.anomalies?.total_flagged_students || 0;
    acc.students += row.totalStudents;
    acc.flagged += flagged;
    for (const entry of patternEntries(row.anomalies)) {
      acc.patterns[entry.key] = (acc.patterns[entry.key] || 0) + entry.count;
    }
    return acc;
  }, { students: 0, flagged: 0, patterns: {} });

  const assignmentBars = rows
    .map(row => ({
      ...row,
      anomalyPct: row.anomalies?.anomaly_pct || 0,
      flagged: row.anomalies?.total_flagged_students || 0,
    }))
    .sort((a, b) => b.anomalyPct - a.anomalyPct);

  const highest = assignmentBars[0];
  const mostCommonPattern = Object.entries(totals.patterns)
    .sort((a, b) => b[1] - a[1])[0];

  const patternData = Object.keys(PATTERN_LABELS).map(key => ({
    pattern: PATTERN_LABELS[key],
    count: rows.reduce((sum, row) => sum + (row.anomalies?.by_pattern?.[key] || 0), 0),
  }));

  const heatmapQuestions = rows.flatMap(row => (row.anomalies?.by_question ?? []).map(q => ({
    id: `${row.key}-${q.question_id}`,
    label: `${row.assignment} ${q.label}`,
    anomalyPct: q.flagged_pct,
    flaggedCount: q.flagged_count,
  })));

  const crossTermData = data.terms.map(term => {
    const entry = { term };
    const summary = data.overview[term]?.hack_summary_by_assignment
      ?? data.overview[term]?.anomaly_summary_by_assignment
      ?? {};
    for (const assignment of assignmentOptions) {
      entry[assignment] = summary[assignment] ?? null;
    }
    return entry;
  });

  const flaggedPct = totals.students ? (totals.flagged / totals.students) * 100 : 0;

  return (
    <div className={styles.page}>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Term</span>
          <button
            className={`${styles.pill} ${termFilter === 'ALL' ? styles.active : ''}`}
            onClick={() => setTermFilter('ALL')}
          >
            All terms
          </button>
          {data.terms.map(term => (
            <button
              key={term}
              className={`${styles.pill} ${termFilter === term ? styles.active : ''}`}
              onClick={() => setTermFilter(term)}
            >
              {term}
            </button>
          ))}
        </div>
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Assignment</span>
          <select
            className={styles.select}
            value={assignmentFilter}
            onChange={(event) => setAssignmentFilter(event.target.value)}
          >
            <option value="ALL">All</option>
            {assignmentOptions.map(assignment => (
              <option key={assignment} value={assignment}>{assignment}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <KpiCard label="Students analyzed" value={totals.students} sub="valid best submissions" />
        <KpiCard
          label="Students hacked"
          value={totals.flagged}
          sub={`${flaggedPct.toFixed(1)}% hack rate`}
          accentColor="var(--amber)"
        />
        <KpiCard
          label="Highest assignment"
          value={highest ? `${highest.assignment}` : '-'}
          sub={highest ? `${highest.anomalyPct}% hack rate` : ''}
          accentColor="var(--red)"
        />
        <KpiCard
          label="Most common pattern"
          value={mostCommonPattern ? PATTERN_LABELS[mostCommonPattern[0]] : '-'}
          sub={mostCommonPattern ? `${mostCommonPattern[1]} students` : ''}
          accentColor="var(--blue)"
        />
      </div>

      <SectionCard title="Hack % by assignment" sub="students with scored empty answers or scored hack markers">
        <div className={styles.assignmentBars}>
          {assignmentBars.map(row => (
            <div key={row.key} className={`${styles.assignmentRow} ${row.postTerm ? styles.postTerm : ''}`}>
              <div className={styles.assignmentLabel}>
                <span>{row.term} {row.assignment}</span>
                <span>{row.flagged} students</span>
              </div>
              <div className={styles.track}>
                <div
                  className={styles.bar}
                  style={{ width: `${Math.min(row.anomalyPct, 100)}%`, background: colorForPct(row.anomalyPct) }}
                />
              </div>
              <div className={styles.assignmentPct}>{row.anomalyPct}%</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Per-question hack heatmap" sub="higher hack rates sort first">
        {heatmapQuestions.length ? (
          <div className={styles.heatmapPanel}>
            <QuestionHeatmap questions={heatmapQuestions} columns={4} mode="anomaly" />
          </div>
        ) : (
          <div className={styles.empty}>No per-question answer data is available for this filter.</div>
        )}
      </SectionCard>

      <SectionCard title="Hack reason breakdown" sub="absolute student counts by reason">
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={patternData} margin={{ top: 8, right: 12, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="pattern" angle={-25} textAnchor="end" interval={0} height={72} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" name="students">
                {patternData.map((entry, index) => (
                  <Cell key={entry.pattern} fill={['#E24B4A', '#EF9F27', '#378ADD'][index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {termFilter === 'ALL' && (
        <SectionCard title="Cross-term view" sub="assignment hack percentage by term">
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={crossTermData} margin={{ top: 8, right: 24, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="term" />
                <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, 'hack rate']} />
                <Legend />
                {assignmentOptions.map((assignment, index) => (
                  <Line
                    key={assignment}
                    type="monotone"
                    dataKey={assignment}
                    connectNulls
                    stroke={['#1D9E75', '#378ADD', '#EF9F27', '#E24B4A', '#888780', '#5DCAA5'][index % 6]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      )}

      <ObsBox tag="data caveat">{DISCLAIMER}</ObsBox>
    </div>
  );
}
