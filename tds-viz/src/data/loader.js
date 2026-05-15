// data/loader.js
// Flip USE_MOCK to false when real pipeline JSONs are in data/pipeline/
import { mockData } from './mock.js';

const USE_MOCK = false;

let _data = null;

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
    
    // Normalize snake_case pipeline output to match expected camelCase UI structure
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
    
    byAssignment[term][assignment] = ga;
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
