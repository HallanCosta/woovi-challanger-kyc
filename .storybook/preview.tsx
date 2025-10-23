import type { Preview } from '@storybook/react-vite'
import React from 'react'
import { ThemeProvider } from '../src/lib/theme/themeProvider'
import { TranslationProvider } from '../src/lib/i18n/useTranslation'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <TranslationProvider>
          <Story />
        </TranslationProvider>
      </ThemeProvider>
    ),
  ],
}

export default preview

