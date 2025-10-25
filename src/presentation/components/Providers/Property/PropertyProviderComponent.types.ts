import type { IProperty } from '@/domain/entities/Property/Property.types'

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
  properties: IProperty[]
  updateBooking: (params: IUpdateBookingParams) => void
  cancelBooking: (params: ICancelBookingParams) => void
  getPropertyAvailableByDates: (
    params: IGetPropertyAvailableByDatesParams,
  ) => IProperty[]
  getMyBookedProperties: (_: void) => IProperty[]
  makeBooking: (params: IMakeBookingParams) => void
}
