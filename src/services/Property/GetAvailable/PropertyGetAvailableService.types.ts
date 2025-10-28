import type { IBooking } from '@/domain/entities/Booking/Booking.types'
import type { IProperty } from '@/domain/entities/Property/Property.types'

export namespace PropertyGetAvailableServiceNamespace {
  export type TRequest = Pick<IBooking, 'checkIn' | 'checkOut'>

  export type TResponse = IProperty[]
}
