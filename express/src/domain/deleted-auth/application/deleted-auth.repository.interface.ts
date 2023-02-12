import { ClientSession } from 'mongoose'
import { IAuthEmail } from '../../../models/auth.model'
import { IDeletedAuth } from '../../../models/delete-auth.model'

export interface IDeletedAuthRepository {
  createAuthEmail(
    authEmail: IAuthEmail,
    session?: ClientSession
  ): Promise<IDeletedAuth>
}
