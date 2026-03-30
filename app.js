import { dashboardData } from './dashboard_data.js';

Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Inter', sans-serif";

const termKeys = Object.keys(dashboardData);
const baseExams = ['GA1', 'GA2', 'GA3', 'GA4', 'GA5', 'GA6', 'GA7', 'GA8', 'ROE'];

const chartColors = [
    { border: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' }, // Blue
    { border: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' }, // Green
    { border: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' }, // Purple
    { border: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' }  // Amber
];

const datasetsAverages = termKeys.map((term, i) => {
    return {
        label: term,
        data: baseExams.map(ex => dashboardData[term][ex] ? dashboardData[term][ex].avgAsPercent : null),
        borderColor: chartColors[i % chartColors.length].border,
        backgroundColor: chartColors[i % chartColors.length].bg,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#0f172a',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8
    };
});

const datasetsSubmissions = termKeys.map((term, i) => {
    return {
        label: term,
        data: baseExams.map(ex => dashboardData[term][ex] ? dashboardData[term][ex].subs : null),
        borderColor: chartColors[i % chartColors.length].border,
        backgroundColor: chartColors[i % chartColors.length].bg,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#0f172a',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        fill: true
    };
});

// Averages Chart Configuration
const ctxAvg = document.getElementById('averageScoresChart').getContext('2d');
new Chart(ctxAvg, {
    type: 'line',
    data: {
        labels: baseExams,
        datasets: datasetsAverages
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw}%`;
                    }
                }
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: { callback: function(value) { return value + '%'; } },
                grid: { color: 'rgba(255, 255, 255, 0.05)' }
            },
            x: { grid: { display: false } }
        }
    }
});

// Submissions Chart Configuration
const ctxSubs = document.getElementById('submissionDropoffChart').getContext('2d');
new Chart(ctxSubs, {
    type: 'line',
    data: {
        labels: baseExams,
        datasets: datasetsSubmissions
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw} students`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255, 255, 255, 0.05)' }
            },
            x: { grid: { display: false } }
        }
    }
});
