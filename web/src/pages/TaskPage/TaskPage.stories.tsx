import type { Meta, StoryObj } from '@storybook/react'

import TaskPage from './TaskPage'

const meta: Meta<typeof TaskPage> = {
  component: TaskPage,
}

export default meta

type Story = StoryObj<typeof TaskPage>

export const Primary: Story = {}
