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

import {TaskForm} from './TaskForm'

const meta: Meta<typeof TaskForm> = {
  component: TaskForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TaskForm>

export const Primary: Story = {}
