import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          200: 'rgb(var(--color-base-200) / <alpha-value>)',
          300: 'rgb(var(--color-base-300) / <alpha-value>)',
          400: 'rgb(var(--color-base-400) / <alpha-value>)',
          500: 'rgb(var(--color-base-500) / <alpha-value>)',
          600: 'rgb(var(--color-base-600) / <alpha-value>)',
          700: 'rgb(var(--color-base-700) / <alpha-value>)',
          800: 'rgb(var(--color-base-800) / <alpha-value>)',
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
        },
      },
    },
  },
  plugins: [],
};
export default config;
