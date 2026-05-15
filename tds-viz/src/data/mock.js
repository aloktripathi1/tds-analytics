// data/mock.js — full mock dataset per spec
// 2026-01 is fully populated; other terms are stubbed with same shape.

const GA2_2026 = {
  meta: { validRecords:479, uniqueStudents:479, lateSubmissions:21, maxPossible:20, deadlineInferred:"2026-02-22T18:29:59Z" },
  scoreDistribution: { mean:10.27, median:10, stdDev:5.29, min:0, max:20, p10:2.5, p25:7, p50:10, p75:13.5, p90:18, normalizedMean:0.51, buckets:{"0_20":59,"20_40":89,"40_60":156,"60_80":92,"80_100":83} },
  questions: [
    { id:"q-localtunnel",   label:"LocalTunnel",   completionRate:14.6, meanScore:0.15, maxPossible:1 },
    { id:"q-docker-hub",    label:"Docker Hub",    completionRate:17.1, meanScore:0.17, maxPossible:1 },
    { id:"q-ollama",        label:"Ollama",        completionRate:17.7, meanScore:0.18, maxPossible:1 },
    { id:"q-vercel-latency",label:"Vercel",        completionRate:21.1, meanScore:0.21, maxPossible:1 },
    { id:"q-fastapi-file",  label:"FastAPI File",  completionRate:23.6, meanScore:0.24, maxPossible:1 },
    { id:"q-google-oauth",  label:"Google OAuth",  completionRate:27.6, meanScore:0.41, maxPossible:1.5 },
    { id:"q-huggingface",   label:"HuggingFace",   completionRate:39.7, meanScore:0.60, maxPossible:1.5 },
    { id:"q-cloudflared",   label:"Cloudflared",   completionRate:40.5, meanScore:0.41, maxPossible:1 },
    { id:"q-codespaces",    label:"Codespaces",    completionRate:46.6, meanScore:0.23, maxPossible:0.5 },
    { id:"q-cf-workers",    label:"CF Workers",    completionRate:46.8, meanScore:0.47, maxPossible:1 },
    { id:"q-fastapi",       label:"FastAPI",       completionRate:52.8, meanScore:0.53, maxPossible:1 },
    { id:"q-github-gist",   label:"GitHub Gist",   completionRate:67.0, meanScore:0.67, maxPossible:1 },
    { id:"q-img-compress",  label:"Img Compress",  completionRate:68.9, meanScore:0.34, maxPossible:0.5 },
    { id:"q-pages-json",    label:"Pages JSON",    completionRate:75.8, meanScore:0.76, maxPossible:1 },
    { id:"q-actions-cache", label:"Actions Cache", completionRate:75.8, meanScore:0.76, maxPossible:1 },
    { id:"q-github-action", label:"GH Action",     completionRate:78.9, meanScore:0.79, maxPossible:1 },
    { id:"q-git-revert",    label:"Git Revert",    completionRate:82.7, meanScore:1.24, maxPossible:1.5 },
    { id:"q-dependabot",    label:"Dependabot",    completionRate:83.1, meanScore:0.83, maxPossible:1 },
    { id:"q-git-time",      label:"Git Time Travel",completionRate:85.2, meanScore:0.85, maxPossible:1 },
    { id:"q-gh-pages",      label:"GH Pages",      completionRate:88.1, meanScore:0.44, maxPossible:0.5 },
  ],
  timing: { earlyGt6h:{ count:98, avgScore:11.88 }, mid1To6h:{ count:204, avgScore:10.19 }, lastLt1h:{ count:177, avgScore:9.46 } }
};

