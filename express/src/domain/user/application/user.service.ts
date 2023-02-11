import { AppError } from '../../../error'
import { IAuthService } from '../../auth/application/auth.service'
import getUserRepository from '../infra/user.repository'
import { SignInRequestDto } from '../api/post-sign-in/request.dto'
import { SignUpRequestDto } from '../api/post-sign-up/request.dto'
import { createSignUpResponseDto, SignUpResponseDto } from '../api/post-sign-up/response.dto'
import { IUserRepository } from './user.repository.interface'

export interface IUserService {
  signUp(signUpDto: SignUpRequestDto): Promise<SignUpResponseDto>
  signIn(signInDto: SignInRequestDto): Promise<SignInRequestDto>
}

const getUserService = (
  authService: IAuthService,
  userRepositoryOrUndefined?: IUserRepository,
): IUserService => {
  const userRepository = userRepositoryOrUndefined ?? getUserRepository()

  return {
    async signUp(signUpDto: SignUpRequestDto) {
      const { email, password, name } = signUpDto
      const doesEmailExist = await authService.existByEmail(email)
      if (doesEmailExist) {
        throw AppError.USER_DUPLICATE_EMAIL_EXIST
      }
      const authEmail = await authService.createAuthEmail(email, password)
      const user = await userRepository.create({
        authId: authEmail._id,
        name,
      })
      return createSignUpResponseDto(authEmail, user)
    },
    async signIn(signInDto: SignInRequestDto) {
      return signInDto
    },
  }
}

export default getUserService
