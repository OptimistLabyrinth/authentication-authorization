import { IAuthService } from '../../auth/application/auth.service'
import { SignInRequestDto } from './sign-in/request.dto'
import { SignUpRequestDto } from './sign-up/request.dto'

export interface IUserService {
  signIn(signInDto: SignInRequestDto): Promise<SignInRequestDto>
  signUp(signUpDto: SignUpRequestDto): Promise<SignUpRequestDto>
}

export default class UserService implements IUserService {
  private readonly authService: IAuthService

  constructor(
    authService: IAuthService,
  ) {
    this.authService = authService
  }

  async signUp(signUpDto: SignUpRequestDto) {
    return signUpDto
  }

  async signIn(signInDto: SignInRequestDto) {
    return signInDto
  }
}
