import { ParseDateLocalUtil } from '@/application/utils/ParseDateLocalUtil'
import type { TBookingRange } from '@/domain/entities/Booking/Booking.types'
import type { IProperty } from '@/domain/entities/Property/Property.types'
import { useGetAvailableBooking } from '@/presentation/hooks/UseProperty/UseGetAvailableProperties'
import { isValid } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useBookingSearch = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { data, handleFetch, handleResetState } = useGetAvailableBooking()

  const selectedRange = useMemo(
    () => ({
      checkIn: ParseDateLocalUtil(
        new URLSearchParams(location.search).get('checkin'),
      ),
      checkOut: ParseDateLocalUtil(
        new URLSearchParams(location.search).get('checkout'),
      ),
    }),
    [location.search],
  )

  const safeData = data ?? []

  const handleError = () => {
    if (!selectedRange.checkIn || !selectedRange.checkOut) {
      return null
    }

    const isCheckinGreaterThanCheckout =
      selectedRange.checkIn > selectedRange.checkOut

    if (isCheckinGreaterThanCheckout) {
      return 'Check-in date must be before check-out date.'
    }
  }

  const errorMessage = handleError()

  const isEmpty = !errorMessage && safeData.length === 0

  const emptyMessage =
    isEmpty && !selectedRange.checkIn && !selectedRange.checkOut
      ? 'Select check-in and check-out dates to see available properties.'
      : 'No available properties for the selected dates.'

  const [selectedProperty, setSelectedProperty] = useState<IProperty | null>(
    null,
  )

  const handleOpenBookingDrawer = (propertySelected: IProperty) => {
    setSelectedProperty(propertySelected)
  }

  const handleCloseBookingDrawer = () => {
    setSelectedProperty(null)
  }

  const handleConfirmBooking = () => {
    navigate('/my-bookings')
  }

  const handleRangeChange = (range: TBookingRange) => {
    const checkin =
      range.checkIn && isValid(range.checkIn)
        ? range.checkIn.toISOString().split('T')[0]
        : ''
    const checkout =
      range.checkOut && isValid(range.checkOut)
        ? range.checkOut.toISOString().split('T')[0]
        : ''

    if (!checkin || !checkout) {
      handleResetState()
    }

    navigate(`?checkin=${checkin}&checkout=${checkout}`)
  }

  useEffect(() => {
    if (!errorMessage && selectedRange.checkIn && selectedRange.checkOut) {
      handleFetch({
        checkIn: selectedRange.checkIn,
        checkOut: selectedRange.checkOut,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRange])

  return {
    data: safeData,
    emptyMessage,
    errorMessage,
    handleCloseBookingDrawer,
    handleConfirmBooking,
    handleFetch,
    handleOpenBookingDrawer,
    handleRangeChange,
    isEmpty,
    selectedProperty,
    selectedRange,
  }
}
