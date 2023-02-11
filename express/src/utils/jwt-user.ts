import jwt from 'jsonwebtoken'
import { getConfig } from '../conf/config'

export type UserSignPayload = {
  user_cache_key: string
}

export type UserVerifyPayload = {
  user_cache_key: string
  iat: number
  exp: number
}

export const jwtUserSign = (payload: UserSignPayload): Promise<string> => {
  const config = getConfig()

  return new Promise((resolve) => {
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
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
