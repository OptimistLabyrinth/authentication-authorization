import express from 'express'
import routerMw from '../../../middleware/routerMw'
import httpStatus from '../../../types/http-status'
import AuthService from '../../auth/application/auth.service'
import UserService, { IUserService } from '../application/user.service'
import SignInValidator from './validators/sign-in.validator'
import SignUpValidator from './validators/sign-up.validator'

const postSignUp = (userService: IUserService) => routerMw(async (req, res) => {
  const signUpDto = (new SignUpValidator(req.body)).validate()
  const result = await userService.signUp(signUpDto)
  res.status(httpStatus.created)
    .send({
      message: 'user sign up',
      result,
    })
}, { stopNext: true })

const postSignIn = (userService: IUserService) => routerMw(async (req, res) => {
  const signInDto = (new SignInValidator(req.body)).validate()
  const result = await userService.signIn(signInDto)
  res.send({ message: 'user sign in', result })
}, { stopNext: true })

const generateUserRouter = () => {
  const userRouter = express.Router()
  const userService: IUserService = new UserService(
    new AuthService(),
  )
  userRouter.post('/sign-up', postSignUp(userService))
  userRouter.post('/sign-in', postSignIn(userService))
  return userRouter
}

export default generateUserRouter
