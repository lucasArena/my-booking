import { useCallback, useEffect, useState } from 'react'

import type {
  TBookingManageDrawerForm,
  IBookingManageDrawerProps,
} from '@/presentation/drawers/Booking/Manage/BookingManageDrawer.types'
import { useBookingUpdate } from '@/presentation/hooks/UseBooking/UseBookingUpdate'
import type { TBookingRange } from '@/domain/entities/Booking/Booking.types'
import { formatDate, parseISO } from 'date-fns'

export const useBookingManageDrawer = (props: IBookingManageDrawerProps) => {
  const { handleFetch, isSuccess, isLoading } = useBookingUpdate()

  const [selectedRange, setSelectedRange] = useState<TBookingManageDrawerForm>({
    checkIn: null,
    checkOut: null,
  })

  const propertyBooking = props.value?.propertyBooking || null
  const bookings = propertyBooking?.bookings || []

  const bookingSelected = bookings.find(
    booking => booking.id === props.value?.bookingId,
  )

  const handleError = () => {
    const isOverlapping = bookings
      .filter(propertyBooking => propertyBooking.id !== bookingSelected?.id)
      .some(propertyBooking => {
        if (!selectedRange.checkIn || !selectedRange.checkOut) {
          return false
        }

        return (
          selectedRange.checkIn < parseISO(propertyBooking.checkOut) &&
          selectedRange.checkOut > parseISO(propertyBooking.checkIn)
        )
      })

    if (isOverlapping) {
      return 'The selected date range overlaps with an existing booking.'
    }

    return null
  }

  const errorMessage = handleError()

  const disabledDates = bookings
    .filter(
      propertyBooking =>
        bookingSelected && propertyBooking.id !== bookingSelected.id,
    )
    .flatMap(propertyBooking => {
      const dates: Date[] = []
      const currentDate = parseISO(propertyBooking.checkIn)

      while (currentDate <= parseISO(propertyBooking.checkOut)) {
        dates.push(new Date(currentDate))
        currentDate.setDate(currentDate.getDate() + 1)
      }

      return dates
    })

  const handleRangeChange = useCallback((range: TBookingRange) => {
    setSelectedRange(prevState => ({
      ...prevState,
      ...range,
    }))
  }, [])

  const handleConfirm = useCallback(() => {
    if (
      !props.value ||
      !selectedRange.checkIn ||
      !selectedRange.checkOut ||
      errorMessage
    ) {
      return
    }

    const { checkIn, checkOut } = selectedRange

    handleFetch({
      propertyId: propertyBooking?.id || 0,
      id: props.value.bookingId,
      checkIn: formatDate(checkIn, 'yyyy-MM-dd'),
      checkOut: formatDate(checkOut, 'yyyy-MM-dd'),
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingSelected, selectedRange])

  const handleClose = () => {
    setSelectedRange({ checkIn: null, checkOut: null })
    props.onClose?.()
  }

  useEffect(() => {
    if (props.value) {
      setSelectedRange({
        checkIn: bookingSelected ? parseISO(bookingSelected.checkIn) : null,
        checkOut: bookingSelected ? parseISO(bookingSelected.checkOut) : null,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingSelected])

  useEffect(() => {
    if (isSuccess) {
      handleClose()
      props.onSuccessCallback?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return {
    isLoading,
    propertyBooking,
    bookingSelected,
    errorMessage,
    disabledDates,
    selectedRange,
    handleClose,
    handleRangeChange,
    handleConfirm,
  }
}
