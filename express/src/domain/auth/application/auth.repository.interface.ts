import { ClientSession, Types } from 'mongoose'
import { IAuth, IAuthEmail } from '../../../models/auth.model'

type AuthRepositoryCreateAuthEmailDto = {
  email: string
  password: string
  salt: string
}

export interface IAuthRepository {
  existByEmail(
    email: string,
    session?: ClientSession
  ): Promise<boolean>
  createAuthEmail(
    params: AuthRepositoryCreateAuthEmailDto,
    session?: ClientSession
  ): Promise<IAuthEmail>
  findAuthById(
    authId: Types.ObjectId,
    session?: ClientSession
  ): Promise<IAuth | null>
  findAuthEmailById(
    authId: Types.ObjectId,
    session?: ClientSession
  ): Promise<IAuthEmail | null>
}
