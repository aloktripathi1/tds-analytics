// data/loader.js
// Flip USE_MOCK to false when real pipeline JSONs are in data/pipeline/
import { mockData } from './mock.js';

const USE_MOCK = false;

let _data = null;

function parseCsvLine(line) {
  const cells = [];
  let value = '';
  let quoted = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    const next = line[i + 1];
    if (ch === '"' && quoted && next === '"') {
      value += '"';
      i++;
    } else if (ch === '"') {
      quoted = !quoted;
    } else if (ch === ',' && !quoted) {
      cells.push(value);
      value = '';
    } else {
      value += ch;
    }
  }
  cells.push(value);
  return cells;
}

function percentile(arr, p) {
  if (!arr.length) return 0;
  const index = (arr.length - 1) * p;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  if (upper >= arr.length) return arr[lower];
  return arr[lower] * (1 - weight) + arr[upper] * weight;
}

function stdDev(arr) {
  if (!arr.length) return 0;
  const mean = arr.reduce((sum, value) => sum + value, 0) / arr.length;
  const variance = arr.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

function parseStage1Csv(raw, term, assignment) {
  const lines = raw.split(/\r?\n/).filter(line => line.trim());
  const headers = parseCsvLine(lines[0] ?? '').map(h => h.trim());
  const rows = lines.slice(1).map(line => {
    const cells = parseCsvLine(line);
    return Object.fromEntries(headers.map((h, index) => [h, cells[index] ?? '']));
  });

  const students = new Map();
  for (const row of rows) {
    const total = row.total === '' ? 0 : Number(row.total || 0);
    if (total === -1) continue;
    const email = row.email || row.id || row.student_id;
    if (!email) continue;
    const time = row.time ? Number(row.time) : null;
    const previous = students.get(email);
    if (!previous || total > previous.total || (total === previous.total && time > previous.time)) {
      students.set(email, { total, max: Number(row.max || 0), time });
    }
  }

  const totals = [...students.values()].map(s => s.total).sort((a, b) => a - b);
  const maxPossible = Math.max(...[...students.values()].map(s => s.max || s.total || 0));
  const mean = totals.reduce((sum, value) => sum + value, 0) / (totals.length || 1);
  const buckets = { '0_20pct': 0, '20_40pct': 0, '40_60pct': 0, '60_80pct': 0, '80_100pct': 0 };
  for (const total of totals) {
    const ratio = maxPossible > 0 ? total / maxPossible : 0;
    if (ratio < 0.20) buckets['0_20pct']++;
    else if (ratio < 0.40) buckets['20_40pct']++;
    else if (ratio < 0.60) buckets['40_60pct']++;
    else if (ratio < 0.80) buckets['60_80pct']++;
    else buckets['80_100pct']++;
  }

  return {
    term,
    assignment,
    type: assignment.startsWith('GA') ? 'GA' : assignment,
    post_term_addition: false,
    schema_notes: `CSV columns: ${headers.join(', ')}`,
    meta: {
      total_records: rows.length,
      valid_records: totals.length,
      unique_students: totals.length,
      max_possible_total: maxPossible,
    },
    score_distribution: {
      mean: Number(mean.toFixed(2)),
      median: Number(percentile(totals, 0.5).toFixed(2)),
      std_dev: Number(stdDev(totals).toFixed(2)),
      min: totals[0] ?? 0,
      max: totals[totals.length - 1] ?? 0,
      p10: Number(percentile(totals, 0.1).toFixed(2)),
      p25: Number(percentile(totals, 0.25).toFixed(2)),
      p50: Number(percentile(totals, 0.5).toFixed(2)),
      p75: Number(percentile(totals, 0.75).toFixed(2)),
      p90: Number(percentile(totals, 0.9).toFixed(2)),
      normalized_mean: Number((maxPossible > 0 ? mean / maxPossible : 0).toFixed(2)),
      buckets,
    },
    questions: [],
    timing: { skipped: true, skip_reason: 'CSV format - no per-question timestamps or answers' },
    anomalies: {
      total_flagged_students: 0,
      anomaly_pct: 0,
      by_question: [],
      by_pattern: { empty_submission: 0, hacked_by_marker: 0 },
      unavailable: true,
      reason: 'hack percentage unavailable - CSV format has no per-question answers',
    },
  };
}

function normalizeAssignment(ga) {
  if (ga.questions) {
    ga.questions.forEach(q => {
      if (q.completion_rate !== undefined) q.completionRate = q.completion_rate * 100;
      if (q.mean_score !== undefined) q.meanScore = q.mean_score;
      if (q.max_possible !== undefined) q.maxPossible = q.max_possible;
    });
  }
  if (ga.meta) {
    if (ga.meta.valid_records !== undefined) ga.meta.validRecords = ga.meta.valid_records;
    if (ga.meta.max_possible_total !== undefined) ga.meta.maxPossible = ga.meta.max_possible_total;
  }
  if (ga.score_distribution) {
    ga.scoreDistribution = ga.score_distribution;
    ga.scoreDistribution.stdDev = ga.score_distribution.std_dev;
    if (ga.score_distribution.buckets) {
      ga.scoreDistribution.buckets = {
        "0_20": ga.score_distribution.buckets["0_20pct"] || 0,
        "20_40": ga.score_distribution.buckets["20_40pct"] || 0,
        "40_60": ga.score_distribution.buckets["40_60pct"] || 0,
        "60_80": ga.score_distribution.buckets["60_80pct"] || 0,
        "80_100": ga.score_distribution.buckets["80_100pct"] || 0,
      };
    }
  }
  if (ga.timing) {
    ga.timing.earlyGt6h = { count: ga.timing.early_gt6h?.count || 0, avgScore: ga.timing.early_gt6h?.avg_score || 0 };
    ga.timing.mid1To6h = { count: ga.timing.mid_1_6h?.count || 0, avgScore: ga.timing.mid_1_6h?.avg_score || 0 };
    ga.timing.lastLt1h = { count: ga.timing.last_lt1h?.count || 0, avgScore: ga.timing.last_lt1h?.avg_score || 0 };
  }
  return ga;
}

export function getData() {
  if (_data) return _data;

  if (USE_MOCK) {
    _data = mockData;
    return _data;
  }

  // ── Real pipeline loading (Vite eager imports) ──────────────────────
  // Stage 1 files live in data/pipeline/stage1/*.json
  // Filename pattern: "2026-01-ga2.json" → term="2026-01" assignment="GA2"
  const stage1Files = import.meta.glob('./pipeline/stage1/*.json', { eager: true });
  const byAssignment = {};

  for (const [path, module] of Object.entries(stage1Files)) {
    const filename = path.split('/').pop().replace('.json', '');
    const parts = filename.split('-');
    const term = parts.slice(0, 2).join('-');
    const rawId = parts.slice(2).join('-');
    const assignment = rawId.toUpperCase();
    if (!byAssignment[term]) byAssignment[term] = {};
    const ga = module.default ?? module;
    byAssignment[term][assignment] = normalizeAssignment(ga);
  }

  const stage1CsvFiles = import.meta.glob('./pipeline/stage1/*.csv', { eager: true, query: '?raw', import: 'default' });
  for (const [path, raw] of Object.entries(stage1CsvFiles)) {
    const filename = path.split('/').pop().replace('.csv', '');
    const parts = filename.split('-');
    const term = parts.slice(0, 2).join('-');
    const assignment = parts.slice(2).join('-').toUpperCase();
    if (byAssignment[term]?.[assignment]) continue;
    if (!byAssignment[term]) byAssignment[term] = {};
    byAssignment[term][assignment] = normalizeAssignment(parseStage1Csv(raw, term, assignment));
  }

  // Stage 2 files contain overview aggregates per term
  const stage2Files = import.meta.glob('./pipeline/stage2/*.json', { eager: true });
  const overview = {};
  for (const [path, module] of Object.entries(stage2Files)) {
    const term = path.split('/').pop().replace('.json', '');
    overview[term] = module.default ?? module;
  }

  _data = {
    terms: Object.keys(byAssignment).sort(),
    assignmentsByTerm: Object.fromEntries(
      Object.entries(byAssignment).map(([t, gas]) => [t, Object.keys(gas)])
    ),
    byAssignment,
    overview,
  };
  return _data;
}
