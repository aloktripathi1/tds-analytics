const fs = require('fs');
const path = require('path');

const SUBMISSIONS_DIR = path.join(__dirname, 'submissions');
const STATS_DIR = path.join(__dirname, 'stats');

function processLocalStats(quizId, combinedFile) {
  const filePath = path.join(SUBMISSIONS_DIR, `${quizId}.json`);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return;
  }
  
  console.log(`\n📥 Reading local file for ${quizId} (Size: ${(fs.statSync(filePath).size / 1024 / 1024).toFixed(2)} MB)...`);
  const rawData = fs.readFileSync(filePath, 'utf8');
  let subs;
  try {
    subs = JSON.parse(rawData);
  } catch (e) {
    console.log(`❌ Failed to parse JSON for ${quizId}:`, e.message);
    return;
  }
  
  if (!Array.isArray(subs) || subs.length === 0) {
      console.log(`❌ No valid submissions found in ${quizId}.json! Skipping stats.`);
      return;
  }
  
  const stats = {
    totalSubmissions: subs.length,
    uniqueStudents: new Set(subs.map(s => s.email)).size,
    averageScore: subs.reduce((sum, s) => sum + (Number(s.total) || 0), 0) / subs.length,
    maxPossible: subs.reduce((max, s) => Math.max(max, s.max || Number(s.total) || 0), 0),
    scoreDistribution: {}
  };
  
  // Score distribution
  for (let sub of subs) {
    const score = Number(sub.total) || 0;
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
  
  // Append to combined stats file
  const allStatsPath = path.join(STATS_DIR, combinedFile);
  fs.appendFileSync(allStatsPath, output + '\n' + '-'.repeat(50) + '\n');
  console.log(`📝 Stats appended to stats/${combinedFile}\n`);
}

const args = process.argv.slice(2);
const exams = args.length ? args : ['tds-2026-01-ga2', 'tds-2026-01-ga3', 'tds-2026-01-ga4', 'tds-2026-01-ga5'];
const outFile = '2026_stats.txt';

if (!fs.existsSync(STATS_DIR)) fs.mkdirSync(STATS_DIR);
fs.writeFileSync(path.join(STATS_DIR, outFile), '');

for (const ex of exams) {
  processLocalStats(ex, outFile);
}
