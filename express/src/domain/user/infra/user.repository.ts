import { getModels } from '../../../models'
import { CreateParam, IUserRepository } from '../application/user.repository.interface'

const getUserRepository = (): IUserRepository => {
  const { User } = getModels()

  return {
    async create(param: CreateParam) {
      return User.create({
        authId: param.authId,
        name: param.name,
      })
    },
  }
}

export default getUserRepository
