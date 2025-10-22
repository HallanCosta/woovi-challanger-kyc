import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Mock do hook useTranslation
export const mockTranslation = (key: string) => key

// Wrapper personalizado para testes
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