const ROE_2026 = {
  meta: { validRecords:441, uniqueStudents:441, maxPossible:60 },
  scoreDistribution: { mean:36.6, median:38.4, stdDev:10.8, min:0, max:60, p10:20, p25:29, p50:38, p75:45, p90:52, normalizedMean:0.61, buckets:{"0_20":18,"20_40":44,"40_60":121,"60_80":167,"80_100":91} },
  questions: [
    { id:"q-roe-1", label:"Q1 · data cleaning",   completionRate:72, meanScore:7.2, maxPossible:10 },
    { id:"q-roe-2", label:"Q2 · visualization",   completionRate:68, meanScore:6.8, maxPossible:10 },
    { id:"q-roe-3", label:"Q3 · interpretation",  completionRate:44, meanScore:4.4, maxPossible:10 },
    { id:"q-roe-4", label:"Q4 · tool usage",      completionRate:61, meanScore:6.1, maxPossible:10 },
    { id:"q-roe-5", label:"Q5 · tool rationale",  completionRate:38, meanScore:3.8, maxPossible:10 },
    { id:"q-roe-6", label:"Q6 · LLM workflow",    completionRate:59, meanScore:5.9, maxPossible:10 },
  ],
  roeGaCorrelation: { r: 0.31 },
  gaQuartileRoeScores: { top25:71, mid50:63, bottom25:54 }
};

// Helper to generate a stub GA for non-2026-01 terms
function stubGA(validRecords, normalizedMean, maxPossible = 10) {
  const mean = normalizedMean * maxPossible;
  return {
    meta: { validRecords, uniqueStudents: validRecords, lateSubmissions: Math.round(validRecords * 0.04), maxPossible, deadlineInferred: null },
    scoreDistribution: {
      mean: +mean.toFixed(2), median: +mean.toFixed(1), stdDev: +(maxPossible * 0.2).toFixed(2),
      min: 0, max: maxPossible, p10: +(mean * 0.3).toFixed(1), p25: +(mean * 0.6).toFixed(1),
      p50: +mean.toFixed(1), p75: +(mean * 1.3).toFixed(1), p90: +(mean * 1.6).toFixed(1),
      normalizedMean, buckets: { "0_20": Math.round(validRecords*0.12), "20_40": Math.round(validRecords*0.18), "40_60": Math.round(validRecords*0.32), "60_80": Math.round(validRecords*0.23), "80_100": Math.round(validRecords*0.15) }
    },
    questions: [
      { id:"q-stub-1", label:"Question 1", completionRate: Math.round(normalizedMean*100 - 10), meanScore: +(normalizedMean*maxPossible*0.9).toFixed(2), maxPossible: maxPossible/5 },
      { id:"q-stub-2", label:"Question 2", completionRate: Math.round(normalizedMean*100 - 5),  meanScore: +(normalizedMean*maxPossible*0.95).toFixed(2), maxPossible: maxPossible/5 },
      { id:"q-stub-3", label:"Question 3", completionRate: Math.round(normalizedMean*100),      meanScore: +(normalizedMean*maxPossible).toFixed(2), maxPossible: maxPossible/5 },
      { id:"q-stub-4", label:"Question 4", completionRate: Math.round(normalizedMean*100 + 5),  meanScore: +(normalizedMean*maxPossible*1.05).toFixed(2), maxPossible: maxPossible/5 },
      { id:"q-stub-5", label:"Question 5", completionRate: Math.round(normalizedMean*100 + 10), meanScore: +(normalizedMean*maxPossible*1.1).toFixed(2), maxPossible: maxPossible/5 },
    ],
    timing: { earlyGt6h:{ count: Math.round(validRecords*0.2), avgScore: +(mean*1.15).toFixed(2) }, mid1To6h:{ count: Math.round(validRecords*0.43), avgScore: +(mean).toFixed(2) }, lastLt1h:{ count: Math.round(validRecords*0.37), avgScore: +(mean*0.9).toFixed(2) } }
  };
}

