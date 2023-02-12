import { ClientSession, Types } from 'mongoose'
import { AppError } from '../../../error'
import { IAuthService } from '../../auth/application/auth.service'
import getUserRepository from '../infra/user.repository'
import { SignInRequestDto } from '../api/post-sign-in/request.dto'
import { SignUpRequestDto } from '../api/post-sign-up/request.dto'
import {
  createSignUpResponseDto,
  CreateSignUpResponseDtoParam,
  SignUpResponseDto,
} from '../api/post-sign-up/response.dto'
import { runWithTransaction, TransactionalFunction } from '../../../mongoose-utils/transaction'
import { IUser } from '../../../models/user.model'
import { AuthEmailDocument } from '../../../models/auth.model'
import { IUserRepository } from './user.repository.interface'

export interface IUserService {
  signUp(signUpDto: SignUpRequestDto): Promise<SignUpResponseDto>
  signIn(signInDto: SignInRequestDto): Promise<SignInRequestDto>
  findById(userId: Types.ObjectId, session?: ClientSession): Promise<IUser>
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
      return signInDto
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
