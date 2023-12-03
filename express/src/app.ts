import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import errorHandler from './errorHandler'
import anythingRouter from './routes/anything'
import rootRouter from './routes/index'

export const initializeApp = (): express.Express => {
  const app = express()
  app.use(cors())
  app.use(
    process.env.NODE_ENV === 'test' ?
      (req, res, next) => {
        next()
      } :
      morgan(':method :url :status :res[content-length] - :response-time ms'),
  )
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use('/', rootRouter)
  app.use('/anything', anythingRouter)
  app.use(errorHandler)
  return app
}
