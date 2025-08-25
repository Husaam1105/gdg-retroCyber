/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-green': '#00ff41',
        'cyber-blue': '#0066ff',
        'cyber-magenta': '#ff006e',
        'terminal-bg': '#0a0a0a',
        'terminal-text': '#00ff41',
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
        'terminal': ['Monaco', 'Menlo', 'Consolas', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s infinite',
        'glitch': 'glitch 0.3s ease-in-out',
        'scanlines': 'scanlines 0.1s linear infinite',
        'typing': 'typing 3.5s steps(30, end)',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        scanlines: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        }
      },
    },
  },
  plugins: [],
}