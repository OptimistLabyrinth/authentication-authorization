import crypto from 'crypto'
import { ConfigDefinition } from '../conf/config.d'
import { getConfig } from '../conf/config'
import { AppError } from '../error'

export type HashPasswordResult = {
  password: string
  salt: string
}

const getCryptoPbkdf2 = (
  password: string,
  salt: string,
  config: ConfigDefinition,
): Promise<HashPasswordResult> => new Promise((resolve, reject) => {
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

export const hashPassword = (password: string): Promise<HashPasswordResult> => {
  const config = getConfig()
  const salt = crypto.randomBytes(config.pbkdf2Length).toString('hex')
  return getCryptoPbkdf2(password, salt, config)
}

export const checkPassword = async (
  savedPassword: string,
  newPassword: string,
  salt: string,
): Promise<boolean> => {
  const config = getConfig()
  const { password: hashedNewPassword } = await getCryptoPbkdf2(newPassword, salt, config)
  return savedPassword === hashedNewPassword
}
