import { IUser } from '../../../../models/user.model'

export type SignInResponseDto = {
  user: {
    name: string
  }
  accessToken: string
  refreshToken: string
}

export const createSignInResponseDto = (
  user: IUser,
  accessToken: string,
  refreshToken: string,
): SignInResponseDto => ({
  user: {
    name: user.name,
  },
  accessToken,
  refreshToken,
})
