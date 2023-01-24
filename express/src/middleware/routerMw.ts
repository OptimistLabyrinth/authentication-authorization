import { NextFunction, Request, Response } from 'express'

type RouterMwParam = (req: Request, res: Response, next?: NextFunction) => unknown | Promise<unknown>

const routerMw = (func: RouterMwParam, option?: { stopNext: boolean }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (err) {
      next(err)
      return
    }
    if (!option) {
      next()
      return
    }
    const { stopNext } = option
    if (!stopNext) {
      next()
    }
  }
}

export default routerMw
