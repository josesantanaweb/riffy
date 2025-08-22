// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  {
    rules: {
      // ===== TYPESCRIPT RULES =====
      '@typescript-eslint/no-unused-vars': 'error', // Marks unused variables, arguments and functions
      '@typescript-eslint/no-explicit-any': 'warn', // Warns when using any
      '@typescript-eslint/explicit-function-return-type': 'warn', // Warns if you don't define return type for public functions
      '@typescript-eslint/no-inferrable-types': 'warn', // Warns if you define types that TS can infer
      '@typescript-eslint/no-var-requires': 'error', // Prohibits use of require()
      // ===== GENERAL BEST PRACTICES =====
      'no-console': 'error', // Warns about console.log usage
      'no-empty-function': 'warn', // Warns about empty functions
      'no-duplicate-imports': 'error', // Prohibits importing the same module multiple times
      'prefer-const': 'error', // Forces using const if variable doesn't change
      // ===== SECURITY RULES =====
      'no-eval': 'error', // Prohibits use of eval()
      'no-implied-eval': 'error', // Prohibits use of setTimeout("code") and similar
      'no-new-func': 'error', // Prohibits use of new Function()
    },
  },
);