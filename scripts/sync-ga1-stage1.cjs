const fs = require('fs');
const path = require('path');

const QUIZ_ID = process.env.QUIZ_ID || 'tds-2026-01-ga1';
const FILTER_ENDPOINT = process.env.FILTER_ENDPOINT || 'https://exam.sanand.workers.dev/filter';
const PAGE_LIMIT = Number(process.env.PAGE_LIMIT || 500);
const STAGE1_DIR = path.join(__dirname, '..', 'src', 'data', 'pipeline', 'stage1');
const STAGE2_DIR = path.join(__dirname, '..', 'src', 'data', 'pipeline', 'stage2');

const BUCKET_KEYS = ['0_20pct', '20_40pct', '40_60pct', '60_80pct', '80_100pct'];

function toTimeMs(value) {
  if (value == null || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const num = Number(value);
  if (Number.isFinite(num)) return num;
  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : null;
}

function getScore(scoreValue) {
  if (scoreValue == null) return 0;
  if (typeof scoreValue === 'object') return Number(scoreValue.score || 0);
  return Number(scoreValue || 0);
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
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

function pointBiserial(binaryArr, continuousArr) {
  const n = binaryArr.length;
  if (!n) return null;
  let n1 = 0, n0 = 0, sum1 = 0, sum0 = 0, total = 0, totalSq = 0;
  for (let i = 0; i < n; i++) {
    const val = continuousArr[i];
    total += val;
    totalSq += val * val;
    if (binaryArr[i] === 1) {
      n1++;
      sum1 += val;
    } else {
      n0++;
      sum0 += val;
    }
  }
  if (!n1 || !n0) return null;
  const mean1 = sum1 / n1;
  const mean0 = sum0 / n0;
  const mean = total / n;
  const variance = totalSq / n - mean * mean;
  if (variance <= 0) return null;
  return ((mean1 - mean0) / Math.sqrt(variance)) * Math.sqrt((n1 / n) * (n0 / n));
}

function classifyQuestion(z, f, p, c) {
  if (z > 0.70) return 'BROKEN';
  if (z > 0.50 && p < 0.15) return 'BINARY';
  if (p > 0.25) return 'CALIBRATED';
  if (c > 0.60 && f < 0.60) return 'DISCRIMINATIVE';
  if (f > 0.80) return 'EASY';
  return 'CALIBRATED';
}

function collectStudentRow(students, row) {
  if (Number(row.total) === -1) return false;
  if (!row.email) return false;

  const compactRow = {
    time: row.time ?? null,
    quiz: row.quiz || '',
    email: row.email,
    total: Number(row.total || 0),
    max: Number(row.max || 0),
    scores: row.scores || {}
  };

  const timeMs = toTimeMs(compactRow.time);
  const existing = students[compactRow.email];
  if (!existing) {
    students[compactRow.email] = { bestSub: compactRow, firstTime: timeMs };
    return true;
  }

  if (timeMs != null && (existing.firstTime == null || timeMs < existing.firstTime)) {
    existing.firstTime = timeMs;
  }

  const bestTime = toTimeMs(existing.bestSub.time);
  const rowTotal = Number(compactRow.total || 0);
  const bestTotal = Number(existing.bestSub.total || 0);
  if (rowTotal > bestTotal || (rowTotal === bestTotal && timeMs != null && (bestTime == null || timeMs > bestTime))) {
    existing.bestSub = compactRow;
  }
  return true;
}

function computeQuestionStats(students) {
  const emails = Object.keys(students);
  const qScores = {};
  const qMax = {};
  for (const email of emails) {
    const scores = students[email].bestSub.scores || {};
    for (const [qid, scoreValue] of Object.entries(scores)) {
      if (!qScores[qid]) qScores[qid] = {};
      qScores[qid][email] = getScore(scoreValue);
    }
  }
  for (const qid of Object.keys(qScores)) qMax[qid] = Math.max(...Object.values(qScores[qid]));

  const questions = [];
  const n = emails.length;
  for (const qid of Object.keys(qScores)) {
    const maxP = qMax[qid];
    if (maxP === 0) continue;
    let z = 0, f = 0, p = 0, c = 0, sum = 0;
    const binaryArr = [];
    const contArr = [];
    const filledScores = [];
    for (const email of emails) {
      const score = qScores[qid][email] ?? 0;
      filledScores.push(score);
      sum += score;
      if (score === 0) z++;
      else c++;
      if (score === maxP) f++;
      if (score > 0 && score < maxP) p++;
      binaryArr.push(score > 0 ? 1 : 0);
      contArr.push(Number(students[email].bestSub.total || 0) - score);
    }
    const mean = n ? sum / n : 0;
    const rpb = pointBiserial(binaryArr, contArr);
    questions.push({
      id: qid,
      label: qid,
      max_possible: maxP,
      mean_score: Number(mean.toFixed(2)),
      normalized_mean: Number((mean / maxP).toFixed(2)),
      zero_rate: Number((z / n).toFixed(2)),
      full_rate: Number((f / n).toFixed(2)),
      partial_rate: Number((p / n).toFixed(2)),
      completion_rate: Number((c / n).toFixed(2)),
      std_dev: Number(stdDev(filledScores).toFixed(2)),
      discriminative_proxy: rpb == null ? null : Number(rpb.toFixed(2)),
      classification: classifyQuestion(z / n, f / n, p / n, c / n)
    });
  }
  questions.sort((a, b) => a.completion_rate - b.completion_rate);
  return { questions, maxPossibleTotal: Object.values(qMax).reduce((sum, value) => sum + value, 0) };
}

function computeBuckets(totalScores, maxPossibleTotal) {
  const buckets = { '0_20pct': 0, '20_40pct': 0, '40_60pct': 0, '60_80pct': 0, '80_100pct': 0 };
  for (const score of totalScores) {
    const ratio = maxPossibleTotal > 0 ? score / maxPossibleTotal : 0;
    if (ratio >= 0 && ratio < 0.20) buckets['0_20pct']++;
    else if (ratio >= 0.20 && ratio < 0.40) buckets['20_40pct']++;
    else if (ratio >= 0.40 && ratio < 0.60) buckets['40_60pct']++;
    else if (ratio >= 0.60 && ratio < 0.80) buckets['60_80pct']++;
    else buckets['80_100pct']++;
  }
  return buckets;
}

function computeTiming(students, latestTime, maxPossibleTotal) {
  if (latestTime == null) {
    return {
      skipped: true,
      skip_reason: 'No timestamps available',
      deadline_ms: null,
      early_gt6h: { count: 0, avg_score: 0 },
      mid_1_6h: { count: 0, avg_score: 0 },
      last_lt1h: { count: 0, avg_score: 0 }
    };
  }

  const timing = {
    skipped: false,
    skip_reason: null,
    deadline_ms: latestTime,
    early_gt6h: { count: 0, avg_score: 0 },
    mid_1_6h: { count: 0, avg_score: 0 },
    last_lt1h: { count: 0, avg_score: 0 },
    max_possible_total: maxPossibleTotal
  };
  let earlySum = 0, midSum = 0, lateSum = 0;
  for (const student of Object.values(students)) {
    const total = Number(student.bestSub.total || 0);
    const hBefore = student.firstTime == null ? 0 : (latestTime - student.firstTime) / 3600000;
    if (hBefore > 6) {
      timing.early_gt6h.count++;
      earlySum += total;
    } else if (hBefore >= 1) {
      timing.mid_1_6h.count++;
      midSum += total;
    } else {
      timing.last_lt1h.count++;
      lateSum += total;
    }
  }
  if (timing.early_gt6h.count) timing.early_gt6h.avg_score = Number((earlySum / timing.early_gt6h.count).toFixed(2));
  if (timing.mid_1_6h.count) timing.mid_1_6h.avg_score = Number((midSum / timing.mid_1_6h.count).toFixed(2));
  if (timing.last_lt1h.count) timing.last_lt1h.avg_score = Number((lateSum / timing.last_lt1h.count).toFixed(2));
  return timing;
}

function buildStage1({ students, totalRecords, validRecords, latestTime }) {
  const term = '2026-01';
  const assignment = 'GA1';
  const uniqueStudents = Object.keys(students).length;
  const { questions, maxPossibleTotal: questionMaxTotal } = computeQuestionStats(students);
  const bestMax = Math.max(...Object.values(students).map(s => Number(s.bestSub.max || 0)));
  const maxPossibleTotal = questionMaxTotal > 0 ? questionMaxTotal : bestMax;
  const totalScores = Object.values(students).map(s => Number(s.bestSub.total || 0)).sort((a, b) => a - b);
  const mean = totalScores.reduce((sum, value) => sum + value, 0) / uniqueStudents;

  return {
    file: `${QUIZ_ID}.json`,
    term,
    assignment,
    type: 'GA',
    post_term_addition: false,
    schema_notes: `Fetched from ${FILTER_ENDPOINT} with limit=${PAGE_LIMIT}; raw records discarded after score/timestamp aggregation. Per-question answer data not retained.`,
    meta: {
      total_records: totalRecords,
      valid_records: validRecords,
      unique_students: uniqueStudents,
      late_submissions: 0,
      max_possible_total: Number(maxPossibleTotal.toFixed(2)),
      question_max_total: Number(questionMaxTotal.toFixed(2)),
      deadline_inferred: latestTime == null ? null : new Date(latestTime).toISOString(),
      deadline_method: latestTime == null ? null : 'latest_timestamp',
      data_cross_check: 'ok'
    },
    score_distribution: {
      mean: Number(mean.toFixed(2)),
      median: Number(percentile(totalScores, 0.5).toFixed(2)),
      std_dev: Number(stdDev(totalScores).toFixed(2)),
      min: totalScores[0],
      max: totalScores[totalScores.length - 1],
      p10: Number(percentile(totalScores, 0.1).toFixed(2)),
      p25: Number(percentile(totalScores, 0.25).toFixed(2)),
      p50: Number(percentile(totalScores, 0.5).toFixed(2)),
      p75: Number(percentile(totalScores, 0.75).toFixed(2)),
      p90: Number(percentile(totalScores, 0.9).toFixed(2)),
      normalized_mean: Number((maxPossibleTotal > 0 ? mean / maxPossibleTotal : 0).toFixed(2)),
      buckets: computeBuckets(totalScores, maxPossibleTotal)
    },
    questions,
    timing: computeTiming(students, latestTime, maxPossibleTotal),
    roe_specific: null,
    project_specific: null,
    flags: [],
    observations: [],
    anomalies: {
      total_flagged_students: 0,
      anomaly_pct: 0,
      by_question: [],
      by_pattern: { empty_submission: 0, hacked_by_marker: 0 },
      unavailable: true,
      reason: 'hack percentage unavailable - paged aggregation stores scores and timestamps only'
    }
  };
}

async function fetchStage1() {
  let students = {};
  let totalRecords = 0;
  let validRecords = 0;
  let latestTime = null;
  let limit = PAGE_LIMIT;

  for (let pageNumber = 0; ; pageNumber++) {
    const url = `${FILTER_ENDPOINT}?quiz=${encodeURIComponent(QUIZ_ID)}&limit=${limit}&page=${pageNumber}`;
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status >= 500 && limit > 50) {
        const nextLimit = Math.max(50, Math.floor(limit / 2));
        console.log(`Endpoint returned HTTP ${response.status} for limit=${limit}; restarting with limit=${nextLimit}`);
        limit = nextLimit;
        students = {};
        totalRecords = 0;
        validRecords = 0;
        latestTime = null;
        pageNumber = -1;
        continue;
      }
      throw new Error(`Filter request failed at page ${pageNumber}: HTTP ${response.status}`);
    }
    const payload = await response.json();
    const page = Array.isArray(payload.data) ? payload.data : null;
    if (!page) throw new Error(`Filter request failed at page ${pageNumber}: ${JSON.stringify(payload).slice(0, 500)}`);

    totalRecords += page.length;
    for (const row of page) {
      if (collectStudentRow(students, row)) {
        validRecords++;
        const timeMs = toTimeMs(row.time);
        if (timeMs != null && (latestTime == null || timeMs > latestTime)) latestTime = timeMs;
      }
    }
    console.log(`Aggregated page=${pageNumber} count=${page.length} students=${Object.keys(students).length}`);
    if (page.length < limit) break;
  }

  return buildStage1({ students, totalRecords, validRecords, latestTime });
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function rebuildStage2(term) {
  const files = fs.readdirSync(STAGE1_DIR).filter(file => file.startsWith(`${term}-`) && file.endsWith('.json'));
  const assignments = {};
  const combinedBuckets = { '0_20': 0, '20_40': 0, '40_60': 0, '60_80': 0, '80_100': 0 };
  const anomalySummary = {};

  for (const file of files) {
    const result = readJson(path.join(STAGE1_DIR, file));
    assignments[result.assignment] = {
      normalized_mean: result.score_distribution.normalized_mean,
      unique_students: result.meta.unique_students,
      post_term: result.post_term_addition,
      anomaly_pct: result.anomalies?.anomaly_pct || 0
    };
    anomalySummary[result.assignment] = result.anomalies?.anomaly_pct || 0;
    const buckets = result.score_distribution.buckets;
    combinedBuckets['0_20'] += buckets['0_20pct'];
    combinedBuckets['20_40'] += buckets['20_40pct'];
    combinedBuckets['40_60'] += buckets['40_60pct'];
    combinedBuckets['60_80'] += buckets['60_80pct'];
    combinedBuckets['80_100'] += buckets['80_100pct'];
  }

  const entries = Object.entries(assignments);
  const baselineMax = Math.max(...entries.map(([, value]) => value.unique_students));
  const difficultyRanking = entries
    .map(([assignment, value]) => ({ assignment, normalizedMean: value.normalized_mean, postTerm: value.post_term }))
    .sort((a, b) => a.normalizedMean - b.normalizedMean);

  const stage2 = {
    totalStudents: baselineMax,
    retention: entries.map(([assignment, value]) => ({
      assignment,
      pct: Number(((value.unique_students / baselineMax) * 100).toFixed(1)),
      postTerm: value.post_term
    })),
    difficultyRanking,
    regularDifficultyRanking: difficultyRanking.filter(item => !item.postTerm),
    combinedBuckets,
    anomaly_summary_by_assignment: anomalySummary,
    hack_summary_by_assignment: anomalySummary,
    post_term_note: 'GA7 and GA8 were added after the term ended. Their completion rates reflect availability, not difficulty. Exclude from difficulty comparisons.'
  };
  fs.writeFileSync(path.join(STAGE2_DIR, `${term}.json`), JSON.stringify(stage2, null, 2));
}

async function main() {
  if (QUIZ_ID !== 'tds-2026-01-ga1') throw new Error(`This sync currently supports GA1 only, got ${QUIZ_ID}`);
  fs.mkdirSync(STAGE1_DIR, { recursive: true });
  fs.mkdirSync(STAGE2_DIR, { recursive: true });
  const stage1 = await fetchStage1();
  fs.writeFileSync(path.join(STAGE1_DIR, '2026-01-ga1.json'), JSON.stringify(stage1, null, 2));
  rebuildStage2('2026-01');
  console.log(`Wrote GA1 stage1 for ${stage1.meta.unique_students} students from ${stage1.meta.total_records} fetched records.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
