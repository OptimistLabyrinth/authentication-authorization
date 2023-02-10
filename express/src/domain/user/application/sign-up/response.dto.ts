import { IAuth } from '../../../../models/auth.model'
import { IUser } from '../../../../models/user.model'
import { AuthTypes, getAuthTypeKey } from '../../../../types/auth'

export type SignUpResponseDto = {
  authType: keyof typeof AuthTypes
  name: string
  createdAt: Date
  updatedAt: Date
}

export const createSignUpResponseDto = (
  auth: IAuth,
  user: IUser,
) => ({
  authType: getAuthTypeKey(auth.type),
  name: user.name,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
} as SignUpResponseDto)
