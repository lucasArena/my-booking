import type { IBooking } from '@/domain/entities/Booking/Booking.types'

export namespace BookingCreateServiceNamespace {
  export interface IRequest extends Pick<IBooking, 'checkIn' | 'checkOut'> {
    propertyId: number
  }

  export type TResponse = void
}
