import { Connection, Model, ObjectId, Schema } from 'mongoose'

type IUser = {
  authId: ObjectId
  name: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

const UserSchema = new Schema<IUser>({
  authId: { type: Schema.Types.ObjectId, ref: 'Auth', required: true },
  name: { type: Schema.Types.String, required: true },
  createdAt: { type: Schema.Types.Date, default: Date.now },
  updatedAt: { type: Schema.Types.Date, default: Date.now },
  deletedAt: { type: Schema.Types.Date },
})

export type UserModel = Model<IUser>

export const generateUserModel = (conn: Connection): UserModel => conn.model('User', UserSchema)
