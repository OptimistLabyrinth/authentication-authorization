import express from 'express'

const generateAuthRouter = () => {
  const authRouter = express.Router()

  authRouter.get('/hello', (req, res) => {
    res.send({ message: 'auth hello' })
  })

  return authRouter
}

export default generateAuthRouter
