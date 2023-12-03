/* eslint-disable no-console */
import http from 'http'
import dotenv from 'dotenv'
import { initializeApp } from './app'

dotenv.config()

const port = process.env.PORT ?? 3500

export const startServer = async () => {
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
