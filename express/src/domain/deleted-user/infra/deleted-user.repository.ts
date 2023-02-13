import { getModels } from '../../../models'
import { UserDocument } from '../../../models/user.model'
import { IDeletedUserRepository } from '../application/deleted-user.repository.interface'

const getDeletedUserRepository = (): IDeletedUserRepository => {
  const { DeletedUser } = getModels()

  return {
    async createUser(deletedAuthId, user, session) {
      const userDoc = user as UserDocument
      const { _id: originalId, name } = userDoc
      const deletedUser = new DeletedUser({
        originalId,
        deletedAuthId,
        name,
      })
      return deletedUser.save({ session: session ?? null })
    },
  }
}

export default getDeletedUserRepository
