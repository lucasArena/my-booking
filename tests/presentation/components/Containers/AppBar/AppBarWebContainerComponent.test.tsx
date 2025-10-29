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

  it('should render the page buttons, highlighting the active route', () => {
    mockLocation.pathname = '/'

    render(<AppBarWebContainerComponent pages={pages} />)

    const bookNowButton = screen.getByRole('button', { name: pages[0].label })

    expect(bookNowButton).toBeTruthy()
    expect(bookNowButton.getAttribute('data-active')).toBe('true')
  })

  it('should navigate when a page button is clicked', async () => {
    const user = userEvent.setup()

    render(<AppBarWebContainerComponent pages={pages} />)

    await user.click(screen.getByRole('button', { name: pages[1].label }))

    expect(mockNavigate).toHaveBeenCalledWith(pages[1].path)
  })
})
