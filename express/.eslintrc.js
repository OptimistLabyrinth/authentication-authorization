const OFF = 'off'
const WARN = 'warn'
const ERROR = 'error'
const defaultLevelLayoutFormatting = WARN

const rulesEslintLayoutFormatting = {
  // Eslint: Layout & Formatting -> https://eslint.org/docs/latest/rules/#layout--formatting
  'array-bracket-newline': [
    defaultLevelLayoutFormatting,
    {
      'multiline': true,
    },
  ],
  // prettier: bracketSpacing
  'array-bracket-spacing': [ defaultLevelLayoutFormatting, 'always' ],
  'array-element-newline': [
    defaultLevelLayoutFormatting,
    'consistent',
  ],
  'arrow-parens': [ defaultLevelLayoutFormatting, 'always' ],
  'arrow-spacing': [
    defaultLevelLayoutFormatting,
    {
      'before': true,
      'after': true,
    },
  ],
  'block-spacing': [ defaultLevelLayoutFormatting, 'always' ],
  'brace-style': [
    defaultLevelLayoutFormatting,
    '1tbs',
    {
      'allowSingleLine': false,
    },
  ],
  // prettier: trailingComma
  'comma-dangle': [ defaultLevelLayoutFormatting, 'always-multiline' ],
  'comma-spacing': [
    defaultLevelLayoutFormatting,
    {
      'before': false,
      'after': true,
    },
  ],
  'comma-style': [ defaultLevelLayoutFormatting, 'last' ],
  'computed-property-spacing': [
    defaultLevelLayoutFormatting,
    'never',
    {
      'enforceForClassMembers': true,
    },
  ],
  'dot-location': [ defaultLevelLayoutFormatting, 'property' ],
  'eol-last': [ defaultLevelLayoutFormatting, 'always' ],
  'func-call-spacing': [ defaultLevelLayoutFormatting, 'never' ],
  'function-call-argument-newline': [ defaultLevelLayoutFormatting, 'consistent' ],
  'function-paren-newline': [ defaultLevelLayoutFormatting, 'consistent' ],
  'generator-star-spacing': [ defaultLevelLayoutFormatting, 'after' ],
  'implicit-arrow-linebreak': [ defaultLevelLayoutFormatting, 'beside' ],
  'indent': [
    defaultLevelLayoutFormatting,
    2,
    {
      'SwitchCase': 1,
      'VariableDeclarator': 'first',
      'outerIIFEBody': 1,
      'MemberExpression': 1,
      'FunctionDeclaration': {
        'body': 1,
        'parameters': 1,
      },
      'FunctionExpression': {
        'body': 1,
        'parameters': 1,
      },
      'StaticBlock': {
        'body': 1,
      },
      'CallExpression': {
        'arguments': 'first',
      },
      'ArrayExpression': 1,
      'ObjectExpression': 1,
      'ImportDeclaration': 1,
      'flatTernaryExpressions': true,
      'offsetTernaryExpressions': true,
      'ignoreComments': true,
    },
  ],
  'jsx-quotes': [ defaultLevelLayoutFormatting, 'prefer-double' ],
  'key-spacing': [
    defaultLevelLayoutFormatting,
    {
      'beforeColon': false,
      'afterColon': true,
      'mode': 'strict',
    },
  ],
  'keyword-spacing': [
    defaultLevelLayoutFormatting,
    {
      'before': true,
      'after': true,
      'overrides': {
        'break': {
          'before': true,
          'after': false,
        },
        'continue': {
          'before': true,
          'after': false,
        },
        'debugger': {
          'before': true,
          'after': false,
        },
        'this': {
          'before': true,
          'after': false,
        },
        'super': {
          'before': true,
          'after': false,
        },
      },
    },
  ],
  'line-comment-position': [
    defaultLevelLayoutFormatting,
    {
      'position': 'above',
    },
  ],
  // prettier: endOfLine
  'linebreak-style': [
    defaultLevelLayoutFormatting,
    process.platform === 'win32' ? 'windows' : 'unix',
  ],
  'lines-around-comment': [
    defaultLevelLayoutFormatting,
    {
      'beforeBlockComment': true,
      'afterBlockComment': false,
      'beforeLineComment': false,
      'afterLineComment': false,
      'allowBlockStart': true,
      'allowBlockEnd': false,
      'allowObjectStart': true,
      'allowObjectEnd': false,
      'allowArrayStart': true,
      'allowArrayEnd': false,
      'allowClassStart': true,
      'allowClassEnd': false,
    },
  ],
  'lines-between-class-members': [
    defaultLevelLayoutFormatting,
    'always',
    {
      'exceptAfterSingleLine': true,
    },
  ],
  // prettier: printWidth
  'max-len': [
    defaultLevelLayoutFormatting,
    {
      'code': 120,
      // prettier: tabWidth
      'tabWidth': 2,
      'ignoreComments': true,
      'ignoreTrailingComments': true,
      'ignoreUrls': true,
      'ignoreTemplateLiterals': true,
      'ignoreRegExpLiterals': true,
    },
  ],
  'max-statements-per-line': [
    defaultLevelLayoutFormatting,
    {
      'max': 1,
    },
  ],
  'multiline-ternary': [ defaultLevelLayoutFormatting, 'always-multiline' ],
  'new-parens': [ defaultLevelLayoutFormatting, 'always' ],
  'newline-per-chained-call': OFF,
  'no-extra-parens': [
    defaultLevelLayoutFormatting,
    'all',
    {
      'returnAssign': false,
      'nestedBinaryExpressions': false,
      'ignoreJSX': 'all',
      'enforceForArrowConditionals': false,
      'enforceForSequenceExpressions': false,
      'enforceForNewInMemberExpressions': false,
      'enforceForFunctionPrototypeMethods': false,
    },
  ],
  'no-multi-spaces': defaultLevelLayoutFormatting,
  'no-multiple-empty-lines': [
    defaultLevelLayoutFormatting,
    {
      'max': 2,
      'maxEOF': 25,
      'maxBOF': 0,
    },
  ],
  'no-tabs': [
    'warn',
    {
      'allowIndentationTabs': false,
    },
  ],
  'no-trailing-spaces': [
    defaultLevelLayoutFormatting,
    {
      'skipBlankLines': false,
      'ignoreComments': false,
    },
  ],
  'no-whitespace-before-property': defaultLevelLayoutFormatting,
  'nonblock-statement-body-position': [
    defaultLevelLayoutFormatting,
    'below',
  ],
  'object-curly-newline': [
    defaultLevelLayoutFormatting,
    {
      'consistent': true,
    },
  ],
  'object-curly-spacing': [ defaultLevelLayoutFormatting, 'always' ],
  'object-property-newline': [
    defaultLevelLayoutFormatting,
    {
      'allowAllPropertiesOnSameLine': true,
    },
  ],
  'operator-linebreak': [
    defaultLevelLayoutFormatting,
    'after',
    {
      'overrides': {
        '?': 'before',
        ':': 'before',
      },
    },
  ],
  'padded-blocks': [ defaultLevelLayoutFormatting, 'never' ],
  'padding-line-between-statements': OFF,
  'prefer-arrow-callback': [
    defaultLevelLayoutFormatting,
    {
      'allowNamedFunctions': true,
      'allowUnboundThis': false,
    },
  ],
  // prettier: singleQuote
  'quotes': [
    defaultLevelLayoutFormatting,
    'single',
    {
      'avoidEscape': true,
    },
  ],
  'rest-spread-spacing': [ defaultLevelLayoutFormatting, 'never' ],
  // prettier: semi
  'semi': [
    defaultLevelLayoutFormatting,
    'never',
    {
      'beforeStatementContinuationChars': 'any',
    },
  ],
  'semi-spacing': OFF,
  'semi-style': OFF,
  'space-before-blocks': [ defaultLevelLayoutFormatting, 'always' ],
  'space-before-function-paren': [
    defaultLevelLayoutFormatting,
    {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    },
  ],
  'space-in-parens': [ defaultLevelLayoutFormatting, 'never' ],
  'space-infix-ops': [
    defaultLevelLayoutFormatting,
    {
      'int32Hint': false,
    },
  ],
  'space-unary-ops': [
    defaultLevelLayoutFormatting,
    {
      'words': true,
      'nonwords': false,
    },
  ],
  'switch-colon-spacing': [
    defaultLevelLayoutFormatting,
    {
      'before': false,
      'after': true,
    },
  ],
  'template-curly-spacing': [ defaultLevelLayoutFormatting, 'never' ],
  'template-tag-spacing': [ defaultLevelLayoutFormatting, 'always' ],
  'wrap-iife': [
    defaultLevelLayoutFormatting,
    'inside',
    {
      'functionPrototypeMethods': true,
    },
  ],
  'wrap-regex': defaultLevelLayoutFormatting,
  'yield-star-spacing': [
    defaultLevelLayoutFormatting,
    {
      'before': false,
      'after': true,
    },
  ],
}

const rulesTypescriptEslint = {
  // Typescript Eslint Rules -> https://typescript-eslint.io/rules/
  '@typescript-eslint/ban-ts-comment': OFF,
  '@typescript-eslint/type-annotation-spacing': [
    WARN,
    {
      'before': true,
      'after': true,
      'overrides': {
        'colon': {
          'before': false,
          'after': true,
        },
      },
    },
  ],
}

const rulesImport = {
  'import/order': [
    WARN,
    {
      'groups': [
        'builtin',
        'external',
        'internal',
        'unknown',
        'parent',
        'sibling',
        'index',
        'object',
        'type',
      ],
    },
  ],
}

module.exports = {
  'root': true,
  'env': {
    'browser': false,
    'node': true,
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
    'import',
  ],
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
  ],
  'overrides': [],
  'ignorePatterns': [
    'coverage/',
    'dist/',
    'node_modules/',
    'package-lock.json',
    'tsconfig.json',
    'yarn.lock',
  ],
  'settings': {
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true,
        'project': '.',
      },
    },
  },
  'rules': {
    ...rulesEslintLayoutFormatting,
    ...rulesTypescriptEslint,
    ...rulesImport,
  },
}
