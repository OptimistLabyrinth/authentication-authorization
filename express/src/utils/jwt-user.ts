import _ from 'lodash'
import jwt from 'jsonwebtoken'
import { getConfig } from '../conf/config'
import { TokenTypes } from '../types/token'
import { getCryptoRandom } from './crypto-utils'

export type UserSignPayloadParam = {
  authId: string
  userId: string
}

type UserPayloadInternal = {
  rand: string
}

type UserSignPayload = UserSignPayloadParam & UserPayloadInternal

type UserVerifyPayload = UserVerifyPayloadReturn & UserPayloadInternal

export type UserVerifyPayloadReturn = {
  authId: string
  userId: string
  iat: number
  exp: number
}

export const jwtUserSign = async (
  param: UserSignPayloadParam,
  tokenType: typeof TokenTypes[keyof typeof TokenTypes],
): Promise<string> => {
  const config = getConfig()
  let expiresIn = '300'
  if (tokenType === TokenTypes.accessToken) {
    expiresIn = config.jwtAccessExpiresIn
  } else {
    expiresIn = config.jwtRefreshExpiresIn
  }

  const rand = await getCryptoRandom(64, 'hex')
  const payload: UserSignPayload = {
    ...param,
    rand,
  }

  return new Promise((resolve) => {
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn,
      algorithm: config.jwtAlgorithm,
    })
    resolve(token)
  })
}

export const jwtUserVerify = (token: string): Promise<UserVerifyPayloadReturn> => {
  const config = getConfig()
  return new Promise((resolve) => {
    const jwtPayload = jwt.verify(token, config.jwtSecret, {
      algorithms: [ 'HS512' ],
    })
    const userVerifyPayload = jwtPayload as UserVerifyPayload
    const resolvedValue: UserVerifyPayloadReturn = {
      ..._.pick(userVerifyPayload, [ 'authId', 'userId', 'iat', 'exp' ]),
    }
    resolve(resolvedValue)
  })
}
