import express from 'express'
import routerMw from '../../../middleware/routerMw'

const authHello = routerMw(async (req, res) => {
  res.send({ message: 'auth hello' })
}, { stopNext: true })

const generateAuthRouter = () => {
  const authRouter = express.Router()
  authRouter.get('/hello', authHello)
  return authRouter
}

export default generateAuthRouter
