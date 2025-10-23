import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../../src/components/ui/Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  args: {
    children: 'Button',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}
export const Destructive: Story = { args: { variant: 'destructive', children: 'Delete' } }
export const Outline: Story = { args: { variant: 'outline', children: 'Outline' } }
export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary' } }
export const Ghost: Story = { args: { variant: 'ghost', children: 'Ghost' } }
export const Link: Story = { args: { variant: 'link', children: 'Link' } }
export const Large: Story = { args: { size: 'lg' } }
export const Small: Story = { args: { size: 'sm' } }
export const Icon: Story = { args: { size: 'icon', children: '🔔' } }
