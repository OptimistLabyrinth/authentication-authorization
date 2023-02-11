import { getModels } from '../../../models'
import { UserModel } from '../../../models/user.model'
import { CreateParam, IUserRepository } from '../application/user.repository.interface'

export default class UserRepository implements IUserRepository {
  private readonly User: UserModel

  constructor() {
    this.User = getModels().User
  }

  async create(param: CreateParam) {
    const { User } = this
    return User.create({
      authId: param.authId,
      name: param.name,
    })
  }
}
