import { render } from '@redwoodjs/testing/web'

import Box from './Box'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Box', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Box />)
    }).not.toThrow()
  })
})
