import { getModels } from '../../../models'
import { CreateParam, IUserRepository } from '../application/user.repository.interface'

const getUserRepository = (): IUserRepository => {
  const { User } = getModels()

  return {
    async create(param: CreateParam, session) {
      const user = new User({
        ...param,
      })
      return user.save({ session: session ?? null })
    },
    async findById(userId, session) {
      return User.findById(
        userId,
        {},
        { session: session ?? null },
      )
    },
    async findByAuthId(authId, session) {
      return User.findOne(
        { authId },
        {},
        { session: session ?? null },
      )
    },
  }
}

export default getUserRepository
