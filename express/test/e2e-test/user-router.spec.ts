import supertest, { Request } from 'supertest'
import { initializeApp } from '../../src/app'
import httpStatus from '../../src/types/http-status'

const routerBase = '/user'

describe(`e2e test for ${routerBase}`, () => {
  let testAgent: supertest.SuperTest<Request>

  beforeAll(() => {
    const app = initializeApp()
    testAgent = supertest(app)
  })

  const userSignUp = (
    agent: supertest.SuperTest<Request>,
    param: Partial<SignUpDto>,
  ) => agent.post(`${routerBase}/sign-up`).send(param)

  const userSignIn = (
    agent: supertest.SuperTest<Request>,
  ) => agent.post(`${routerBase}/sign-in`)

  type SignUpDto = {
    email: string
    password: string
  }

  describe(`POST ${routerBase}/sign-up`, () => {
    test('success on sign up', async () => {
      // arrange
      const signUpArgs: SignUpDto = {
        email: 'user@email.com',
        password: 'abcd1234',
      }
      // act
      const response = await userSignUp(testAgent, signUpArgs)
      // assert
      const { body } = response
      const { message, result } = body
      expect(response.statusCode).toBe(httpStatus.created)
      expect(message).toEqual('user sign up')
      expect(result.email).toEqual(signUpArgs.email)
      expect(result.password).toEqual(signUpArgs.password)
    })
  })

  describe(`POST ${routerBase}/sign-in`, () => {
    test('success on sign in', async () => {
      // arrange
      // act
      const response = await userSignIn(testAgent)
      // assert
      const { body } = response
      const { message } = body
      expect(response.statusCode).toBe(httpStatus.ok)
      expect(message).toEqual('user sign in')
    })
  })
})
