import express from 'express'

const rootRouter = express.Router()

rootRouter.get('/', (req, res) => res.sendFile('index.html'))

export default rootRouter
