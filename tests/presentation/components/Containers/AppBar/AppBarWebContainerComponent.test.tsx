import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { AppBarWebContainerComponent } from '@/presentation/components/Containers/AppBar/Web/AppBarWebContainerComponent'
import type { IAppBar } from '@/presentation/components/Containers/AppBar/AppBarContainerComponent.types'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('AppBarWebContainerComponent', () => {
  const pages: IAppBar[] = [
    { label: 'Book now', path: '/booking-search', icon: 'calendar_month' },
    { label: 'My bookings', path: '/my-bookings', icon: 'book' },
  ]

  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders the logo and page buttons', () => {
    render(<AppBarWebContainerComponent pages={pages} />)

    expect(screen.getByText('LOGO')).toBeInTheDocument()
    for (const page of pages) {
      expect(
        screen.getByRole('button', { name: page.label }),
      ).toBeInTheDocument()
    }
  })

  it('navigates when a page button is clicked', async () => {
    const user = userEvent.setup()

    render(<AppBarWebContainerComponent pages={pages} />)

    await user.click(screen.getByRole('button', { name: pages[1].label }))

    expect(mockNavigate).toHaveBeenCalledWith(pages[1].path)
  })
})
