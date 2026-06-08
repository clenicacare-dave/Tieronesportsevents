import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        tierRed: '#c5272d',
        tierNavy: '#172033',
        tierGold: '#d9a441'
      },
      keyframes: {
        'float-pulse': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      },
      animation: {
        'pulse-slow': 'float-pulse 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;
