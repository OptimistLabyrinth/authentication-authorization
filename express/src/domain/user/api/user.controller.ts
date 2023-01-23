import express from 'express'

const generateUserRouter = () => {
  const userRouter = express.Router()

  userRouter.post('/sign-up', (req, res) => {
    res.send({ message: 'user sign up' })
  })

  userRouter.post('/sign-in', (req, res) => {
    res.send({ message: 'user sign in' })
  })

  return userRouter
}

export default generateUserRouter
