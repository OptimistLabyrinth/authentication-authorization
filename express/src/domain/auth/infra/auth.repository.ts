import { getModels } from '../../../models'
import { AuthTypes } from '../../../types/auth'
import { CreateAuthEmailDto, IAuthRepository } from '../application/auth.repository.interface'

const getAuthRepository = (): IAuthRepository => {
  const { AuthEmail } = getModels()

  return {
    async existByEmail(email) {
      const authEmail = await AuthEmail.findOne({ email })
      return authEmail !== null
    },
    async createAuthEmail(params: CreateAuthEmailDto) {
      return AuthEmail.create({
        type: AuthTypes.email,
        ...params,
      })
    },
  }
}

export default getAuthRepository
