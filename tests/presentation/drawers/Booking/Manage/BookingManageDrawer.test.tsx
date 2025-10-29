import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { vi, type Mock } from 'vitest'

import type { TBookingRange } from '@/domain/entities/Booking/Booking.types'
import { BookingManageDrawer } from '@/presentation/drawers/Booking/Manage/BookingManageDrawer'
import type { IBookingManageDrawerProps } from '@/presentation/drawers/Booking/Manage/BookingManageDrawer.types'
import type { IPropertyBooking } from '@/domain/entities/Property/PropertyBooking.types'
import { PropertyMock } from '@/tests/mocks/PropertyMock'

type CalendarRangeProps = {
  initialRange: TBookingRange
  onRangeChange: (range: TBookingRange) => void
  label: string
}

const mocks = vi.hoisted(() => {
  let latestCalendarProps: CalendarRangeProps | undefined

  const drawer = vi.fn(
    ({ children, open }: { children?: ReactNode; open?: boolean }) => (
      <div data-testid="drawer" data-open={open ? 'true' : 'false'}>
        {children}
      </div>
    ),
  )

  const useBookingManageDrawer = vi.fn()
  const formatRangeLabel = vi.fn(() => 'Formatted range')
  const calendar = vi.fn((props: CalendarRangeProps) => {
    latestCalendarProps = props
    return <div data-testid="calendar-range" />
  })

  return {
    drawer,
    useBookingManageDrawer,
    formatRangeLabel,
    calendar,
    resetCalendarProps: () => {
      latestCalendarProps = undefined
    },
    getCalendarProps: () => {
      if (!latestCalendarProps) {
        throw new Error('Calendar props were not captured')
      }

      return latestCalendarProps
    },
  }
})

vi.mock('@mui/material', async () => {
  const actual =
    await vi.importActual<typeof import('@mui/material')>('@mui/material')

  return {
    ...actual,
    Drawer: mocks.drawer,
  }
})

vi.mock('@/application/utils/FormatRangeLabel/FormatRangeLabelUtil', () => ({
  FormatRangeLabelUtil: (...args: Parameters<typeof mocks.formatRangeLabel>) =>
    mocks.formatRangeLabel(...args),
}))

vi.mock(
  '@/presentation/components/Inputs/CalendarRange/InputCalendarRangeComponent',
  () => ({
    InputCalendarRangeComponent: (props: CalendarRangeProps) =>
      mocks.calendar(props),
  }),
)

vi.mock(
  '@/presentation/drawers/Booking/Manage/BookingManageDrawer.rules',
  () => ({
    useBookingManageDrawer: (
      ...args: Parameters<typeof mocks.useBookingManageDrawer>
    ) => mocks.useBookingManageDrawer(...args),
  }),
)

const drawerMock = mocks.drawer
const useBookingManageDrawerMock = mocks.useBookingManageDrawer as Mock
const formatRangeLabelMock = mocks.formatRangeLabel as Mock
const calendarMock = mocks.calendar as Mock

const createBaseProps = (
  overrides: Partial<IBookingManageDrawerProps>,
): IBookingManageDrawerProps => ({
  anchor: 'bottom',
  keepMounted: true,
  onSuccessCallback: vi.fn(),
  onClose: vi.fn(),
  value: null,
  ...overrides,
})

const createSelectedRange = (
  overrides: Partial<TBookingRange> = {},
): TBookingRange => ({
  checkIn: null,
  checkOut: null,
  ...overrides,
})

const createPropertyBooking = (): IPropertyBooking => ({
  ...PropertyMock,
  bookings: [
    {
      id: 401,
      propertyId: PropertyMock.id,
      checkIn: '2025-07-01T00:00:00.000Z',
      checkOut: '2025-07-05T00:00:00.000Z',
    },
  ],
})

type BookingManageDrawerRulesReturn = {
  isLoading: boolean
  propertyBooking: IPropertyBooking | null
  bookingSelected: IPropertyBooking['bookings'][number] | null
  errorMessage: string | null
  disabledDates: Date[]
  selectedRange: TBookingRange
  handleClose: () => void
  handleRangeChange: (range: TBookingRange) => void
  handleConfirm: () => void
}

