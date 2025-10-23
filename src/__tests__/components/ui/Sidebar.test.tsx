import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Sidebar } from '@/components/ui/Sidebar'

vi.mock('@/lib/i18n/useTranslation', () => ({
useTranslation: () => ({
  t: (key: string) => key,
  language: 'pt',
  setLanguage: vi.fn() }) }))

it('should render mobile menu button', () => {
  render(<Sidebar />)
  expect(screen.getByLabelText('openMenu')).toBeInTheDocument()
})

it('should open mobile menu on click', async () => {
  const user = userEvent.setup()
  render(<Sidebar />)

  const openButton = screen.getByLabelText('openMenu')
  await user.click(openButton)

const bankElements = screen.getAllByText('BANK')
  expect(bankElements.length).toBe(2)
})

it('should close menu when clicking the close (x) button', async () => {
  const user = userEvent.setup()
  render(<Sidebar />)

  await user.click(screen.getByLabelText('openMenu'))

const closeButtons = screen.getAllByLabelText('closeMenu')
await user.click(closeButtons[0])

const bankTexts = screen.queryAllByText('BANK')
  expect(bankTexts.length).toBe(1)
})

it('should render all menu items', async () => {
  const user = userEvent.setup()
  render(<Sidebar />)

  await user.click(screen.getByLabelText('openMenu'))

  expect(screen.getAllByText('dashboard').length).toBeGreaterThan(0)
  expect(screen.getAllByText('accounts').length).toBeGreaterThan(0)
  expect(screen.getAllByText('deposit').length).toBeGreaterThan(0)
  expect(screen.getAllByText('transfer').length).toBeGreaterThan(0)
  expect(screen.getAllByText('withdraw').length).toBeGreaterThan(0)
  expect(screen.getAllByText('affiliate').length).toBeGreaterThan(0)
  expect(screen.getAllByText('leaderboards').length).toBeGreaterThan(0)
  expect(screen.getAllByText('faq').length).toBeGreaterThan(0)
  expect(screen.getAllByText('contactUs').length).toBeGreaterThan(0)
  expect(screen.getAllByText('legalDocuments').length).toBeGreaterThan(0)
})

it('should mark dashboard as active', async () => {
  const user = userEvent.setup()
  render(<Sidebar />)

  await user.click(screen.getByLabelText('openMenu'))

const dashboardButtons = screen.getAllByText('dashboard')
const dashboardButton = dashboardButtons[0].closest('button')
  expect(dashboardButton).not.toBeDisabled()
})

it('should disable inactive items', async () => {
  const user = userEvent.setup()
  render(<Sidebar />)

  await user.click(screen.getByLabelText('openMenu'))

const accountsButtons = screen.getAllByText('accounts')
const accountsButton = accountsButtons[0].closest('button')
  expect(accountsButton).toBeDisabled()
})

it('should close menu when clicking active item', async () => {
  const user = userEvent.setup()
  render(<Sidebar />)

  await user.click(screen.getByLabelText('openMenu'))

const dashboardButtons = screen.getAllByText('dashboard')
await user.click(dashboardButtons[1])

await new Promise(resolve => setTimeout(resolve, 100))

const bankTexts = screen.queryAllByText('BANK')
  expect(bankTexts.length).toBe(1)
})

it('should render logo', async () => {
  const user = userEvent.setup()
  render(<Sidebar />)

  await user.click(screen.getByLabelText('openMenu'))
  const bankElements = screen.getAllByText('BANK')
  expect(bankElements.length).toBeGreaterThan(0)
})

it('should render menu title', async () => {
  const user = userEvent.setup()
  render(<Sidebar />)

  await user.click(screen.getByLabelText('openMenu'))
  const menuTitles = screen.getAllByText('menu')
  expect(menuTitles.length).toBeGreaterThan(0)
})

