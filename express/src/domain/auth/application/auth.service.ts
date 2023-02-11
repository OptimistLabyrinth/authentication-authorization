import { AuthEmailDocument } from '../../../models/auth.model'
import { hashPassword } from '../../../utils/password'
import getAuthRepository from '../infra/auth.repository'
import { IAuthRepository } from './auth.repository.interface'

export interface IAuthService {
  existByEmail(email: string): Promise<boolean>
  createAuthEmail(email: string, password: string): Promise<AuthEmailDocument>
}

const getAuthService = (authRepositoryOrUndefined?: IAuthRepository): IAuthService => {
  const authRepository = authRepositoryOrUndefined ?? getAuthRepository()

  return {
    async existByEmail(email) {
      return authRepository.existByEmail(email)
    },
    async createAuthEmail(email: string, password: string) {
      const hashResult = await hashPassword(password)
      return authRepository.createAuthEmail({
        email,
        password: hashResult.password,
        salt: hashResult.salt,
      })
    },
  }
}

export default getAuthService
