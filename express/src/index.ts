import http from 'http'
import { initializeApp } from './app'

const port = process.env.PORT ?? 3500

export const startServer = async () => {
  const app = initializeApp()
  app.set('port', port)
  const server = http.createServer(app)
  server.listen(port)
}

startServer()
  .then(() => console.log(`[server]: Server is running at http://localhost:${port}`))
  .catch((e) => console.error(e))
