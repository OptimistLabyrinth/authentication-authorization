import { ClientSession } from 'mongoose'
import { IAuthEmail } from '../../../models/auth.model'
import { IDeletedAuth } from '../../../models/delete-auth.model'
import getDeletedAuthRepository from '../infra/deleted-auth.repository'
import { IDeletedAuthRepository } from './deleted-auth.repository.interface'

export interface IDeletedAuthService {
  createAuthEmail(
    authEmail: IAuthEmail,
    session?: ClientSession
  ): Promise<IDeletedAuth>
}

const getDeletedAuthService = (
  deletedAuthRepositoryOrUndefined?: IDeletedAuthRepository,
): IDeletedAuthService => {
  const deletedAuthRepository = deletedAuthRepositoryOrUndefined ?? getDeletedAuthRepository()

  return {
    async createAuthEmail(authEmail, session) {
      return deletedAuthRepository.createAuthEmail(authEmail, session)
    },
  }
}

export default getDeletedAuthService
