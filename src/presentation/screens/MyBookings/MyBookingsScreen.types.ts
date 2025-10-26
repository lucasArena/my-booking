import type { IBooking } from '@/domain/entities/Booking/Booking.types'
import type { IProperty } from '@/domain/entities/Property/Property.types'

export interface IPropertyBooking {
  property: IProperty
  booking: IBooking
}

export type TBookingRange = {
  checkIn: Date | null
  checkOut: Date | null
}
