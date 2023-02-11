/* eslint-disable @typescript-eslint/no-explicit-any */
import { Connection, Document, Model, Schema, Types } from 'mongoose'
import { AuthTypes } from '../types/auth'

export interface IAuth {
  type: typeof AuthTypes[keyof typeof AuthTypes]
  createdAt: Date
}

const AuthSchema = new Schema<IAuth>({
  type: { type: Schema.Types.Number, enum: Object.values(AuthTypes), required: true },
  createdAt: { type: Schema.Types.Date, default: Date.now },
}, { collection: 'auths' })

export type AuthModel = Model<IAuth>

export const generateAuthModel = (
  conn: Connection,
): AuthModel => conn.model('Auth', AuthSchema, 'Auth')

export interface IAuthEmail extends IAuth {
  email: string
  password: string
  salt: string
}

export const AuthEmailSchema = new Schema<IAuthEmail>({
  email: { type: Schema.Types.String, unique: true, required: true },
  password: { type: Schema.Types.String, required: true },
  salt: { type: Schema.Types.String, required: true },
})

export type AuthEmailModel = Model<IAuthEmail>

export type AuthEmailDocument = Document<unknown, any, IAuthEmail>
  & IAuthEmail
  & {
    _id: Types.ObjectId
  }
