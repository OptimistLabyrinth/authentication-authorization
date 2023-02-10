import { AppError } from '../../../../error'
import { SignInDto } from '../../application/dto/sign-in.dto'

export default class SignInValidator {
  private readonly body: SignInDto

  constructor(body: SignInDto) {
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
