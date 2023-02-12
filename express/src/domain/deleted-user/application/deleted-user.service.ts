import { Types } from 'mongoose'
import { AuthEmailDocument } from '../../../models/auth.model'
import { DeletedAuthDocument } from '../../../models/delete-auth.model'
import { IDeletedUser } from '../../../models/deleted-user.model'
import { UserDocument } from '../../../models/user.model'
import { runWithTransaction, TransactionalFunction } from '../../../mongoose-utils/transaction'
import { IAuthService } from '../../auth/application/auth.service'
import { IDeletedAuthService } from '../../deleted-auth/application/deleted-auth.service'
import { IUserService } from '../../user/application/user.service'
import getDeletedUserRepository from '../infra/deleted-user.repository'
import { IDeletedUserRepository } from './deleted-user.repository.interface'

export interface IDeletedUserService {
  deleteUser(userId: Types.ObjectId): Promise<IDeletedUser>
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
      const func: TransactionalFunction<IDeletedUser> = async (session) => {
        const user = await userService.findById(userId, session)
        const auth = await authService.findAuthById(user.authId, session)
        // * if (auth.type === AuthTypes.email)
        const authEmailDoc = auth as AuthEmailDocument
        const deletedAuth = await deletedAuthService.createAuthEmail(authEmailDoc, session)
        const deletedAuthDoc = deletedAuth as DeletedAuthDocument
        const deletedUser = await deletedUserRepository.createUser(
          deletedAuthDoc._id,
          user,
          session,
        )
        const userDoc = user as UserDocument
        await Promise.all([
          userDoc.remove({ session }),
          authEmailDoc.remove({ session }),
        ])
        return deletedUser
      }
      return runWithTransaction(func)
    },
  }
}

export default getDeletedUserService
