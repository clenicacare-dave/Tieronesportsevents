import next from '@next/eslint-plugin-next';

export default [
  {
    ignores: ['node_modules/*', '.next/*']
  },
  next.configs['core-web-vitals']
];
