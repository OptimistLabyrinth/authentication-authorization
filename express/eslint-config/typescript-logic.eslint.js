/* eslint-disable @typescript-eslint/no-var-requires */
const {
  defaultLevelLogic,
  OFF,
  ERROR,
} = require('./levels.eslint')

const rulesTypescriptLogic = {
  '@typescript-eslint/adjacent-overload-signatures': defaultLevelLogic,
  '@typescript-eslint/array-type': [
    defaultLevelLogic,
    {
      default: 'array',
      readonly: 'array',
    },
  ],
  '@typescript-eslint/ban-ts-comment': OFF,
  '@typescript-eslint/ban-tslint-comment': OFF,
  '@typescript-eslint/consistent-generic-constructors': [defaultLevelLogic, 'type-annotation'],
  '@typescript-eslint/consistent-indexed-object-style': [defaultLevelLogic, 'index-signature'],
  '@typescript-eslint/consistent-type-assertions': [
    defaultLevelLogic,
    {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'never',
    },
  ],
  '@typescript-eslint/consistent-type-definitions': [defaultLevelLogic, 'type'],
  '@typescript-eslint/consistent-type-exports': OFF,
  '@typescript-eslint/consistent-type-imports': [
    defaultLevelLogic,
    {
      prefer: 'type-imports',
      fixStyle: 'separate-type-imports',
      disallowTypeAnnotations: false,
    },
  ],
  '@typescript-eslint/explicit-function-return-type': OFF,
  '@typescript-eslint/explicit-member-accessibility': OFF,
  '@typescript-eslint/explicit-module-boundary-types': defaultLevelLogic,
  '@typescript-eslint/method-signature-style': [defaultLevelLogic, 'property'],
  '@typescript-eslint/no-confusing-void-expression': OFF,
  '@typescript-eslint/no-extra-non-null-assertion': defaultLevelLogic,
  '@typescript-eslint/no-extraneous-class': ERROR,
  '@typescript-eslint/no-import-type-side-effects': defaultLevelLogic,
  '@typescript-eslint/no-inferrable-types': defaultLevelLogic,
  '@typescript-eslint/no-mixed-enums': OFF,
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing': defaultLevelLogic,
  '@typescript-eslint/no-non-null-asserted-optional-chain': defaultLevelLogic,
  '@typescript-eslint/no-non-null-assertion': defaultLevelLogic,
  '@typescript-eslint/no-require-imports': OFF,
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': OFF,
  '@typescript-eslint/no-unnecessary-condition': OFF,
  '@typescript-eslint/no-unnecessary-qualifier': OFF,
  '@typescript-eslint/no-unnecessary-type-arguments': OFF,
  '@typescript-eslint/no-useless-empty-export': defaultLevelLogic,
} // * end of 'rulesTypescriptLogic' object

module.exports = { rulesTypescriptLogic }
