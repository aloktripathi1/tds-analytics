import { useDashboard } from '../context/DashboardContext.jsx';
import { MetricCard, SectionHeader, BarProgress, Badge } from '../components/shared/index.jsx';
import ls from '../components/layout/Layout.module.css';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { CLUSTER_COLORS } from '../utils/colors.js';

const TT = { contentStyle:{ background:'var(--color-bg)', border:'0.5px solid var(--color-border-strong)', borderRadius:'var(--radius-md)', fontSize:12, fontFamily:'var(--font-mono)' }};

export default function Students() {
  const { data, selectedTerm } = useDashboard();
  if (!data) return null;

  const activeTerm = selectedTerm === 'all' ? '2026-01' : selectedTerm;
  const td = data.byTerm[activeTerm] || {};
  const sc = td.studentCoverage || {};
  const clusters = td.studentClusters || [];

  const trajectory = [
    { name:'Improving', value: Math.round((sc.pctImproved||0.38)*100), color:'var(--color-ok)' },
    { name:'Declining',  value: Math.round((sc.pctDeclined||0.22)*100), color:'var(--color-danger)' },
    { name:'Stable',     value: Math.round((sc.pctStable||0.22)*100),   color:'var(--color-text-muted)' },
    { name:'Volatile',   value: Math.round((sc.pctVolatile||0.18)*100), color:'var(--color-warn)' },
  ];

  return (
    <div>
      {/* KPI */}
      <div className={ls.kpiRow}>
        <MetricCard label="Present all assignments" value={sc.presentAllAssignments?.toLocaleString() || '—'} sub="submitted every assignment" accentColor="var(--color-ok)" />
        <MetricCard label="Improving trajectory" value={sc.pctImproved ? `${(sc.pctImproved*100).toFixed(0)}%` : '—'} sub="of students improving over term" />
        <MetricCard label="Mid-term dropouts" value={sc.droppedOut?.toLocaleString() || '—'} sub={`dropped after ${sc.dropoutAssignment || 'GA5'}`} accentColor="var(--color-danger)" />
        <MetricCard label="Volatile performers" value={sc.pctVolatile ? `${(sc.pctVolatile*100).toFixed(0)}%` : '—'} sub="high score variance" accentColor="var(--color-warn)" />
      </div>

      {/* Trajectory donut + clusters */}
      <div className={ls.grid2} style={{ marginBottom:24 }}>
        {/* Donut */}
        <div className={ls.cardBordered}>
          <SectionHeader label="Trajectories" title="Student trajectory breakdown" />
          <div style={{ display:'flex', alignItems:'center', gap:24 }}>
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={trajectory} dataKey="value" innerRadius={50} outerRadius={80} strokeWidth={0} isAnimationActive={false}>
                  {trajectory.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip {...TT} formatter={v => [`${v}%`]} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {trajectory.map(t => (
                <div key={t.name} style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ width:10, height:10, borderRadius:'50%', background:t.color, display:'inline-block', flexShrink:0 }} />
                  <span style={{ fontSize:12, color:'var(--color-text-secondary)', flex:1 }}>{t.name}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:12, fontWeight:500, color:'var(--color-text-primary)' }}>{t.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Retention info */}
        <div className={ls.cardBordered}>
          <SectionHeader label="Retention" title={`Dropout analysis — ${activeTerm}`} />
          <p style={{ fontSize:13, color:'var(--color-text-secondary)', lineHeight:1.7, marginBottom:16 }}>
            Primary dropout point: <strong style={{ color:'var(--color-danger)' }}>{sc.dropoutAssignment}</strong>. Students who submit {sc.dropoutAssignment} are {sc.droppedOut ? `${sc.droppedOut} fewer` : '—'} than those who completed the preceding assignment.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[['Improved', sc.pctImproved, 'var(--color-ok)'], ['Declined', sc.pctDeclined, 'var(--color-danger)'], ['Volatile', sc.pctVolatile, 'var(--color-warn)'], ['Stable', sc.pctStable, 'var(--color-text-muted)']].map(([label, val, color]) => (
              <div key={label} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--color-text-muted)', width:60 }}>{label}</span>
                <BarProgress value={val || 0} colorVar={color} height={6} />
                <span style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--color-text-secondary)', width:36, textAlign:'right' }}>{val != null ? `${(val*100).toFixed(0)}%` : '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clusters */}
      <div>
        <SectionHeader label="Segmentation" title="Student clusters" sub={`${activeTerm} — behavioral cohort analysis`} />
        <div className={ls.grid2}>
          {clusters.map((cluster, i) => {
            const color = CLUSTER_COLORS[i % CLUSTER_COLORS.length];
            return (
              <div key={cluster.name} className={ls.cardBordered} style={{ borderTop: `3px solid ${color}` }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                  <span style={{ width:10, height:10, borderRadius:'50%', background:color, display:'inline-block' }} />
                  <span style={{ fontSize:13, fontWeight:500, flex:1, color:'var(--color-text-primary)' }}>{cluster.name}</span>
                  <Badge text={`${cluster.size} students`} variant="gray" />
                  <Badge text={`${(cluster.pctOfCohort*100).toFixed(0)}%`} variant="info" />
                </div>
                {/* Score bars */}
                {[['GA avg', cluster.gaAvg, color], ['ROE avg', cluster.roeAvg, 'var(--color-info)'], ['Project avg', cluster.projectAvg, 'var(--color-purple)']].map(([label, val, c]) => (
                  <div key={label} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                    <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--color-text-muted)', width:64 }}>{label}</span>
                    <BarProgress value={val ?? 0} colorVar={c} height={6} />
                    <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--color-text-secondary)', width:32, textAlign:'right' }}>{val != null ? `${(val*100).toFixed(0)}%` : 'N/A'}</span>
                  </div>
                ))}
                <div style={{ display:'flex', flexDirection:'column', gap:5, marginTop:12, fontSize:12 }}>
                  <div><span style={{ color:'var(--color-ok)', fontWeight:500, fontSize:10, fontFamily:'var(--font-mono)' }}>CAN DO  </span><span style={{ color:'var(--color-text-secondary)' }}>{cluster.canDo}</span></div>
                  <div><span style={{ color:'var(--color-danger)', fontWeight:500, fontSize:10, fontFamily:'var(--font-mono)' }}>CANNOT  </span><span style={{ color:'var(--color-text-secondary)' }}>{cluster.cannotDo}</span></div>
                  <div style={{ borderTop:'1px solid var(--color-border)', paddingTop:8, marginTop:4 }}>
                    <span style={{ color:'var(--color-text-muted)', fontSize:11 }}>⚡ {cluster.intervention}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
