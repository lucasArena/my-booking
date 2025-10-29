import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { vi, type Mock } from 'vitest'

import { BookingConfirmationCreateDrawer } from '@/presentation/drawers/Booking/Confirmation/Create/BookingConfirmationCreateDrawer'
import type { IBookingConfirmationCreateDrawerProps } from '@/presentation/drawers/Booking/Confirmation/Create/BookingConfirmationCreateDrawer.types'
import { PropertyMock } from '@/tests/mocks/PropertyMock'

const materialMocks = vi.hoisted(() => {
  const drawer = vi.fn(
    ({ children, open }: { children?: ReactNode; open?: boolean }) => (
      <div data-testid="drawer" data-open={open ? 'true' : 'false'}>
        {children}
      </div>
    ),
  )

  return { drawer }
})

const rulesMocks = vi.hoisted(() => {
  const useBookingConfirmationCreateDrawer = vi.fn()

  return { useBookingConfirmationCreateDrawer }
})

vi.mock('@mui/material', async () => {
  const actual =
    await vi.importActual<typeof import('@mui/material')>('@mui/material')

  return {
    ...actual,
    Drawer: materialMocks.drawer,
  }
})

vi.mock(
  '@/presentation/drawers/Booking/Confirmation/Create/BookingConfirmationCreateDrawer.rules',
  () => ({
    useBookingConfirmationCreateDrawer: (
      ...args: Parameters<typeof rulesMocks.useBookingConfirmationCreateDrawer>
    ) => rulesMocks.useBookingConfirmationCreateDrawer(...args),
  }),
)

const drawerMock = materialMocks.drawer
const useBookingConfirmationCreateDrawerMock =
  rulesMocks.useBookingConfirmationCreateDrawer as Mock

const createBaseProps = (
  overrides: Partial<IBookingConfirmationCreateDrawerProps>,
): IBookingConfirmationCreateDrawerProps => ({
  anchor: 'bottom',
  keepMounted: true,
  property: null,
  onCancel: vi.fn(),
  onClose: vi.fn(),
  onSuccess: vi.fn(),
  selectedRange: null,
  open: false,
  ...overrides,
})

describe('BookingConfirmationCreateDrawer', () => {
  beforeEach(() => {
    drawerMock.mockClear()
    useBookingConfirmationCreateDrawerMock.mockReset()
  })

  it('should render the drawer container without content when there is no selected property', () => {
    const props = createBaseProps({ property: null })

    useBookingConfirmationCreateDrawerMock.mockReturnValue({
      stayLabel: 'Select your stay range',
      handleConfirm: vi.fn(),
    })

    render(<BookingConfirmationCreateDrawer {...props} />)

    expect(drawerMock).toHaveBeenCalledTimes(1)
    expect(useBookingConfirmationCreateDrawerMock).toHaveBeenCalledWith(props)
    const drawer = screen.getByTestId('drawer')
    expect(drawer.getAttribute('data-open')).toBe('false')
    expect(screen.queryByText('Confirm your stay')).toBeNull()
  })

  it('should render property details and notify callbacks when actions are triggered', async () => {
    const handleConfirm = vi.fn()
    const onCancel = vi.fn()
    const onClose = vi.fn()

    const selectedRange = {
      checkIn: new Date('2025-06-01T00:00:00.000Z'),
      checkOut: new Date('2025-06-05T00:00:00.000Z'),
    }

    const props = createBaseProps({
      property: PropertyMock,
      selectedRange,
      onCancel,
      onClose,
      open: true,
    })

    useBookingConfirmationCreateDrawerMock.mockReturnValue({
      stayLabel: '01 Jun 2025 – 05 Jun 2025',
      handleConfirm,
    })

    const user = userEvent.setup()

    render(<BookingConfirmationCreateDrawer {...props} />)

    expect(screen.getByText('Confirm your stay')).toBeTruthy()
    expect(screen.getByText(PropertyMock.name)).toBeTruthy()
    expect(screen.getByText(PropertyMock.description)).toBeTruthy()
    expect(screen.getByText('Stay dates')).toBeTruthy()
    expect(screen.getByText('01 Jun 2025 – 05 Jun 2025')).toBeTruthy()

    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onCancel).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole('button', { name: 'Confirm' }))
    expect(handleConfirm).toHaveBeenCalledTimes(1)

    expect(useBookingConfirmationCreateDrawerMock).toHaveBeenCalledWith(props)
    const drawer = screen.getByTestId('drawer')

    expect(drawer.getAttribute('data-open')).toBe('true')
  })
})
