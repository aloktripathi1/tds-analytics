import { clean, formatScore } from './format-numbers.js';

function questionLabel(q) {
  return String(q?.label || q?.id || 'question')
    .replace(/^q-/, '')
    .replace(/-/g, ' ');
}

function pct(value) {
  return `${Math.round(clean(value))}%`;
}

function pp(value) {
  const rounded = Math.round(clean(value));
  return `${rounded > 0 ? '+' : ''}${rounded}pp`;
}

// ── Compute average question gap across the whole dashboard ──────────────
export function averageQuestionGap(byAssignment) {
  const gaps = [];
  for (const assignments of Object.values(byAssignment ?? {})) {
    for (const assignment of Object.values(assignments ?? {})) {
      const questions = assignment?.questions ?? [];
      if (questions.length < 2) continue;
      const values = questions.map(q => clean(q.completionRate ?? 0));
      gaps.push(Math.max(...values) - Math.min(...values));
    }
  }
  if (!gaps.length) return 0;
  return clean(gaps.reduce((sum, value) => sum + value, 0) / gaps.length);
}

// ── Individual observation generators ───────────────────────────────────

// RULE 5a: a question with 0% completion is an actionable finding — name it
function zeroCompletionObservation(questions) {
  const zeros = questions.filter(q => clean(q.completionRate ?? 0) === 0);
  if (!zeros.length) return null;
  const label = questionLabel(zeros[0]);
  const extra = zeros.length > 1 ? `, and ${zeros.length - 1} other item(s) similarly` : '';
  return {
    tag: 'question completion',
    text: `"${label}" recorded 0% completion${extra} — worth investigating as a setup problem, missing prerequisite, or grading error before treating it as difficulty.`,
    priority: 100,
  };
}

// RULE 5b: top bucket > all others combined is non-obvious and actionable
function topBucketObservation(dist) {
  const buckets = dist?.buckets ?? {};
  const top = buckets['80_100'] ?? 0;
  const others = (buckets['0_20'] ?? 0) + (buckets['20_40'] ?? 0) +
                 (buckets['40_60'] ?? 0) + (buckets['60_80'] ?? 0);
  if (top <= others || top === 0) return null;
  return {
    tag: 'score distribution',
    text: `${top} students landed in the top bracket vs ${others} across the other four combined — the distribution is heavily ceiling-compressed, so the score spread reflects who was left behind more than who excelled.`,
    priority: 90,
  };
}

// RULE 4: compare question gap to dashboard average, skip if unremarkable
function questionGapObservation(questions, averageGap) {
  if (questions.length < 2 || !averageGap) return null;
  const sorted = [...questions].sort(
    (a, b) => clean(a.completionRate ?? 0) - clean(b.completionRate ?? 0)
  );
  const hardest = sorted[0];
  const easiest = sorted[sorted.length - 1];
  const gap = clean((easiest.completionRate ?? 0) - (hardest.completionRate ?? 0));
  if (Math.abs(gap - averageGap) < 5) return null;
  const relation = gap > averageGap ? 'wider' : 'narrower';
  const implication = gap > averageGap
    ? 'a subset of students cleared the easy items but hit a wall on the harder ones'
    : 'no single item is dramatically out of step with the rest of the set'
  return {
    tag: 'question spread',
    text: `"${questionLabel(easiest)}" cleared ${pct(easiest.completionRate)} while "${questionLabel(hardest)}" sat at ${pct(hardest.completionRate)} — a ${Math.round(gap)}pp gap, ${relation} than the ${Math.round(averageGap)}pp dashboard average. ${implication[0].toUpperCase() + implication.slice(1)}.`,
    priority: 80,
  };
}

// RULE 5c: partial credit is only interesting when it's a strong pattern on a specific item
function partialCreditObservation(questions) {
  const partial = [...questions]
    .filter(q => clean(q.partialScorerPct ?? 0) >= 20)
    .sort((a, b) => clean(b.partialScorerPct ?? 0) - clean(a.partialScorerPct ?? 0))[0];
  if (!partial) return null;
  return {
    tag: 'partial credit',
    text: `"${questionLabel(partial)}" split ${pct(partial.partialScorerPct)} partial vs ${pct(partial.fullScorerPct)} full — most students who attempted it got partway, which is more useful as a diagnostic than a binary pass/fail would be.`,
    priority: 75,
  };
}

