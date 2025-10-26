import type React from 'react'
import { Route, Routes } from 'react-router'
import { BookingScreen } from '@/presentation/screens/Booking/Search/BookingSearch'
import { MyBookingScreen } from '@/presentation/screens/MyBookings/MyBookingsScreen'
import { NotFoundPage } from '@/presentation/screens/NotFound/NotFoundScreen'

export const RoutesConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<BookingScreen />} />
      <Route path="/my-bookings" element={<MyBookingScreen />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
