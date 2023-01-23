import { Connection } from 'mongoose'
import { AuthModel, AuthEmailSchema, generateAuthModel, AuthEmailModel } from './auth.model'
import { generateUserModel, UserModel } from './user.model'

export type Models = {
  Auth: AuthModel
  AuthEmail: AuthEmailModel
  User: UserModel
}

let models: Models

export const initializeAllModels = (conn: Connection) => {
  const Auth = generateAuthModel(conn)
  const AuthEmail = Auth.discriminator('email', AuthEmailSchema)

  models = {
    Auth,
    AuthEmail,
    User: generateUserModel(conn),
  }
}

export const getModels = (): Models => models