const createHookReturn = (
  overrides: Partial<BookingManageDrawerRulesReturn> = {},
): BookingManageDrawerRulesReturn => ({
  isLoading: false,
  propertyBooking: null,
  bookingSelected: null,
  errorMessage: null,
  disabledDates: [],
  selectedRange: createSelectedRange(),
  handleClose: vi.fn(),
  handleRangeChange: vi.fn(),
  handleConfirm: vi.fn(),
  ...overrides,
})

describe('BookingManageDrawer', () => {
  beforeEach(() => {
    drawerMock.mockClear()
    calendarMock.mockClear()
    formatRangeLabelMock.mockReset()
    useBookingManageDrawerMock.mockReset()
    mocks.resetCalendarProps()
  })

  it('should render an inactive drawer when no booking value is provided', () => {
    const props = createBaseProps({ value: null })

    useBookingManageDrawerMock.mockReturnValue(createHookReturn())

    render(<BookingManageDrawer {...props} />)

    expect(drawerMock).not.toHaveBeenCalled()
    expect(screen.queryByTestId('drawer')).toBeNull()
    expect(calendarMock).not.toHaveBeenCalled()
    expect(formatRangeLabelMock).not.toHaveBeenCalled()
    expect(useBookingManageDrawerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        value: null,
        onSuccessCallback: props.onSuccessCallback,
      }),
    )
  })

  it('should render booking details, pass range props forward, and trigger callbacks', async () => {
    const handleClose = vi.fn()
    const handleRangeChange = vi.fn()
    const handleConfirm = vi.fn()
    const onCallback = vi.fn()
    const onClose = vi.fn()

    const selectedRange = createSelectedRange({
      checkIn: new Date('2025-08-01T00:00:00.000Z'),
      checkOut: new Date('2025-08-05T00:00:00.000Z'),
    })

    const propertyBooking = createPropertyBooking()
    const value = {
      propertyBooking,
      bookingId: propertyBooking.bookings[0].id,
    }

    useBookingManageDrawerMock.mockReturnValue(
      createHookReturn({
        propertyBooking,
        bookingSelected: propertyBooking.bookings[0],
        selectedRange,
        handleClose,
        handleRangeChange,
        handleConfirm,
      }),
    )

    formatRangeLabelMock.mockReturnValue('01 Aug 2025 – 05 Aug 2025')

    const props = createBaseProps({
      value,
      onSuccessCallback: onCallback,
      onClose,
    })

    const user = userEvent.setup()

    render(<BookingManageDrawer {...props} />)

    expect(screen.getByText('Update your stay')).toBeTruthy()
    expect(screen.getByText(propertyBooking.name)).toBeTruthy()
    expect(screen.getByText(propertyBooking.location)).toBeTruthy()
    expect(screen.getByText(propertyBooking.description)).toBeTruthy()
    expect(screen.getByText('01 Aug 2025 – 05 Aug 2025')).toBeTruthy()

    const editButton = screen.getByRole('button', {
      name: 'Edit',
    }) as HTMLButtonElement

    expect(editButton.disabled).toBe(false)

    const calendarProps = mocks.getCalendarProps()
    expect(calendarProps.initialRange).toEqual(selectedRange)
    expect(calendarProps.label).toBe('Select new stay dates')

    const newRange: TBookingRange = {
      checkIn: new Date('2025-08-10T00:00:00.000Z'),
      checkOut: new Date('2025-08-15T00:00:00.000Z'),
    }

    calendarProps.onRangeChange(newRange)
    expect(handleRangeChange).toHaveBeenCalledWith(newRange)

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(handleClose).toHaveBeenCalledTimes(1)

    await user.click(editButton)
    expect(handleConfirm).toHaveBeenCalledTimes(1)

    expect(formatRangeLabelMock).toHaveBeenCalledWith(
      selectedRange,
      'Select a new stay range',
    )
    expect(useBookingManageDrawerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        value,
        onSuccessCallback: onCallback,
        onClose,
      }),
    )
    const drawer = screen.getByTestId('drawer')

    expect(drawer.getAttribute('data-open')).toBe('true')
  })
})
