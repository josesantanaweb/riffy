// tailwind config is required for editor support
import path from 'path';
import type { Config } from 'tailwindcss';
import sharedConfig from '@riffy/tailwind-config';

const config: Config = {
  content: [
    './app/**/*.tsx',
    './src/**/*.tsx',
    './components/**/*.tsx',
    path.join(__dirname, '../../../packages/ui-components/src/**/*.{ts,tsx}'),
    path.join(__dirname, '../../../packages/ui/src/**/*.{ts,tsx}'),
  ],
  safelist: ['text-yellow-500', 'text-gray-400', 'text-orange-700'],
  presets: [sharedConfig],
};

export default config;
