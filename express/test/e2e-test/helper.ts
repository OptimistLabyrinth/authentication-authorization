import dotenv from 'dotenv'
import { Application } from 'express'
import { initializeApp } from '../../src/app'
import { getConnection, mongooseConnect } from '../../src/mongoose-utils/conn'
import { setConfig } from '../../src/conf/config'
import { initializeAllModels } from '../../src/models'

dotenv.config()

const port = process.env.PORT ?? 3500
let app: Application

export const setupServer = async () => {
  // * setup config
  setConfig()

  // * setup MongoDB
  const connection = await mongooseConnect()
  initializeAllModels(connection)

  // * setup Express.Application
  app = initializeApp()
  app.set('port', port)
}

export const cleanUpServer = async () => {
  const connection = getConnection()
  await connection.close()
}

export const getApp = () => app