function stubROE(validRecords, normalizedMean) {
  const maxPossible = 60;
  const mean = normalizedMean * maxPossible;
  return {
    meta: { validRecords, uniqueStudents: validRecords, maxPossible },
    scoreDistribution: {
      mean: +mean.toFixed(1), median: +(mean+1).toFixed(1), stdDev: 10.5, min: 0, max: maxPossible,
      p10: +(mean*0.5).toFixed(0), p25: +(mean*0.75).toFixed(0), p50: +mean.toFixed(0), p75: +(mean*1.2).toFixed(0), p90: +(mean*1.4).toFixed(0),
      normalizedMean, buckets: { "0_20": Math.round(validRecords*0.04), "20_40": Math.round(validRecords*0.10), "40_60": Math.round(validRecords*0.27), "60_80": Math.round(validRecords*0.38), "80_100": Math.round(validRecords*0.21) }
    },
    questions: [
      { id:"q-roe-1", label:"Q1 · data cleaning",  completionRate:72, meanScore:+(normalizedMean*10).toFixed(1), maxPossible:10 },
      { id:"q-roe-2", label:"Q2 · visualization",  completionRate:65, meanScore:+(normalizedMean*9).toFixed(1),  maxPossible:10 },
      { id:"q-roe-3", label:"Q3 · interpretation", completionRate:42, meanScore:+(normalizedMean*8).toFixed(1),  maxPossible:10 },
      { id:"q-roe-4", label:"Q4 · tool usage",     completionRate:60, meanScore:+(normalizedMean*9.5).toFixed(1),maxPossible:10 },
      { id:"q-roe-5", label:"Q5 · tool rationale", completionRate:36, meanScore:+(normalizedMean*7).toFixed(1),  maxPossible:10 },
      { id:"q-roe-6", label:"Q6 · LLM workflow",   completionRate:57, meanScore:+(normalizedMean*8.5).toFixed(1),maxPossible:10 },
    ],
    roeGaCorrelation: { r: 0.28 + Math.random() * 0.08 },
    gaQuartileRoeScores: { top25: Math.round(normalizedMean*110+5), mid50: Math.round(normalizedMean*100), bottom25: Math.round(normalizedMean*88-5) }
  };
}

// GA1 2026-01 (full data)
const GA1_2026 = {
  meta: { validRecords:511, uniqueStudents:511, lateSubmissions:18, maxPossible:10, deadlineInferred:"2026-01-25T18:29:59Z" },
  scoreDistribution: { mean:7.2, median:8, stdDev:2.8, min:0, max:10, p10:3, p25:5.5, p50:8, p75:9.5, p90:10, normalizedMean:0.72, buckets:{"0_20":31,"20_40":56,"40_60":94,"60_80":178,"80_100":152} },
  questions: [
    { id:"q-ga1-1", label:"Git basics",      completionRate:88.4, meanScore:0.88, maxPossible:1 },
    { id:"q-ga1-2", label:"Shell scripting", completionRate:81.2, meanScore:0.81, maxPossible:1 },
    { id:"q-ga1-3", label:"Python env",      completionRate:77.5, meanScore:0.78, maxPossible:1 },
    { id:"q-ga1-4", label:"HTTP basics",     completionRate:74.3, meanScore:0.74, maxPossible:1 },
    { id:"q-ga1-5", label:"JSON/CSV parse",  completionRate:71.0, meanScore:0.71, maxPossible:1 },
    { id:"q-ga1-6", label:"Regex",           completionRate:66.1, meanScore:0.66, maxPossible:1 },
    { id:"q-ga1-7", label:"Pandas basics",   completionRate:62.8, meanScore:0.63, maxPossible:1 },
    { id:"q-ga1-8", label:"NumPy",           completionRate:59.2, meanScore:0.59, maxPossible:1 },
    { id:"q-ga1-9", label:"Matplotlib",      completionRate:53.0, meanScore:0.53, maxPossible:1 },
    { id:"q-ga1-10",label:"SQLite",          completionRate:49.5, meanScore:0.50, maxPossible:1 },
  ],
  timing: { earlyGt6h:{ count:122, avgScore:8.41 }, mid1To6h:{ count:228, avgScore:7.22 }, lastLt1h:{ count:161, avgScore:5.83 } }
};

