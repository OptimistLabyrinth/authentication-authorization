import { ClientSession } from 'mongoose'
import { AuthEmailDocument } from '../../../models/auth.model'
import { DeletedAuthEmailDocument } from '../../../models/delete-auth.model'

export interface IDeletedAuthRepository {
  createAuthEmail(
    authEmail: AuthEmailDocument,
    session?: ClientSession
  ): Promise<DeletedAuthEmailDocument>
}
