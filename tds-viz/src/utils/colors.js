// ─── Color constants ─────────────────────────────────────────
export const TERM_COLORS = {
  '2025-01': 'var(--chart-term-0)',
  '2025-05': 'var(--chart-term-1)',
  '2025-09': 'var(--chart-term-2)',
  '2026-01': 'var(--chart-term-3)',
};

export const TERM_COLORS_HEX = {
  '2025-01': '#1D9E75',
  '2025-05': '#378ADD',
  '2025-09': '#BA7517',
  '2026-01': '#E24B4A',
};

export const CLUSTER_COLORS = [
  '#1D9E75', // teal
  '#378ADD', // blue
  '#7F77DD', // purple
  '#E24B4A', // coral
];

export const STATUS_VARIANT = {
  'HEALTHY':      'ok',
  'WATCH':        'warn',
  'ACTION NEEDED':'danger',
  'REDESIGN':     'danger',
};

export const CLASSIFICATION_VARIANT = {
  BROKEN:        'danger',
  BINARY:        'warn',
  EASY:          'ok',
  DISCRIMINATIVE:'info',
  CALIBRATED:    'purple',
};
