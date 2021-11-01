const alias = require('./importAliases');

const unusedVarsIgnorePattern = '^_[0-9]+$';

module.exports = {
  settings: {
    react: {
      version: 'detect'
    },
    'import/ignore': ['react-native'],
    'import/resolver': {
      'babel-module': {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias
      }
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    'jest/globals': true
  },
  root: true,
  plugins: [
    '@typescript-eslint',
    'jest',
    'react',
    'module-resolver'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  globals: {
    Atomics: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-case-declarations': 0,
    'no-return-await': 'error',
    'import/no-unresolved': 0,
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'react/jsx-closing-tag-location': 'error',
    'module-resolver/use-alias': 2,
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    curly: ['error', 'multi-or-nest', 'consistent'],
    'linebreak-style': ['error', 'unix'],
    'no-duplicate-imports': [
      'error',
      {
        includeExports: true
      }
    ],
    'react/prop-types': 0,
    'react/display-name': 0,
    'rest-spread-spacing': ['error', 'never'],
    'no-inline-comments': [
      'error',
      {
        // https://github.com/prettier/prettier/issues/7884#issuecomment-760175877
        ignorePattern: '_prettier-hack'
      }
    ],
    'jsx-quotes': ['error', 'prefer-double'],
    'prefer-spread': ['error'],
    'prefer-const': 'error',
    'no-useless-call': ['error'],
    'no-trailing-spaces': ['error'],
    'space-before-blocks': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: unusedVarsIgnorePattern,
        argsIgnorePattern: unusedVarsIgnorePattern,
        caughtErrorsIgnorePattern: unusedVarsIgnorePattern
      }
    ],
    'no-floating-decimal': ['error'],
    'comma-dangle': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'switch-colon-spacing': [
      'error',
      {
        after: true,
        before: false
      }
    ],
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false
      }
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always'
      }
    ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'space-in-parens': ['error', 'never'],
    'block-spacing': 'error',
    'key-spacing': [
      'error',
      {
        singleLine: {
          beforeColon: false,
          afterColon: true,
          mode: 'strict'
        },
        multiLine: {
          beforeColon: false,
          afterColon: true,
          mode: 'strict'
        }
      }
    ],
    'generator-star-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    eqeqeq: 'error',
    'no-empty': 'error'
  }
};
