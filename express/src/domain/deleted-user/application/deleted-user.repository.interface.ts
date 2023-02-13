import { ClientSession, Types } from 'mongoose'
import { IDeletedUser } from '../../../models/deleted-user.model'
import { IUser } from '../../../models/user.model'

export interface IDeletedUserRepository {
  createUser(
    deletedAuthId: Types.ObjectId,
    user: IUser,
    session?: ClientSession
  ): Promise<IDeletedUser>
}
