import supertest, { Request } from 'supertest'
import { initializeApp } from '../../src/app'

describe('e2e test for v1 router', () => {
  let testAgent: supertest.SuperTest<Request>

  beforeAll(() => {
    const app = initializeApp()
    testAgent = supertest(app)
  })

  describe('GET /v1', () => {
    test('success on getting request from /', async () => {
      // arrange
      // act
      const response = await testAgent.get('/v1')
      // assert
      const { body } = response
      const { message } = body
      expect(response.statusCode).toBe(200)
      expect(message).toEqual('Express + TypeScript Server')
    })
  })
})
