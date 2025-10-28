export interface IBooking {
  id: number
  propertyId: number
  checkIn: string
  checkOut: string
}

export type TBookingRange = {
  checkIn: Date | null
  checkOut: Date | null
}
