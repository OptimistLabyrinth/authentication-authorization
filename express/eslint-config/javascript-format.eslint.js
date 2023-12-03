/* eslint-disable @typescript-eslint/no-var-requires */
const {
  OFF,
  ERROR,
  WARN,
  defaultLevelStyle,
} = require('./levels.eslint')

const rulesFormattingJavascript = {
  '@stylistic/array-bracket-newline': [
    defaultLevelStyle,
    {
      multiline: true,
      minItems: 3,
    },
  ],
  '@stylistic/array-bracket-spacing': [
    defaultLevelStyle,
    'never',
    {
      singleValue: false,
      objectsInArrays: false,
      arraysInArrays: false,
    },
  ],
  'array-element-newline': OFF,
  '@stylistic/arrow-parens': [defaultLevelStyle, 'always'],
  '@stylistic/arrow-spacing': [
    defaultLevelStyle,
    {
      before: true,
      after: true,
    },
  ],
  '@stylistic/block-spacing': [defaultLevelStyle, 'always'],
  '@stylistic/brace-style': [defaultLevelStyle, '1tbs'],
  '@stylistic/comma-dangle': [defaultLevelStyle, 'always-multiline'],
  '@stylistic/comma-spacing': [
    defaultLevelStyle,
    {
      before: false,
      after: true,
    },
  ],
  '@stylistic/comma-style': [defaultLevelStyle, 'last'],
  '@stylistic/computed-property-spacing': [defaultLevelStyle, 'never'],
  '@stylistic/dot-location': [defaultLevelStyle, 'property'],
  '@stylistic/eol-last': [defaultLevelStyle, 'always'],
  '@stylistic/function-call-argument-newline': OFF,
  '@stylistic/function-call-spacing': [defaultLevelStyle, 'never'],
  '@stylistic/function-paren-newline': OFF,
  '@stylistic/generator-star-spacing': [
    defaultLevelStyle,
    {
      before: false,
      after: true,
    },
  ],
  '@stylistic/implicit-arrow-linebreak': [defaultLevelStyle, 'beside'],
  '@stylistic/indent': [
    defaultLevelStyle,
    2,
    {
      SwitchCase: 1,
      VariableDeclarator: 'first',
      outerIIFEBody: 1,
      MemberExpression: 1,
      FunctionDeclaration: {
        parameters: 'first',
        body: 1,
      },
      StaticBlock: { body: 1 },
      // CallExpression: { arguments: 'first' }, // * use 'function-call-argument-newline' and 'function-paren-newline' rules instead
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      offsetTernaryExpressions: false,
      ignoreComments: false,
    },
  ],
  '@stylistic/key-spacing': [
    defaultLevelStyle,
    {
      beforeColon: false,
      afterColon: true,
      // align      : 'colon',
    },
  ],
  '@stylistic/keyword-spacing': [
    defaultLevelStyle,
    {
      before: true,
      after: true,
    },
  ],
  '@stylistic/linebreak-style': [
    defaultLevelStyle,
    process.platform === 'win32' ?
      'windows' :
      'unix',
  ],
  '@stylistic/lines-around-comment': [
    defaultLevelStyle,
    {
      beforeBlockComment: false,
      afterBlockComment: false,
      beforeLineComment: false,
      afterLineComment: false,
      allowBlockStart: true,
      allowBlockEnd: true,
      allowClassStart: true,
      allowClassEnd: true,
      allowObjectStart: true,
      allowObjectEnd: true,
      allowArrayStart: true,
      allowArrayEnd: true,
      afterHashbangComment: true,
      allowEnumStart: true,
      allowEnumEnd: true,
      allowInterfaceStart: true,
      allowInterfaceEnd: true,
      allowModuleStart: true,
      allowModuleEnd: true,
      allowTypeStart: true,
      allowTypeEnd: true,
    },
  ],
  '@stylistic/lines-between-class-members': [defaultLevelStyle, 'never'],
  '@stylistic/max-len': [
    defaultLevelStyle,
    {
      code: 120,
      tabWidth: 2,
      comments: 240,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: false,
      ignoreStrings: false,
      ignoreTemplateLiterals: false,
      ignoreRegExpLiterals: true,
    },
  ],
  '@stylistic/max-statements-per-line': [defaultLevelStyle, { max: 1 }],
  '@stylistic/multiline-ternary': [defaultLevelStyle, 'always-multiline'],
  '@stylistic/new-parens': [defaultLevelStyle, 'always'],
  // eslint-disable-next-line @stylistic/max-len
  '@stylistic/newline-per-chained-call': [defaultLevelStyle, { ignoreChainWithDepth: 1 }],
  '@stylistic/no-confusing-arrow': ERROR,
  '@stylistic/no-extra-parens': OFF,
  '@stylistic/no-extra-semi': WARN,
  '@stylistic/no-floating-decimal': WARN,
  '@stylistic/no-mixed-operators': ERROR,
  '@stylistic/no-mixed-spaces-and-tabs': ERROR,
  '@stylistic/no-multi-spaces': [WARN, { ignoreEOLComments: true }],
  '@stylistic/no-multiple-empty-lines': [
    defaultLevelStyle,
    {
      max: 1,
      maxEOF: 0,
      maxBOF: 0,
    },
  ],
  '@stylistic/no-tabs': ERROR,
  '@stylistic/no-trailing-spaces': [
    defaultLevelStyle,
    {
      skipBlankLines: false,
      ignoreComments: false,
    },
  ],
  '@stylistic/no-whitespace-before-property': ERROR,
  '@stylistic/nonblock-statement-body-position': OFF, // * use 'curly' rule instead
  '@stylistic/object-curly-newline': [
    defaultLevelStyle,
    {
      multiline: true,
      minProperties: 2,
    },
  ],
  '@stylistic/object-curly-spacing': [defaultLevelStyle, 'always'],
  // eslint-disable-next-line @stylistic/max-len
  '@stylistic/object-property-newline': [defaultLevelStyle, { allowAllPropertiesOnSameLine: false }],
  '@stylistic/one-var-declaration-per-line': [defaultLevelStyle, 'always'],
  '@stylistic/operator-linebreak': [defaultLevelStyle, 'after'],
  '@stylistic/padded-blocks': [defaultLevelStyle, 'never'],
  /*
   * '@stylistic/padding-line-between-statements': [
   *   defaultLevel,
   *   {
   *     blankLine: 'never',
   *     prev: '*',
   *     next: '*',
   *   },
   * ],
   */
  '@stylistic/quote-props': [defaultLevelStyle, 'as-needed'],
  '@stylistic/quotes': [defaultLevelStyle, 'single'],
  '@stylistic/rest-spread-spacing': [defaultLevelStyle, 'never'],
  '@stylistic/semi': [defaultLevelStyle, 'never'],
  '@stylistic/semi-spacing': OFF,
  '@stylistic/semi-style': OFF,
  '@stylistic/space-before-blocks': [defaultLevelStyle, 'always'],
  '@stylistic/space-before-function-paren': [
    defaultLevelStyle,
    {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    },
  ],
  '@stylistic/space-in-parens': [defaultLevelStyle, 'never'],
  '@stylistic/space-infix-ops': [defaultLevelStyle],
  '@stylistic/space-unary-ops': [
    defaultLevelStyle,
    {
      words: true,
      nonwords: false,
    },
  ],
  '@stylistic/spaced-comment': [defaultLevelStyle, 'always'],
  '@stylistic/switch-colon-spacing': [
    defaultLevelStyle,
    {
      before: false,
      after: true,
    },
  ],
  '@stylistic/template-curly-spacing': [defaultLevelStyle, 'never'],
  '@stylistic/template-tag-spacing': [defaultLevelStyle, 'never'],
  '@stylistic/wrap-iife': [
    defaultLevelStyle,
    'inside',
    { functionPrototypeMethods: true },
  ],
  '@stylistic/wrap-regex': defaultLevelStyle,
  '@stylistic/yield-star-spacing': [
    defaultLevelStyle,
    {
      before: false,
      after: true,
    },
  ],
} // * end of 'rulesFormattingJavascript' object

module.exports = { rulesFormattingJavascript }
