// src/data/mock/mockData.js
const TERMS = ['2025-01','2025-05','2025-09','2026-01'];

const difficultyByTerm = {
  GA1:     { '2025-01':0.74,'2025-05':0.71,'2025-09':0.73,'2026-01':0.72 },
  GA2:     { '2025-01':0.54,'2025-05':0.52,'2025-09':0.53,'2026-01':0.51 },
  GA3:     { '2025-01':0.61,'2025-05':0.59,'2025-09':null,'2026-01':0.58 },
  GA4:     { '2025-01':0.52,'2025-05':0.50,'2025-09':0.48,'2026-01':0.49 },
  GA5:     { '2025-01':0.42,'2025-05':0.40,'2025-09':0.39,'2026-01':0.38 },
  GA6:     { '2025-01':null,'2025-05':0.47,'2025-09':0.45,'2026-01':0.44 },
  GA7:     { '2025-01':null,'2025-05':0.38,'2025-09':0.35,'2026-01':0.31 },
  GA8:     { '2025-01':null,'2025-05':null,'2025-09':0.50,'2026-01':null },
  ROE:     { '2025-01':0.64,'2025-05':0.63,'2025-09':0.62,'2026-01':0.61 },
  Project: { '2025-01':null,'2025-05':null,'2025-09':null,'2026-01':0.79 },
};

function makeDrift(assignment, type) {
  const byTerm = difficultyByTerm[assignment] || {};
  const vals = Object.values(byTerm).filter(v => v != null);
  const mean = vals.reduce((a,b)=>a+b,0)/vals.length;
  const cv = vals.length > 1
    ? Math.sqrt(vals.reduce((a,b)=>a+(b-mean)**2,0)/(vals.length-1))/mean
    : 0;
  const first = vals[0], last = vals[vals.length-1];
  const trend = last > first+0.05 ? 'INCREASING' : last < first-0.05 ? 'DECREASING' : 'STABLE';
  return { assignment, type, trend, byTerm, driftFlag: cv > 0.08, cv: +cv.toFixed(3), stabilityFlag: cv > 0.15 ? 'UNSTABLE' : 'STABLE' };
}

