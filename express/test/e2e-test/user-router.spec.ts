import supertest, { Request } from 'supertest'
import httpStatus from '../../src/types/http-status'
import { UserModel } from '../../src/models/user.model'
import { AppError } from '../../src/error'
import { SignUpRequestDto } from '../../src/domain/user/api/post-sign-up/request.dto'
import { SignInRequestDto } from '../../src/domain/user/api/post-sign-in/request.dto'
import { AuthModel } from '../../src/models/auth.model'
import { DeletedAuthModel } from '../../src/models/delete-auth.model'
import { DeletedUserModel } from '../../src/models/deleted-user.model'
import { getModels } from '../../src/models'
import { jwtUserSign, jwtUserVerify, UserSignPayload } from '../../src/utils/jwt-user'
import { setupServer, cleanUpServer, getApp } from './helper'

const routerBase = '/user'

describe(`e2e test for ${routerBase}`, () => {
  let testAgent: supertest.SuperTest<Request>
  let Auth: AuthModel
  let User: UserModel
  let DeletedAuth: DeletedAuthModel
  let DeletedUser: DeletedUserModel

  beforeAll(async () => {
    await setupServer()
    const app = getApp()
    testAgent = supertest(app)
    const allModels = getModels()
    Auth = allModels.Auth
    User = allModels.User
    DeletedAuth = allModels.DeletedAuth
    DeletedUser = allModels.DeletedUser
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

  const deleteAllDocuments = async () => Promise.all([
    User.deleteMany(),
    Auth.deleteMany(),
    DeletedAuth.deleteMany(),
    DeletedUser.deleteMany(),
  ])

  // describe('basic test suite', () => {
  //   beforeEach(deleteAllDocuments)
  //
  //   test('1 + 1 = 2', () => {
  //     expect(1 + 1).toBe(2)
  //   })
  // })

  describe(`POST ${routerBase}/sign-up`, () => {
    beforeEach(deleteAllDocuments)

    test('success on sign up using email, password', async () => {
      // arrange
      const signUpArgs: SignUpRequestDto = {
        email: 'test-user@email.com',
        password: 'abcd1234@!',
        name: 'test-user',
      }
      // act
      const response = await userSignUp(testAgent)(signUpArgs)
      // assert
      const { body } = response
      const { message, result } = body
      expect(response.statusCode).toBe(httpStatus.created)
      expect(message).toEqual('user sign up')
      expect(result.authType).toBe('email')
      expect(result.email).toEqual(signUpArgs.email)
      expect(result.name).toEqual(signUpArgs.name)
    })
    test('failure on sign up when email is missing', async () => {
      // arrange
      const signUpArgs: Partial<SignUpRequestDto> = {
        password: 'abcd1234@!',
        name: 'test-user',
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
        name: 'test-user',
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
        name: 'test-user',
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
        name: 'test-user',
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
        name: 'test-user',
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
        name: 'test-user',
      }
      // act
      const response = await userSignUp(testAgent)(signUpArgs)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.preconditionFailed)
      expect(body.code).toBe(AppError.USER_PASSWORD_INVALID.code)
    })
    test('failure on sign up when name is missing', async () => {
      // arrange
      const signUpArgs: Partial<SignUpRequestDto> = {
        email: 'test-user@email.com',
        password: 'abcd1234@!',
      }
      // act
      const response = await userSignUp(testAgent)(signUpArgs)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.preconditionFailed)
      expect(body.code).toBe(AppError.USER_NAME_MISSING.code)
    })
    test('failure on sign up when name is empty after trim', async () => {
      // arrange
      const signUpArgs: Partial<SignUpRequestDto> = {
        email: 'test-user@email.com',
        password: 'abcd1234@!',
        name: '    ',
      }
      // act
      const response = await userSignUp(testAgent)(signUpArgs)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.preconditionFailed)
      expect(body.code).toBe(AppError.USER_NAME_TOO_SHORT.code)
    })
  })

  describe(`POST ${routerBase}/sign-in`, () => {
    beforeEach(deleteAllDocuments)

    test('success on sign in', async () => {
      // arrange
      const signInArgs: SignInRequestDto = {
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
      const signInArgs: Partial<SignInRequestDto> = {
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
      const signInArgs: Partial<SignInRequestDto> = {
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

  describe('jwt sign, jwt verify', () => {
    const signPayload: UserSignPayload = {
      user_cache_key: 'test user cache key',
    }
    let token: string

    test('sign - encode', async () => {
      token = await jwtUserSign(signPayload)
      expect(typeof token).toBe('string')
    })

    test('verify - decode', async () => {
      const verifyPayload = await jwtUserVerify(token)
      expect(typeof verifyPayload).toBe('object')
      expect(verifyPayload.user_cache_key).toEqual(signPayload.user_cache_key)
    })
  })
})
