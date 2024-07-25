// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import {ListContainer} from './ListContainer'

const meta: Meta<typeof ListContainer> = {
  component: ListContainer,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ListContainer>

export const Primary: Story = {
	args: {
		children: <li>Item</li>
	}
}