const GA3_2026 = {
  meta: { validRecords:492, uniqueStudents:492, lateSubmissions:19, maxPossible:10, deadlineInferred:"2026-03-08T18:29:59Z" },
  scoreDistribution: { mean:5.8, median:6, stdDev:2.9, min:0, max:10, p10:2, p25:4, p50:6, p75:8, p90:9.5, normalizedMean:0.58, buckets:{"0_20":49,"20_40":88,"40_60":160,"60_80":122,"80_100":73} },
  questions: [
    { id:"q-ga3-1", label:"REST APIs",       completionRate:75.2, meanScore:0.75, maxPossible:1 },
    { id:"q-ga3-2", label:"Web scraping",    completionRate:68.4, meanScore:0.68, maxPossible:1 },
    { id:"q-ga3-3", label:"Auth tokens",     completionRate:61.3, meanScore:0.61, maxPossible:1 },
    { id:"q-ga3-4", label:"Async Python",    completionRate:54.0, meanScore:0.54, maxPossible:1 },
    { id:"q-ga3-5", label:"Caching",         completionRate:44.8, meanScore:0.45, maxPossible:1 },
    { id:"q-ga3-6", label:"Rate limiting",   completionRate:37.5, meanScore:0.38, maxPossible:1 },
    { id:"q-ga3-7", label:"Error handling",  completionRate:31.2, meanScore:0.31, maxPossible:1 },
  ],
  timing: { earlyGt6h:{ count:104, avgScore:7.12 }, mid1To6h:{ count:211, avgScore:5.84 }, lastLt1h:{ count:177, avgScore:4.92 } }
};

function makeGA(id, validRecords, normalizedMean, maxPossible = 10) {
  const base = { GA4: stubGA(validRecords, normalizedMean, maxPossible), GA5: stubGA(validRecords, normalizedMean, maxPossible), GA6: stubGA(validRecords, normalizedMean, maxPossible), GA7: stubGA(validRecords, normalizedMean, maxPossible) };
  return base[id] || stubGA(validRecords, normalizedMean, maxPossible);
}

