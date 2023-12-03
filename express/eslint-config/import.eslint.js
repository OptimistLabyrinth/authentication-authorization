/* eslint-disable @typescript-eslint/no-var-requires */
const {
  ERROR,
  OFF,
  defaultLevelLogic,
  defaultLevelStyle,
} = require('./levels.eslint')

const rulesImport = {
  // * logical guide
  'import/export': ERROR,
  'import/no-deprecated': defaultLevelLogic,
  'import/no-empty-named-blocks': defaultLevelLogic,
  'import/no-mutable-exports': ERROR,
  'import/no-named-as-default': defaultLevelLogic,
  'import/no-named-as-default-member': OFF,
  'import/no-unused-modules': defaultLevelLogic,
  'import/default': defaultLevelLogic,
  'import/named': defaultLevelLogic,
  'import/no-absolute-path': defaultLevelLogic,
  'import/no-cycle': ERROR,
  'import/no-dynamic-require': defaultLevelLogic,
  'import/no-self-import': ERROR,
  'import/no-unresolved': ERROR,
  'import/no-useless-path-segments': defaultLevelLogic,
  // * style guide
  'import/consistent-type-specifier-style': [defaultLevelStyle, 'prefer-top-level'],
  'import/exports-last': OFF,
  'import/group-exports': defaultLevelStyle,
  'import/newline-after-import': [
    defaultLevelStyle,
    {
      count: 1,
      considerComments: false,
    },
  ],
  'import/no-anonymous-default-export': ERROR,
  'import/no-duplicates': ERROR,
  'import/no-namespace': defaultLevelStyle,
  'import/no-unassigned-import': ERROR,
  'import/order': [
    defaultLevelStyle,
    {
      groups: [
        'builtin',
        'external',
        'type',
        'internal',
        'unknown',
        'parent',
        'sibling',
        'index',
        'object',
      ],
    },
  ],
} // * end of 'rulesImport' object

module.exports = { rulesImport }
