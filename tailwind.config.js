/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0d0406',      // neo-red night
        ink: '#fdeef0',       // near-white text
        muted: '#a8888c',     // red-grey
        pink: '#ff2338',      // electric red (primary neon)
        neon: '#ff5c6e',      // neon light-red glow
        magenta: '#e00a24',   // deep electric red accent
        line: '#331519',      // hairline
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
