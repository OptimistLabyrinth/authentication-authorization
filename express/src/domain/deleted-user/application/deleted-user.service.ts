import { Types } from 'mongoose'
import { AuthEmailDocument } from '../../../models/auth.model'
import { DeletedUserDocument } from '../../../models/deleted-user.model'
import { runWithTransaction, TransactionalFunction } from '../../../mongoose-utils/transaction'
import { IAuthService } from '../../auth/application/auth.service'
import { IDeletedAuthService } from '../../deleted-auth/application/deleted-auth.service'
import { IUserService } from '../../user/application/user.service'
import getDeletedUserRepository from '../infra/deleted-user.repository'
import { IDeletedUserRepository } from './deleted-user.repository.interface'

export interface IDeletedUserService {
  deleteUser(userId: Types.ObjectId): Promise<DeletedUserDocument>
}

const getDeletedUserService = (
  userService: IUserService,
  authService: IAuthService,
  deletedAuthService: IDeletedAuthService,
  deletedUserRepositoryOrUndefined?: IDeletedUserRepository,
): IDeletedUserService => {
  const deletedUserRepository = deletedUserRepositoryOrUndefined ?? getDeletedUserRepository()

  return {
    async deleteUser(userId) {
      const func: TransactionalFunction<DeletedUserDocument> = async (session) => {
        const user = await userService.findById(userId, session)
        const auth = await authService.findAuthById(user.authId, session)
        // * if (auth.type === AuthTypes.email)
        const authEmail = auth as AuthEmailDocument
        const deletedAuth = await deletedAuthService.createAuthEmail(authEmail, session)
        const deletedUser = await deletedUserRepository.createUser(deletedAuth._id, user, session)
        await Promise.all([
          user.remove({ session }),
          authEmail.remove({ session }),
        ])
        return deletedUser
      }
      return runWithTransaction(func)
    },
  }
}

export default getDeletedUserService
