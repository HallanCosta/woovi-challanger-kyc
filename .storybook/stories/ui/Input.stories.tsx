import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../../../src/components/ui/Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  args: {
    placeholder: 'Type here',
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}
export const WithValue: Story = { args: { defaultValue: 'Hello' } }
export const Email: Story = { args: { type: 'email', placeholder: 'email@example.com' } }
export const Disabled: Story = { args: { disabled: true } }
