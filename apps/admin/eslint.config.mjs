import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // ===== BASIC RULES =====
      'no-console': 'error', // Prohibits console.log, console.error, etc.
      '@typescript-eslint/no-unused-vars': ['error'], // Marks unused variables/components as error
      
      // ===== TYPESCRIPT RULES =====
      '@typescript-eslint/no-explicit-any': 'warn', // Warns about explicit 'any' usage (loses TS benefits)
      '@typescript-eslint/no-var-requires': 'error', // Prohibits require() in favor of import
      
      // ===== SECURITY RULES =====
      'no-eval': 'error', // Prohibits eval() which can execute malicious code
      'no-implied-eval': 'error', // Prohibits setTimeout("code") which internally uses eval()
      'no-new-func': 'error', // Prohibits new Function() which is similar to eval()
    },
  },
  {
    ignores: [
      '.next/',
      'node_modules/',
      'dist/',
      'build/',
      '.prettierrc.js',
      'next.config.js',
      'postcss.config.js',
    ],
  },
];
