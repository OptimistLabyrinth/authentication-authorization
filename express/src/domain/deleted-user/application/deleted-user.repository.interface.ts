import { ClientSession, Types } from 'mongoose'
import { DeletedUserDocument } from '../../../models/deleted-user.model'
import { UserDocument } from '../../../models/user.model'

export interface IDeletedUserRepository {
  createUser(
    deletedAuthId: Types.ObjectId,
    User: UserDocument,
    session?: ClientSession
  ): Promise<DeletedUserDocument>
}
