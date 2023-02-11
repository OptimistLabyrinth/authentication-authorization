import { Types } from 'mongoose'
import { IDeletedUser } from '../../../models/deleted-user.model'

export interface IDeletedUserService {
  existByEmail(email: string): Promise<boolean>
  create(): Promise<IDeletedUser>
}

const getDeletedUserService = (): IDeletedUserService => {
  return {
    async existByEmail(): Promise<boolean> {
      return false
    },
    async create(): Promise<IDeletedUser> {
      return {
        authId: new Types.ObjectId(),
        name: '',
        deletedAt: new Date(),
      }
    },
  }
}

export default getDeletedUserService
