import express from 'express'
import morgan from 'morgan'
import generateAuthRouter from './domain/auth/api/auth.controller'
import generateUserRouter from './domain/user/api/user.controller'
import errorHandler from './errorHandler'
import rootRouter from './routes'

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
  app.use('/auth', generateAuthRouter())
  app.use('/user', generateUserRouter())
  app.use(errorHandler)
  return app
}
