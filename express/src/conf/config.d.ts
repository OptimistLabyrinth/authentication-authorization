import jwt from 'jsonwebtoken'

export type ConfigDefinition = {
  mongodbConnectionUri: string
  pbkdf2Iteration: number
  pbkdf2Length: number
  pbkdf2digest: string
  jwtSecret: string
  jwtAccessExpiresIn: string
  jwtRefreshExpiresIn: string
  jwtAlgorithm: jwt.Algorithm
}
