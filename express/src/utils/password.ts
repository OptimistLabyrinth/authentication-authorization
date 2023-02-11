import crypto from 'crypto'
import { getConfig } from '../conf/config'
import { AppError } from '../error'

export const hashPassword = (password: string): Promise<{
  password: string
  salt: string
}> => {
  const config = getConfig()
  const salt = crypto.randomBytes(config.pbkdf2Length).toString('hex')

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      config.pbkdf2Iteration,
      config.pbkdf2Length,
      config.pbkdf2digest,
      (err, derivedKey) => {
        if (err) {
          reject(AppError.COMMON_PASSWORD_HASH_FAILURE)
          return
        }
        resolve({
          password: derivedKey.toString('hex'),
          salt,
        })
      },
    )
  })
}
