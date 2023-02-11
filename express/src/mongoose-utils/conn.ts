import mongoose, { Connection } from 'mongoose'
import { getConfig } from '../conf/config'

let mongooseConnection: Connection

export const mongooseConnect = async () => {
  const config = getConfig()

  mongoose.set('strictQuery', false)
  const mongooseObject = await mongoose.connect(config.mongodbConnectionUri)
  mongooseConnection = mongooseObject.connection
  return mongooseConnection
}

export const getConnection = () => mongooseConnection
