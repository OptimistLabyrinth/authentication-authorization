/* eslint-disable @typescript-eslint/no-explicit-any */
import { Connection, Document, Model, Schema, Types } from 'mongoose'

export interface IUser {
  authId: Types.ObjectId
  name: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  authId: { type: Schema.Types.ObjectId, ref: 'Auth', required: true },
  name: { type: Schema.Types.String, required: true },
  createdAt: { type: Schema.Types.Date, default: Date.now },
  updatedAt: { type: Schema.Types.Date, default: Date.now },
}, { collection: 'users' })

export type UserModel = Model<IUser>

export type UserDocument = Document<unknown, any, IUser>
  & IUser
  & {
    _id: Types.ObjectId;
  }

export const generateUserModel = (conn: Connection): UserModel => conn.model('User', UserSchema)
