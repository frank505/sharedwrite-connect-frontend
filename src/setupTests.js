import '@testing-library/jest-dom'
import { fetch, Headers, Request, Response } from 'cross-fetch'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
// import dummyPokemon from 'src/tests/dummyPokemon'

global.fetch = fetch
global.Headers = Headers
global.Request = Request
global.Response = Response

export const baseTestUrl = 'http://localhost/api/v1';

export const handlers = [
  rest.all(`${baseTestUrl}/*`, (_req, res, ctx) => {
    return res(ctx.status(200),  ctx.json(
      {
        isLoading: false, isSuccess: true, isError: false, data: {
          success: true,
          data:[],
          message:'email verification code has been sent to your email'
        }, error: null
      }
    ))
  }),
]

export const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())
