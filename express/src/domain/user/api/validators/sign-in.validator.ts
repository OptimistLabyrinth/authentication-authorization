import { AppError } from '../../../../error'
import { SignInRequestDto } from '../../application/sign-in/request.dto'

const getSignInValidator = (body: SignInRequestDto) => {
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

export default getSignInValidator
