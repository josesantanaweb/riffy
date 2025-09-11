// tailwind config is required for editor support
import path from 'path';
import type { Config } from 'tailwindcss';
import sharedConfig from '@riffy/tailwind-config';

const config: Config = {
  content: [
    './app/**/*.tsx',
    './src/**/*.tsx',
    './components/**/*.tsx',
    path.join(
      __dirname,
      '../../packages/riffy-components/src/**/*.{ts,tsx}',
    ),
  ],
  presets: [sharedConfig],
};

export default config;
