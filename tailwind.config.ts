import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fafaf8',
          100: '#f5f5f0',
        },
      },
      boxShadow: {
        soft: '0 2px 24px 0 rgba(0,0,0,0.07)',
        card: '0 4px 32px 0 rgba(0,0,0,0.08)',
        glow: '0 0 40px rgba(37, 99, 235, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
