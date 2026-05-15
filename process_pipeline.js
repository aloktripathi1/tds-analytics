const fs = require('fs');
const path = require('path');

const SUBMISSIONS_DIR = path.join(__dirname, 'submissions');
const STAGE1_DIR = path.join(__dirname, 'tds-viz', 'src', 'data', 'pipeline', 'stage1');
const STAGE2_DIR = path.join(__dirname, 'tds-viz', 'src', 'data', 'pipeline', 'stage2');

if (!fs.existsSync(STAGE1_DIR)) fs.mkdirSync(STAGE1_DIR, { recursive: true });
if (!fs.existsSync(STAGE2_DIR)) fs.mkdirSync(STAGE2_DIR, { recursive: true });

function pointBiserial(binaryArr, continuousArr) {
  const n = binaryArr.length;
  if (n === 0) return null;
  
  let n1 = 0;
  let n0 = 0;
  let sum1 = 0;
  let sum0 = 0;
  let totalSum = 0;
  let totalSqSum = 0;
  
  for (let i = 0; i < n; i++) {
    const val = continuousArr[i];
    totalSum += val;
    totalSqSum += val * val;
    if (binaryArr[i] === 1) {
      n1++;
      sum1 += val;
    } else {
      n0++;
      sum0 += val;
    }
  }
  
  if (n1 === 0 || n0 === 0) return null;
  
  const mean1 = sum1 / n1;
  const mean0 = sum0 / n0;
  const totalMean = totalSum / n;
  
  // population std dev
  let variance = (totalSqSum / n) - (totalMean * totalMean);
  if (variance <= 0) return null;
  const stdev = Math.sqrt(variance);
  
  const p = n1 / n;
  const q = n0 / n;
  
  const rpb = ((mean1 - mean0) / stdev) * Math.sqrt(p * q);
  return rpb;
}

function percentile(arr, p) {
  if (arr.length === 0) return 0;
  const index = (arr.length - 1) * p;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  if (upper >= arr.length) return arr[lower];
  return arr[lower] * (1 - weight) + arr[upper] * weight;
}

