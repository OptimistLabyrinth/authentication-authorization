import validator from 'validator'
import { AppError } from '../../../../error'
import { validatePassword } from '../../../../utils/validate-internal'
import { SignUpRequestDto } from '../../application/sign-up/request.dto'

export default class SignUpValidator {
  private readonly body: SignUpRequestDto

  constructor(body: SignUpRequestDto) {
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
    if (!validator.isEmail(email)) {
      throw AppError.USER_EMAIL_INVALID
    }
    validatePassword(password)
    return this.body
  }
}
