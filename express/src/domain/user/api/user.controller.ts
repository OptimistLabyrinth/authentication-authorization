import express from 'express'
import routerMw from '../../../middleware/routerMw'
import httpStatus from '../../../types/http-status'
import getAuthService from '../../auth/application/auth.service'
import getUserService, { IUserService } from '../application/user.service'
import { getSignInValidator } from './post-sign-in/request.dto'
import { getSignUpValidator } from './post-sign-up/request.dto'

const postSignUp = (userService: IUserService) => routerMw(async (req, res) => {
  const signUpDto = getSignUpValidator(req.body).validate()
  const result = await userService.signUp(signUpDto)
  res.status(httpStatus.created).send({ message: 'user sign up', result })
}, { stopNext: true })

const postSignIn = (userService: IUserService) => routerMw(async (req, res) => {
  const signInDto = getSignInValidator(req.body).validate()
  const result = await userService.signIn(signInDto)
  res.send({ message: 'user sign in', result })
}, { stopNext: true })

const generateUserRouter = () => {
  const userRouter = express.Router()
  const userService = getUserService(
    getAuthService(),
  )

  userRouter.post('/sign-up', postSignUp(userService))
  userRouter.post('/sign-in', postSignIn(userService))

  return userRouter
}

export default generateUserRouter
