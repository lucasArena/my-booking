import type { IBooking } from '@/domain/entities/Booking/Booking.types'

export namespace BookingCancelServiceNamespace {
  export type TRequest = Pick<IBooking, 'id'>

  export type TResponse = void
}
