import express from 'express'

const v1Router = express.Router()

v1Router.get('/', (req, res) => {
  res.send({ message: 'Express + TypeScript Server' })
})

export default v1Router
