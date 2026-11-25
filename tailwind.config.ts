import type { Config } from 'tailwindcss';

// All values come from brand/tokens.css so the brand can change without touching components.
const token = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: token('navy'),
        ink: token('ink'),
        gold: token('gold'),
        'gold-dark': token('gold-dark'),
        surface: token('surface'),
        muted: token('muted'),
        line: token('line')
      },
      fontFamily: {
        heading: ['var(--font-heading-stack)'],
        body: ['var(--font-body-stack)']
      },
      borderRadius: {
        brand: 'var(--radius)'
      },
      maxWidth: {
        site: '76rem'
      }
    }
  },
  plugins: []
};

export default config;
