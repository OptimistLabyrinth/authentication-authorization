import jwt from 'jsonwebtoken'
import { ConfigDefinition } from './config.d'

let configSettings: ConfigDefinition

const configDefaultSettings: ConfigDefinition = {
  mongodbConnectionUri: 'mongodb://127.0.0.1:27017',
  pbkdf2Iteration: 8,
  pbkdf2Length: 64,
  pbkdf2digest: 'sha512',
  jwtSecret: 'jwt_secret',
  jwtExpiresIn: '1h',
  jwtAlgorithm: 'HS256',
}

export const getConfig = (): ConfigDefinition => configSettings

export const setConfig = (): void => {
  configSettings = {
    mongodbConnectionUri: process.env.MONGO_CONNECTION_URI ?? configDefaultSettings.mongodbConnectionUri,
    pbkdf2Iteration: process.env.PBKDF2_ITERATION
      ? Number.parseInt(process.env.PBKDF2_ITERATION)
      : configDefaultSettings.pbkdf2Iteration,
    pbkdf2Length: process.env.PBKDF2_LENGTH
      ? Number.parseInt(process.env.PBKDF2_LENGTH)
      : configDefaultSettings.pbkdf2Length,
    pbkdf2digest: process.env.PBKDF2_DIGEST ?? configDefaultSettings.pbkdf2digest,
    jwtSecret: process.env.JWT_SECRET ?? configDefaultSettings.jwtSecret,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? configDefaultSettings.jwtExpiresIn,
    jwtAlgorithm: process.env.JWT_ALGORITHM as jwt.Algorithm ?? configDefaultSettings.jwtAlgorithm,
  }
}
