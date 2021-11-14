const request = require('supertest')
const app = require('../app')
const db = require('../test/db')

const agent = request.agent(app)

beforeAll(async () => await db.connect())
beforeEach(async () => await db.clear())
afterAll(async () => await db.close())

describe('POST /auth/signup', () => {
  it('creates a new user', (done) => {
    agent
      .post('/auth/signup')
      .send({ email: 'john@doe.com', password: 'mchammer' })
      .expect(201)
      .then((res) => {
        expect(res.body.user).toBeTruthy()
        done()
      })
  })
})
