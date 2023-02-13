import jwt from 'jsonwebtoken'
import { getConfig } from '../conf/config'
import { TokenTypes } from '../types/token'

export type UserSignPayload = {
  authId: string
  userId: string
}

export type UserVerifyPayload = {
  authId: string
  userId: string
  iat: number
  exp: number
}

export const jwtUserSign = (
  payload: UserSignPayload,
  tokenType: typeof TokenTypes[keyof typeof TokenTypes],
): Promise<string> => {
  const config = getConfig()
  let expiresIn = '300'
  if (tokenType === TokenTypes.accessToken) {
    expiresIn = config.jwtAccessExpiresIn
  } else {
    expiresIn = config.jwtRefreshExpiresIn
  }

  return new Promise((resolve) => {
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn,
      algorithm: config.jwtAlgorithm,
    })
    resolve(token)
  })
}

export const jwtUserVerify = (token: string): Promise<UserVerifyPayload> => {
  const config = getConfig()

  return new Promise((resolve) => {
    const jwtPayload = jwt.verify(token, config.jwtSecret, {
      algorithms: [ 'HS512' ],
    })
    resolve(jwtPayload as UserVerifyPayload)
  })
}
