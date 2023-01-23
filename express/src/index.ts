import http from 'http'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { initializeApp } from './app'
import { getConfig, setConfig } from './conf/config'
import { initializeAllModels } from './models'

dotenv.config()

const port = process.env.PORT ?? 3500

export const startServer = async () => {
  // * setup config
  setConfig()
  const config = getConfig()

  // * setup MongoDB
  mongoose.set('strictQuery', false)
  const { connection: mongoDbConnection } = await mongoose.connect(config.mongodbConnectionUri)
  initializeAllModels(mongoDbConnection)

  // * setup Express
  const app = initializeApp()
  app.set('port', port)
  const server = http.createServer(app)

  // * start server
  server.listen(port)
}

startServer()
  .then(() => console.log(`[server]: Server is running at http://localhost:${port}`))
  .catch((e) => console.error(e))
