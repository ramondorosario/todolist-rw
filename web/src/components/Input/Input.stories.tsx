import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './Input'

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Input>

export const Primary: Story = {
  args: {
    id: 'first',
    label: 'Label',
    orientation: 'top',
    placeholder: 'Placeholder',
  }
}
