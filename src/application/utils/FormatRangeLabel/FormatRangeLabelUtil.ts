import type { TBookingRange } from '@/domain/entities/Booking/Booking.types'
import { format } from 'date-fns'

const DATE_FORMAT = 'dd MMM yyyy'

export const FormatRangeLabelUtil = (
  range: TBookingRange,
  placeholder: string,
) => {
  if (!range.checkIn && !range.checkOut) {
    return placeholder
  }

  if (range.checkIn && range.checkOut) {
    return `${format(range.checkIn, DATE_FORMAT)} – ${format(range.checkOut, DATE_FORMAT)}`
  }

  if (range.checkIn) {
    return `${format(range.checkIn, DATE_FORMAT)} – …`
  }

  if (range.checkOut) {
    return `… – ${format(range.checkOut, DATE_FORMAT)}`
  }

  return placeholder
}
