import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';
import { Badge, SectionHeader, BarProgress } from '../components/shared/index.jsx';
import ls from '../components/layout/Layout.module.css';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine
} from 'recharts';
import { getCompletionColor, classifyQuestion } from '../utils/transforms.js';
import { CLASSIFICATION_VARIANT } from '../utils/colors.js';

const AXIS_TICK = { fontSize:10, fontFamily:'var(--font-mono)', fill:'var(--color-text-muted)' };
const TT = { contentStyle:{ background:'var(--color-bg)', border:'0.5px solid var(--color-border-strong)', borderRadius:'var(--radius-md)', fontSize:12, fontFamily:'var(--font-mono)' }};

export default function Questions() {
  const { data, selectedTerm, selectedAssignment, setSelectedAssignment } = useDashboard();
  const [highlighted, setHighlighted] = useState(null);
  if (!data) return null;

  const activeTerm = selectedTerm === 'all' ? '2026-01' : selectedTerm;
  const termAssignments = (data.byTerm[activeTerm]?.assignmentsAnalyzed) || [];
  const activeAssignment = selectedAssignment || termAssignments[1] || termAssignments[0];
  const ad = data.byAssignment[activeTerm]?.[activeAssignment];

  const questions = (ad?.questions || []).map(q => ({
    ...q,
    classification: q.classification || classifyQuestion(q.zeroRate, q.fullRate, q.partialRate, q.discriminativeProxy),
  })).sort((a,b) => a.completionRate - b.completionRate);

  // Group by classification
  const classified = {};
  questions.forEach(q => {
    const c = q.classification;
    if (!classified[c]) classified[c] = [];
    classified[c].push(q);
  });

  const sd = ad?.scoreDistribution;
  const buckets = sd ? [
    { name:'0–20%',   v: sd.buckets?.['0_20pct']  || 0 },
    { name:'20–40%',  v: sd.buckets?.['20_40pct'] || 0 },
    { name:'40–60%',  v: sd.buckets?.['40_60pct'] || 0 },
    { name:'60–80%',  v: sd.buckets?.['60_80pct'] || 0 },
    { name:'80–100%', v: sd.buckets?.['80_100pct']|| 0 },
  ] : [];

  const discData = [...questions].sort((a,b) => (b.discriminativeProxy||0)-(a.discriminativeProxy||0)).map(q => ({
    name: q.id.replace('q-','').slice(0,18),
    full: q.id,
    rpb:  q.discriminativeProxy,
  }));

  function discColor(v) {
    if (v == null) return 'var(--color-text-muted)';
    if (v >= 0.4)  return 'var(--color-info)';
    if (v >= 0.25) return 'var(--color-warn)';
    return 'var(--color-danger)';
  }

  return (
    <div>
      {/* Controls */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, flexWrap:'wrap' }}>
        <span style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--color-text-muted)' }}>Assignment:</span>
        {termAssignments.map(a => (
          <button key={a} onClick={() => setSelectedAssignment(a)}
            style={{ fontFamily:'var(--font-mono)', fontSize:11, padding:'4px 10px', borderRadius:20, border:'1px solid var(--color-border-strong)', cursor:'pointer', background: activeAssignment===a ? 'var(--color-info)' : 'var(--color-surface)', color: activeAssignment===a ? '#fff' : 'var(--color-text-secondary)', transition:'all 0.15s' }}>
            {a}
          </button>
        ))}
      </div>

      {/* Two column: completion + classification */}
      <div className={ls.grid2} style={{ marginBottom:24 }}>
        {/* Completion rate list */}
        <div className={ls.cardBordered}>
          <SectionHeader label="Completion" title="Completion rate by question" sub="sorted ascending — worst first" />
          <div style={{ display:'flex', flexDirection:'column', gap:6, maxHeight:360, overflowY:'auto' }}>
            {questions.map(q => {
              const shortId = q.id.replace('q-','');
              const isHl = highlighted === q.id;
              return (
                <div key={q.id} style={{ display:'flex', alignItems:'center', gap:8, padding:'3px 4px', borderRadius:4, background: isHl ? 'var(--color-info-bg)' : 'transparent', transition:'background 0.15s' }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--color-text-muted)', width:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flexShrink:0 }} title={shortId}>{shortId}</span>
                  <BarProgress value={q.completionRate} colorVar={getCompletionColor(q.completionRate)} height={6} />
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--color-text-secondary)', width:36, textAlign:'right', flexShrink:0 }}>{(q.completionRate*100).toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Classification groups */}
        <div className={ls.cardBordered}>
          <SectionHeader label="Classification" title="Question failure classification" />
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {Object.entries(classified).map(([cls, qs]) => (
              <div key={cls}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                  <Badge text={cls} variant={CLASSIFICATION_VARIANT[cls] || 'gray'} />
                  <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--color-text-muted)' }}>{qs.length} question{qs.length!==1?'s':''}</span>
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                  {qs.map(q => (
                    <button key={q.id} onClick={() => setHighlighted(highlighted===q.id?null:q.id)}
                      style={{ fontFamily:'var(--font-mono)', fontSize:10, padding:'2px 6px', borderRadius:4, border:'1px solid var(--color-border-strong)', cursor:'pointer', background: highlighted===q.id ? 'var(--color-info-bg)' : 'var(--color-surface)', color:'var(--color-text-secondary)', transition:'all 0.15s' }}>
                      {q.id.replace('q-','').slice(0,20)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Discriminative power */}
      <div className={ls.cardBordered} style={{ marginBottom:24 }}>
        <SectionHeader label="Evaluation quality" title="Discriminative power (point-biserial correlation)" sub="Higher = better at separating strong students from weak ones" />
        <ResponsiveContainer width="100%" height={Math.max(200, discData.length * 26)}>
          <BarChart data={discData} layout="vertical" margin={{ top:4, right:60, left:130, bottom:4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
            <XAxis type="number" domain={[0, 0.8]} tickFormatter={v=>v.toFixed(1)} tick={AXIS_TICK} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={AXIS_TICK} tickLine={false} width={130} />
            <Tooltip {...TT} formatter={(v,_,{payload}) => [`rpb = ${v?.toFixed(3)}`, payload?.full]} />
            <ReferenceLine x={0.4} stroke="var(--color-info)" strokeDasharray="4 3" label={{ value:'Threshold 0.40', position:'top', fontSize:9, fill:'var(--color-info)', fontFamily:'var(--font-mono)' }} />
            <Bar dataKey="rpb" radius={[0,3,3,0]} isAnimationActive={false}
              fill="var(--color-info)"
              label={{ position:'right', fontSize:9, fontFamily:'var(--font-mono)', fill:'var(--color-text-muted)', formatter: v => v!=null?v.toFixed(2):'' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Score distribution */}
      <div className={ls.cardBordered}>
        <SectionHeader label="Distribution" title={`Score distribution — ${activeAssignment} (${activeTerm})`} />
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={buckets} margin={{ top:4, right:8, left:-20, bottom:4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="name" tick={AXIS_TICK} tickLine={false} />
            <YAxis tick={AXIS_TICK} tickLine={false} />
            <Tooltip {...TT} formatter={v=>[`${v} students`]} />
            <Bar dataKey="v" radius={[3,3,0,0]} fill="var(--color-purple)" />
          </BarChart>
        </ResponsiveContainer>
        {sd && (
          <div style={{ display:'flex', gap:24, fontSize:12, fontFamily:'var(--font-mono)', color:'var(--color-text-muted)', marginTop:10 }}>
            <span>mean = <strong style={{ color:'var(--color-text-primary)' }}>{sd.mean?.toFixed(2)}</strong></span>
            <span>median = <strong style={{ color:'var(--color-text-primary)' }}>{sd.median?.toFixed(2)}</strong></span>
            <span>σ = <strong style={{ color:'var(--color-text-primary)' }}>{sd.stdDev?.toFixed(2)}</strong></span>
            <span>norm. = <strong style={{ color:'var(--color-text-primary)' }}>{(sd.normalizedMean*100).toFixed(1)}%</strong></span>
          </div>
        )}
      </div>
    </div>
  );
}
