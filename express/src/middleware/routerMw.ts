import type {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express'

type RouterMwParam = (req: Request, res: Response, next?: NextFunction) => unknown | Promise<unknown>

const routerMw = (
  func: RouterMwParam,
  option?: { swallow: boolean },
): RequestHandler => async (req, res, next) => {
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
  const { swallow } = option
  if (!swallow) {
    next()
  }
}

export default routerMw
