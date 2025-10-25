import type { TBookingRange } from '@/domain/entities/Booking/Booking.types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useHome = () => {
  const [selectedRange, setSelectedRange] = useState<TBookingRange>({
    checkIn: null,
    checkOut: null,
  })

  const navigate = useNavigate()

  const handleSearchBooking = () => {
    const { checkIn, checkOut } = selectedRange

    const checkin = checkIn ? checkIn.toISOString().split('T')[0] : ''
    const checkout = checkOut ? checkOut.toISOString().split('T')[0] : ''

    navigate(`/booking-search?checkin=${checkin}&checkout=${checkout}`)
  }

  return { selectedRange, handleSearchBooking, setSelectedRange }
}
