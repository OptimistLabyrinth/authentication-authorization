import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import generateAuthRouter from './domain/auth/api/auth.controller'
import generateUserRouter from './domain/user/api/user.controller'
import errorHandler from './errorHandler'
import tokenMw from './middleware/tokenMw'
import anythingRouter from './routes/anything'
import rootRouter from './routes/index'

export const initializeApp = () => {
  const app = express()
  app.use(cors())
  app.use(
    process.env.NODE_ENV === 'test'
      ? (req, res, next) => {
          next()
        }
      : morgan(':method :url :status :res[content-length] - :response-time ms'),
  )
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(tokenMw())
  app.use('/', rootRouter)
  app.use('/anything', anythingRouter)
  app.use('/auth', generateAuthRouter())
  app.use('/user', generateUserRouter())
  app.use(errorHandler)
  return app
}
