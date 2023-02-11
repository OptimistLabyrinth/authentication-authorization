import commonErrors from './common.errors'
import userErrors from './domain/user.errors'

export const AppError = Object.freeze({
  ...commonErrors,
  ...userErrors,
})
