import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FormField } from '../../../src/components/ui/FormField'
import { Input } from '../../../src/components/ui/Input'

const meta: Meta<typeof FormField> = {
  title: 'UI/FormField',
  component: FormField,
  args: {
    label: 'Label',
    required: false,
  },
}

export default meta
type Story = StoryObj<typeof FormField>

export const Default: Story = {
  render: (args) => (
    <FormField {...args}>
      <Input placeholder="Placeholder" />
    </FormField>
  ),
}

export const RequiredWithError: Story = {
  args: {
    required: true,
    error: 'validation.fullName.required',
  },
  render: (args) => (
    <FormField {...args}>
      <Input aria-invalid placeholder="Type here" />
    </FormField>
  ),
}