const ga2Questions2026 = [
  { id:'q-localtunnel',              completionRate:0.146, zeroRate:0.854, fullRate:0.146, partialRate:0, normalizedMean:0.146, meanScore:1.46, maxPossible:10, stdDev:0.35, discriminativeProxy:0.62 },
  { id:'q-docker-hub',               completionRate:0.171, zeroRate:0.829, fullRate:0.171, partialRate:0, normalizedMean:0.171, meanScore:1.71, maxPossible:10, stdDev:0.38, discriminativeProxy:0.59 },
  { id:'q-ollama',                   completionRate:0.177, zeroRate:0.823, fullRate:0.177, partialRate:0, normalizedMean:0.177, meanScore:1.77, maxPossible:10, stdDev:0.38, discriminativeProxy:0.61 },
  { id:'q-vercel-latency',           completionRate:0.211, zeroRate:0.789, fullRate:0.211, partialRate:0, normalizedMean:0.211, meanScore:2.11, maxPossible:10, stdDev:0.41, discriminativeProxy:0.58 },
  { id:'q-fastapi-file-validation',  completionRate:0.236, zeroRate:0.764, fullRate:0.236, partialRate:0, normalizedMean:0.236, meanScore:2.36, maxPossible:10, stdDev:0.43, discriminativeProxy:0.55 },
  { id:'q-google-oauth-fastapi',     completionRate:0.276, zeroRate:0.724, fullRate:0.276, partialRate:0, normalizedMean:0.276, meanScore:2.76, maxPossible:10, stdDev:0.45, discriminativeProxy:0.53 },
  { id:'q-huggingface-docker',       completionRate:0.397, zeroRate:0.603, fullRate:0.397, partialRate:0, normalizedMean:0.397, meanScore:3.97, maxPossible:10, stdDev:0.49, discriminativeProxy:0.50 },
  { id:'q-cloudflared-tunnel',       completionRate:0.405, zeroRate:0.595, fullRate:0.405, partialRate:0, normalizedMean:0.405, meanScore:4.05, maxPossible:10, stdDev:0.49, discriminativeProxy:0.49 },
  { id:'q-github-codespaces',        completionRate:0.466, zeroRate:0.534, fullRate:0.466, partialRate:0, normalizedMean:0.466, meanScore:4.66, maxPossible:10, stdDev:0.50, discriminativeProxy:0.47 },
  { id:'q-cloudflare-workers',       completionRate:0.468, zeroRate:0.532, fullRate:0.468, partialRate:0, normalizedMean:0.468, meanScore:4.68, maxPossible:10, stdDev:0.50, discriminativeProxy:0.46 },
  { id:'q-fastapi',                  completionRate:0.528, zeroRate:0.472, fullRate:0.528, partialRate:0, normalizedMean:0.528, meanScore:5.28, maxPossible:10, stdDev:0.50, discriminativeProxy:0.44 },
  { id:'q-github-gist',              completionRate:0.670, zeroRate:0.330, fullRate:0.670, partialRate:0, normalizedMean:0.670, meanScore:6.70, maxPossible:10, stdDev:0.47, discriminativeProxy:0.39 },
  { id:'q-image-compression',        completionRate:0.689, zeroRate:0.311, fullRate:0.689, partialRate:0, normalizedMean:0.689, meanScore:6.89, maxPossible:10, stdDev:0.46, discriminativeProxy:0.37 },
  { id:'q-github-pages-json-api',    completionRate:0.758, zeroRate:0.242, fullRate:0.758, partialRate:0, normalizedMean:0.758, meanScore:7.58, maxPossible:10, stdDev:0.43, discriminativeProxy:0.34 },
  { id:'q-github-action-cache',      completionRate:0.758, zeroRate:0.242, fullRate:0.758, partialRate:0, normalizedMean:0.758, meanScore:7.58, maxPossible:10, stdDev:0.43, discriminativeProxy:0.33 },
  { id:'q-github-action',            completionRate:0.789, zeroRate:0.211, fullRate:0.789, partialRate:0, normalizedMean:0.789, meanScore:7.89, maxPossible:10, stdDev:0.41, discriminativeProxy:0.31 },
  { id:'q-git-revert-env',           completionRate:0.827, zeroRate:0.173, fullRate:0.827, partialRate:0, normalizedMean:0.827, meanScore:8.27, maxPossible:10, stdDev:0.38, discriminativeProxy:0.28 },
  { id:'q-dependabot-config',        completionRate:0.831, zeroRate:0.169, fullRate:0.831, partialRate:0, normalizedMean:0.831, meanScore:8.31, maxPossible:10, stdDev:0.37, discriminativeProxy:0.27 },
  { id:'q-git-time-travel',          completionRate:0.852, zeroRate:0.148, fullRate:0.852, partialRate:0, normalizedMean:0.852, meanScore:8.52, maxPossible:10, stdDev:0.36, discriminativeProxy:0.25 },
  { id:'q-github-pages',             completionRate:0.881, zeroRate:0.119, fullRate:0.881, partialRate:0, normalizedMean:0.881, meanScore:8.81, maxPossible:10, stdDev:0.32, discriminativeProxy:0.22 },
].map(q => ({ ...q, classification: q.completionRate < 0.40 ? (q.zeroRate > 0.70 ? 'BROKEN' : 'BINARY') : q.completionRate > 0.80 ? 'EASY' : q.discriminativeProxy >= 0.50 ? 'DISCRIMINATIVE' : 'CALIBRATED' }));

