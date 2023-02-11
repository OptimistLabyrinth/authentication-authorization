import commonErrors from './common.errors'
import authErrors from './domain/auth.errors'
import userErrors from './domain/user.errors'

export const AppError = Object.freeze({
  ...commonErrors,
  ...userErrors,
  ...authErrors,
})

/**
 **  commonErrors               : 10xxx
 **  userErrors                 : 20xxx
 **  authErrors                 : 30xxx
 */
