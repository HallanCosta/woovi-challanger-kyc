import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Toast, ToastContainer } from '../../../src/components/ui/Toast'

function Example() {
  const [visible, setVisible] = useState(true)
  return (
    <ToastContainer>
      {visible && (
        <Toast
          id="1"
          title="Notification"
          description="This is a toast message"
          onDismiss={() => setVisible(false)}
        />
      )}
    </ToastContainer>
  )
}

const meta: Meta<typeof Example> = {
  title: 'UI/Toast',
  component: Example,
}

export default meta
type Story = StoryObj<typeof Example>

export const Default: Story = {}