function makeAssignment(term, assignment, type, nm, n=750) {
  const mean = nm * 10, sd = 2.2;
  return {
    meta: { totalRecords:n, validRecords:n, uniqueStudents:n, lateSubmissions:0, maxPossible:10, deadlineInferred:'2026-03-30T18:00:00Z' },
    scoreDistribution: {
      mean: +mean.toFixed(2), median: +(mean+0.3).toFixed(2), stdDev: +sd.toFixed(2),
      min:0, max:10, p10:+(mean-2*sd).toFixed(1), p25:+(mean-sd).toFixed(1),
      p50:+mean.toFixed(1), p75:+(mean+sd).toFixed(1), p90:+(mean+2*sd).toFixed(1),
      normalizedMean: nm,
      buckets:{ '0_20pct':Math.round(n*0.05),'20_40pct':Math.round(n*0.10),'40_60pct':Math.round(n*0.20),'60_80pct':Math.round(n*0.30),'80_100pct':Math.round(n*0.35) }
    },
    questions: term==='2026-01' && assignment==='GA2' ? ga2Questions2026 : [
      { id:'q-1', maxPossible:2, meanScore:+(nm*2).toFixed(2), normalizedMean:nm, zeroRate:+(1-nm-0.1).toFixed(2), fullRate:+(nm-0.05).toFixed(2), partialRate:0.15, completionRate:+(nm+0.05).toFixed(2), stdDev:0.8, discriminativeProxy:0.55, classification:'DISCRIMINATIVE' },
      { id:'q-2', maxPossible:2, meanScore:+(nm*1.9).toFixed(2), normalizedMean:+(nm*0.95).toFixed(2), zeroRate:+(1-nm).toFixed(2), fullRate:+(nm*0.9).toFixed(2), partialRate:0.10, completionRate:+nm.toFixed(2), stdDev:0.7, discriminativeProxy:0.40, classification:'CALIBRATED' },
      { id:'q-3', maxPossible:2, meanScore:+(nm*2.2).toFixed(2), normalizedMean:+(nm*1.1).toFixed(2), zeroRate:+(0.5-nm*0.2).toFixed(2), fullRate:+(nm*1.1).toFixed(2), partialRate:0.05, completionRate:+(nm+0.15).toFixed(2), stdDev:0.9, discriminativeProxy:0.30, classification:'CALIBRATED' },
      { id:'q-4', maxPossible:2, meanScore:+(nm*0.8).toFixed(2), normalizedMean:+(nm*0.4).toFixed(2), zeroRate:0.72, fullRate:+(nm*0.4).toFixed(2), partialRate:0.05, completionRate:0.28, stdDev:0.4, discriminativeProxy:0.60, classification:'BROKEN' },
      { id:'q-5', maxPossible:2, meanScore:+(nm*2.4).toFixed(2), normalizedMean:+(nm*1.2).toFixed(2), zeroRate:+(0.15).toFixed(2), fullRate:0.83, partialRate:0.02, completionRate:0.85, stdDev:0.5, discriminativeProxy:0.20, classification:'EASY' },
    ],
    timing: {
      earlyGt6h:{ count:Math.round(n*0.65), avgScore:+(mean+0.8).toFixed(2) },
      mid1To6h: { count:Math.round(n*0.20), avgScore:+(mean+0.2).toFixed(2) },
      lastLt1h: { count:Math.round(n*0.15), avgScore:+(mean-0.6).toFixed(2) },
    }
  };
}

// Build byAssignment
const byAssignment = {};
const assignmentMap = {
  '2025-01': ['GA1','GA2','GA3','GA4','GA5','ROE'],
  '2025-05': ['GA1','GA2','GA3','GA4','GA5','GA6','GA7','ROE'],
  '2025-09': ['GA1','GA2','GA4','GA5','GA6','GA7','GA8','ROE'],
  '2026-01': ['GA1','GA2','GA3','GA4','GA5','GA6','GA7','ROE','Project'],
};
const typeMap = a => a==='ROE'?'ROE':a==='Project'?'PROJECT':'GA';

TERMS.forEach(term => {
  byAssignment[term] = {};
  (assignmentMap[term]||[]).forEach(a => {
    const nm = difficultyByTerm[a]?.[term] ?? 0.55;
    if (nm != null) byAssignment[term][a] = makeAssignment(term, a, typeMap(a), nm);
  });
});

