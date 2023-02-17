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

  const userSignUp = (agent: supertest.SuperTest<Request>) => (
    param: Partial<SignUpRequestDto>,
  ) => agent.post(`${routerBase}/sign-up`).send(param)
  const userSignIn = (agent: supertest.SuperTest<Request>) => (
    param: Partial<SignInRequestDto>,
  ) => agent.post(`${routerBase}/sign-in`).send(param)
  const userRefresh = (agent: supertest.SuperTest<Request>) => (
    refreshToken: string,
  ) => agent.post(`${routerBase}/refresh`).set('Authorization', `Bearer ${refreshToken}`)

  const deleteAllDocuments = async () => Promise.all([
    User.deleteMany(),
    Auth.deleteMany(),
    DeletedAuth.deleteMany(),
    DeletedUser.deleteMany(),
  ])

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
      expect(response.statusCode).toBe(httpStatus.created)
      expect(body.authType).toBe('email')
      expect(body.email).toEqual(signUpArgs.email)
      expect(body.name).toEqual(signUpArgs.name)
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
    const signUpArgs: SignUpRequestDto = {
      email: 'test-user@email.com',
      password: 'abcd1234@!',
      name: 'test-user',
    }

    const signUpUserForTest = async () => {
      await userSignUp(testAgent)(signUpArgs)
    }

    beforeEach(async () => {
      await deleteAllDocuments()
      await signUpUserForTest()
    })

    test('success on sign in', async () => {
      // arrange
      await signUpUserForTest()
      // arrange
      const signInArgs: SignInRequestDto = {
        email: 'test-user@email.com',
        password: 'abcd1234@!',
      }
      // act
      const response = await userSignIn(testAgent)(signInArgs)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.ok)
      expect(body.accessToken).toBeTruthy()
      expect(body.refreshToken).toBeTruthy()
      expect(body.user).toBeTruthy()
      const { user } = body
      expect(user.name).toEqual(signUpArgs.name)
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
    test('failure on sign in with email which is not registered', async () => {
      // arrange
      const signInArgs: SignInRequestDto = {
        email: 'yet-not-registered@email.com',
        password: 'password1234!@',
      }
      // act
      const response = await userSignIn(testAgent)(signInArgs)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.unauthorized)
      expect(body.code).toBe(AppError.USER_EMAIL_NOT_REGISTERED.code)
    })
    test('failure on sign in with correct email but with wrong password', async () => {
      // arrange
      await signUpUserForTest()
      // arrange
      const signInArgs: SignInRequestDto = {
        email: 'test-user@email.com',
        password: 'wrong-pwd1234!',
      }
      // act
      const response = await userSignIn(testAgent)(signInArgs)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.unauthorized)
      expect(body.code).toBe(AppError.USER_INCORRECT_PASSWORD.code)
    })
  })

  describe(`GET ${routerBase}/refresh`, () => {
    const signUpArgs: SignUpRequestDto = {
      email: 'test-user@email.com',
      password: 'abcd1234@!',
      name: 'test-user',
    }
    const signInArgs: SignInRequestDto = {
      email: signUpArgs.email,
      password: signUpArgs.password,
    }

    beforeEach(async () => {
      await deleteAllDocuments()
    })

    const setupRefresh = (testAgent: supertest.SuperTest<Request>) => async () => {
      await userSignUp(testAgent)(signUpArgs)
      const signInResponse = await userSignIn(testAgent)(signInArgs)
      const { body: signInBody } = signInResponse
      const { accessToken, refreshToken } = signInBody
      return { accessToken, refreshToken }
    }

    test('success on refresh', async () => {
      // arrange
      const { refreshToken } = await setupRefresh(testAgent)()
      // act
      const response = await userRefresh(testAgent)(refreshToken)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.ok)
      const { accessToken: refreshedAccessToken } = body
      expect(refreshedAccessToken).toBeTruthy()
    })

    test('failure on refresh with invalid refresh token', async () => {
      // arrange
      await setupRefresh(testAgent)()
      const randomRefreshToken = 'random access token'
      // act
      const response = await userRefresh(testAgent)(randomRefreshToken)
      // assert
      const { body } = response
      expect(response.statusCode).toBe(httpStatus.internalServerError)
      expect(body.code).toBe(AppError.COMMON_JWT_VERIFY_FAILED.code)
    })
  })
})
