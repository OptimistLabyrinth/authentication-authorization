import { ClientSession, Types } from 'mongoose'
import { IUser } from '../../../models/user.model'

export type CreateParam = {
  authId: Types.ObjectId
  name: string
}

export interface IUserRepository {
  create(param: CreateParam, session?: ClientSession): Promise<IUser>
  findById(userId: Types.ObjectId, session?: ClientSession): Promise<IUser | null>
}
