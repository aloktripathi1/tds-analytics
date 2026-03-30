# TDS Course Analysis Dashboard

A deep data analytics dashboard for the **Tools in Data Science (TDS)** course, tracking student performance across **4 consecutive academic terms** (Jan 2025, May 2025, Sep 2025, Jan 2026).

🔗 **Live Demo**: [Deployed on Vercel](https://tds-course-analysis.vercel.app)

---

## 📊 What This Dashboard Tracks

### 🏠 Overview
- KPI cards showing total submissions, bypass rates, easiest & hardest assignments
- Line charts mapping average score trends and student retention funnels across all terms

### 📝 Graded Assignment (GA) Analysis
- Per-GA performance comparison with **term-wise filtering**
- Gross vs Honest average bar charts (honest = excluding bypassed submissions)
- Perfect score rate trends
- Data-driven insight cards highlighting patterns like "GA2 is consistently brutal"

### 🎯 Remote Online Exam (ROE) Analysis
- Term-by-term ROE performance cards with gross/honest averages
- Hack rate doughnut chart per term
- Insights revealing the ROE bypass epidemic and honest student struggles

### 🏴‍☠️ Hack / Bypass Audit
- Detection of students who submitted empty string (`""`) answers to bypass questions
- Horizontal bar chart ranking all assignments by hack percentage
- Full audit table showing score inflation (gap between honest and gross averages)

### 🔥 Difficulty Rankings
- Every assignment ranked by honest average (hardest first)
- Color-coded difficulty badges: **Brutal**, **Hard**, **Medium**, **Easy**

---

## 🔑 Key Findings

| Metric | Value |
|---|---|
| **Hardest Assignment (Honest Avg)** | 2025-05 ROE → 26.5% |
| **Easiest Assignment (Honest Avg)** | 2026-01 GA5 → 93.4% |
| **Most Bypassed** | 2025-05 GA7 → 10.0% bypass rate (22/219 students) |
| **Total Submissions Analyzed** | 25,000+ |
| **Overall Bypass Rate** | 2.66% |

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Charts**: [Chart.js](https://www.chartjs.org/)
- **Typography**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Data Pipeline**: Node.js scripts for API fetching, pagination, and JSON parsing
- **Deployment**: Vercel (static site)

---

## 📁 Project Structure

```
tds-analysis/
├── index.html              # Main dashboard entry point (Vercel serves this)
├── dashboard.html           # Advanced multi-page dashboard
├── dashboard.css            # Dark glassmorphism styling
├── dashboard_app.js         # 5-page interactive dashboard logic
├── analysis_data.js         # Pre-computed metrics from all submissions
├── advanced_parser.js       # Deep JSON parser with hack detection
├── build_dashboard_data.js  # Stats-to-JS data pipeline
├── get_stats.js             # API fetcher with pagination
├── local_stats.js           # Offline JSON stats calculator
├── stats/                   # Generated ASCII statistics per exam
│   ├── 2025_stats.txt
│   ├── 2025_05_stats.txt
│   ├── 2025_09_stats.txt
│   ├── 2026_stats.txt
│   ├── roe_stats.txt
│   └── ...per-exam stats
└── submissions/             # Raw JSON data (gitignored, local only)
```

---

## 🚀 Running Locally

```bash
# Serve the dashboard locally
npx serve . -p 3000

# Then open http://localhost:3000 in your browser
```

### Re-generating Analysis Data

```bash
# Fetch submissions from the API (requires admin auth)
node get_stats.js tds-2025-01-ga1 tds-2025-01-ga2 ... --out stats_file.txt

# Run deep analysis on local JSON files
node --max-old-space-size=4096 advanced_parser.js

# Rebuild dashboard data module
node build_dashboard_data.js
```

---

## 📝 Data Source

All submission data is fetched from the TDS exam platform API at `exam.sanand.workers.dev` with admin authentication. The raw JSON files are stored locally in `submissions/` and excluded from git to protect student privacy.

---

**Built with ❤️ for TDS course analytics**
