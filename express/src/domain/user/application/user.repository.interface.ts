import { ClientSession, Types } from 'mongoose'
import { UserDocument } from '../../../models/user.model'

export type CreateParam = {
  authId: Types.ObjectId
  name: string
}

export interface IUserRepository {
  create(param: CreateParam, session?: ClientSession): Promise<UserDocument>
  findById(userId: Types.ObjectId, session?: ClientSession): Promise<UserDocument | null>
}
