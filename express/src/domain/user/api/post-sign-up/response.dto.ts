import { IAuth, IAuthEmail } from '../../../../models/auth.model'
import { IUser } from '../../../../models/user.model'
import { AuthTypes, getAuthTypeKey } from '../../../../types/auth'

export type CreateSignUpResponseDtoParam = {
  auth: IAuth
  user: IUser
}

export type SignUpResponseDto = {
  authType: keyof typeof AuthTypes
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export const createSignUpResponseDto = (param: CreateSignUpResponseDtoParam): SignUpResponseDto => {
  const { auth, user } = param
  // * if (auth.type === AuthTypes.email)
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
