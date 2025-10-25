import { useCallback, useEffect, useMemo, useState } from 'react'

import type {
  IPropertyBooking,
  TBookingRange,
} from '@/presentation/screens/MyBookings/MyBookingsScreen.types'
import { useGetMyBookings } from '@/presentation/hooks/UseBooking/UseGetMyBookings'
import { useCancelBooking } from '@/presentation/hooks/UseBooking/UseCancelBooking'
import { useNavigate } from 'react-router-dom'

const EMPTY_RANGE: TBookingRange = { checkIn: null, checkOut: null }

const ensureRange = (range?: TBookingRange): TBookingRange =>
  range
    ? {
        checkIn: range.checkIn ?? null,
        checkOut: range.checkOut ?? null,
      }
    : { ...EMPTY_RANGE }

export const useMyBookingsScreen = () => {
  const [selectedBooking, setSelectedBooking] =
    useState<IPropertyBooking | null>(null)

  const navigate = useNavigate()

  const { data, handleFetch } = useGetMyBookings()

  const { handleFetch: handleCancelFetch, isSuccess: isSuccessCancel } =
    useCancelBooking()

  const safeData = useMemo(() => data ?? [], [data])

  const isEmpty = safeData.length === 0

  const handleNavigateToBooking = () => {
    navigate('/booking-search')
  }

  const handleSelectBooking = useCallback(
    (propertyId: number, bookingId: number) => {
      const selectedProperty = safeData.find(item => item.id === propertyId)

      if (!selectedProperty) {
        return
      }

      const { bookings, ...property } = selectedProperty

      setSelectedBooking({
        property,
        booking: bookings.find(item => item.id === bookingId)!,
      })
    },
    [safeData],
  )

  const handleCloseDrawer = useCallback(() => {
    setSelectedBooking(null)
  }, [])

  const handleRangeChange = useCallback((range: TBookingRange) => {
    const normalizedRange = ensureRange(range)

    setSelectedBooking(previous =>
      previous ? { ...previous, range: normalizedRange } : previous,
    )
  }, [])

  const handleClickCancelBooking = (propertyId: number, bookingId: number) => {
    handleCancelFetch({ propertyId, bookingId })
  }

  const handleLoadData = () => {
    handleFetch()
  }

  useEffect(() => {
    if (isSuccessCancel) {
      handleLoadData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessCancel])

  useEffect(() => {
    handleLoadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    bookings: safeData,
    handleClickCancelBooking,
    handleCloseDrawer,
    handleLoadData,
    handleNavigateToBooking,
    handleRangeChange,
    handleSelectBooking,
    isEmpty,
    selectedBooking,
  }
}
