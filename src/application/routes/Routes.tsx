import type React from 'react'
import { Route, Routes } from 'react-router'
import { HomeScreen } from '@/presentation/screens/Home/Home'
import { BookingScreen } from '@/presentation/screens/Booking/Search/BookingSearch'
import { MyBookingScreen } from '@/presentation/screens/MyBookings/MyBookingsScreen'

export const RoutesConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/booking-search" element={<BookingScreen />} />
      <Route path="/my-bookings" element={<MyBookingScreen />} />
    </Routes>
  )
}
