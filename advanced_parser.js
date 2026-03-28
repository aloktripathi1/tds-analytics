const fs = require('fs');
const path = require('path');

const SUBS_DIR = path.join(__dirname, 'submissions');

// All files we want to process, organized by term
const TERMS = {
  '2025-01': ['ga1','ga2','ga3','ga4','ga5','roe'],
  '2025-05': ['ga1','ga2','ga3','ga4','ga5','ga6','ga7','roe'],
  '2025-09': ['ga1','ga2','ga4','ga5','ga6','ga7','ga8','roe'],
  '2026-01': ['ga2','ga3','ga4','ga5']
};

function analyzeFile(filePath, quizId) {
  if (!fs.existsSync(filePath)) return null;
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!Array.isArray(data) || data.length === 0) return null;
  
  // Deduplicate by email (keep latest submission per student)
  const byEmail = {};
  data.forEach(s => {
    const email = s.email;
    if (!byEmail[email] || new Date(s.time) > new Date(byEmail[email].time)) {
      byEmail[email] = s;
    }
  });
  const unique = Object.values(byEmail);
  
  let totalStudents = unique.length;
  let totalScore = 0;
  let perfectCount = 0;
  let zeroCount = 0;
  let negativeCount = 0;
  let hackCount = 0;     // students with at least one "" answer
  let totalEmptyAnswers = 0;
  let totalAnswerFields = 0;
  let hackStudentEmails = [];
  
  // For honest-only averages
  let honestStudents = 0;
  let honestTotalScore = 0;
  
  // Score distribution buckets (percentage-based: 0-10, 10-20, ..., 90-100)
  const percentBuckets = new Array(11).fill(0); // 0-10, 10-20, ..., 90-100, 100+
  
  // Determine maxScore from data
  let maxScore = 0;
  unique.forEach(s => {
    const m = s.result?.total !== undefined ? s.max : (s.max || 0);
    if (m > maxScore) maxScore = m;
  });
  // Fallback: compute from scores if max is 0
  if (maxScore === 0) {
    unique.forEach(s => {
      const total = s.result?.total ?? s.total ?? 0;
      if (total > maxScore) maxScore = total;
    });
  }
  
  unique.forEach(s => {
    const score = s.result?.total ?? s.total ?? 0;
    totalScore += score;
    
    const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
    const bucketIdx = Math.min(Math.floor(pct / 10), 10);
    percentBuckets[bucketIdx]++;
    
    if (score >= maxScore && maxScore > 0) perfectCount++;
    if (score === 0) zeroCount++;
    if (score < 0) negativeCount++;
    
    // Hack detection: check if any answer is empty string ""
    const answers = s.result?.answers || {};
    const answerValues = Object.values(answers);
    totalAnswerFields += answerValues.length;
    
    let hasEmptyAnswer = false;
    answerValues.forEach(v => {
      if (v === '' || v === null) {
        totalEmptyAnswers++;
        hasEmptyAnswer = true;
      }
    });
    
    if (hasEmptyAnswer) {
      hackCount++;
      hackStudentEmails.push(s.email);
    } else {
      honestStudents++;
      honestTotalScore += score;
    }
  });
  
  const avgScore = totalStudents > 0 ? totalScore / totalStudents : 0;
  const avgPercent = maxScore > 0 ? (avgScore / maxScore) * 100 : 0;
  const honestAvg = honestStudents > 0 ? honestTotalScore / honestStudents : 0;
  const honestPercent = maxScore > 0 ? (honestAvg / maxScore) * 100 : 0;
  
  return {
    quizId,
    totalStudents,
    maxScore: Math.round(maxScore * 100) / 100,
    avgScore: Math.round(avgScore * 100) / 100,
    avgPercent: Math.round(avgPercent * 10) / 10,
    perfectCount,
    perfectPercent: Math.round((perfectCount / totalStudents) * 1000) / 10,
    zeroCount,
    negativeCount,
    hackCount,
    hackPercent: Math.round((hackCount / totalStudents) * 1000) / 10,
    honestStudents,
    honestAvg: Math.round(honestAvg * 100) / 100,
    honestPercent: Math.round(honestPercent * 10) / 10,
    totalEmptyAnswers,
    totalAnswerFields,
    percentBuckets
  };
}

// Run the full analysis
const results = {};

for (const [term, exams] of Object.entries(TERMS)) {
  results[term] = {};
  for (const exam of exams) {
    const filename = `tds-${term}-${exam}.json`;
    const filePath = path.join(SUBS_DIR, filename);
    console.log(`🔍 Analyzing ${filename}...`);
    const analysis = analyzeFile(filePath, `tds-${term}-${exam}`);
    if (analysis) {
      results[term][exam.toUpperCase()] = analysis;
      console.log(`   ✅ ${analysis.totalStudents} students | Avg: ${analysis.avgPercent}% | Hacks: ${analysis.hackCount} (${analysis.hackPercent}%) | Honest Avg: ${analysis.honestPercent}%`);
    } else {
      console.log(`   ⚠️ Skipped (file not found or empty)`);
    }
  }
}

// Find most difficult assignment (by honest average)
let hardest = { term: '', exam: '', honestPercent: 100 };
let easiest = { term: '', exam: '', honestPercent: 0 };
let mostHacked = { term: '', exam: '', hackPercent: 0 };

for (const [term, exams] of Object.entries(results)) {
  for (const [exam, data] of Object.entries(exams)) {
    if (data.honestPercent < hardest.honestPercent && data.honestPercent > 0) {
      hardest = { term, exam, honestPercent: data.honestPercent, avgPercent: data.avgPercent };
    }
    if (data.honestPercent > easiest.honestPercent) {
      easiest = { term, exam, honestPercent: data.honestPercent, avgPercent: data.avgPercent };
    }
    if (data.hackPercent > mostHacked.hackPercent) {
      mostHacked = { term, exam, hackPercent: data.hackPercent, hackCount: data.hackCount };
    }
  }
}

console.log('\n' + '═'.repeat(60));
console.log('📊 CROSS-TERM INSIGHTS');
console.log('═'.repeat(60));
console.log(`🔴 HARDEST (Honest Avg): ${hardest.term} ${hardest.exam} → ${hardest.honestPercent}%`);
console.log(`🟢 EASIEST (Honest Avg): ${easiest.term} ${easiest.exam} → ${easiest.honestPercent}%`);
console.log(`🏴‍☠️ MOST HACKED: ${mostHacked.term} ${mostHacked.exam} → ${mostHacked.hackPercent}% (${mostHacked.hackCount} students)`);

// Export as JS module for the dashboard
const output = `export const analysisData = ${JSON.stringify(results, null, 2)};

export const insights = {
  hardest: ${JSON.stringify(hardest)},
  easiest: ${JSON.stringify(easiest)},
  mostHacked: ${JSON.stringify(mostHacked)}
};
`;

fs.writeFileSync(path.join(__dirname, 'analysis_data.js'), output);
console.log('\n✅ Generated analysis_data.js for dashboard consumption.');
