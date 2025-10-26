import { useCallback, useEffect, useMemo, useState } from 'react'
import type {
  IInputCalendarRangeComponentProps,
  TInputCalendarRangeForm,
} from '@/presentation/components/Inputs/CalendarRange/InputCalendarRangeComponent.types'
import { format, isBefore, isSameDay, isWithinInterval } from 'date-fns'
import { RangePickersDay } from '@/presentation/components/Inputs/CalendarRange/InputCalendarRangeComponent.styles'
import type { PickersDayProps } from '@mui/x-date-pickers'

const createRangeDaySlot =
  (range: TInputCalendarRangeForm) =>
  (dayProps: PickersDayProps): React.ReactElement => {
    const { day, outsideCurrentMonth, ...other } = dayProps
    const { checkIn, checkOut } = range
    const dayAsDate = day as Date
    const isStart = Boolean(checkIn && isSameDay(dayAsDate, checkIn))
    const isEnd = Boolean(checkOut && isSameDay(dayAsDate, checkOut))
    const isBetween =
      !!checkIn &&
      !!checkOut &&
      isWithinInterval(dayAsDate, { start: checkIn, end: checkOut }) &&
      !isStart &&
      !isEnd

    return (
      <RangePickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        disableMargin
        data-cy={`calendar-day-${format(dayAsDate, 'yyyy-MM-dd')}`}
        isBetween={isBetween}
        isStart={isStart}
        isEnd={isEnd}
        selected={isStart || isEnd}
      />
    )
  }

export const useInputCalendarRangeComponent = ({
  initialRange,
  disabledDates,
  onRangeChange,
}: IInputCalendarRangeComponentProps) => {
  const [range, setRange] = useState<TInputCalendarRangeForm>(
    initialRange ?? { checkIn: null, checkOut: null },
  )

  const initialStartTime = initialRange?.checkIn?.getTime() ?? null
  const initialEndTime = initialRange?.checkOut?.getTime() ?? null
  const pickerValue = range.checkOut ?? range.checkIn

  const handleDateChange = useCallback(
    (date: Date | null) => {
      setRange(previous => {
        let next: TInputCalendarRangeForm

        if (!date) {
          next = { checkIn: null, checkOut: null }
        } else if (!previous.checkIn || previous.checkOut) {
          next = { checkIn: date, checkOut: null }
        } else if (isBefore(date, previous.checkIn)) {
          next = { checkIn: date, checkOut: previous.checkIn }
        } else {
          next = { checkIn: previous.checkIn, checkOut: date }
        }

        onRangeChange?.(next)
        return next
      })
    },
    [onRangeChange],
  )

  const daySlot = useMemo(() => createRangeDaySlot(range), [range])

  const disableDate = useCallback(
    (date: Date) =>
      disabledDates?.some(disabledDate => isSameDay(disabledDate, date)) ||
      (!!range.checkIn && !range.checkOut && isBefore(date, range.checkIn)),
    [disabledDates, range.checkIn, range.checkOut],
  )

  useEffect(() => {
    if (!initialRange) {
      setRange({ checkIn: null, checkOut: null })
      return
    }

    setRange(previous => {
      const nextCheckIn = initialRange.checkIn ?? null
      const nextCheckOut = initialRange.checkOut ?? null
      const prevStartTime = previous.checkIn?.getTime() ?? null
      const prevEndTime = previous.checkOut?.getTime() ?? null
      const nextStartTime = nextCheckIn?.getTime() ?? null
      const nextEndTime = nextCheckOut?.getTime() ?? null

      if (prevStartTime === nextStartTime && prevEndTime === nextEndTime) {
        return previous
      }

      return { checkIn: nextCheckIn, checkOut: nextCheckOut }
    })
  }, [initialRange, initialStartTime, initialEndTime])

  return {
    pickerValue,
    handleDateChange,
    daySlot,
    disableDate,
  }
}
