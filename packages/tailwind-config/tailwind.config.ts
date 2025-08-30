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
          600: '#1B1D2B',
          700: '#141621',
          800: '#0F111A',
          900: '#0F111A',
        },
        primary: {
          100: '#DCCEFF',
          200: '#C5AEFF',
          300: '#8D60FF',
          400: '#6122FF',
          500: '#6B2BFC',
          600: '#00D4FF',
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
