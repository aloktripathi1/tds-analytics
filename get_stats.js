const fs = require('fs');
const path = require('path');

const SUBMISSIONS_DIR = path.join(__dirname, 'submissions');
const STATS_DIR = path.join(__dirname, 'stats');

// Ensure directories exist
if (!fs.existsSync(SUBMISSIONS_DIR)) fs.mkdirSync(SUBMISSIONS_DIR);
if (!fs.existsSync(STATS_DIR)) fs.mkdirSync(STATS_DIR);

async function getAllSubmissions(quizId) {
  let allData = [];
  let offset = 0;
  let limit = 10000;
  
  if (quizId === 'tds-2026-01-ga1' || quizId === 'tds-2026-01-ga2' || quizId === 'tds-2025-09-ga3') {
    limit = 100; // Extremely small limit to prevent CF Worker timeouts
  }
  
  while (true) {
    const response = await fetch(`https://exam.sanand.workers.dev/filter?quiz=${quizId}&limit=${limit}&offset=${offset}`);
    const data = await response.json();
    
    if (data.error || !data.data) {
      console.error(`❌ API Error for ${quizId} at offset ${offset}. This exam might have too many submissions for the backend. Error:`, data.error || data);
      break;
    }
    
    for (const chunk of data.data) allData.push(chunk);
    
    if (data.data.length < limit) {
      break;
    }
    
    offset += limit;
    console.log(`... fetched ${allData.length} submissions for ${quizId}`);
  }

  if (allData.length === 0) return [];

  const filePath = path.join(SUBMISSIONS_DIR, `${quizId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(allData, null, 2));
  console.log(`💾 Saved ${allData.length} submissions to submissions/${quizId}.json`);
  return allData;
}

async function getSubmissionStats(quizId, combinedFile) {
  console.log(`\n📥 Fetching submissions for ${quizId}...`);
  const subs = await getAllSubmissions(quizId);
  
  if (subs.length === 0) {
      console.log(`❌ No valid submissions found for ${quizId}! Skipping stats.`);
      return;
  }
  
  const stats = {
    totalSubmissions: subs.length,
    uniqueStudents: new Set(subs.map(s => s.email)).size,
    averageScore: subs.reduce((sum, s) => sum + (s.total || 0), 0) / subs.length,
    maxPossible: Math.max(...subs.map(s => s.max || Number(s.total) || 0)),
    scoreDistribution: {},
    submissionTimes: subs.map(s => new Date(s.time))
  };
  
  // Score distribution
  for (let sub of subs) {
    const score = sub.total || 0;
    stats.scoreDistribution[score] = (stats.scoreDistribution[score] || 0) + 1;
  }
  
  let output = `\n📊 Submission Statistics: ${quizId}\n`;
  output += '═'.repeat(50) + '\n';
  output += `   Total Submissions: ${stats.totalSubmissions}\n`;
  output += `   Unique Students: ${stats.uniqueStudents}\n`;
  output += `   Average Score: ${stats.averageScore.toFixed(2)}/${stats.maxPossible}\n`;
  if (stats.maxPossible > 0) {
    output += `   Percentage: ${(stats.averageScore/stats.maxPossible*100).toFixed(1)}%\n`;
  }
  output += '\n   Score Distribution:\n';
  
  // Sort and display distribution
  const sorted = Object.entries(stats.scoreDistribution)
    .sort(([a], [b]) => Number(b) - Number(a));
  
  for (let [score, count] of sorted) {
    const countSize = Math.max(stats.uniqueStudents, 1);
    const bar = '█'.repeat(Math.ceil(count / countSize * 40));
    output += `   ${score.padStart(4)}/${stats.maxPossible}: ${bar} (${count} students)\n`;
  }
  
  console.log(output);
  
  // Save stats to individual file
  const individualStatsPath = path.join(STATS_DIR, `${quizId}_stats.txt`);
  fs.writeFileSync(individualStatsPath, output);
  console.log(`📝 Stats saved to stats/${quizId}_stats.txt`);

  // Append to combined stats file
  const allStatsPath = path.join(STATS_DIR, combinedFile);
  fs.appendFileSync(allStatsPath, output + '\n' + '-'.repeat(50) + '\n');
  console.log(`📝 Stats appended to stats/${combinedFile}\n`);

  return stats;
}

const args = process.argv.slice(2);
const examsToRun = [];
let outputFile = 'all_stats.txt';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out') {
    outputFile = args[++i];
  } else {
    examsToRun.push(args[i]);
  }
}

async function runAll() {
  // clear file first
  // fs.writeFileSync(path.join(STATS_DIR, outputFile), '');
  for (const ex of (examsToRun.length ? examsToRun : ['tds-2026-01-ga5'])) {
    await getSubmissionStats(ex, outputFile).catch(console.error);
  }
}

runAll();
