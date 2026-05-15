import { useDashboard } from '../context/DashboardContext.jsx';
import { Badge, SectionHeader, Recommendation } from '../components/shared/index.jsx';
import ls from '../components/layout/Layout.module.css';

export default function Recommendations() {
  const { data } = useDashboard();
  if (!data) return null;

  const rec = data.derived?.recommendations || {};
  const students    = rec.students    || [];
  const instructors = rec.instructors || [];
  const bottleneck  = data.derived?.bottleneckChain || [];
  const improvements= data.crossTerm?.measurableImprovements || [];
  const problems    = data.crossTerm?.persistentProblems || [];
  const limitations = data.derived?.limitations || [];

  return (
    <div>
      {/* Two column recommendations */}
      <div className={ls.grid2} style={{ marginBottom:28 }}>
        <div>
          <SectionHeader label="For students" title="Ordered by score impact" />
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {students.map(r => (
              <Recommendation key={r.rank} rank={r.rank} title={r.title} body={r.body} variant="student"
                tag={r.assignmentRef ? <Badge text={r.assignmentRef} variant="info" /> : null} />
            ))}
          </div>
        </div>
        <div>
          <SectionHeader label="For instructors" title="Ordered by urgency" />
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {instructors.map(r => (
              <Recommendation key={r.rank} rank={r.rank} title={r.title} body={r.body} variant="instructor"
                tag={<><Badge text={r.term} variant="warn" />{r.evidence && <Badge text={r.evidence.slice(0,40)+'…'} variant="gray" />}</>} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottleneck chain */}
      <div className={ls.cardBordered} style={{ marginBottom:24 }}>
        <SectionHeader label="Dependencies" title="Bottleneck dependency chain" sub="Failing early assignments cascades into downstream failures" />
        <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
          {bottleneck.map((link, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ background:'var(--color-danger-bg)', color:'var(--color-danger-text)', fontFamily:'var(--font-mono)', fontSize:12, fontWeight:500, padding:'4px 12px', borderRadius:20 }}>{link.from}</span>
              <span style={{ color:'var(--color-danger)', fontSize:18 }}>→</span>
              <span style={{ background:'var(--color-warn-bg)', color:'var(--color-warn-text)', fontFamily:'var(--font-mono)', fontSize:12, fontWeight:500, padding:'4px 12px', borderRadius:20 }}>{link.to}</span>
              <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--color-text-muted)', marginRight:8 }}>{(link.conditionalPct*100).toFixed(0)}% fail</span>
              {i < bottleneck.length-1 && <span style={{ color:'var(--color-danger)', fontSize:18 }}>→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Improvements vs problems */}
      <div className={ls.grid2} style={{ marginBottom:24 }}>
        <div className={ls.cardBordered}>
          <SectionHeader label="Progress" title="Measurable improvements" />
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {improvements.map((imp, i) => (
              <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                <span style={{ color:'var(--color-ok)', fontWeight:700, flexShrink:0 }}>✓</span>
                <span style={{ fontSize:12, color:'var(--color-text-secondary)', lineHeight:1.6 }}>{imp}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={ls.cardBordered}>
          <SectionHeader label="Persistent issues" title="Problems across all terms" />
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {problems.map((p, i) => (
              <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                <span style={{ color:'var(--color-danger)', fontWeight:700, flexShrink:0 }}>✕</span>
                <span style={{ fontSize:12, color:'var(--color-text-secondary)', lineHeight:1.6 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Limitations */}
      <div className={ls.cardBordered} style={{ borderTop:'2px solid var(--color-border)' }}>
        <SectionHeader label="Epistemic honesty" title="What this data cannot tell you" />
        <ol style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
          {limitations.map((lim, i) => (
            <li key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--color-text-muted)', width:20, flexShrink:0 }}>{i+1}.</span>
              <span style={{ fontSize:12.5, color:'var(--color-text-secondary)', lineHeight:1.65 }}>{lim}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
