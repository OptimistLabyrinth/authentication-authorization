import express from 'express'

const v2Router = express.Router()

v2Router.get('/', (req, res) => {
  res.send({ message: 'v2 router index' })
})

export default v2Router
