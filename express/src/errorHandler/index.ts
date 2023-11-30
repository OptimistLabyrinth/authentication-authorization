import { NextFunction, Request, Response } from 'express'

export default function (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  console.error(err)
  const status = 500
  res.status(status).send({ code: status, description: 'internal server error' })
}
