import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { FileUpload } from '../../../src/components/ui/FileUpload'

function Example(props: React.ComponentProps<typeof FileUpload>) {
  const [file, setFile] = useState<File | null>(null)
  return (
    <div className="max-w-md">
      <FileUpload {...props} value={file} onFileSelect={setFile} />
    </div>
  )
}

const meta: Meta<typeof Example> = {
  title: 'UI/FileUpload',
  component: Example,
  args: {
    accept: '.png,.jpg,.jpeg,.pdf',
    helperText: 'Accepted: JPG, PNG, PDF. Max 5MB',
    maxSizeMB: 5,
  },
}

export default meta
type Story = StoryObj<typeof Example>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
