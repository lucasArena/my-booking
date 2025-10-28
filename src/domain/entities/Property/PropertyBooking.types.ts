import type { IBooking } from '@/domain/entities/Booking/Booking.types'

export interface IPropertyBooking {
  id: number
  img: string
  name: string
  location: string
  description: string
  price: string
  bookings: IBooking[]
}
