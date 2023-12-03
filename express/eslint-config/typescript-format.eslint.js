/* eslint-disable @typescript-eslint/no-var-requires */
const { ERROR } = require('./levels.eslint')

const rulesFormattingTypescript = {
  '@stylistic/ts/member-delimiter-style': [
    ERROR,
    {
      multiline: {
        delimiter: 'none',
        requireLast: false,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
    },
  ],
  '@stylistic/ts/type-annotation-spacing': [
    ERROR,
    {
      before: false,
      after: true,
      overrides: {
        arrow:
          {
            before: true,
            after: true,
          },
      },
    },
  ],
} // * end of 'rulesFormattingTypescript' object

module.exports = { rulesFormattingTypescript }
