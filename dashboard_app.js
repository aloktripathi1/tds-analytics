import { analysisData, insights } from './analysis_data.js';

// ===== Chart.js Global Config =====
Chart.defaults.color = '#8b95a8';
Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
Chart.defaults.font.weight = 500;

const TERMS = Object.keys(analysisData);
const TERM_COLORS = {
  '2025-01': { border: '#4f8ff7', bg: 'rgba(79,143,247,0.12)' },
  '2025-05': { border: '#34d399', bg: 'rgba(52,211,153,0.12)' },
  '2025-09': { border: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  '2026-01': { border: '#fbbf24', bg: 'rgba(251,191,36,0.12)' }
};

const ALL_GAS = ['GA1','GA2','GA3','GA4','GA5','GA6','GA7','GA8'];
const chartInstances = {};

// ===== NAVIGATION =====
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.dataset.page;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    link.classList.add('active');
  });
});

// ===== SIDEBAR COLLAPSE =====
const sidebarEl = document.getElementById('sidebar');
const sidebarToggleBtn = document.getElementById('sidebar-toggle');

sidebarToggleBtn.addEventListener('click', () => {
  sidebarEl.classList.toggle('collapsed');
  const expanded = !sidebarEl.classList.contains('collapsed');
  sidebarToggleBtn.setAttribute('aria-expanded', String(expanded));
  sidebarToggleBtn.setAttribute('aria-label', expanded ? 'Collapse sidebar' : 'Expand sidebar');
  sidebarToggleBtn.setAttribute('title', expanded ? 'Collapse sidebar' : 'Expand sidebar');

  // Trigger chart resize after transition completes
  setTimeout(() => {
    Object.values(chartInstances).forEach(c => c.resize());
  }, 350);
});

// ===== UTILITY =====
function getVal(term, exam, field) {
  return analysisData[term]?.[exam]?.[field] ?? null;
}

function makeDataset(term, dataArr, fill = false) {
  const c = TERM_COLORS[term];
  return {
    label: term,
    data: dataArr,
    borderColor: c.border,
    backgroundColor: fill ? c.bg : c.border,
    tension: 0.35,
    borderWidth: 2.5,
    pointBackgroundColor: '#0c0e14',
    pointBorderColor: c.border,
    pointBorderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 7,
    fill,
    spanGaps: true
  };
}

function destroyChart(id) {
  if (chartInstances[id]) { chartInstances[id].destroy(); delete chartInstances[id]; }
}

