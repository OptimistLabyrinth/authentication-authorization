import { getModels } from '../../../models'
import { AuthEmailDocument } from '../../../models/auth.model'
import { IDeletedAuthRepository } from '../application/deleted-auth.repository.interface'

const getDeletedAuthRepository = (): IDeletedAuthRepository => {
  const { DeletedAuthEmail } = getModels()

  return {
    async createAuthEmail(authEmail, session) {
      const authEmailDoc = authEmail as AuthEmailDocument
      const { _id: originalId, type, email, password, salt } = authEmailDoc
      const deletedAuthEmail = new DeletedAuthEmail({
        originalId,
        type,
        email,
        password,
        salt,
      })
      return deletedAuthEmail.save({ session: session ?? null })
    },
  }
}

export default getDeletedAuthRepository
