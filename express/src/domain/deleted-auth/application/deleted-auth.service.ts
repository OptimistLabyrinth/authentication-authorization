import { IDeletedAuth } from '../../../models/delete-auth.model'
import { AuthTypes } from '../../../types/auth'

export interface IDeletedAuthService {
  existByEmail(email: string): Promise<boolean>
  create(): Promise<IDeletedAuth>
}

export default class DeletedAuthService implements IDeletedAuthService {
  async existByEmail() {
    return true
  }

  async create() {
    return {
      type: AuthTypes.email,
      deletedAt: new Date(),
    }
  }
}
