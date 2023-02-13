/* eslint-disable @typescript-eslint/no-explicit-any */
import { Connection, Document, Model, Schema, Types } from 'mongoose'

export interface IDeletedUser {
  originalId: Types.ObjectId
  deletedAuthId: Types.ObjectId
  name: string
  deletedAt: Date
}

const DeletedUserSchema = new Schema<IDeletedUser>({
  originalId: { type: Schema.Types.ObjectId, required: true },
  deletedAuthId: { type: Schema.Types.ObjectId, ref: 'DeletedAuth', required: true },
  name: { type: Schema.Types.String, required: true },
  deletedAt: { type: Schema.Types.Date, default: Date.now },
}, { collection: 'deleted_users' })

export type DeletedUserModel = Model<IDeletedUser>

export type DeletedUserDocument = Document<unknown, any, IDeletedUser>
  & IDeletedUser
  & {
    _id: Types.ObjectId;
  }

export const generateDeletedUserModel = (
  conn: Connection,
): DeletedUserModel => conn.model('DeletedUser', DeletedUserSchema)
