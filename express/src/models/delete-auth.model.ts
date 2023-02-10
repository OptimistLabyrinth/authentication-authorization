import { Connection, Model, Schema } from 'mongoose'
import { AuthTypes } from '../types/auth'

export interface IDeletedAuth {
  type: typeof AuthTypes[keyof typeof AuthTypes]
  deletedAt: Date
}

const DeletedAuthSchema = new Schema<IDeletedAuth>({
  type: { type: Schema.Types.Number, enum: Object.values(AuthTypes), required: true },
  deletedAt: { type: Schema.Types.Date, default: Date.now },
}, { collection: 'deleted_auths' })

export type DeletedAuthModel = Model<IDeletedAuth>

export const generateDeletedAuthModel = (
  conn: Connection,
): DeletedAuthModel => conn.model('DeletedAuth', DeletedAuthSchema)

interface IDeletedAuthEmail extends IDeletedAuth {
  email: string
  password: string
  salt: string
}

export const DeletedAuthEmailSchema = new Schema<IDeletedAuthEmail>({
  email: { type: Schema.Types.String, required: true },
  password: { type: Schema.Types.String, required: true },
  salt: { type: Schema.Types.String, required: true },
})

export type DeletedAuthEmailModel = Model<IDeletedAuthEmail>
