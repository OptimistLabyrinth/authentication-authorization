import { Connection, Model, Schema } from 'mongoose'
import { AuthTypes } from '../types/auth'

type IAuth = {
  type: typeof AuthTypes[keyof typeof AuthTypes]
  createdAt: Date
  deletedAt?: Date
}

const AuthSchema = new Schema<IAuth>({
  type: { type: Schema.Types.String, enum: Object.values(AuthTypes), required: true },
  createdAt: { type: Schema.Types.Date, default: Date.now },
  deletedAt: { type: Schema.Types.Date },
})

export type AuthModel = Model<IAuth>

export const generateAuthModel = (
  conn: Connection,
): AuthModel => conn.model('Auth', AuthSchema, 'Auth')

type IAuthEmail = IAuth & {
  email: string
  password: string
  salt: string
}

export const AuthEmailSchema = new Schema<IAuthEmail>({
  email: { type: Schema.Types.String, required: true },
  password: { type: Schema.Types.String, required: true },
  salt: { type: Schema.Types.String, required: true },
})

export type AuthEmailModel = Model<IAuthEmail>
