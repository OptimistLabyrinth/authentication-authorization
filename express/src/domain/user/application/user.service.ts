import { ClientSession, Types } from 'mongoose'
import { AppError } from '../../../error'
import { IAuthService } from '../../auth/application/auth.service'
import getUserRepository from '../infra/user.repository'
import { SignInRequestDto } from '../api/post-sign-in/request.dto'
import { createSignInResponseDto, SignInResponseDto } from '../api/post-sign-in/response.dto'
import { SignUpRequestDto } from '../api/post-sign-up/request.dto'
import {
  createSignUpResponseDto,
  CreateSignUpResponseDtoParam,
  SignUpResponseDto,
} from '../api/post-sign-up/response.dto'
import { runWithTransaction, TransactionalFunction } from '../../../mongoose-utils/transaction'
import { IUser, UserDocument } from '../../../models/user.model'
import { AuthEmailDocument } from '../../../models/auth.model'
import { checkPassword } from '../../../utils/password'
import { jwtUserSign } from '../../../utils/jwt-user'
import { TokenTypes } from '../../../types/token'
import { IUserRepository } from './user.repository.interface'

export interface IUserService {
  signUp(signUpDto: SignUpRequestDto): Promise<SignUpResponseDto>
  signIn(signInDto: SignInRequestDto): Promise<SignInResponseDto>
  findById(userId: Types.ObjectId, session?: ClientSession): Promise<IUser>
}

const getUserServicePrivate = () => ({
  async getUserAccessToken(authId: Types.ObjectId, userId: Types.ObjectId) {
    return jwtUserSign(
      {
        authId: authId.toString(),
        userId: userId.toString(),
      },
      TokenTypes.accessToken,
    )
  },
  async getUserRefreshToken(authId: Types.ObjectId, userId: Types.ObjectId) {
    return jwtUserSign(
      {
        authId: authId.toString(),
        userId: userId.toString(),
      },
      TokenTypes.refreshToken,
    )
  },
})

const getUserService = (
  authService: IAuthService,
  userRepositoryOrUndefined?: IUserRepository,
): IUserService => {
  const userRepository = userRepositoryOrUndefined ?? getUserRepository()
  const userServicePrivate = getUserServicePrivate()

  return {
    async signUp(signUpDto: SignUpRequestDto) {
      const { email, password, name } = signUpDto
      const doesEmailExist = await authService.existByEmail(email)
      if (doesEmailExist) {
        throw AppError.USER_DUPLICATE_EMAIL_EXIST
      }
      const func: TransactionalFunction<CreateSignUpResponseDtoParam> = async (session) => {
        const authEmail = await authService.createAuthEmail({ email, password }, session)
        const authEmailDocument = authEmail as AuthEmailDocument
        const user = await userRepository.create(
          {
            authId: authEmailDocument._id,
            name,
          },
          session,
        )
        return {
          auth: authEmail,
          user,
        }
      }
      const args = await runWithTransaction(func)
      return createSignUpResponseDto(args)
    },
    async signIn(signInDto: SignInRequestDto) {
      const { email, password } = signInDto
      const authEmail = await authService.findAuthEmailByEmailOrNull(email)
      if (!authEmail) {
        throw AppError.USER_EMAIL_NOT_REGISTERED
      }
      if (!await checkPassword(authEmail.password, password, authEmail.salt)) {
        throw AppError.USER_INCORRECT_PASSWORD
      }
      const authEmailDoc = authEmail as AuthEmailDocument
      const { _id: authId } = authEmailDoc
      const user = await userRepository.findByAuthId(authId)
      if (!user) {
        throw AppError.USER_NOT_FOUND
      }
      const userDoc = user as UserDocument
      const { _id: userId } = userDoc
      const accessToken = await userServicePrivate.getUserAccessToken(authId, userId)
      const refreshToken = await userServicePrivate.getUserRefreshToken(authId, userId)
      return createSignInResponseDto(user, accessToken, refreshToken)
    },
    async findById(userId, session) {
      const found = await userRepository.findById(userId, session)
      if (!found) {
        throw AppError.USER_NOT_FOUND
      }
      return found
    },
  }
}

export default getUserService
