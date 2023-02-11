import supertest, { Request } from 'supertest'
import { cleanUpServer, getApp, setupServer } from './helper'

const routerBase = '/auth'

describe(`e2e test for ${routerBase} router`, () => {
  let testAgent: supertest.SuperTest<Request>

  beforeAll(async () => {
    await setupServer()
    const app = getApp()
    testAgent = supertest(app)
  })
  afterAll(async () => {
    await cleanUpServer()
  })

  describe(`GET ${routerBase}`, () => {
    test(`success on getting request from ${routerBase}/hello`, async () => {
      // arrange
      // act
      const response = await testAgent.get(`${routerBase}/hello`)
      // assert
      const { body } = response
      const { message } = body
      expect(response.statusCode).toBe(200)
      expect(message).toEqual('auth hello')
    })
  })
})