// ===== GA INSIGHTS GENERATOR =====
function generateGAInsights() {
  const insightCards = [];

  // Insight 1: GA2 is consistently brutal across terms
  const ga2AvgPerTerms = TERMS.filter(t => analysisData[t]?.GA2).map(t => ({
    term: t,
    gross: analysisData[t].GA2.avgPercent,
    honest: analysisData[t].GA2.honestPercent,
    hack: analysisData[t].GA2.hackPercent
  }));
  if (ga2AvgPerTerms.length > 0) {
    const avgGross = (ga2AvgPerTerms.reduce((s, r) => s + r.gross, 0) / ga2AvgPerTerms.length).toFixed(1);
    const avgHack = (ga2AvgPerTerms.reduce((s, r) => s + r.hack, 0) / ga2AvgPerTerms.length).toFixed(1);
    insightCards.push({
      icon: '🔥',
      title: 'GA2 is Consistently Brutal',
      body: `Across all ${ga2AvgPerTerms.length} terms, GA2 averages only <strong>${avgGross}%</strong> gross score — the lowest of any GA. It also has the highest hack rate among GAs at <strong>${avgHack}%</strong> average bypass. The worst was <strong>${ga2AvgPerTerms.sort((a,b) => a.gross - b.gross)[0].term}</strong> with just ${ga2AvgPerTerms[0].gross}%.`,
      type: 'brutal'
    });
  }

  // Insight 2: GA5 is consistently the easiest across terms
  const ga5Data = TERMS.filter(t => analysisData[t]?.GA5).map(t => ({
    term: t, honest: analysisData[t].GA5.honestPercent, perfect: analysisData[t].GA5.perfectPercent
  }));
  if (ga5Data.length > 0) {
    const avgHonest = (ga5Data.reduce((s, r) => s + r.honest, 0) / ga5Data.length).toFixed(1);
    const avgPerfect = (ga5Data.reduce((s, r) => s + r.perfect, 0) / ga5Data.length).toFixed(1);
    insightCards.push({
      icon: '🏆',
      title: 'GA5 — The Crowd Favorite',
      body: `GA5 consistently scores the highest honest average of <strong>${avgHonest}%</strong> across ${ga5Data.length} terms. On average, <strong>${avgPerfect}%</strong> of honest students achieve a perfect score. 2026-01 GA5 peaked at an insane 97.8% honest average.`,
      type: 'success'
    });
  }

  // Insight 3: Hack rate drops as GAs progress  
  const hackByGA = {};
  ALL_GAS.forEach(ga => {
    const vals = TERMS.filter(t => analysisData[t]?.[ga]).map(t => analysisData[t][ga].hackPercent);
    if (vals.length > 0) hackByGA[ga] = (vals.reduce((s,v) => s+v, 0) / vals.length).toFixed(1);
  });
  const hackEntries = Object.entries(hackByGA);
  if (hackEntries.length >= 3) {
    const first = hackEntries[0];
    const last = hackEntries[hackEntries.length - 1];
    insightCards.push({
      icon: '📉',
      title: 'Bypass Rate Decreases Over the Course',
      body: `Early GAs have significantly higher hack rates — <strong>${first[0]}</strong> averages <strong>${first[1]}%</strong> bypass, while <strong>${last[0]}</strong> drops to <strong>${last[1]}%</strong>. This suggests students who persist to later GAs are more likely to attempt questions honestly.`,
      type: 'info'
    });
  }

  // Insight 4: Student drop-off pattern
  const retentionData = TERMS.filter(t => analysisData[t]?.GA1 && analysisData[t]?.GA5).map(t => ({
    term: t,
    start: analysisData[t].GA1.totalStudents,
    end: analysisData[t].GA5.totalStudents,
    retention: ((analysisData[t].GA5.totalStudents / analysisData[t].GA1.totalStudents) * 100).toFixed(1)
  }));
  if (retentionData.length > 0) {
    const bestRetention = retentionData.sort((a,b) => b.retention - a.retention)[0];
    const worstRetention = retentionData[retentionData.length - 1];
    insightCards.push({
      icon: '👥',
      title: 'Student Retention Varies Wildly',
      body: `Best retention: <strong>${bestRetention.term}</strong> kept <strong>${bestRetention.retention}%</strong> of students from GA1→GA5. Worst: <strong>${worstRetention.term}</strong> retained only <strong>${worstRetention.retention}%</strong>. On average, ${((retentionData.reduce((s,r) => s + parseFloat(r.retention), 0) / retentionData.length)).toFixed(1)}% of students persist.`,
      type: 'warning'
    });
  }

  // Insight 5: Score inflation from hacks
  const inflationData = [];
  for (const [term, exams] of Object.entries(analysisData)) {
    for (const [exam, d] of Object.entries(exams)) {
      if (!exam.startsWith('GA')) continue;
      inflationData.push({ term, exam, inflation: d.honestPercent - d.avgPercent });
    }
  }
  inflationData.sort((a,b) => b.inflation - a.inflation);
  if (inflationData.length > 0) {
    const worst = inflationData[0];
    insightCards.push({
      icon: '📊',
      title: 'Hack-Driven Score Inflation',
      body: `<strong>${worst.term} ${worst.exam}</strong> has the biggest gap between honest and gross averages: <strong>+${worst.inflation.toFixed(1)}%</strong> inflation. When hackers are removed, the real class performance is significantly higher, proving that bypass attempts dragged down the overall average.`,
      type: 'hack'
    });
  }

  return insightCards;
}

