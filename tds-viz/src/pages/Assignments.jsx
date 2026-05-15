import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';
import { SectionHeader, Badge, BarProgress } from '../components/shared/index.jsx';
import ls from '../components/layout/Layout.module.css';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine
} from 'recharts';

const AXIS_TICK = { fontSize:11, fontFamily:'var(--font-mono)', fill:'var(--color-text-muted)' };
const TT = { contentStyle:{ background:'var(--color-bg)', border:'0.5px solid var(--color-border-strong)', borderRadius:'var(--radius-md)', fontSize:12, fontFamily:'var(--font-mono)' }};

function corrColor(r) {
  if (r > 0.5) return 'var(--color-ok)';
  if (r > 0.35) return 'var(--color-warn)';
  return 'var(--color-danger)';
}

export default function Assignments() {
  const { data, selectedTerm } = useDashboard();
  const [openAcc, setOpenAcc] = useState(null);
  if (!data) return null;

  const activeTerm = selectedTerm === 'all' ? '2026-01' : selectedTerm;
  const termData   = data.byTerm[activeTerm] || {};
  const assignments = termData.assignmentsAnalyzed || [];

  // Drift data for stability
  const driftData = (data.crossTerm?.difficultyDrift || []).filter(d =>
    assignments.includes(d.assignment)
  );

  // Cross assignment predictors
  const predictors = (termData.crossAssignmentPredictors || []).map(p => ({
    name: `${p.from}→${p.to}`, corr: p.correlation, interp: p.interpretation
  }));

  // ROE-GA correlation
  const roeGa = (data.crossTerm?.roeGaCorrelation || []).map(r => ({
    term: r.term, corr: r.correlation
  }));

  // Timing consistency
  const tc = termData.timingConsistency || {};

  const toggleAcc = (a) => setOpenAcc(openAcc === a ? null : a);

  return (
    <div>
      {/* Grading stability bars */}
      <div className={ls.cardBordered} style={{ marginBottom:24 }}>
        <SectionHeader label="Stability" title="Cross-term grading stability (coefficient of variation)" />
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {driftData.map(d => (
            <div key={d.assignment} style={{ display:'flex', alignItems:'center', gap:12 }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:11, width:40, color:'var(--color-text-secondary)' }}>{d.assignment}</span>
              <BarProgress value={Math.min(1, d.cv / 0.3)} colorVar={d.stabilityFlag === 'UNSTABLE' ? 'var(--color-danger)' : 'var(--color-ok)'} height={7} />
              <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--color-text-muted)', whiteSpace:'nowrap' }}>
                CV={d.cv?.toFixed(3)}
              </span>
              <Badge text={d.stabilityFlag} variant={d.stabilityFlag === 'UNSTABLE' ? 'danger' : 'ok'} />
            </div>
          ))}
        </div>
      </div>

      {/* Two column */}
      <div className={ls.grid2} style={{ marginBottom:24 }}>
        {/* Cross-assignment predictors */}
        <div className={ls.cardBordered}>
          <SectionHeader label="Predictors" title={`Cross-assignment predictor strength — ${activeTerm}`} />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={predictors} layout="vertical" margin={{ top:4, right:16, left:20, bottom:4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis type="number" domain={[0,1]} tickFormatter={v=>`${(v*100).toFixed(0)}%`} tick={AXIS_TICK} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={AXIS_TICK} tickLine={false} width={60} />
              <Tooltip {...TT} formatter={(v,_,{payload}) => [`r = ${v.toFixed(2)}`, payload?.interp || '']} />
              <Bar dataKey="corr" radius={[0,3,3,0]}
                fill="var(--color-ok)"
                label={{ position:'right', fontSize:10, fontFamily:'var(--font-mono)', fill:'var(--color-text-muted)', formatter:v=>`${(v*100).toFixed(0)}%` }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ROE vs GA */}
        <div className={ls.cardBordered}>
          <SectionHeader label="Curriculum alignment" title="ROE vs GA score correlation by term" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={roeGa} margin={{ top:4, right:8, left:-20, bottom:4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="term" tick={AXIS_TICK} tickLine={false} />
              <YAxis tickFormatter={v=>`${(v*100).toFixed(0)}%`} tick={AXIS_TICK} tickLine={false} domain={[0,1]} />
              <Tooltip {...TT} formatter={v=>[`r = ${v.toFixed(2)}`, 'Correlation']} />
              <ReferenceLine y={0.4} stroke="var(--color-info)" strokeDasharray="4 3" label={{ value:'Alignment threshold', position:'insideTopRight', fontSize:10, fill:'var(--color-info)', fontFamily:'var(--font-mono)' }} />
              <Bar dataKey="corr" radius={[3,3,0,0]} fill="var(--color-info)" />
            </BarChart>
          </ResponsiveContainer>
          <p style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--color-text-muted)', marginTop:8 }}>
            ROE-GA correlation has steadily improved from 0.48 → 0.55, suggesting curriculum alignment is strengthening.
          </p>
        </div>
      </div>

      {/* Timing stats */}
      <div className={ls.grid3} style={{ marginBottom:24 }}>
        {[
          { label:'Consistently early', pct: tc.pctConsistentlyEarly, color:'var(--color-ok)' },
          { label:'Consistently late',  pct: tc.pctConsistentlyLate,  color:'var(--color-danger)' },
          { label:'Variable timing',    pct: tc.pctVariable,          color:'var(--color-warn)' },
        ].map(({ label, pct: v, color }) => (
          <div key={label} className={ls.card} style={{ textAlign:'center' }}>
            <div style={{ fontSize:32, fontWeight:500, color }}>{v != null ? `${(v*100).toFixed(0)}%` : '—'}</div>
            <div style={{ fontSize:12, color:'var(--color-text-secondary)', marginTop:4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Accordion */}
      <div className={ls.cardBordered}>
        <SectionHeader label="Drill-down" title={`Per-assignment detail — ${activeTerm}`} />
        {assignments.map(a => {
          const ad = data.byAssignment[activeTerm]?.[a];
          const open = openAcc === a;
          if (!ad) return null;
          const sd = ad.scoreDistribution;
          const buckets = [
            { name:'0–20%', v: sd?.buckets?.['0_20pct'] || 0 },
            { name:'20–40%', v: sd?.buckets?.['20_40pct'] || 0 },
            { name:'40–60%', v: sd?.buckets?.['40_60pct'] || 0 },
            { name:'60–80%', v: sd?.buckets?.['60_80pct'] || 0 },
            { name:'80–100%', v: sd?.buckets?.['80_100pct'] || 0 },
          ];
          const qs = [...(ad.questions || [])].sort((a,b)=>a.completionRate-b.completionRate);
          const timing = [
            { name:'Early >6h', score: ad.timing?.earlyGt6h?.avgScore },
            { name:'Mid 1–6h',  score: ad.timing?.mid1To6h?.avgScore },
            { name:'Last <1h',  score: ad.timing?.lastLt1h?.avgScore },
          ];
          return (
            <div key={a} style={{ borderBottom:'1px solid var(--color-border)' }}>
              <button onClick={() => toggleAcc(a)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', background:'none', border:'none', cursor:'pointer', color:'var(--color-text-primary)', fontFamily:'var(--font-mono)', fontSize:12 }}>
                <span>{a}</span>
                <span style={{ color:'var(--color-text-muted)' }}>{open ? '▲' : '▼'}  norm. mean: {(sd?.normalizedMean*100||0).toFixed(1)}%</span>
              </button>
              {open && (
                <div style={{ paddingBottom:16 }}>
                  <div className={ls.grid2}>
                    {/* Score distribution */}
                    <div>
                      <div style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--color-text-muted)', marginBottom:8 }}>Score distribution</div>
                      <ResponsiveContainer width="100%" height={140}>
                        <BarChart data={buckets} margin={{ top:4, right:8, left:-20, bottom:4 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                          <XAxis dataKey="name" tick={{ ...AXIS_TICK, fontSize:10 }} tickLine={false} />
                          <YAxis tick={{ ...AXIS_TICK, fontSize:10 }} tickLine={false} />
                          <Tooltip {...TT} />
                          <Bar dataKey="v" radius={[3,3,0,0]} fill="var(--color-info)" />
                        </BarChart>
                      </ResponsiveContainer>
                      <div style={{ display:'flex', gap:16, fontSize:11, fontFamily:'var(--font-mono)', color:'var(--color-text-muted)', marginTop:6 }}>
                        <span>μ={sd?.mean?.toFixed(2)}</span><span>med={sd?.median?.toFixed(2)}</span><span>σ={sd?.stdDev?.toFixed(2)}</span>
                      </div>
                    </div>
                    {/* Top/bottom questions */}
                    <div>
                      <div style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--color-text-muted)', marginBottom:8 }}>Questions (by completion)</div>
                      <div style={{ fontSize:11 }}>
                        <div style={{ color:'var(--color-danger)', fontWeight:500, marginBottom:4 }}>Bottom 3</div>
                        {qs.slice(0,3).map(q => (
                          <div key={q.id} style={{ display:'flex', justifyContent:'space-between', padding:'3px 0', borderBottom:'1px solid var(--color-border)', fontFamily:'var(--font-mono)', fontSize:10 }}>
                            <span style={{ color:'var(--color-text-secondary)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:160 }}>{q.id}</span>
                            <span style={{ color:'var(--color-danger)' }}>{(q.completionRate*100).toFixed(0)}%</span>
                          </div>
                        ))}
                        <div style={{ color:'var(--color-ok)', fontWeight:500, margin:'8px 0 4px' }}>Top 3</div>
                        {qs.slice(-3).reverse().map(q => (
                          <div key={q.id} style={{ display:'flex', justifyContent:'space-between', padding:'3px 0', borderBottom:'1px solid var(--color-border)', fontFamily:'var(--font-mono)', fontSize:10 }}>
                            <span style={{ color:'var(--color-text-secondary)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:160 }}>{q.id}</span>
                            <span style={{ color:'var(--color-ok)' }}>{(q.completionRate*100).toFixed(0)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
