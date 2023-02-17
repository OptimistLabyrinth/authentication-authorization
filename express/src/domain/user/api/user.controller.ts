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
  res.status(httpStatus.created).send(result)
}, { stopNext: true })

const postSignIn = (userService: IUserService) => routerMw(async (req, res) => {
  const signInDto = getSignInValidator(req.body).validate()
  const result = await userService.signIn(signInDto)
  res.send(result)
}, { stopNext: true })

const postRefresh = (userService: IUserService) => routerMw(async (req, res) => {
  const { auth, user } = req
  const result = await userService.refresh(auth, user)
  res.send(result)
}, { stopNext: true })

const generateUserRouter = () => {
  const userRouter = express.Router()
  const userService = getUserService(
    getAuthService(),
  )

  userRouter.post('/sign-up', postSignUp(userService))
  userRouter.post('/sign-in', postSignIn(userService))
  userRouter.post('/refresh', postRefresh(userService))

  return userRouter
}

export default generateUserRouter
