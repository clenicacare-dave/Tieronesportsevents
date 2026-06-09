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
        tierNavy: '#172437',
        tierInk: '#111722',
        tierGold: '#e8c777',
        tierGoldMuted: '#b9a16d',
        tierStone: '#7a705f',
        tierMist: '#f5f2ea'
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