// Build byTerm
const byTerm = {};
TERMS.forEach(term => {
  const assignments = assignmentMap[term] || [];
  const nm = a => difficultyByTerm[a]?.[term] ?? 0.55;
  byTerm[term] = {
    assignmentsAnalyzed: assignments,
    studentCoverage: {
      presentAllAssignments: Math.round(650 * 0.72),
      droppedOut: Math.round(650 * 0.18),
      dropoutAssignment: 'GA5',
      pctImproved: 0.38, pctDeclined: 0.22, pctVolatile: 0.18, pctStable: 0.22,
    },
    difficultyRanking: assignments.map(a => ({ assignment:a, normalizedMean: +(nm(a)||0.55).toFixed(3), flag: nm(a)<0.45?'HARD':'OK' })).sort((a,b)=>a.normalizedMean-b.normalizedMean),
    crossAssignmentPredictors: [
      { from:'GA1',to:'GA2', correlation:0.61, interpretation:'Strong predictor — GA1 success reliably forecasts GA2' },
      { from:'GA2',to:'GA4', correlation:0.55, interpretation:'Moderate predictor — DevOps skills transfer' },
      { from:'GA1',to:'ROE', correlation:0.48, interpretation:'Moderate — foundational skills matter for exam' },
      { from:'GA5',to:'ROE', correlation:0.35, interpretation:'Weak — late-term mastery weakly predicts exam' },
    ],
    studentClusters: term==='2026-01' ? [
      { name:'Git-only completers',   size:156, pctOfCohort:0.33, gaAvg:0.42, roeAvg:0.58, projectAvg:null,  pattern:'Complete git questions, skip DevOps', intervention:'Add Docker walkthrough before GA2', canDo:'Version control, GitHub basics', cannotDo:'Containerisation, cloud deployment' },
      { name:'Automation ceiling',    size:143, pctOfCohort:0.30, gaAvg:0.61, roeAvg:0.64, projectAvg:0.65, pattern:'Good at automation, stuck on cloud', intervention:'Guided cloud setup lab', canDo:'CI/CD, GitHub Actions, scripting', cannotDo:'Docker, tunnelling, cloud services' },
      { name:'DevOps-literate',       size:114, pctOfCohort:0.24, gaAvg:0.84, roeAvg:0.79, projectAvg:0.81, pattern:'Full-stack completers', intervention:'Challenge with advanced infra tasks', canDo:'All task types across all assignments', cannotDo:'Minor gaps in obscure tooling' },
      { name:'Disengaged or lost',    size:66,  pctOfCohort:0.13, gaAvg:0.18, roeAvg:0.22, projectAvg:null, pattern:'Minimal engagement across all tasks', intervention:'1:1 outreach, prerequisite check', canDo:'Basic git commands only', cannotDo:'Nearly all DevOps and cloud tasks' },
    ] : [
      { name:'High performers',  size:190, pctOfCohort:0.29, gaAvg:0.78, roeAvg:0.72, projectAvg:null, pattern:'Complete most tasks across all GAs', intervention:'Provide extension challenges', canDo:'Most assignment types', cannotDo:'Hardest open-ended questions' },
      { name:'Mid-tier coasters', size:280, pctOfCohort:0.43, gaAvg:0.58, roeAvg:0.54, projectAvg:null, pattern:'Selective completion by difficulty', intervention:'Targeted concept review sessions', canDo:'Well-documented tasks', cannotDo:'Multi-step deployment tasks' },
      { name:'Struggling students', size:185, pctOfCohort:0.28, gaAvg:0.31, roeAvg:0.28, projectAvg:null, pattern:'Skip hard questions, drop off mid-term', intervention:'Early intervention and peer pairing', canDo:'Basic tasks only', cannotDo:'Anything requiring toolchain setup' },
    ],
    timingConsistency: { pctConsistentlyEarly:0.42, pctConsistentlyLate:0.14, pctVariable:0.44 },
    termVerdict: `Term ${term} showed typical bimodal performance with GA5 being the primary dropout trigger. Students who submitted GA1 within 24 hours of release were 2.3x more likely to complete the full term.`,
  };
});

// CrossTerm
const allAssignments = ['GA1','GA2','GA3','GA4','GA5','GA6','GA7','GA8','ROE','Project'];
const crossTerm = {
  difficultyDrift: allAssignments.map(a => makeDrift(a, typeMap(a))),
  cohortShift: TERMS.map((t,i) => ({
    term:t, pctHighPerformers:[0.28,0.31,0.33,0.35][i], pctStruggling:[0.34,0.30,0.27,0.24][i], totalStudents:[980,1100,1050,665][i]
  })),
  dropoutHotspot: { assignment:'GA5', evidence:'40% of students who submitted GA4 did not submit GA5 across all terms' },
  roeGaCorrelation: TERMS.map((t,i) => ({
    term:t, correlation:[0.48,0.51,0.53,0.55][i], interpretation:'GA performance increasingly predicts ROE — curriculum alignment improving'
  })),
  persistentProblems: [
    'GA5 and GA7 consistently score below 0.40 across all terms',
    'Docker/container questions have 80%+ zero rate in every term',
    'Late starters score 7-8% lower on operational questions in every cohort',
    'Generative AI questions show all-or-nothing pattern — no scaffolding',
  ],
  measurableImprovements: [
    'GA1 completion rate increased from 72% (2025-01) to 89% (2026-01)',
    'ROE-GA correlation improved from 0.48 to 0.55 over 4 terms',
    'High-performer cohort share grew from 28% to 35%',
    'Struggling cohort share declined from 34% to 24%',
  ],
  verdict: 'The TDS course shows a positive trajectory over 4 terms with meaningful improvements in baseline completion and high-performer share. However, GA5 and GA7 remain persistent intervention targets with sub-40% normalized means every term. The ROE-GA correlation strengthening to 0.55 confirms curriculum alignment is improving, but the Docker/container barrier affects 30%+ of students in every cohort and represents the single highest-impact redesign opportunity.',
};

