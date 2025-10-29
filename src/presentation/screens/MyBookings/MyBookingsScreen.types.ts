import type { IPropertyBooking } from '@/domain/entities/Property/PropertyBooking.types'

export interface IPropertyBookingSelection {
  propertyBooking: IPropertyBooking
  bookingId: number
}
