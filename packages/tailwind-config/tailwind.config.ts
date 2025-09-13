import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
        base: {
          200: '#717E93',
          300: '#4C5A70',
          400: '#3F4A5D',
          500: '#253245',
          600: '#1B1D2B',
          700: '#141621',
          800: '#0F111A',
        },
        primary: {
          500: 'var(--primary-500, #00D4FF)',
        },
        warning: {
          500: '#FFE100',
        },
        danger: {
          500: '#FF416E',
        },
        success: {
          500: '#19EBB6',
        }
      },
    },
  },
  plugins: [],
};
export default config;
