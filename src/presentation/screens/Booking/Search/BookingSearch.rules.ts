import { ParseDateLocalUtil } from '@/application/utils/ParseDateLocalUtil/ParseDateLocalUtil'
import type { TBookingRange } from '@/domain/entities/Booking/Booking.types'
import type { IProperty } from '@/domain/entities/Property/Property.types'
import { usePropertyGetAvailable } from '@/presentation/hooks/UseProperty/UsePropertyGetAvailable'
import { formatDate, isValid } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useBookingSearch = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { data, error, isLoading, handleFetch, handleResetState } =
    usePropertyGetAvailable()

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
    if (error) {
      return error
    }

    if (!selectedRange.checkIn || !selectedRange.checkOut) {
      return ''
    }

    const isCheckinGreaterThanCheckout =
      selectedRange.checkIn > selectedRange.checkOut

    if (isCheckinGreaterThanCheckout) {
      return 'Check-in date must be before check-out date.'
    }

    return ''
  }

  const errorMessage = handleError()

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

  const handleBootstrap = () => {
    if (!selectedRange.checkIn || !selectedRange.checkOut) {
      return
    }

    handleFetch({
      checkIn: formatDate(selectedRange.checkIn, 'yyyy-MM-dd'),
      checkOut: formatDate(selectedRange.checkOut, 'yyyy-MM-dd'),
    })
  }

  useEffect(() => {
    handleBootstrap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRange])

  return {
    data: safeData,
    errorMessage,
    isLoading,
    handleCloseBookingDrawer,
    handleConfirmBooking,
    handleFetch,
    handleBootstrap,
    handleOpenBookingDrawer,
    handleRangeChange,
    selectedProperty,
    selectedRange,
  }
}