// ===== ROE INSIGHTS GENERATOR =====
function generateROEInsights() {
  const roeTerms = TERMS.filter(t => analysisData[t]?.ROE);
  const insightCards = [];

  if (roeTerms.length === 0) return insightCards;

  // Sort ROEs by gross average
  const roeData = roeTerms.map(t => ({ term: t, ...analysisData[t].ROE }));
  roeData.sort((a,b) => a.avgPercent - b.avgPercent);

  // Insight 1: ROE is the hardest category
  const avgROE = (roeData.reduce((s,d) => s + d.avgPercent, 0) / roeData.length).toFixed(1);
  insightCards.push({
    icon: '💀',
    title: 'ROE — The Great Equalizer',
    body: `Average gross score across all ROEs is just <strong>${avgROE}%</strong>, making it by far the hardest category. The worst was <strong>${roeData[0].term}</strong> at an abysmal <strong>${roeData[0].avgPercent}%</strong>. Even the "best" ROE was only <strong>${roeData[roeData.length-1].avgPercent}%</strong>.`,
    type: 'brutal'
  });

  // Insight 2: ROE hack epidemic
  const avgHack = (roeData.reduce((s,d) => s + d.hackPercent, 0) / roeData.length).toFixed(1);
  const totalROEHacks = roeData.reduce((s,d) => s + d.hackCount, 0);
  insightCards.push({
    icon: '🏴‍☠️',
    title: 'Bypass Exploit in ROEs',
    body: `An average of <strong>${avgHack}%</strong> of ROE submissions used the bypass exploit across all terms. That's <strong>${totalROEHacks.toLocaleString()}</strong> total hacked submissions. <strong>${roeData.sort((a,b)=>b.hackPercent-a.hackPercent)[0].term}</strong> was worst at <strong>${roeData[0].hackPercent}%</strong>.`,
    type: 'hack'
  });

  // Insight 3: Honest ROE performance
  const honestAvg = (roeData.reduce((s,d) => s + d.honestPercent, 0) / roeData.length).toFixed(1);
  insightCards.push({
    icon: '🎯',
    title: 'Honest Students Still Struggle',
    body: `Even after removing all bypassed submissions, the honest ROE average is only <strong>${honestAvg}%</strong>. This confirms that the ROE is genuinely difficult, not just inflated by bypass noise. The gap between gross (${avgROE}%) and honest (${honestAvg}%) is massive.`,
    type: 'warning'
  });

  // Insight 4: ROE trend over time
  const chronological = roeTerms.map(t => ({ term: t, avg: analysisData[t].ROE.avgPercent }));
  const trend = chronological[chronological.length-1].avg > chronological[0].avg ? 'improving' : 'worsening';
  insightCards.push({
    icon: trend === 'improving' ? '📈' : '📉',
    title: `ROE Performance is ${trend === 'improving' ? 'Improving' : 'Fluctuating'}`,
    body: `From <strong>${chronological[0].term}</strong> (${chronological[0].avg}%) to <strong>${chronological[chronological.length-1].term}</strong> (${chronological[chronological.length-1].avg}%), the ROE trend is ${trend}. ${trend === 'improving' ? 'Students are adapting to the format.' : 'The exam continues to be a major challenge.'}`,
    type: trend === 'improving' ? 'success' : 'info'
  });

  return insightCards;
}

function renderInsightCards(containerId, cards) {
  document.getElementById(containerId).innerHTML = cards.map(c => `
    <div class="insight-card ${c.type}">
      <div class="insight-icon">${c.icon}</div>
      <div class="insight-title">${c.title}</div>
      <div class="insight-body">${c.body}</div>
    </div>
  `).join('');
}

