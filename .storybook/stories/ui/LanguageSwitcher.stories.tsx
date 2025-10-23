import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { LanguageSwitcher } from '../../../src/components/ui/LanguageSwitcher'

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'UI/LanguageSwitcher',
  component: LanguageSwitcher,
}

export default meta
type Story = StoryObj<typeof LanguageSwitcher>

export const Default: Story = {}
