import type { IPropertyBooking } from '@/domain/entities/Property/PropertyBooking.types'

export interface IGetPropertyAvailableByDatesParams {
  checkIn: Date
  checkOut: Date
}

export interface IMakeBookingParams {
  propertyId: number
  checkIn: Date
  checkOut: Date
}

export interface ICancelBookingParams {
  propertyId: number
  bookingId: number
}

export interface IUpdateBookingParams {
  propertyId: number
  bookingId: number
  checkIn: Date
  checkOut: Date
}

export interface IPropertyContext {
  isLoading: boolean
  myBookings: IPropertyBooking[]
  error: string
  handleGetMyBookedProperties: VoidFunction
}
