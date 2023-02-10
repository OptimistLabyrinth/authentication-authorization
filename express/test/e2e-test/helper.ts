import dotenv from 'dotenv'
import { Application } from 'express'
import mongoose, { Connection } from 'mongoose'
import { initializeApp } from '../../src/app'
import { initializeAllModels, Models } from '../../src/models'
import { ConfigDefinition } from '../../src/conf/config.d'
import { getConfig, setConfig } from '../../src/conf/config'

dotenv.config()

let config: ConfigDefinition
let connection: Connection
let models: Models
let app: Application

export const setupServer = async () => {
  // * setup config
  setConfig()
  config = getConfig()

  // * setup MongoDB
  mongoose.set('strictQuery', false)
  const mongooseObject = await mongoose.connect(config.mongodbConnectionUri)
  connection = mongooseObject.connection
  models = initializeAllModels(connection)

  // * setup Express.Application
  const port = 3500
  app = initializeApp()
  app.set('port', port)
}

export const cleanUpServer = async () => {
  await connection.close()
}

export const getModels = () => models

export const getApp = () => app
