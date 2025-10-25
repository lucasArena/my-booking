export interface IBooking {
  id: number
  checkIn: Date
  checkOut: Date
}

export type TBookingRange = {
  checkIn: Date | null
  checkOut: Date | null
}
