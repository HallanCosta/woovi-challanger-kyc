import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../../../src/components/ui/Select'

function Example() {
  const [value, setValue] = useState('')
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger aria-label="Select an option">
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="one">One</SelectItem>
        <SelectItem value="two">Two</SelectItem>
        <SelectItem value="three">Three</SelectItem>
      </SelectContent>
    </Select>
  )
}

const meta: Meta<typeof Example> = {
  title: 'UI/Select',
  component: Example,
}

export default meta
type Story = StoryObj<typeof Example>

export const Default: Story = {}
