import userErrors from './domain/user.errors'

export const AppError = Object.freeze({
  ...userErrors,
})
