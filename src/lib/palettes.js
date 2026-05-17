export const PALETTES = [
  {
    id: 'vintage',
    name: { ko: '크림 & 마룬', en: 'Vintage Cream' },
    preview: '#8B2A2A',
    vars: {
      '--cream': '#F7EFD8',
      '--cream-deep': '#F0E5C6',
      '--tan': '#D4BD8A',
      '--tan-light': '#DCC89A',
      '--tan-dark': '#B8A170',
      '--maroon': '#8B2A2A',
      '--maroon-deep': '#6B1F1F',
      '--ink': '#3A2E1F',
      '--ink-soft': '#5B4A33',
      '--progress-bg': 'rgba(139,42,42,0.15)',
      '--chart-grid': 'rgba(184,161,112,0.3)',
      '--chart-axis': '#5B4A33',
      '--chart-overall': '#8B2A2A',
    },
  },
  {
    id: 'midnight',
    name: { ko: '미드나잇', en: 'Midnight' },
    preview: '#60A5FA',
    vars: {
      '--cream': '#111827',
      '--cream-deep': '#1F2937',
      '--tan': '#374151',
      '--tan-light': '#2D3748',
      '--tan-dark': '#4B5563',
      '--maroon': '#60A5FA',
      '--maroon-deep': '#3B82F6',
      '--ink': '#F9FAFB',
      '--ink-soft': '#9CA3AF',
      '--progress-bg': 'rgba(96,165,250,0.15)',
      '--chart-grid': 'rgba(75,85,99,0.4)',
      '--chart-axis': '#9CA3AF',
      '--chart-overall': '#60A5FA',
    },
  },
  {
    id: 'forest',
    name: { ko: '포레스트', en: 'Forest' },
    preview: '#059669',
    vars: {
      '--cream': '#F0FDF4',
      '--cream-deep': '#DCFCE7',
      '--tan': '#A7F3D0',
      '--tan-light': '#BBF7D0',
      '--tan-dark': '#6EE7B7',
      '--maroon': '#059669',
      '--maroon-deep': '#047857',
      '--ink': '#064E3B',
      '--ink-soft': '#065F46',
      '--progress-bg': 'rgba(5,150,105,0.15)',
      '--chart-grid': 'rgba(110,231,183,0.3)',
      '--chart-axis': '#065F46',
      '--chart-overall': '#059669',
    },
  },
  {
    id: 'ocean',
    name: { ko: '오션', en: 'Ocean' },
    preview: '#2563EB',
    vars: {
      '--cream': '#EFF6FF',
      '--cream-deep': '#DBEAFE',
      '--tan': '#BFDBFE',
      '--tan-light': '#DBEAFE',
      '--tan-dark': '#93C5FD',
      '--maroon': '#2563EB',
      '--maroon-deep': '#1D4ED8',
      '--ink': '#1E3A8A',
      '--ink-soft': '#1E40AF',
      '--progress-bg': 'rgba(37,99,235,0.15)',
      '--chart-grid': 'rgba(147,197,253,0.4)',
      '--chart-axis': '#1E40AF',
      '--chart-overall': '#2563EB',
    },
  },
  {
    id: 'rosewood',
    name: { ko: '로즈우드', en: 'Rosewood' },
    preview: '#E11D48',
    vars: {
      '--cream': '#FFF1F2',
      '--cream-deep': '#FFE4E6',
      '--tan': '#FECDD3',
      '--tan-light': '#FFE4E6',
      '--tan-dark': '#FDA4AF',
      '--maroon': '#E11D48',
      '--maroon-deep': '#BE123C',
      '--ink': '#881337',
      '--ink-soft': '#9F1239',
      '--progress-bg': 'rgba(225,29,72,0.15)',
      '--chart-grid': 'rgba(253,164,175,0.4)',
      '--chart-axis': '#9F1239',
      '--chart-overall': '#E11D48',
    },
  },
]

export const DEFAULT_PALETTE_ID = 'vintage'

export function applyPalette(id) {
  const palette = PALETTES.find((p) => p.id === id) || PALETTES[0]
  const root = document.documentElement
  for (const [key, value] of Object.entries(palette.vars)) {
    root.style.setProperty(key, value)
  }
}
