import http from 'http'
import dotenv from 'dotenv'
import { initializeApp } from './app'
import { setConfig } from './conf/config'
import { mongooseConnect } from './mongoose-utils/conn'
import { initializeAllModels } from './models'

dotenv.config()

const port = process.env.PORT ?? 3500

export const startServer = async () => {
  // * setup config
  setConfig()

  // * setup MongoDB
  const connection = await mongooseConnect()
  initializeAllModels(connection)

  // * setup express.Application
  const app = initializeApp()
  app.set('port', port)
  const server = http.createServer(app)

  // * start server
  server.listen(port)
}

startServer()
  .then(() => console.log(`[server]: Server is running at http://localhost:${port}`))
  .catch((e) => console.error(e))
