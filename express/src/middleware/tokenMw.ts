import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import getAuthService from '../domain/auth/application/auth.service'
import getUserService from '../domain/user/application/user.service'
import { AppError } from '../error'
import { jwtUserVerify } from '../utils/jwt-user'

const tokenMw = () => async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (!authorization) {
    next()
    return
  }
  if (!authorization.startsWith('bearer') && !authorization.startsWith('Bearer')) {
    next()
    return
  }
  const token = authorization.substring(7, authorization.length)
  req.token = token

  let authId: string | null = null
  let userId: string | null = null
  try {
    const verifyResult = await jwtUserVerify(token)
    authId = verifyResult.authId
    userId = verifyResult.userId
  } catch (err) {
    next(AppError.COMMON_JWT_VERIFY_FAILED)
    return
  }

  const authService = getAuthService()
  const auth = await authService.findAuthById(new Types.ObjectId(authId))
  req.auth = auth

  const userService = getUserService(authService)
  const user = await userService.findById(new Types.ObjectId(userId))
  req.user = user

  next()
}

export default tokenMw
