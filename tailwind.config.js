/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wt: {
          bg: '#fbf6ee',
          card: '#ffffff',
          ink: '#2a2018',
          sub: '#6e6259',
          faint: '#a99f92',
          line: '#ece2d4',
          coral: '#e9663e',
          'coral-dark': '#c44e2c',
          'coral-aa': '#b83d1a',
          'coral-soft': '#fbe7dd',
          'deep-blue': '#133f81',
          ocean: '#013B95',
          'ocean-mid': '#1e6e8c',
          'ocean-dark': '#103c4c',
          pink: '#ef8fa0',
          peach: '#f6b79a',
          gold: '#e0a52e',
        },
      },
      fontFamily: {
        serif: ['serif'],
        sans: ['system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'wt-panel':       '0 14px 40px rgba(42,32,24,.12), 0 0 0 1px #ece2d4',
        'wt-search':      '0 10px 30px rgba(42,32,24,.10), 0 0 0 1px #ece2d4',
        'wt-search-open': '0 16px 44px rgba(42,32,24,.16), 0 0 0 2px #e9663e',
        'wt-dropdown':    '0 22px 54px rgba(42,32,24,.20), 0 0 0 1px #ece2d4',
      },
    },
  },
  plugins: [],
}
