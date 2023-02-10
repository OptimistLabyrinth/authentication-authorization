import supertest, { Request } from 'supertest'
import httpStatus from '../../src/types/http-status'
import { UserModel } from '../../src/models/user.model'
import { AppError } from '../../src/error'
import { SignUpRequestDto } from '../../src/domain/user/application/sign-up/request.dto'
import { setupServer, cleanUpServer, getModels, getApp } from './helper'

const routerBase = '/user'

describe(`e2e test for ${routerBase}`, () => {
  let testAgent: supertest.SuperTest<Request>
  let User: UserModel

  beforeAll(async () => {
    await setupServer()
    const app = getApp()
    testAgent = supertest(app)
    const allModels = getModels()
    User = allModels.User
  })
  afterAll(async () => {
    await cleanUpServer()
  })

  const userSignUp = (
    agent: supertest.SuperTest<Request>,
  ) => (
    param: Partial<SignUpRequestDto>,
  ) => agent.post(`${routerBase}/sign-up`).send(param)

  const userSignIn = (
    agent: supertest.SuperTest<Request>,
  ) => (
    param: Partial<SignUpRequestDto>,
  ) => agent.post(`${routerBase}/sign-in`).send(param)

  const deleteUsers = async () => User.deleteMany()
  const deleteAllDocuments = async () => {
    await deleteUsers()
  }

  describe(`POST ${routerBase}/sign-up`, () => {
    beforeAll(deleteAllDocuments)

    test('success on sign up', async () => {
      // arrange
      const signUpArgs: SignUpRequestDto = {
        email: 'test-user@email.com',
        password: 'abcd1234@!',
      }
      // act
      const response = await userSignUp(testAgent)(signUpArgs)
      // assert
      const { body } = response
      const { message, result } = body
      expect(response.statusCode).toBe(httpStatus.created)
      expect(message).toEqual('user sign up')
      expect(result.email).toEqual(signUpArgs.email)
      expect(result.password).toEqual(signUpArgs.password)
    })
    test('failure on sign up when email is missing', async () => {
      // arrange
      const signUpArgs: Partial<SignUpRequestDto> = {
        password: 'abcd1234@!',
      }
      // act
      const response = await userSignUp(testAgent)(signUpArgs)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.preconditionFailed)
      expect(body.code).toBe(AppError.USER_EMAIL_MISSING.code)
    })
    test('failure on sign up when email is invalid', async () => {
      // arrange
      const signUpArgs: SignUpRequestDto = {
        email: 'email-address',
        password: 'abcd1234@!',
      }
      // act
      const response = await userSignUp(testAgent)(signUpArgs)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.preconditionFailed)
      expect(body.code).toBe(AppError.USER_EMAIL_INVALID.code)
    })
    test('failure on sign up when password is missing', async () => {
      // arrange
      const signUpArgs: Partial<SignUpRequestDto> = {
        email: 'test-user@email.com',
      }
      // act
      const response = await userSignUp(testAgent)(signUpArgs)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.preconditionFailed)
      expect(body.code).toBe(AppError.USER_PASSWORD_MISSING.code)
    })
    test('failure on sign up when password is invalid (length shorter than 8)', async () => {
      // arrange
      const signUpArgs: SignUpRequestDto = {
        email: 'test-user@email.com',
        password: 'pwd123!',
      }
      // act
      const response = await userSignUp(testAgent)(signUpArgs)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.preconditionFailed)
      expect(body.code).toBe(AppError.USER_PASSWORD_INVALID.code)
    })
    test('failure on sign up when password is invalid (no alphabet)', async () => {
      // arrange
      const signUpArgs: SignUpRequestDto = {
        email: 'test-user@email.com',
        password: '111234@!',
      }
      // act
      const response = await userSignUp(testAgent)(signUpArgs)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.preconditionFailed)
      expect(body.code).toBe(AppError.USER_PASSWORD_INVALID.code)
    })
    test('failure on sign up when password is invalid (no special character)', async () => {
      // arrange
      const signUpArgs: SignUpRequestDto = {
        email: 'test-user@email.com',
        password: 'abcd1234',
      }
      // act
      const response = await userSignUp(testAgent)(signUpArgs)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.preconditionFailed)
      expect(body.code).toBe(AppError.USER_PASSWORD_INVALID.code)
    })
  })

  describe(`POST ${routerBase}/sign-in`, () => {
    test('success on sign in', async () => {
      // arrange
      const signInArgs: SignUpRequestDto = {
        email: 'test-user@email.com',
        password: 'abcd1234@!',
      }
      // act
      const response = await userSignIn(testAgent)(signInArgs)
      // assert
      const { body } = response
      const { message, result } = body
      expect(response.statusCode).toBe(httpStatus.ok)
      expect(message).toEqual('user sign in')
      expect(result.email).toEqual(signInArgs.email)
      expect(result.password).toEqual(signInArgs.password)
    })
    test('failure on sign in when email is missing', async () => {
      // arrange
      const signInArgs: Partial<SignUpRequestDto> = {
        password: 'abcd1234@!',
      }
      // act
      const response = await userSignIn(testAgent)(signInArgs)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.preconditionFailed)
      expect(body.code).toBe(AppError.USER_EMAIL_MISSING.code)
    })
    test('failure on sign in when password is missing', async () => {
      // arrange
      const signInArgs: Partial<SignUpRequestDto> = {
        email: 'test-user@email.com',
      }
      // act
      const response = await userSignIn(testAgent)(signInArgs)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.preconditionFailed)
      expect(body.code).toBe(AppError.USER_PASSWORD_MISSING.code)
    })
  })
})
