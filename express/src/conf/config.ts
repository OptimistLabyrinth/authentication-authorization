import jwt from 'jsonwebtoken'
import { ConfigDefinition } from './config.d'

let configSettings: ConfigDefinition

const configDefaultSettings: ConfigDefinition = {
  mongodbConnectionUri: 'mongodb://127.0.0.1:27017',
  pbkdf2Iteration: 8,
  pbkdf2Length: 64,
  pbkdf2digest: 'sha512',
  jwtSecret: 'jwt_secret',
  jwtAccessExpiresIn: '5m',
  jwtRefreshExpiresIn: '7 days',
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
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? configDefaultSettings.jwtAccessExpiresIn,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? configDefaultSettings.jwtRefreshExpiresIn,
    jwtAlgorithm: process.env.JWT_ALGORITHM as jwt.Algorithm ?? configDefaultSettings.jwtAlgorithm,
  }
}