// Derived
const derived = {
  healthTable: Object.entries(difficultyByTerm).map(([a, byTerm]) => {
    const nm = byTerm['2026-01'] ?? byTerm['2025-09'] ?? 0.5;
    const drift = crossTerm.difficultyDrift.find(d=>d.assignment===a);
    const vals = Object.entries(byTerm).filter(([,v])=>v!=null);
    const first = vals[0]?.[1] ?? nm, last = vals[vals.length-1]?.[1] ?? nm;
    const trend = last > first+0.05 ? 'improving' : last < first-0.05 ? 'declining' : 'stable';
    const status = nm<0.35 ? 'REDESIGN' : nm<0.45 ? 'ACTION NEEDED' : nm<0.60 ? 'WATCH' : 'HEALTHY';
    return { assignment:a, type:typeMap(a), normalizedMean:nm, trend, status, biggestProblem: status==='REDESIGN'?'Extremely low completion':status==='ACTION NEEDED'?'Below threshold':drift?.stabilityFlag==='UNSTABLE'?'High variance':'On track' };
  }),
  bottleneckChain: [
    { from:'GA2', to:'GA4', conditionalPct:0.12 },
    { from:'GA4', to:'GA5', conditionalPct:0.18 },
    { from:'GA5', to:'ROE', conditionalPct:0.27 },
  ],
  recommendations: {
    students: [
      { rank:1, title:'Start GA2 Docker questions first', body:'The 4 lowest-completion questions all require Docker. Set up Docker Desktop before the assignment opens — students who pre-configure it score 2.1x higher on these questions.', assignmentRef:'GA2' },
      { rank:2, title:'Submit GA1 within 24 hours of release', body:'Students who submit GA1 within the first day are 2.3x more likely to complete the full term. The momentum effect is measurable.', assignmentRef:'GA1' },
      { rank:3, title:'Do not skip GA5 — it predicts ROE', body:'Students who score >50% on GA5 score 0.27 higher on ROE on average. GA5 tests the same API interaction skills tested in the exam.', assignmentRef:'GA5→ROE' },
      { rank:4, title:'Attempt all 4 generative AI questions together', body:'These questions share one prerequisite: the image generation pipeline. Set it up once and do all 4 in one session.', assignmentRef:'Project' },
    ],
    instructors: [
      { rank:1, title:'Add Docker pre-lab to GA2 module page', body:'14 of 20 questions in GA2 require Docker or a container runtime. A 20-minute setup video would unblock the 60%+ of students currently scoring 0 on these questions.', term:'2026-01', evidence:'q-localtunnel (14.6%), q-docker-hub (17.1%) completion rates' },
      { rank:2, title:'Split GA5 into GA5a and GA5b with checkpoint', body:'GA5 is the primary dropout trigger across all 4 terms. A mid-assignment checkpoint submission would identify at-risk students 2 weeks before the deadline.', term:'All terms', evidence:'40% dropout rate at GA5 in all 4 cohorts' },
      { rank:3, title:'Introduce partial credit for GA7 questions', body:'GA7 has the lowest normalized mean (0.31 in 2026-01) and zero partial rate — students get 0 or full credit. Partial credit tests would diagnose where students fail.', term:'2026-01', evidence:'GA7 normalized mean declined from 0.38 to 0.31 over 4 terms' },
      { rank:4, title:'Consolidate 4 generative AI questions into 2 with rubric', body:'The 4 generative questions have near-identical completion patterns — they are one task. Consolidating with a rubric for partial credit would improve both evaluation quality and student guidance.', term:'2026-01', evidence:'Gen AI questions: 0% partial rate, 32-34% zero rate in identical patterns' },
    ],
  },
  limitations: [
    'Autograder scores are binary (0 or full credit) — partial understanding is invisible to this analysis',
    'AI assistant usage cannot be detected; high completion on Markdown Parser may reflect AI-assisted code rather than genuine mastery',
    'Late submission filter (total=-1) may exclude students who attempted but were blocked by technical issues, not disengagement',
    'Cross-term student identity relies on email hashing — students who change emails between terms appear as new students, inflating apparent dropout rates',
  ],
};

export const mockData = { terms: TERMS, crossTerm, byTerm, byAssignment, derived };
