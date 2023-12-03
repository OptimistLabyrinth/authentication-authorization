/* eslint-disable @typescript-eslint/no-var-requires */
const { rulesJavascriptLogic } = require('./eslint-config/javascript-logic.eslint')
const { rulesTypescriptLogic } = require('./eslint-config/typescript-logic.eslint')
const { rulesFormattingJavascript } = require('./eslint-config/javascript-format.eslint')
const { rulesFormattingTypescript } = require('./eslint-config/typescript-format.eslint')
const { rulesImport } = require('./eslint-config/import.eslint')

module.exports = {
  root: true,
  env: {
    browser: false,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 13, // * es2022
    // sourceType: 'module',
    // project: ['./tsconfig.json'],
    tsconfigRootDir: '.',
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    '@stylistic',
    '@stylistic/ts',
    'import',
    'security',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:security/recommended',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [
        '.js', '.ts', '.d.ts',
      ],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: '.',
      },
    },
  },
  ignorePatterns: [
    'coverage/**/*',
    'dist/**/*',
    'docker/**/*',
    'node_modules/**/*',
    'jest.config.ts',
    'package-lock.json',
    'tsconfig.json',
    'yarn.lock',
  ],
  rules: {
    ...rulesJavascriptLogic,
    ...rulesTypescriptLogic,
    ...rulesFormattingJavascript,
    ...rulesFormattingTypescript,
    ...rulesImport,
  },
}
