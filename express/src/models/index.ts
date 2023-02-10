import { Connection } from 'mongoose'
import { AuthModel, AuthEmailSchema, generateAuthModel, AuthEmailModel } from './auth.model'
import {
  DeletedAuthEmailModel,
  DeletedAuthEmailSchema,
  DeletedAuthModel,
  generateDeletedAuthModel,
} from './delete-auth.model'
import { DeletedUserModel, generateDeletedUserModel } from './deleted-user.model'
import { generateUserModel, UserModel } from './user.model'

export type Models = {
  Auth: AuthModel
  AuthEmail: AuthEmailModel
  User: UserModel
  DeletedAuth: DeletedAuthModel
  DeletedAuthEmail: DeletedAuthEmailModel
  DeletedUser: DeletedUserModel
}

let models: Models

export const initializeAllModels = (conn: Connection) => {
  const Auth = generateAuthModel(conn)
  const AuthEmail = Auth.discriminator('email', AuthEmailSchema)
  const DeletedAuth = generateDeletedAuthModel(conn)
  const DeletedAuthEmail = DeletedAuth.discriminator('deleted_email', DeletedAuthEmailSchema)

  models = {
    Auth,
    AuthEmail,
    User: generateUserModel(conn),
    DeletedAuth,
    DeletedAuthEmail,
    DeletedUser: generateDeletedUserModel(conn),
  }
  return models
}

export const getModels = (): Models => models
