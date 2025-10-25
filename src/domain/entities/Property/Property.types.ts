import type { IBooking } from '@/domain/entities/Booking/Booking.types'

export interface IProperty {
  id: number
  img: string
  name: string
  location: string
  description: string
  price: string
  bookings: IBooking[]
}
