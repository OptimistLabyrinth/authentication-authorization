import { IAuth } from '../../../models/auth.model'
import { AuthTypes } from '../../../types/auth'

export interface IAuthService {
  existByEmail(email: string): Promise<boolean>
  create(): Promise<IAuth>
}

export default class AuthService implements IAuthService {
  async existByEmail(): Promise<boolean> {
    return false
  }

  async create(): Promise<IAuth> {
    return {
      type: AuthTypes.email,
      createdAt: new Date(),
    }
  }
}
