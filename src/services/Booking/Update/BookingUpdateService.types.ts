import type { IBooking } from '@/domain/entities/Booking/Booking.types'
import type { IPropertyBooking } from '@/domain/entities/Property/PropertyBooking.types'

export namespace BookingUpdateServiceNamespace {
  export type TRequest = IBooking

  export type TResponse = IPropertyBooking[]
}
