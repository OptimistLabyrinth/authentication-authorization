import { ClientSession } from 'mongoose'
import { AuthEmailDocument } from '../../../models/auth.model'
import { DeletedAuthEmailDocument } from '../../../models/delete-auth.model'
import { IAuthService } from '../../auth/application/auth.service'
import getDeletedAuthRepository from '../infra/deleted-auth.repository'
import { IDeletedAuthRepository } from './deleted-auth.repository.interface'

export interface IDeletedAuthService {
  createAuthEmail(
    authEmail: AuthEmailDocument,
    session?: ClientSession
  ): Promise<DeletedAuthEmailDocument>
}

const getDeletedAuthService = (
  authService: IAuthService,
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
