import express, { NextFunction, Request, Response } from 'express'
import routerMw from '../middleware/routerMw'

const anythingRouter = express.Router()

anythingRouter.get('/abcd', [
  routerMw(() => {
    console.log('abcd - case 1 - middleware 1')
  }),
  routerMw(() => {
    console.log('abcd - case 1 - middleware 2')
  }),
  routerMw(() => {
    console.log('abcd - case 1 - middleware 3')
  }),
])

anythingRouter.get('/abcd', [
  routerMw((req, res) => {
    console.log('abcd - case 2 - middleware 1')
    res.send({ message: 'abcd1234' })
  }),
  routerMw(() => {
    console.log('abcd - case 2 - middleware 2')
  }),
  routerMw(() => {
    console.log('abcd - case 2 - middleware 3')
  }),
])

anythingRouter.get('/abcd/:id', [
  (req: Request, res: Response, next: NextFunction) => {
    console.log('abcd - case 3 - middleware 1')
    next()
  },
  (req: Request, res: Response) => {
    const { id } = req.params
    console.log('abcd - case 3 - middleware 2')
    res.send({ message: `id: ${id}` })
  },
])

export default anythingRouter