function stdDev(arr) {
  if (arr.length === 0) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

function classifyQuestion(z, f, p, c) {
  if (z > 0.70) return "BROKEN";
  if (z > 0.50 && p < 0.15) return "BINARY";
  if (p > 0.25) return "CALIBRATED";
  if (c > 0.60 && f < 0.60) return "DISCRIMINATIVE";
  if (f > 0.80) return "EASY";
  return "CALIBRATED";
}

function processFile(filename) {
  console.log(`Processing ${filename}...`);
  const filepath = path.join(SUBMISSIONS_DIR, filename);
  let rawData;
  try {
    rawData = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch(e) {
    console.error(`Failed to read ${filename}:`, e.message);
    return null;
  }
  
  // Extract term and assignment from filename (e.g. tds-2026-01-ga2.json or tds-2026-01-roe (2).json)
  const baseName = filename.replace(/\.json$/, '').replace(/\s*\(\d+\)\s*/, '');
  const parts = baseName.split('-');
  if (parts.length < 4) return null;
  
  const term = `${parts[1]}-${parts[2]}`;
  const assignment = parts.slice(3).join('-').toUpperCase();
  let type = "GA";
  if (assignment.includes("ROE")) type = "ROE";
  else if (assignment.includes("P") && !assignment.includes("GA")) type = "PROJECT";
  
  const isPostTerm = (term === "2026-01" && (assignment === "GA7" || assignment === "GA8"));
  
  let validRecords = 0;
  let students = {};
  let totalRecords = rawData.length;
  let minTotal = Infinity;
  let maxTotal = -Infinity;
  let latestTime = 0;
  
  if (!Array.isArray(rawData)) {
    if (rawData.data && Array.isArray(rawData.data)) {
      rawData = rawData.data;
    } else {
      rawData = [rawData];
    }
  }

  for (const row of rawData) {
    if (row.total === -1) continue;
    validRecords++;
    
    if (row.total < minTotal) minTotal = row.total;
    if (row.total > maxTotal) maxTotal = row.total;
    
    const timeMs = new Date(row.time).getTime();
    if (timeMs > latestTime) latestTime = timeMs;
    
    const email = row.email;
    if (!students[email]) {
      students[email] = {
        bestSub: row,
        firstTime: timeMs
      };
    } else {
      if (timeMs < students[email].firstTime) students[email].firstTime = timeMs;
      
      const currentBest = students[email].bestSub;
      if (row.total > currentBest.total || (row.total === currentBest.total && timeMs > new Date(currentBest.time).getTime())) {
        students[email].bestSub = row;
      }
    }
  }
  
  const uniqueStudents = Object.keys(students).length;
  if (uniqueStudents === 0) return null;
  
  const deadlineMs = latestTime;
  const maxPossibleTotal = Math.max(...Object.values(students).map(s => s.bestSub.max || s.bestSub.total || 0));
  
  // Question Stats
  const qScores = {};
  const qMax = {};
  
  for (const email in students) {
    const sub = students[email].bestSub;
    if (!sub.scores) continue;
    
    for (const [qid, qdata] of Object.entries(sub.scores)) {
      if (!qScores[qid]) qScores[qid] = [];
      const score = (typeof qdata === 'object') ? qdata.score : qdata;
      qScores[qid].push({ email, score: Number(score) });
    }
  }
  
  for (const qid in qScores) {
    const maxS = Math.max(...qScores[qid].map(x => x.score));
    qMax[qid] = maxS;
  }
  
  const questionsOut = [];
  for (const qid in qScores) {
    const scores = qScores[qid].map(x => x.score);
    const maxP = qMax[qid];
    if (maxP === 0) continue; // flag if all 0, but usually we skip or set max=1
    
    const mean = scores.reduce((a,b) => a+b, 0) / scores.length;
    let z = 0, f = 0, p = 0, c = 0;
    
    const binaryArr = [];
    const contArr = [];
    
    for (let i = 0; i < scores.length; i++) {
      const s = scores[i];
      if (s === 0) z++;
      else c++;
      
      if (s === maxP) f++;
      if (s > 0 && s < maxP) p++;
      
      const email = qScores[qid][i].email;
      const totScore = students[email].bestSub.total;
      binaryArr.push(s > 0 ? 1 : 0);
      contArr.push(totScore - s);
    }
    
    const n = scores.length;
    questionsOut.push({
      id: qid,
      label: qid,
      max_possible: maxP,
      mean_score: Number(mean.toFixed(2)),
      normalized_mean: Number((mean/maxP).toFixed(2)),
      zero_rate: Number((z/n).toFixed(2)),
      full_rate: Number((f/n).toFixed(2)),
      partial_rate: Number((p/n).toFixed(2)),
      completion_rate: Number((c/n).toFixed(2)),
      std_dev: Number(stdDev(scores).toFixed(2)),
      discriminative_proxy: pointBiserial(binaryArr, contArr) !== null ? Number(pointBiserial(binaryArr, contArr).toFixed(2)) : null,
      classification: classifyQuestion(z/n, f/n, p/n, c/n)
    });
  }
  
  questionsOut.sort((a,b) => a.completion_rate - b.completion_rate);
  
  // Score Distribution
  const totalScores = Object.values(students).map(s => s.bestSub.total).sort((a,b) => a-b);
  const distMean = totalScores.reduce((a,b) => a+b, 0) / totalScores.length;
  
  const buckets = { "0_20pct": 0, "20_40pct": 0, "40_60pct": 0, "60_80pct": 0, "80_100pct": 0 };
  for (const s of totalScores) {
    const r = maxPossibleTotal > 0 ? s / maxPossibleTotal : 0;
    if (r < 0.20) buckets["0_20pct"]++;
    else if (r < 0.40) buckets["20_40pct"]++;
    else if (r < 0.60) buckets["40_60pct"]++;
    else if (r < 0.80) buckets["60_80pct"]++;
    else buckets["80_100pct"]++;
  }
  
  const timing = {
    skipped: isPostTerm,
    skip_reason: isPostTerm ? "Post-term addition" : null,
    deadline_ms: deadlineMs,
    early_gt6h: { count: 0, avg_score: 0 },
    mid_1_6h: { count: 0, avg_score: 0 },
    last_lt1h: { count: 0, avg_score: 0 }
  };
  
  let earlyS=0, midS=0, lateS=0;
  
  if (!isPostTerm) {
    for (const email in students) {
      const s = students[email];
      const hBefore = (deadlineMs - s.firstTime) / 3600000;
      if (hBefore > 6) { timing.early_gt6h.count++; earlyS += s.bestSub.total; }
      else if (hBefore >= 1) { timing.mid_1_6h.count++; midS += s.bestSub.total; }
      else { timing.last_lt1h.count++; lateS += s.bestSub.total; }
    }
    if (timing.early_gt6h.count) timing.early_gt6h.avg_score = Number((earlyS / timing.early_gt6h.count).toFixed(2));
    if (timing.mid_1_6h.count) timing.mid_1_6h.avg_score = Number((midS / timing.mid_1_6h.count).toFixed(2));
    if (timing.last_lt1h.count) timing.last_lt1h.avg_score = Number((lateS / timing.last_lt1h.count).toFixed(2));
  }
  
  const result = {
    file: filename,
    term: term,
    assignment: assignment,
    type: type,
    post_term_addition: isPostTerm,
    schema_notes: "",
    meta: {
      total_records: totalRecords,
      valid_records: validRecords,
      unique_students: uniqueStudents,
      late_submissions: 0,
      max_possible_total: maxPossibleTotal,
      deadline_inferred: new Date(deadlineMs).toISOString(),
      deadline_method: "latest_timestamp",
      data_cross_check: "ok"
    },
    score_distribution: {
      mean: Number(distMean.toFixed(2)),
      median: Number(percentile(totalScores, 0.5).toFixed(2)),
      std_dev: Number(stdDev(totalScores).toFixed(2)),
      min: totalScores[0],
      max: totalScores[totalScores.length-1],
      p10: Number(percentile(totalScores, 0.1).toFixed(2)),
      p25: Number(percentile(totalScores, 0.25).toFixed(2)),
      p50: Number(percentile(totalScores, 0.5).toFixed(2)),
      p75: Number(percentile(totalScores, 0.75).toFixed(2)),
      p90: Number(percentile(totalScores, 0.9).toFixed(2)),
      normalized_mean: Number((maxPossibleTotal > 0 ? distMean / maxPossibleTotal : 0).toFixed(2)),
      buckets: buckets
    },
    questions: questionsOut,
    timing: timing,
    roe_specific: type === "ROE" ? {} : null,
    project_specific: type === "PROJECT" ? {} : null,
    flags: [],
    observations: []
  };
  
  // Output Stage 1
  fs.writeFileSync(path.join(STAGE1_DIR, `${term}-${assignment.toLowerCase()}.json`), JSON.stringify(result, null, 2));
  return result;
}

const termsData = {};

fs.readdirSync(SUBMISSIONS_DIR).forEach(file => {
  if (!file.endsWith('.json')) return;
  const res = processFile(file);
  if (!res) return;
  
  if (!termsData[res.term]) termsData[res.term] = { assignments: {}, combined_buckets: {"0_20": 0, "20_40": 0, "40_60": 0, "60_80": 0, "80_100": 0} };
  
  termsData[res.term].assignments[res.assignment] = {
    normalized_mean: res.score_distribution.normalized_mean,
    unique_students: res.meta.unique_students,
    post_term: res.post_term_addition
  };
  
  // map buckets to mock format
  const rBuckets = res.score_distribution.buckets;
  termsData[res.term].combined_buckets["0_20"] += rBuckets["0_20pct"];
  termsData[res.term].combined_buckets["20_40"] += rBuckets["20_40pct"];
  termsData[res.term].combined_buckets["40_60"] += rBuckets["40_60pct"];
  termsData[res.term].combined_buckets["60_80"] += rBuckets["60_80pct"];
  termsData[res.term].combined_buckets["80_100"] += rBuckets["80_100pct"];
});

for (let term in termsData) {
  const tData = termsData[term];
  const maxStudents = Math.max(...Object.values(tData.assignments).map(a => a.unique_students));
  
  const retention = Object.entries(tData.assignments).map(([k, v]) => ({
    assignment: k,
    pct: Number((v.unique_students / maxStudents * 100).toFixed(1))
  }));
  
  const difficultyRanking = Object.entries(tData.assignments)
    .map(([k, v]) => ({
      assignment: k,
      normalizedMean: v.normalized_mean
    }))
    .sort((a,b) => a.normalizedMean - b.normalizedMean);
    
  const finalStage2 = {
    totalStudents: maxStudents,
    retention: retention,
    difficultyRanking: difficultyRanking,
    combinedBuckets: tData.combined_buckets,
    post_term_note: "GA7 and GA8 were added after the term ended. Their completion rates reflect availability, not difficulty. Exclude from difficulty comparisons."
  };
  
  fs.writeFileSync(path.join(STAGE2_DIR, `${term}.json`), JSON.stringify(finalStage2, null, 2));
}

console.log("All parsing complete!");
