import React from 'react'
import RadioTracker from 'presenters/pages/radio-tracker'
import { renderTest } from 'utils/test/index'

const mocks = [
  {
    method: 'get',
    route: 'version',
    data: {
      version: 'dummy-data'
    }
  }
]
describe('test', () => {
  it('renders page', async () => {
    const { findByText } = renderTest({ control: <RadioTracker />, mocks })
    expect(await findByText('hello dummy-data')).toBeInTheDocument()
    expect(true).toBe(true)
  })
})
