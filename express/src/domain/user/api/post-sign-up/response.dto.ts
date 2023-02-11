import { IAuth, IAuthEmail } from '../../../../models/auth.model'
import { IUser } from '../../../../models/user.model'
import { AuthTypes, getAuthTypeKey } from '../../../../types/auth'

export type SignUpResponseDto = {
  authType: keyof typeof AuthTypes
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export const createSignUpResponseDto = (
  auth: IAuth,
  user: IUser,
): SignUpResponseDto => {
  const authEmail = auth as IAuthEmail
  const email = authEmail.email

  return {
    authType: getAuthTypeKey(auth.type),
    email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}