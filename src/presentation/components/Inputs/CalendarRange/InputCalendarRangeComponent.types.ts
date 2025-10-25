import type { TBookingRange } from '@/domain/entities/Booking/Booking.types'

export type TInputCalendarRangeForm = TBookingRange

export interface IRangeDaysProps {
  isBetween: boolean
  isStart: boolean
  isEnd: boolean
}

export interface IInputCalendarRangeComponentProps {
  initialRange?: TBookingRange
  disabledDates?: Date[]
  onRangeChange?: (range: TBookingRange) => void
  label?: string
}
