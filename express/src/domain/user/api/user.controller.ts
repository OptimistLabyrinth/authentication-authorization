import express from 'express'
import validator from 'validator'
import { AppError } from '../../../error'
import routerMw from '../../../middleware/routerMw'
import httpStatus from '../../../types/http-status'

class SignUpRequestDto {
  private readonly email: string
  private readonly password: string

  constructor(body: Record<string, string>) {
    const { email, password } = this.validate(body)
    this.email = email
    this.password = password
  }

  validate(body: Record<string, string> = {}) {
    const { email, password } = body
    if (!email) {
      throw AppError.USER_EMAIL_MISSING
    }
    if (!password) {
      throw AppError.USER_PASSWORD_MISSING
    }
    if (!validator.isEmail(email)) {
      throw AppError.USER_EMAIL_INVALID
    }
    const minLength = 8
    const minNumbers = 1
    if (!validator.isStrongPassword(password, {
      minLength,
      minNumbers,
      minLowercase: 1,
      minUppercase: 0,
      minSymbols: 0,
    }) && !validator.isStrongPassword(password, {
      minLength,
      minNumbers,
      minLowercase: 0,
      minUppercase: 1,
      minSymbols: 0,
    }) && !validator.isStrongPassword(password, {
      minLength,
      minNumbers,
      minLowercase: 0,
      minUppercase: 0,
      minSymbols: 1,
    })) {
      throw AppError.USER_PASSWORD_INVALID
    }
    return body
  }

  toJSON() {
    return {
      email: this.email,
      password: this.password,
    }
  }
}

class SignUpResponseDto {
  private readonly message: string
  private readonly signUpDto: SignUpRequestDto

  constructor(resultToSend: SignUpRequestDto) {
    this.message = 'user sign up'
    this.signUpDto = resultToSend
  }

  toJSON() {
    return {
      message: this.message,
      result: this.signUpDto.toJSON(),
    }
  }
}

const postSignUp = routerMw(async (req, res) => {
  const signUpDto = new SignUpRequestDto(req.body)
  const result = new SignUpResponseDto(signUpDto).toJSON()
  res.status(httpStatus.created).send(result)
}, { stopNext: true })

const postSignIn = routerMw(async (req, res) => {
  res.send({ message: 'user sign in' })
}, { stopNext: true })

const generateUserRouter = () => {
  const userRouter = express.Router()
  userRouter.post('/sign-up', postSignUp)
  userRouter.post('/sign-in', postSignIn)
  return userRouter
}

export default generateUserRouter
