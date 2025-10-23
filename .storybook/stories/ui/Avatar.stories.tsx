import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '../../../src/components/ui/Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/100" alt="User" />
      <AvatarFallback>WT</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>WT</AvatarFallback>
    </Avatar>
  ),
}