export const mockData = {
  terms: ["2025-01","2025-05","2025-09","2026-01"],

  assignmentsByTerm: {
    "2025-01": ["GA1","GA2","GA3","GA4","GA5","ROE"],
    "2025-05": ["GA1","GA2","GA3","GA4","GA5","GA6","GA7","ROE"],
    "2025-09": ["GA1","GA2","GA4","GA5","GA6","GA7","GA8","ROE"],
    "2026-01": ["GA1","GA2","GA3","GA4","GA5","GA6","GA7","ROE","P1"],
  },

  byAssignment: {
    "2026-01": {
      GA1: GA1_2026,
      GA2: GA2_2026,
      GA3: GA3_2026,
      GA4: stubGA(471, 0.49, 10),
      GA5: stubGA(443, 0.38, 10),
      GA6: stubGA(421, 0.44, 10),
      GA7: stubGA(398, 0.31, 10),
      ROE: ROE_2026,
      P1:  stubGA(310, 0.79, 100),
    },
    "2025-01": {
      GA1: stubGA(498, 0.74, 10),
      GA2: stubGA(480, 0.54, 10),
      GA3: stubGA(461, 0.61, 10),
      GA4: stubGA(440, 0.52, 10),
      GA5: stubGA(412, 0.42, 10),
      ROE: stubROE(390, 0.64),
    },
    "2025-05": {
      GA1: stubGA(512, 0.71, 10),
      GA2: stubGA(491, 0.52, 10),
      GA3: stubGA(474, 0.59, 10),
      GA4: stubGA(455, 0.50, 10),
      GA5: stubGA(430, 0.40, 10),
      GA6: stubGA(411, 0.47, 10),
      GA7: stubGA(389, 0.38, 10),
      ROE: stubROE(368, 0.63),
    },
    "2025-09": {
      GA1: stubGA(504, 0.73, 10),
      GA2: stubGA(487, 0.53, 10),
      GA4: stubGA(466, 0.48, 10),
      GA5: stubGA(441, 0.39, 10),
      GA6: stubGA(420, 0.45, 10),
      GA7: stubGA(397, 0.35, 10),
      GA8: stubGA(374, 0.50, 10),
      ROE: stubROE(356, 0.62),
    },
  },

  overview: {
    "2026-01": {
      totalStudents: 511,
      retention: [
        { assignment:"GA1", pct:100 },
        { assignment:"GA2", pct:94  },
        { assignment:"GA3", pct:91  },
        { assignment:"GA4", pct:85  },
        { assignment:"GA5", pct:73  },
        { assignment:"GA6", pct:71  },
        { assignment:"GA7", pct:68  },
        { assignment:"ROE", pct:79  },
        { assignment:"P1",  pct:61  },
      ],
      difficultyRanking: [
        { assignment:"GA7", normalizedMean:0.31 },
        { assignment:"GA5", normalizedMean:0.38 },
        { assignment:"GA6", normalizedMean:0.44 },
        { assignment:"GA4", normalizedMean:0.49 },
        { assignment:"GA2", normalizedMean:0.51 },
        { assignment:"GA3", normalizedMean:0.58 },
        { assignment:"ROE", normalizedMean:0.61 },
        { assignment:"GA1", normalizedMean:0.72 },
        { assignment:"P1",  normalizedMean:0.79 },
      ],
      combinedBuckets: { "0_20":168, "20_40":341, "40_60":682, "60_80":573, "80_100":381 },
    },
    "2025-01": {
      totalStudents: 498,
      retention: [
        { assignment:"GA1", pct:100 },
        { assignment:"GA2", pct:96  },
        { assignment:"GA3", pct:92  },
        { assignment:"GA4", pct:88  },
        { assignment:"GA5", pct:82  },
        { assignment:"ROE", pct:78  },
      ],
      difficultyRanking: [
        { assignment:"GA5", normalizedMean:0.42 },
        { assignment:"GA4", normalizedMean:0.52 },
        { assignment:"GA2", normalizedMean:0.54 },
        { assignment:"GA3", normalizedMean:0.61 },
        { assignment:"ROE", normalizedMean:0.64 },
        { assignment:"GA1", normalizedMean:0.74 },
      ],
      combinedBuckets: { "0_20":120, "20_40":258, "40_60":492, "60_80":389, "80_100":221 },
    },
    "2025-05": {
      totalStudents: 512,
      retention: [
        { assignment:"GA1", pct:100 },
        { assignment:"GA2", pct:96  },
        { assignment:"GA3", pct:93  },
        { assignment:"GA4", pct:89  },
        { assignment:"GA5", pct:84  },
        { assignment:"GA6", pct:80  },
        { assignment:"GA7", pct:72  },
        { assignment:"ROE", pct:76  },
      ],
      difficultyRanking: [
        { assignment:"GA7", normalizedMean:0.38 },
        { assignment:"GA5", normalizedMean:0.40 },
        { assignment:"GA6", normalizedMean:0.47 },
        { assignment:"GA4", normalizedMean:0.50 },
        { assignment:"GA2", normalizedMean:0.52 },
        { assignment:"GA3", normalizedMean:0.59 },
        { assignment:"ROE", normalizedMean:0.63 },
        { assignment:"GA1", normalizedMean:0.71 },
      ],
      combinedBuckets: { "0_20":181, "20_40":362, "40_60":714, "60_80":561, "80_100":298 },
    },
    "2025-09": {
      totalStudents: 504,
      retention: [
        { assignment:"GA1", pct:100 },
        { assignment:"GA2", pct:97  },
        { assignment:"GA4", pct:93  },
        { assignment:"GA5", pct:88  },
        { assignment:"GA6", pct:83  },
        { assignment:"GA7", pct:79  },
        { assignment:"GA8", pct:74  },
        { assignment:"ROE", pct:71  },
      ],
      difficultyRanking: [
        { assignment:"GA7", normalizedMean:0.35 },
        { assignment:"GA5", normalizedMean:0.39 },
        { assignment:"GA6", normalizedMean:0.45 },
        { assignment:"GA4", normalizedMean:0.48 },
        { assignment:"GA2", normalizedMean:0.53 },
        { assignment:"GA8", normalizedMean:0.50 },
        { assignment:"ROE", normalizedMean:0.62 },
        { assignment:"GA1", normalizedMean:0.73 },
      ],
      combinedBuckets: { "0_20":145, "20_40":310, "40_60":620, "60_80":498, "80_100":268 },
    },
  }
};
