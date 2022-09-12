import React from 'react'
import { render } from '@testing-library/react'
import App from 'presenters/app'

it('does not crash', () => {
  render(<App />)
})
