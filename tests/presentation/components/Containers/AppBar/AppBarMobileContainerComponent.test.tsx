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
    { label: 'Book now', path: '/', icon: 'calendar_month' },
    { label: 'My bookings', path: '/my-bookings', icon: 'book' },
  ]

  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('should open the menu and list all pages when toggled', async () => {
    const user = userEvent.setup()

    render(<AppBarMobileContainerComponent pages={pages} />)

    await user.click(screen.getByRole('button'))

    for (const page of pages) {
      expect(
        await screen.findByRole('menuitem', { name: page.label }),
      ).toBeInTheDocument()
    }
  })

  it('should navigate to the selected page and close the menu', async () => {
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
