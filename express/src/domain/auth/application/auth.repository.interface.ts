import { AuthEmailDocument } from '../../../models/auth.model'

export type CreateAuthEmailDto = {
  email: string
  password: string
  salt: string
}

export interface IAuthRepository {
  existByEmail(email: string): Promise<boolean>
  createAuthEmail(params: CreateAuthEmailDto): Promise<AuthEmailDocument>
}