// ===== PAGE 1: OVERVIEW =====
function renderOverview() {
  const totalStudents = Object.values(analysisData).reduce((sum, t) =>
    sum + Object.values(t).reduce((s, e) => s + e.totalStudents, 0), 0);
  const totalAssignments = Object.values(analysisData).reduce((sum, t) =>
    sum + Object.keys(t).length, 0);
  const totalHacks = Object.values(analysisData).reduce((sum, t) =>
    sum + Object.values(t).reduce((s, e) => s + e.hackCount, 0), 0);

  document.getElementById('kpi-grid').innerHTML = `
    <div class="kpi-card blue">
      <div class="kpi-label">Terms Analyzed</div>
      <div class="kpi-value">${TERMS.length}</div>
    </div>
    <div class="kpi-card purple">
      <div class="kpi-label">Total Assignments</div>
      <div class="kpi-value">${totalAssignments}</div>
    </div>
    <div class="kpi-card cyan">
      <div class="kpi-label">Total Submissions</div>
      <div class="kpi-value">${totalStudents.toLocaleString()}</div>
    </div>
    <div class="kpi-card red">
      <div class="kpi-label">Total Bypassed</div>
      <div class="kpi-value">${totalHacks.toLocaleString()}</div>
      <div class="kpi-sub">${((totalHacks / totalStudents) * 100).toFixed(1)}% of all submissions</div>
    </div>
    <div class="kpi-card green">
      <div class="kpi-label">Easiest (Honest)</div>
      <div class="kpi-value">${insights.easiest.honestPercent}%</div>
      <div class="kpi-sub">${insights.easiest.term} ${insights.easiest.exam}</div>
    </div>
    <div class="kpi-card amber">
      <div class="kpi-label">Hardest (Honest)</div>
      <div class="kpi-value">${insights.hardest.honestPercent}%</div>
      <div class="kpi-sub">${insights.hardest.term} ${insights.hardest.exam}</div>
    </div>
  `;

  const labels = [...ALL_GAS, 'ROE'];
  destroyChart('overviewAvgChart');
  chartInstances['overviewAvgChart'] = new Chart(
    document.getElementById('overviewAvgChart'), {
      type: 'line',
      data: {
        labels,
        datasets: TERMS.map(t => makeDataset(t, labels.map(ex => getVal(t, ex, 'avgPercent'))))
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.raw}%` } }
        },
        scales: {
          y: { min: 0, max: 100, ticks: { callback: v => v + '%' }, grid: { color: 'rgba(255,255,255,0.04)' } },
          x: { grid: { display: false } }
        }
      }
    }
  );

  destroyChart('overviewRetentionChart');
  chartInstances['overviewRetentionChart'] = new Chart(
    document.getElementById('overviewRetentionChart'), {
      type: 'line',
      data: {
        labels,
        datasets: TERMS.map(t => makeDataset(t, labels.map(ex => getVal(t, ex, 'totalStudents')), true))
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.raw?.toLocaleString()} students` } }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.04)' } },
          x: { grid: { display: false } }
        }
      }
    }
  );
}

