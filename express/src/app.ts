import express from 'express'
import morgan from 'morgan'
import errorHandler from './errorHandler'
import rootRouter from './routes/root'
import v1Router from './routes/v1'
import v2Router from './routes/v2'

export const initializeApp = () => {
  const app = express()
  app.use(
    process.env.NODE_ENV === 'test'
      ? (req, res, next) => {
          next()
        }
      : morgan(':method :url :status :res[content-length] - :response-time ms'),
  )
  app.use(express.static('public'))
  app.use('/', rootRouter)
  app.use('/v1', v1Router)
  app.use('/v2', v2Router)
  app.use(errorHandler)
  return app
}
