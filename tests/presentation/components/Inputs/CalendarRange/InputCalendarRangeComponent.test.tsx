import { act, render, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

import { InputCalendarRangeComponent } from '@/presentation/components/Inputs/CalendarRange/InputCalendarRangeComponent'

type MockedStaticDatePickerProps = {
  onChange: (value: Date | null) => void
  shouldDisableDate: (date: Date) => boolean
  localeText: { toolbarTitle: string }
  displayStaticWrapperAs: string
  disablePast?: boolean
  slotProps: { actionBar: { actions: unknown[] } }
  value: Date | null
}

let latestProps: MockedStaticDatePickerProps | undefined

const staticDatePickerMock = vi.fn((props: MockedStaticDatePickerProps) => {
  latestProps = props
  return <div data-testid="static-date-picker" />
})

vi.mock('@mui/x-date-pickers/StaticDatePicker', () => ({
  StaticDatePicker: (props: MockedStaticDatePickerProps) =>
    staticDatePickerMock(props),
}))

const getLatestProps = () => {
  if (!latestProps) {
    throw new Error('StaticDatePicker props were not captured')
  }

  return latestProps
}

describe('InputCalendarRangeComponent', () => {
  beforeEach(() => {
    staticDatePickerMock.mockClear()
    latestProps = undefined
  })

  it('should render the static date picker with default configuration', () => {
    render(<InputCalendarRangeComponent onRangeChange={vi.fn()} />)

    const props = getLatestProps()

    expect(staticDatePickerMock).toHaveBeenCalled()
    expect(props.displayStaticWrapperAs).toBe('desktop')
    expect(props.disablePast).toBeUndefined()
    expect(props.slotProps).toEqual({ actionBar: { actions: [] } })
    expect(props.localeText.toolbarTitle).toBe('Select date range')
  })

  it('should update the range and notify when dates are selected', async () => {
    const onRangeChange = vi.fn()
    render(<InputCalendarRangeComponent onRangeChange={onRangeChange} />)

    const firstDate = new Date('2025-01-10')
    await act(async () => {
      getLatestProps().onChange(firstDate)
    })

    expect(onRangeChange).toHaveBeenCalledWith({
      checkIn: firstDate,
      checkOut: null,
    })

    await waitFor(() => expect(getLatestProps().value).toEqual(firstDate))

    const secondDate = new Date('2025-01-15')
    await act(async () => {
      getLatestProps().onChange(secondDate)
    })

    expect(onRangeChange).toHaveBeenLastCalledWith({
      checkIn: firstDate,
      checkOut: secondDate,
    })

    await waitFor(() => expect(getLatestProps().value).toEqual(secondDate))
  })

  it('should disable provided dates and prevent dates before the selected check-in', async () => {
    const disabledDate = new Date('2025-02-01')
    const checkInDate = new Date('2025-03-10')

    render(
      <InputCalendarRangeComponent
        disabledDates={[disabledDate]}
        onRangeChange={vi.fn()}
        label="Stay dates"
      />,
    )

    expect(getLatestProps().localeText.toolbarTitle).toBe('Stay dates')
    expect(getLatestProps().shouldDisableDate(disabledDate)).toBe(true)
    expect(getLatestProps().shouldDisableDate(new Date('2025-02-02'))).toBe(
      false,
    )

    await act(async () => {
      getLatestProps().onChange(checkInDate)
    })

    await waitFor(() => expect(getLatestProps().value).toEqual(checkInDate))

    const beforeCheckIn = new Date('2025-03-05')
    const afterCheckIn = new Date('2025-03-12')

    expect(getLatestProps().shouldDisableDate(beforeCheckIn)).toBe(true)
    expect(getLatestProps().shouldDisableDate(afterCheckIn)).toBe(false)
  })
})