// ===== PAGE 2: GA ANALYSIS =====
function renderGAAnalysis() {
  const existingGAs = ALL_GAS.filter(ga =>
    TERMS.some(t => analysisData[t]?.[ga])
  );

  // Populate term filter dropdown
  const termSelect = document.getElementById('term-filter-select');
  termSelect.innerHTML = '<option value="all">All Terms</option>' +
    TERMS.map(t => `<option value="${t}">${t}</option>`).join('');

  // GA Selector buttons
  const selectorEl = document.getElementById('ga-selector');
  selectorEl.innerHTML = existingGAs.map((ga, i) =>
    `<button class="ga-btn ${i === 0 ? 'active' : ''}" data-ga="${ga}">${ga}</button>`
  ).join('');

  let selectedGA = existingGAs[0];
  let selectedTerm = 'all';

  function getActiveTerms() {
    return selectedTerm === 'all' ? TERMS : [selectedTerm];
  }

  function updateTable() {
    const activeTerms = getActiveTerms();
    const termsWithGA = activeTerms.filter(t => analysisData[t]?.[selectedGA]);
    const table = document.getElementById('ga-comparison-table');
    table.querySelector('thead tr').innerHTML = `<th>Metric</th>` + termsWithGA.map(t => `<th>${t}</th>`).join('');

    const metrics = [
      { label: 'Total Students', key: 'totalStudents' },
      { label: 'Max Score', key: 'maxScore' },
      { label: 'Gross Average', key: 'avgScore' },
      { label: 'Gross Avg %', key: 'avgPercent', suffix: '%' },
      { label: 'Honest Average', key: 'honestAvg' },
      { label: 'Honest Avg %', key: 'honestPercent', suffix: '%' },
      { label: 'Perfect Scores', key: 'perfectCount' },
      { label: 'Perfect %', key: 'perfectPercent', suffix: '%' },
      { label: 'Zero Scores', key: 'zeroCount' },
      { label: 'Negative Scores', key: 'negativeCount' },
      { label: 'Hack/Bypass Count', key: 'hackCount' },
      { label: 'Hack %', key: 'hackPercent', suffix: '%' }
    ];

    table.querySelector('tbody').innerHTML = metrics.map(m =>
      `<tr><td style="font-weight:600;color:var(--text-primary)">${m.label}</td>${termsWithGA.map(t => {
        const v = getVal(t, selectedGA, m.key);
        const display = v !== null ? (v.toLocaleString() + (m.suffix || '')) : '—';
        return `<td>${display}</td>`;
      }).join('')}</tr>`
    ).join('');
  }

  function updateCharts() {
    const activeTerms = getActiveTerms();

    // Gross chart
    destroyChart('gaGrossChart');
    chartInstances['gaGrossChart'] = new Chart(
      document.getElementById('gaGrossChart'), {
        type: 'bar',
        data: {
          labels: existingGAs,
          datasets: activeTerms.map(t => ({
            label: t,
            data: existingGAs.map(ga => getVal(t, ga, 'avgPercent')),
            backgroundColor: TERM_COLORS[t].border + '99',
            borderColor: TERM_COLORS[t].border,
            borderWidth: 1,
            borderRadius: 6
          }))
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.raw}%` } } },
          scales: {
            y: { min: 0, max: 100, ticks: { callback: v => v + '%' }, grid: { color: 'rgba(255,255,255,0.04)' } },
            x: { grid: { display: false } }
          }
        }
      }
    );

    // Honest chart
    destroyChart('gaHonestChart');
    chartInstances['gaHonestChart'] = new Chart(
      document.getElementById('gaHonestChart'), {
        type: 'bar',
        data: {
          labels: existingGAs,
          datasets: activeTerms.map(t => ({
            label: t,
            data: existingGAs.map(ga => getVal(t, ga, 'honestPercent')),
            backgroundColor: TERM_COLORS[t].border + '99',
            borderColor: TERM_COLORS[t].border,
            borderWidth: 1,
            borderRadius: 6
          }))
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.raw}%` } } },
          scales: {
            y: { min: 0, max: 100, ticks: { callback: v => v + '%' }, grid: { color: 'rgba(255,255,255,0.04)' } },
            x: { grid: { display: false } }
          }
        }
      }
    );

    // Perfect score chart
    destroyChart('gaPerfectChart');
    chartInstances['gaPerfectChart'] = new Chart(
      document.getElementById('gaPerfectChart'), {
        type: 'line',
        data: {
          labels: existingGAs,
          datasets: activeTerms.map(t => makeDataset(t, existingGAs.map(ga => getVal(t, ga, 'perfectPercent'))))
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.raw}%` } } },
          scales: {
            y: { min: 0, ticks: { callback: v => v + '%' }, grid: { color: 'rgba(255,255,255,0.04)' } },
            x: { grid: { display: false } }
          }
        }
      }
    );
  }

  const BUCKET_LABELS = ['0-10%','10-20%','20-30%','30-40%','40-50%','50-60%','60-70%','70-80%','80-90%','90-99%','100%'];

  function updateDistribution() {
    const activeTerms = getActiveTerms();
    document.getElementById('distributionTitle').textContent = `Score Distribution — ${selectedGA}`;

    destroyChart('gaDistributionChart');
    chartInstances['gaDistributionChart'] = new Chart(
      document.getElementById('gaDistributionChart'), {
        type: 'bar',
        data: {
          labels: BUCKET_LABELS,
          datasets: activeTerms.filter(t => analysisData[t]?.[selectedGA]).map(t => ({
            label: t,
            data: analysisData[t][selectedGA].percentBuckets,
            backgroundColor: TERM_COLORS[t].border + 'aa',
            borderColor: TERM_COLORS[t].border,
            borderWidth: 1,
            borderRadius: 4
          }))
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.dataset.label}: ${ctx.raw} students`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Number of Students', color: '#8b95a8' },
              grid: { color: 'rgba(255,255,255,0.04)' }
            },
            x: {
              title: { display: true, text: 'Score Range', color: '#8b95a8' },
              grid: { display: false }
            }
          }
        }
      }
    );
  }

  updateTable();
  updateCharts();
  updateDistribution();

  // Event: GA button click
  selectorEl.querySelectorAll('.ga-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectorEl.querySelectorAll('.ga-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedGA = btn.dataset.ga;
      updateTable();
      updateDistribution();
    });
  });

  // Event: Term filter change
  termSelect.addEventListener('change', () => {
    selectedTerm = termSelect.value;
    updateTable();
    updateCharts();
    updateDistribution();
  });

  // Render GA insights
  renderInsightCards('ga-insights', generateGAInsights());
}

