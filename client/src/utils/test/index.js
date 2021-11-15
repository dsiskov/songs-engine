import React from 'react'
import { render } from '@testing-library/react'
import { rest } from 'msw'
import { QueryClient, QueryClientProvider } from 'react-query'
import { server } from 'setupTests'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const applyMocks = (mocks) => {
  mocks.forEach(({ method, route, data }) => {
    if (method === 'get') {
      server.use(
        rest.get(`*/${route}`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(data))
        })
      )
    }
  })
}

const renderTest = ({ control, mocks }) => {
  applyMocks(mocks)
  const { rerender, ...result } = render(
    <QueryClientProvider client={queryClient}>{control}</QueryClientProvider>
  )
  return {
    ...result,
    rerender: (rerenderUi) =>
      rerender(
        <QueryClientProvider client={queryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  }
}

export { renderTest }
