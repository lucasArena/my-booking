import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { AppBarWebContainerComponent } from '@/presentation/components/Containers/AppBar/Web/AppBarWebContainerComponent'
import type { IAppBar } from '@/presentation/components/Containers/AppBar/AppBarContainerComponent.types'

const mockNavigate = vi.fn()
const mockLocation = { pathname: '/' }

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  }
})

describe('AppBarWebContainerComponent', () => {
  const pages: IAppBar[] = [
    { label: 'Book now', path: '/', icon: 'calendar_month' },
    { label: 'My bookings', path: '/my-bookings', icon: 'book' },
  ]

  beforeEach(() => {
    mockNavigate.mockClear()
    mockLocation.pathname = '/'
  })

  it('should render the logo and page buttons, highlighting the active route', () => {
    mockLocation.pathname = '/my-bookings'

    render(<AppBarWebContainerComponent pages={pages} />)

    expect(screen.getByText('LOGO')).toBeInTheDocument()
    const bookNowButton = screen.getByRole('button', { name: pages[0].label })
    const myBookingsButton = screen.getByRole('button', {
      name: pages[1].label,
    })

    expect(bookNowButton).toBeInTheDocument()
    expect(bookNowButton).not.toHaveAttribute('data-active')

    expect(myBookingsButton).toBeInTheDocument()
    expect(myBookingsButton).toHaveAttribute('data-active', 'true')
    expect(myBookingsButton).toHaveAttribute('aria-current', 'page')
  })

  it('should navigate when a page button is clicked', async () => {
    const user = userEvent.setup()

    render(<AppBarWebContainerComponent pages={pages} />)

    await user.click(screen.getByRole('button', { name: pages[1].label }))

    expect(mockNavigate).toHaveBeenCalledWith(pages[1].path)
  })
})
