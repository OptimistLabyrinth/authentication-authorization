import validator from 'validator'
import { AppError } from '../error'

export const validatePassword = (password: string) => {
  const minLength = 8
  const minNumbers = 1
  if (
    (
      !validator.isStrongPassword(password, {
        minLength,
        minNumbers,
        minLowercase: 1,
        minUppercase: 0,
        minSymbols: 0,
      }) && !validator.isStrongPassword(password, {
        minLength,
        minNumbers,
        minLowercase: 0,
        minUppercase: 1,
        minSymbols: 0,
      })
    ) || !validator.isStrongPassword(password, {
      minLength,
      minNumbers,
      minLowercase: 0,
      minUppercase: 0,
      minSymbols: 1,
    })) {
    throw AppError.USER_PASSWORD_INVALID
  }
}
