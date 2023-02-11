import { AppError } from '../../../../error'

export type SignInRequestDto = {
  email: string
  password: string
}

export const getSignInValidator = (body: SignInRequestDto) => {
  return {
    validate() {
      const { email, password } = body
      if (!email) {
        throw AppError.USER_EMAIL_MISSING
      }
      if (!password) {
        throw AppError.USER_PASSWORD_MISSING
      }
      return body
    },
  }
}
