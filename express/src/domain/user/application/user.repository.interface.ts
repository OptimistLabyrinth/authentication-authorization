import { Types } from 'mongoose'
import { IUser } from '../../../models/user.model'

export type CreateParam = {
  authId: Types.ObjectId
  name: string
}

export interface IUserRepository {
  create(param: CreateParam): Promise<IUser>
}
