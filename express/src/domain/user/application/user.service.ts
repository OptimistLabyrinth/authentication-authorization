import { IAuthService } from '../../auth/application/auth.service'
import { SignInRequestDto } from './sign-in/request.dto'
import { SignUpRequestDto } from './sign-up/request.dto'

export interface IUserService {
  signIn(signInDto: SignInRequestDto): Promise<SignInRequestDto>
  signUp(signUpDto: SignUpRequestDto): Promise<SignUpRequestDto>
}

const getUserService = (authService: IAuthService): IUserService => {
  return {
    async signUp(signUpDto: SignUpRequestDto): Promise<SignInRequestDto> {
      return signUpDto
    },
    async signIn(signInDto: SignInRequestDto): Promise<SignUpRequestDto> {
      return signInDto
    },
  }
}

export default getUserService
