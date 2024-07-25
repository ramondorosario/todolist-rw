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

import {DatePicker} from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const Primary: Story = {}
