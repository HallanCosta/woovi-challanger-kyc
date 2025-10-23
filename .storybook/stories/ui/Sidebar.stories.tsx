import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Sidebar } from '../../../src/components/ui/Sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'UI/Sidebar',
  component: Sidebar,
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {}
