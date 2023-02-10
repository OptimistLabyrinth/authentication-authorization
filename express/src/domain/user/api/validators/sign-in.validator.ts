import { AppError } from '../../../../error'
import { SignInRequestDto } from '../../application/sign-in/request.dto'

export default class SignInValidator {
  private readonly body: SignInRequestDto

  constructor(body: SignInRequestDto) {
    this.body = body
  }

  validate() {
    const { email, password } = this.body
    if (!email) {
      throw AppError.USER_EMAIL_MISSING
    }
    if (!password) {
      throw AppError.USER_PASSWORD_MISSING
    }
    return this.body
  }
}
