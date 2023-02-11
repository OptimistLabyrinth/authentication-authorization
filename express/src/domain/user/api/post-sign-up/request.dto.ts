import validator from 'validator'
import { AppError } from '../../../../error'
import { validatePassword } from '../../../../utils/validate-internal'

export type SignUpRequestDto = {
  email: string
  password: string
  name: string
}

export const getSignUpValidator = (body: SignUpRequestDto) => {
  return {
    validate() {
      const { email, password, name: nameRaw } = body
      if (!email) {
        throw AppError.USER_EMAIL_MISSING
      }
      if (!password) {
        throw AppError.USER_PASSWORD_MISSING
      }
      if (!nameRaw) {
        throw AppError.USER_NAME_MISSING
      }
      if (!validator.isEmail(email)) {
        throw AppError.USER_EMAIL_INVALID
      }
      validatePassword(password)
      const name = nameRaw.trim()
      if (!validator.isLength(name, { min: 1 })) {
        throw AppError.USER_NAME_TOO_SHORT
      }
      return body
    },
  }
}

