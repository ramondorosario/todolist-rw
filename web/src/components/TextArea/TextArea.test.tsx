import { render } from '@redwoodjs/testing/web'

import {TextArea} from './TextArea'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TextArea', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TextArea />)
    }).not.toThrow()
  })
})
