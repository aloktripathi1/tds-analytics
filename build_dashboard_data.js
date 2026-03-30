const fs = require('fs');
const path = require('path');

const statsDir = path.join(__dirname, 'stats');
const files = ['2025_stats.txt', '2025_05_stats.txt', '2025_09_stats.txt', '2026_stats.txt', 'roe_stats.txt'];

const db = {};

// Regex handles cases where 'Percentage:' might be missing, and precisely breaks up the ASCII blocks
const regexBlock = /Submission Statistics:\s*tds-([a-zA-Z0-9-]+)(?:[\s\S]*?)Total Submissions:\s*(\d+)(?:[\s\S]*?)Unique Students:\s*(\d+)(?:[\s\S]*?)Average Score:\s*([\d.]+)\/([\d.]+)(?:[\s\S]*?Percentage:\s*([\d.]+)%|)/g;

for (const file of files) {
  const fPath = path.join(statsDir, file);
  if (!fs.existsSync(fPath)) continue;
  
  const content = fs.readFileSync(fPath, 'utf8');
  let match;
  
  while ((match = regexBlock.exec(content)) !== null) {
    const rawId = match[1]; // e.g., 2025-01-ga1 or 2025-05-roe
    const parts = rawId.split('-');
    const term = `${parts[0]}-${parts[1]}`; // e.g. 2025-01
    const exam = parts.slice(2).join('-').toUpperCase(); // e.g. GA1, ROE
    
    // We strictly use unique students to avoid dup logic (as isolated previously in GA2)
    const unique = parseInt(match[3], 10);
    const avgScore = parseFloat(match[4]);
    const maxScore = parseFloat(match[5]);
    const computedPercentage = maxScore > 0 ? ((avgScore / maxScore) * 100).toFixed(1) : 0;
    const percentage = match[6] ? parseFloat(match[6]) : parseFloat(computedPercentage);
    
    if (!db[term]) db[term] = {};
    db[term][exam] = {
      subs: unique,
      avgAsPercent: percentage,
      avgScore,
      maxScore
    };
  }
}

// Order the exams chronologically: GA1 up to GA8, and slot ROE at the end
for (const term in db) {
  const sortedExams = {};
  const keys = Object.keys(db[term]).sort((a,b) => {
    if (a.startsWith('GA') && b.startsWith('GA')) {
      return parseInt(a.replace('GA', '')) - parseInt(b.replace('GA', ''));
    }
    if (a === 'ROE' && b.startsWith('GA')) return 1;
    if (b === 'ROE' && a.startsWith('GA')) return -1;
    return a.localeCompare(b);
  });
  for (const k of keys) sortedExams[k] = db[term][k];
  db[term] = sortedExams;
}

const jsContent = `export const dashboardData = ${JSON.stringify(db, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, 'dashboard_data.js'), jsContent);
console.log('✅ Generated dashboard_data.js successfully!');
