export function scoreColor(score: number) {
  if (score >= 7.5) return { main: '#1f8a5b', soft: '#e7f3ec', ink: '#12603f' }   // green — Welcoming / Very welcoming
  if (score >= 6.5) return { main: '#ddc53db9', soft: '#e9f2eb', ink: '#ddc53db9' }   // green text, mint bg — Positive
  if (score >= 6.0) return { main: '#c2862a', soft: '#f6efe1', ink: '#8a5d12' }   // amber — Mixed
  return { main: '#c2603f', soft: '#f6e9e4', ink: '#8a3c22' }                      // red-orange — Use caution
}

export function scoreLabel(score: number) {
  if (score >= 8.5) return 'Very welcoming'
  if (score >= 7.5) return 'Welcoming'
  if (score >= 6.5) return 'Positive'
  if (score >= 6.0) return 'Mixed'
  return 'Use caution'
}

export const TONES = ['#e9663e', '#1e6e8c', '#ef8fa0', '#e0a52e', '#2b8c7e', '#b5567f', '#d98a3a', '#5a7fb5']
