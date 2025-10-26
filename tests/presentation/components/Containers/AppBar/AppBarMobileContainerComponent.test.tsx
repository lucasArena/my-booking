import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { AppBarMobileContainerComponent } from '@/presentation/components/Containers/AppBar/Mobile/AppBarMobileContainerComponent'
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

describe('AppBarMobileContainerComponent', () => {
  const pages: IAppBar[] = [
    { label: 'Book now', path: '/booking-search', icon: 'calendar_month' },
    { label: 'My bookings', path: '/my-bookings', icon: 'book' },
  ]

  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders the logo and menu button', () => {
    render(<AppBarMobileContainerComponent pages={pages} />)

    expect(screen.getByText('LOGO')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('opens the menu and lists all pages when toggled', async () => {
    const user = userEvent.setup()

    render(<AppBarMobileContainerComponent pages={pages} />)

    await user.click(screen.getByRole('button'))

    for (const page of pages) {
      expect(
        await screen.findByRole('menuitem', { name: page.label }),
      ).toBeInTheDocument()
    }
  })

  it('navigates to the selected page and closes the menu', async () => {
    const user = userEvent.setup()

    render(<AppBarMobileContainerComponent pages={pages} />)

    await user.click(screen.getByRole('button'))

    const bookingOption = await screen.findByRole('menuitem', {
      name: pages[0].label,
    })

    await user.click(bookingOption)

    expect(mockNavigate).toHaveBeenCalledWith(pages[0].path)
  })
})
