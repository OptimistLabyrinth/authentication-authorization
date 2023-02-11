import jwt from 'jsonwebtoken'

export type ConfigDefinition = {
  mongodbConnectionUri: string
  pbkdf2Iteration: number
  pbkdf2Length: number
  pbkdf2digest: string
  jwtSecret: string
  jwtExpiresIn: string
  jwtAlgorithm: jwt.Algorithm
}
