const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
      colors: {
        primary: {
          100: '#E8E5FE',
          200: '#D1CCFE',
          300: '#B9B2FD',
          400: '#A69EFB',
          500: '#887EF9',
          600: '#645CD6',
          700: '#463FB3',
          800: '#2E2890',
          900: '#1C1877',
        },
        info: {
          100: '#DAF4FF',
          200: '#B5E6FF',
          300: '#90D4FF',
          400: '#75C3FF',
          500: '#47A6FF',
          600: '#3381DB',
          700: '#2360B7',
          800: '#164393',
          900: '#0D2F7A',
        },
        success: {
          100: '#DAFCD5',
          200: '#AEFAAD',
          300: '#81F18B',
          400: '#60E377',
          500: '#30D15D',
          600: '#23B359',
          700: '#189654',
          800: '#0F794B',
          900: '#096446',
        },
        warning: {
          100: '#FFF8D9',
          200: '#FFEEB4',
          300: '#FFE28E',
          400: '#FFD772',
          500: '#FFC444',
          600: '#DBA031',
          700: '#B77E22',
          800: '#935F15',
          900: '#7A490D',
        },
        danger: {
          100: '#FFE3DA',
          200: '#FFC1B5',
          300: '#FF9890',
          400: '#FF7578',
          500: '#FF475C',
          600: '#DB3356',
          700: '#B7234F',
          800: '#931647',
          900: '#7A0D42',
        },
      },
    },
  },
  plugins: [],
};
