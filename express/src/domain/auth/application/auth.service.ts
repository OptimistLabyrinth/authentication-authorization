import { ClientSession, Types } from 'mongoose'
import { AppError } from '../../../error'
import { IAuth, IAuthEmail } from '../../../models/auth.model'
import { hashPassword } from '../../../utils/password'
import getAuthRepository from '../infra/auth.repository'
import { IAuthRepository } from './auth.repository.interface'

type AuthServiceCreateAuthEmail = {
  email: string
  password: string
}

export interface IAuthService {
  existByEmail(
    email: string,
    session?: ClientSession
  ): Promise<boolean>
  createAuthEmail(
    param: AuthServiceCreateAuthEmail,
    session?: ClientSession
  ): Promise<IAuthEmail>
  findAuthById(
    authId: Types.ObjectId,
    session?: ClientSession
  ): Promise<IAuth>
  findAuthEmailById(
    authId: Types.ObjectId,
    session?: ClientSession
  ): Promise<IAuthEmail>
}

const getAuthService = (authRepositoryOrUndefined?: IAuthRepository): IAuthService => {
  const authRepository = authRepositoryOrUndefined ?? getAuthRepository()

  return {
    async existByEmail(email, session) {
      return authRepository.existByEmail(email, session)
    },
    async createAuthEmail(param, session) {
      const { email, password } = param
      const hashResult = await hashPassword(password)
      return authRepository.createAuthEmail(
        {
          email,
          password: hashResult.password,
          salt: hashResult.salt,
        },
        session,
      )
    },
    async findAuthById(authId, session) {
      const found = await authRepository.findAuthById(authId, session)
      if (!found) {
        throw AppError.AUTH_NOT_FOUND
      }
      return found
    },
    async findAuthEmailById(authId, session) {
      const found = await authRepository.findAuthEmailById(authId, session)
      if (!found) {
        throw AppError.AUTH_AUTH_EMAIL_NOT_FOUND
      }
      return found
    },
  }
}

export default getAuthService
