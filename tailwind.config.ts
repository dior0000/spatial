import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#06080D',
        surface: '#0C111A',
        'surface-2': '#111927',
        teal: '#1FE3C2',
        magenta: '#FF496B',
        text: '#EAF0F5',
        'text-dim': '#8C97A6',
        'text-mute': '#535E6D',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderColor: {
        line: 'rgba(255,255,255,0.07)',
        'line-strong': 'rgba(255,255,255,0.12)',
        'teal-line': 'rgba(31,227,194,0.30)',
      },
      animation: {
        'ping-slow': 'ping 3s cubic-bezier(0,0,0.2,1) infinite',
        'pulse-ring': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        drift: 'drift 6s ease-in-out infinite',
        spin: 'spin 8s linear infinite',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(8px, -6px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
