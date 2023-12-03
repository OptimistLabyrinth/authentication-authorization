/* eslint-disable no-console */
import type {
  Request,
  Response,
} from 'express'

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
): void => {
  console.error(err)
  const status = 500
  res.status(status)
    .send({
      code: status,
      description: 'internal server error',
    })
}

export default globalErrorHandler
