/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0a0510',      // neo-city night
        ink: '#f7edf5',       // near-white text
        muted: '#9683a3',     // mauve grey
        pink: '#dc2626',      // deep red (primary neon)
        neon: '#ef4444',      // bright red
        magenta: '#b91c1c',   // darker red accent
        line: '#2a1830',      // hairline
      },
      fontFamily: {
        display: ["Sora", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
