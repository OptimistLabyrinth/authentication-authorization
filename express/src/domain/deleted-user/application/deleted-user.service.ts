import { Types } from 'mongoose'
import { IDeletedUser } from '../../../models/deleted-user.model'

export interface IDeletedUserService {
  existByEmail(email: string): Promise<boolean>
  create(): Promise<IDeletedUser>
}

export default class DeletedUserService implements IDeletedUserService {
  async existByEmail() {
    return false
  }

  async create() {
    return {
      authId: new Types.ObjectId(),
      name: '',
      deletedAt: new Date(),
    }
  }
}
