import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { vi, type Mock } from 'vitest'

import { BookingDrawer } from '@/presentation/drawers/Booking/Confirmation/BookingConfirmationDrawer'
import type { IBookingConfirmationDrawerProps } from '@/presentation/drawers/Booking/Confirmation/BookingConfirmationDrawer.types'
import { PropertyMock } from '@/tests/mocks/Property.mock'

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
  const useBookingConfirmationDrawer = vi.fn()

  return { useBookingConfirmationDrawer }
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
  '@/presentation/drawers/Booking/Confirmation/BookingConfirmationDrawer.rules',
  () => ({
    useBookingConfirmationDrawer: (
      ...args: Parameters<typeof rulesMocks.useBookingConfirmationDrawer>
    ) => rulesMocks.useBookingConfirmationDrawer(...args),
  }),
)

const drawerMock = materialMocks.drawer
const useBookingConfirmationDrawerMock =
  rulesMocks.useBookingConfirmationDrawer as Mock

const createBaseProps = (
  overrides: Partial<IBookingConfirmationDrawerProps>,
): IBookingConfirmationDrawerProps => ({
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

describe('BookingDrawer', () => {
  beforeEach(() => {
    drawerMock.mockClear()
    useBookingConfirmationDrawerMock.mockReset()
  })

  it('renders the drawer container without content when there is no selected property', () => {
    const props = createBaseProps({ property: null })

    useBookingConfirmationDrawerMock.mockReturnValue({
      stayLabel: 'Select your stay range',
      handleConfirm: vi.fn(),
    })

    render(<BookingDrawer {...props} />)

    expect(drawerMock).toHaveBeenCalledTimes(1)
    expect(useBookingConfirmationDrawerMock).toHaveBeenCalledWith(props)
    expect(screen.getByTestId('drawer')).toHaveAttribute('data-open', 'false')
    expect(screen.queryByText('Confirm your stay')).not.toBeInTheDocument()
  })

  it('renders property details and notifies callbacks when actions are triggered', async () => {
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

    useBookingConfirmationDrawerMock.mockReturnValue({
      stayLabel: '01 Jun 2025 – 05 Jun 2025',
      handleConfirm,
    })

    const user = userEvent.setup()

    render(<BookingDrawer {...props} />)

    expect(screen.getByText('Confirm your stay')).toBeInTheDocument()
    expect(screen.getByText(PropertyMock.name)).toBeInTheDocument()
    expect(screen.getByText(PropertyMock.description)).toBeInTheDocument()
    expect(screen.getByText('Stay dates')).toBeInTheDocument()
    expect(screen.getByText('01 Jun 2025 – 05 Jun 2025')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onCancel).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole('button', { name: 'Confirm' }))
    expect(handleConfirm).toHaveBeenCalledTimes(1)

    expect(useBookingConfirmationDrawerMock).toHaveBeenCalledWith(props)
    expect(screen.getByTestId('drawer')).toHaveAttribute('data-open', 'true')
  })
})
