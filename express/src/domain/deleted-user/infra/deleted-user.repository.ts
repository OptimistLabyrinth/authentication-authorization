import { getModels } from '../../../models'
import { IDeletedUserRepository } from '../application/deleted-user.repository.interface'

const getDeletedUserRepository = (): IDeletedUserRepository => {
  const { DeletedUser } = getModels()

  return {
    async createUser(deletedAuthId, User, session) {
      const { name } = User
      const deletedUser = new DeletedUser({
        deletedAuthId,
        name,
      })
      return deletedUser.save({ session: session ?? null })
    },
  }
}

export default getDeletedUserRepository
