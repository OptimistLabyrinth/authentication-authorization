import { getModels } from '../../../models'
import { AuthTypes } from '../../../types/auth'
import { IAuthRepository } from '../application/auth.repository.interface'

const getAuthRepository = (): IAuthRepository => {
  const { Auth, AuthEmail } = getModels()

  return {
    async existByEmail(email, session) {
      const authEmail = await AuthEmail.findOne(
        { email },
        {},
        { session: session ?? null },
      )
      return authEmail !== null
    },
    async createAuthEmail(params, session) {
      const authEmail = new AuthEmail({
        type: AuthTypes.email,
        ...params,
      })
      return authEmail.save({ session: session ?? null })
    },
    async findAuthById(authId, session) {
      return Auth.findById(
        authId,
        {},
        { session: session ?? null },
      )
    },
    async findAuthEmailById(authId, session) {
      return AuthEmail.findById(
        authId,
        {},
        { session: session ?? null },
      )
    },
  }
}

export default getAuthRepository
