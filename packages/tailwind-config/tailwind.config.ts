import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
        base: {
          100: '#91A0B8',
          200: '#717E93',
          300: '#4C5A70',
          400: '#3F4A5D',
          500: '#253245',
          600: '#23334A',
          700: '#172232',
          800: '#0D131C',
          900: '#06090E',
        },
        primary: {
          100: '#DCCEFF',
          200: '#C5AEFF',
          300: '#8D60FF',
          400: '#6122FF',
          500: '#6B2BFC',
          600: '#5E28E6',
          700: '#1B2636',
          800: '#3700B4',
          900: '#2E0096',
        }
      },
    },
  },
  plugins: [],
};
export default config;