// RULE 5d: cross-term drift >15pp is a genuine signal — name the question and the move
function crossTermObservation(drifts) {
  const drift = [...(drifts ?? [])]
    .filter(d => Math.abs(clean(d.drift ?? 0)) > 15)
    .sort((a, b) => Math.abs(clean(b.drift ?? 0)) - Math.abs(clean(a.drift ?? 0)))[0];
  if (!drift) return null;
  const terms = Object.keys(drift.byTerm ?? {}).sort();
  const first = terms[0];
  const last  = terms[terms.length - 1];
  const direction = clean(drift.drift) > 0 ? 'improved' : 'declined';
  return {
    tag: 'cross-term drift',
    text: `"${questionLabel({ id: drift.questionId })}" ${direction} ${pp(drift.drift)} from ${first} to ${last} (${pct(drift.byTerm[first])} → ${pct(drift.byTerm[last])}) — a shift that size points to a changed prompt, new tooling, or a different student population.`,
    priority: 70,
  };
}

// RULE 3: skip timing if mid=0 and late≤1 (degenerate / artifact)
// RULE 2: only emit if the score gap between early and late is meaningful (≥10% of max)
function timingObservation(timing, maxPossible) {
  if (!timing || timing.skipped) return null;
  const early = timing.earlyGt6h ?? {};
  const mid   = timing.mid1To6h  ?? {};
  const late  = timing.lastLt1h  ?? {};
  // Rule 3 guard
  if ((mid.count ?? 0) === 0 && (late.count ?? 0) <= 1) return null;
  // Need usable samples on both sides
  if ((early.count ?? 0) <= 1 || (late.count ?? 0) <= 1) return null;

  const diff      = clean((early.avgScore ?? 0) - (late.avgScore ?? 0));
  const threshold = Math.max(2, clean(maxPossible) * 0.10);
  if (Math.abs(diff) < threshold) return null;

  const direction = diff > 0 ? 'outscored' : 'underscored';
  const absDiff   = formatScore(Math.abs(diff));
  return {
    tag: 'submission timing',
    text: `Early submitters ${direction} last-minute submitters by ${absDiff} pts (${early.count} vs ${late.count} students) — a gap that size with samples on both ends is more likely preparedness than luck.`,
    priority: 65,
  };
}

// Deadline concentration — only noteworthy when extremely high
function deadlineConcentrationObservation(concentration, timing) {
  if (!concentration || clean(concentration.deadlineConcentration ?? 0) <= 55) return null;
  // If all submissions are in the last bucket with no early/mid, it's just an exam window — not a finding
  if (
    timing && !timing.skipped &&
    (timing.earlyGt6h?.count ?? 0) === 0 &&
    (timing.mid1To6h?.count ?? 0) === 0
  ) return null;
  return {
    tag: 'submission concentration',
    text: `${pct(concentration.deadlineConcentration)} of submissions landed in the final sixth of the window — high enough that any timing-based score comparison will be skewed by deadline pressure rather than preparation habits.`,
    priority: 55,
  };
}

// ROE-specific: named skill cluster is only interesting if it's dominant
function skillTaxonomyObservation(questions) {
  const counts = {};
  for (const q of questions) {
    const taxonomy = q.skillTaxonomy;
    if (!taxonomy || taxonomy === 'standard') continue;
    counts[taxonomy] = (counts[taxonomy] ?? 0) + 1;
  }
  const [top] = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (!top || top[1] < 3) return null;
  return {
    tag: 'skill taxonomy',
    text: `${top[1]} of ${questions.length} questions classify as "${top[0]}" — the ROE is testing a concentrated skill pattern, not a broad mix, which limits how far the results generalise across the full course.`,
    priority: 45,
  };
}

// ── Public entry point ───────────────────────────────────────────────────
export function buildObservations({
  questions = [],
  dist,
  timing,
  maxPossible,
  drifts = [],
  concentration,
  averageGap = 0,
  includeSkillTaxonomy = false,
}) {
  const candidates = [
    zeroCompletionObservation(questions),
    topBucketObservation(dist),
    questionGapObservation(questions, averageGap),
    partialCreditObservation(questions),
    crossTermObservation(drifts),
    timingObservation(timing, maxPossible),
    deadlineConcentrationObservation(concentration, timing),
    includeSkillTaxonomy ? skillTaxonomyObservation(questions) : null,
  ].filter(Boolean);

  // RULE 6: max 4, sorted by priority (most actionable first)
  return candidates
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 4)
    .map(({ tag, text }) => ({ tag, text }));
}
