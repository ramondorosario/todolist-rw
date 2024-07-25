import { render } from '@redwoodjs/testing/web'

import {ListItem} from './ListItem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ListItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListItem />)
    }).not.toThrow()
  })
})
