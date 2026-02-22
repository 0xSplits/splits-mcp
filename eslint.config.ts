import eslint from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist/'] },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['./*', '../*'],
              message: 'Use @/ path alias instead of relative imports.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['*.config.ts'],
    ...tseslint.configs.disableTypeChecked,
  },
  prettierConfig,
)
