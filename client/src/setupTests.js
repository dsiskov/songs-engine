import '@testing-library/jest-dom'
import { setupServer } from 'msw/node'

const dummy = []
export const server = setupServer(...dummy)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// silence react-query errors
// setLogger({
//     log: console.log,
//     warn: console.warn,
//     error: () => {},
// })
