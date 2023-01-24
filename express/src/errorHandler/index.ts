import { NextFunction, Request, Response } from 'express'
import { ErrorDto } from '../error/make-error'

export default function (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const errorDto = err as ErrorDto
  if (errorDto.status && errorDto.code && errorDto.description) {
    res.status(errorDto.status).send(errorDto.toJSON())
    return
  }
  console.error(err)
  const status = 500
  res.status(status).send({ status, description: 'internal server error' })
}
