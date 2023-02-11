import { getModels } from '../../../models'
import { IDeletedAuthRepository } from '../application/deleted-auth.repository.interface'

const getDeletedAuthRepository = (): IDeletedAuthRepository => {
  const { DeletedAuthEmail } = getModels()

  return {
    async createAuthEmail(authEmail, session) {
      const { type, email, password, salt } = authEmail
      const deletedAuthEmail = new DeletedAuthEmail({
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