// ===== PAGE 3: ROE ANALYSIS =====
function renderROE() {
  const roeTerms = TERMS.filter(t => analysisData[t]?.ROE);

  // Render ROE insights
  renderInsightCards('roe-insights', generateROEInsights());

  const cardsEl = document.getElementById('roe-cards');
  cardsEl.innerHTML = roeTerms.map(t => {
    const d = analysisData[t].ROE;
    return `
      <div class="roe-card">
        <div class="roe-term">${t}</div>
        <div class="roe-avg" style="color:${d.avgPercent < 40 ? 'var(--accent-red)' : d.avgPercent < 55 ? 'var(--accent-amber)' : 'var(--accent-green)'}">${d.avgPercent}%</div>
        <div style="color:var(--text-muted);font-size:0.82rem">Gross Average</div>
        <div class="roe-honest">Honest Avg: ${d.honestPercent}%</div>
        <div class="roe-hack">🏴‍☠️ ${d.hackCount} bypassed (${d.hackPercent}%)</div>
        <div style="color:var(--text-muted);font-size:0.8rem;margin-top:6px">${d.totalStudents} students · Max ${d.maxScore} pts</div>
      </div>`;
  }).join('');

  destroyChart('roeCompareChart');
  chartInstances['roeCompareChart'] = new Chart(
    document.getElementById('roeCompareChart'), {
      type: 'bar',
      data: {
        labels: roeTerms,
        datasets: [
          {
            label: 'Gross Avg %',
            data: roeTerms.map(t => analysisData[t].ROE.avgPercent),
            backgroundColor: 'rgba(248,113,113,0.7)',
            borderColor: '#f87171',
            borderWidth: 1, borderRadius: 6
          },
          {
            label: 'Honest Avg %',
            data: roeTerms.map(t => analysisData[t].ROE.honestPercent),
            backgroundColor: 'rgba(52,211,153,0.7)',
            borderColor: '#34d399',
            borderWidth: 1, borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        scales: {
          y: { min: 0, max: 100, ticks: { callback: v => v + '%' }, grid: { color: 'rgba(255,255,255,0.04)' } },
          x: { grid: { display: false } }
        }
      }
    }
  );

  destroyChart('roeHackChart');
  chartInstances['roeHackChart'] = new Chart(
    document.getElementById('roeHackChart'), {
      type: 'doughnut',
      data: {
        labels: roeTerms.map(t => t + ' (' + analysisData[t].ROE.hackPercent + '%)'),
        datasets: [{
          data: roeTerms.map(t => analysisData[t].ROE.hackCount),
          backgroundColor: ['#4f8ff7', '#34d399', '#a78bfa'],
          borderColor: '#0c0e14',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    }
  );
}

// ===== PAGE 4: HACK AUDIT =====
function renderHackAudit() {
  let totalHacks = 0, totalSubs = 0, worstHack = { pct: 0 };
  const allRows = [];

  for (const [term, exams] of Object.entries(analysisData)) {
    for (const [exam, d] of Object.entries(exams)) {
      totalHacks += d.hackCount;
      totalSubs += d.totalStudents;
      if (d.hackPercent > worstHack.pct) worstHack = { term, exam, pct: d.hackPercent, count: d.hackCount };
      allRows.push({ term, exam, ...d });
    }
  }

  document.getElementById('hack-summary-row').innerHTML = `
    <div class="hack-stat">
      <div class="hack-number">${totalHacks.toLocaleString()}</div>
      <div class="hack-label">Total Bypassed Submissions</div>
    </div>
    <div class="hack-stat">
      <div class="hack-number">${((totalHacks / totalSubs) * 100).toFixed(1)}%</div>
      <div class="hack-label">Overall Bypass Rate</div>
    </div>
    <div class="hack-stat">
      <div class="hack-number">${worstHack.pct}%</div>
      <div class="hack-label">Worst: ${worstHack.term} ${worstHack.exam}</div>
    </div>
  `;

  allRows.sort((a, b) => b.hackPercent - a.hackPercent);
  const maxHackPercent = allRows.length ? Math.max(...allRows.map(r => r.hackPercent)) : 0;
  // Keep a zero baseline for truthful comparisons, but fit max to real data range.
  const xAxisMax = Math.max(5, Math.ceil(maxHackPercent * 1.15));
  let xTickStep = 1;
  if (xAxisMax > 15) xTickStep = 2;
  if (xAxisMax > 30) xTickStep = 5;
  if (xAxisMax > 60) xTickStep = 10;

  destroyChart('hackBarChart');
  chartInstances['hackBarChart'] = new Chart(
    document.getElementById('hackBarChart'), {
      type: 'bar',
      data: {
        labels: allRows.map(r => `${r.term} ${r.exam}`),
        datasets: [{
          label: 'Hack %',
          data: allRows.map(r => r.hackPercent),
          backgroundColor: allRows.map(r =>
            r.hackPercent > 75 ? 'rgba(248,113,113,0.8)' :
            r.hackPercent > 50 ? 'rgba(251,191,36,0.8)' :
            r.hackPercent > 30 ? 'rgba(79,143,247,0.8)' :
            'rgba(52,211,153,0.8)'
          ),
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            min: 0,
            max: xAxisMax,
            ticks: { stepSize: xTickStep, callback: v => v + '%' },
            grid: { color: 'rgba(255,255,255,0.04)' }
          },
          y: { grid: { display: false } }
        }
      }
    }
  );

  document.querySelector('#hack-table tbody').innerHTML = allRows.map(r => {
    const inflation = r.honestPercent - r.avgPercent;
    const inflationColor = inflation > 15 ? 'var(--accent-red)' : inflation > 5 ? 'var(--accent-amber)' : 'var(--accent-green)';
    return `<tr>
      <td>${r.term}</td>
      <td style="font-weight:700;color:var(--text-primary)">${r.exam}</td>
      <td>${r.totalStudents}</td>
      <td style="color:var(--accent-red);font-weight:700">${r.hackCount}</td>
      <td style="color:${r.hackPercent > 70 ? 'var(--accent-red)' : 'var(--accent-amber)'};font-weight:700">${r.hackPercent}%</td>
      <td>${r.avgPercent}%</td>
      <td style="color:var(--accent-green)">${r.honestPercent}%</td>
      <td style="color:${inflationColor};font-weight:600">+${inflation.toFixed(1)}%</td>
    </tr>`;
  }).join('');
}

// ===== PAGE 5: DIFFICULTY RANKINGS =====
function renderDifficulty() {
  const allExams = [];
  for (const [term, exams] of Object.entries(analysisData)) {
    for (const [exam, d] of Object.entries(exams)) {
      allExams.push({ term, exam, ...d });
    }
  }

  allExams.sort((a, b) => a.honestPercent - b.honestPercent);

  document.querySelector('#difficulty-table tbody').innerHTML = allExams.map((r, i) => {
    let badge, badgeClass;
    if (r.honestPercent < 60) { badge = 'Brutal'; badgeClass = 'badge-brutal'; }
    else if (r.honestPercent < 85) { badge = 'Hard'; badgeClass = 'badge-hard'; }
    else if (r.honestPercent < 93) { badge = 'Medium'; badgeClass = 'badge-medium'; }
    else { badge = 'Easy'; badgeClass = 'badge-easy'; }

    return `<tr>
      <td style="font-weight:800;color:var(--text-primary)">#${i + 1}</td>
      <td style="font-weight:700;color:var(--text-primary)">${r.exam}</td>
      <td>${r.term}</td>
      <td>${r.totalStudents}</td>
      <td>${r.avgPercent}%</td>
      <td style="font-weight:700;color:${r.honestPercent < 70 ? 'var(--accent-red)' : r.honestPercent < 90 ? 'var(--accent-amber)' : 'var(--accent-green)'}">${r.honestPercent}%</td>
      <td style="color:var(--accent-red)">${r.hackPercent}%</td>
      <td>${r.perfectPercent}%</td>
      <td><span class="badge ${badgeClass}">${badge}</span></td>
    </tr>`;
  }).join('');
}

// ===== INITIALIZE ALL PAGES =====
renderOverview();
renderGAAnalysis();
renderROE();
renderHackAudit();
renderDifficulty();
