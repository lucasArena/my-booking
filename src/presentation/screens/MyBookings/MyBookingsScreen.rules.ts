import { useCallback, useEffect, useState } from 'react'

import type { IPropertyBookingSelection } from '@/presentation/screens/MyBookings/MyBookingsScreen.types'

import { useNavigate } from 'react-router-dom'
import type { IPropertyBooking } from '@/domain/entities/Property/PropertyBooking.types'
import { usePropertyContext } from '@/presentation/hooks/UseContext/UsePropertyContext'

export const useMyBookingsScreen = () => {
  const [selectedBooking, setSelectedBooking] =
    useState<IPropertyBookingSelection | null>(null)

  const [bookingToCancel, setBookingToCancel] = useState<number | null>(null)

  const navigate = useNavigate()

  const { myBookings, isLoading, error, handleGetMyBookedProperties } =
    usePropertyContext()

  const safeData = myBookings ?? []

  const handleNavigateToBooking = () => {
    navigate('/')
  }

  const handleSelectBooking = (
    bookingIdSelected: number,
    propertyBookingSelected: IPropertyBooking,
  ) => {
    setSelectedBooking({
      propertyBooking: propertyBookingSelected,
      bookingId: bookingIdSelected,
    })
  }

  const handleCloseCancelDialog = useCallback(() => {
    setBookingToCancel(null)
  }, [])

  const handleCloseManageDrawer = () => {
    setSelectedBooking(null)
  }

  const handleClickCancelBooking = (bookingId: number) => {
    setBookingToCancel(bookingId)
  }

  const handleLoadData = () => {
    handleGetMyBookedProperties()
  }

  useEffect(() => {
    handleLoadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    bookings: safeData,
    isLoading,
    error,
    bookingToCancel,
    handleClickCancelBooking,
    handleCloseManageDrawer,
    handleCloseCancelDialog,
    handleLoadData,
    handleNavigateToBooking,
    handleSelectBooking,
    selectedBooking,
  }
}
