import { IDeletedAuth } from '../../../models/delete-auth.model'
import { AuthTypes } from '../../../types/auth'

export interface IDeletedAuthService {
  existByEmail(email: string): Promise<boolean>
  create(): Promise<IDeletedAuth>
}

export default class DeletedAuthService implements IDeletedAuthService {
  async existByEmail(): Promise<boolean> {
    return true
  }

  async create(): Promise<IDeletedAuth> {
    return {
      type: AuthTypes.email,
      deletedAt: new Date(),
    }
  }
}
