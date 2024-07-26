import { render } from '@redwoodjs/testing/web'

import TaskPage from './TaskPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TaskPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TaskPage taskId='asd'/>)
    }).not.toThrow()
  })
})
