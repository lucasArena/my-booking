import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { DateRangeFieldComponent } from '@/presentation/components/Inputs/DateRange/InputDateRangeFieldComponent'
import type { TInputDateRangeForm } from '@/presentation/components/Inputs/DateRange/InputDateRangeFieldComponent.types'
import type { IInputCalendarRangeComponentProps } from '@/presentation/components/Inputs/CalendarRange/InputCalendarRangeComponent.types'

const defaultRange: TInputDateRangeForm = { checkIn: null, checkOut: null }

type MockCalendarProps = IInputCalendarRangeComponentProps & {
  onRangeChange: NonNullable<IInputCalendarRangeComponentProps['onRangeChange']>
}

let latestCalendarProps: MockCalendarProps | undefined

const calendarRangeMock = vi.fn((props: MockCalendarProps) => {
  latestCalendarProps = props
  return <div data-testid="calendar-range" />
})

vi.mock(
  '@/presentation/components/Inputs/CalendarRange/InputCalendarRangeComponent',
  () => ({
    InputCalendarRangeComponent: (props: MockCalendarProps) =>
      calendarRangeMock(props),
  }),
)

const getCalendarProps = () => {
  if (!latestCalendarProps) {
    throw new Error('Calendar props were not captured')
  }

  return latestCalendarProps
}

describe('DateRangeFieldComponent', () => {
  beforeEach(() => {
    latestCalendarProps = undefined
    calendarRangeMock.mockClear()
  })

  it('should show the placeholder when the range is empty', () => {
    render(
      <DateRangeFieldComponent
        value={defaultRange}
        onChange={vi.fn()}
        placeholder="Pick your dates"
      />,
    )

    const input = screen.getByRole('textbox') as HTMLInputElement

    expect(input.value).toBe('Pick your dates')
  })

  it('should open the calendar popover when clicked', async () => {
    const user = userEvent.setup()

    render(
      <DateRangeFieldComponent
        value={defaultRange}
        onChange={vi.fn()}
        label="Stay"
        disabledDates={[new Date('2025-04-01')]}
        clearLabel="Clear"
      />,
    )

    await user.click(screen.getByRole('textbox'))

    expect(screen.getByTestId('calendar-range')).toBeTruthy()
    expect(calendarRangeMock).toHaveBeenCalled()

    const props = getCalendarProps()
    expect(props.label).toBe('Stay')
    expect(props.disabledDates).toHaveLength(1)
    expect(props.initialRange).toEqual(defaultRange)
  })

  it('should apply the selected range when confirmed', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const nextRange: TInputDateRangeForm = {
      checkIn: new Date('2025-06-10'),
      checkOut: new Date('2025-06-15'),
    }

    render(
      <DateRangeFieldComponent
        value={defaultRange}
        onChange={handleChange}
        confirmLabel="Apply"
        clearLabel="Clear"
      />,
    )

    await user.click(screen.getByRole('textbox'))

    await act(async () => {
      getCalendarProps().onRangeChange(nextRange)
    })

    await waitFor(() => {
      const applyButton = screen.getByRole('button', {
        name: 'Apply',
      }) as HTMLButtonElement

      expect(applyButton.disabled).toBe(false)
    })

    await user.click(screen.getByRole('button', { name: 'Apply' }))

    expect(handleChange).toHaveBeenCalledWith(nextRange)
  })

  it('should clear the range when the clear button is pressed', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const filledRange: TInputDateRangeForm = {
      checkIn: new Date('2025-07-01'),
      checkOut: new Date('2025-07-05'),
    }

    render(
      <DateRangeFieldComponent
        value={filledRange}
        onChange={handleChange}
        clearLabel="Clear"
      />,
    )

    await user.click(screen.getByRole('textbox'))

    await user.click(screen.getByRole('button', { name: 'Clear' }))

    expect(handleChange).toHaveBeenCalledWith({ checkIn: null, checkOut: null })
  })
})
