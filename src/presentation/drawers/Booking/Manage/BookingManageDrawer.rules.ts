import { useCallback, useEffect, useState } from 'react'

import type {
  TBookingManageDrawerForm,
  IBookingManageDrawerProps,
} from '@/presentation/drawers/Booking/Manage/BookingManageDrawer.types'
import { useUpdateBooking } from '@/presentation/hooks/UseBooking/UseUpdateBooking'
import type { TBookingRange } from '@/domain/entities/Booking/Booking.types'

export const useBookingManageDrawer = (props: IBookingManageDrawerProps) => {
  const { handleFetch, isSuccess } = useUpdateBooking()

  const booking = props.value?.booking

  const [selectedRange, setSelectedRange] = useState<TBookingManageDrawerForm>({
    checkIn: null,
    checkOut: null,
  })

  const handleRangeChange = useCallback((range: TBookingRange) => {
    setSelectedRange(prevState => ({
      ...prevState,
      ...range,
    }))
  }, [])

  const handleConfirm = useCallback(() => {
    if (!props.value || !selectedRange.checkIn || !selectedRange.checkOut) {
      return
    }

    const propertyId = props.value.property.id
    const bookingId = props.value.booking.id

    const { checkIn, checkOut } = selectedRange

    handleFetch({ propertyId, bookingId, checkIn, checkOut })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking, selectedRange])

  const handleClose = () => {
    setSelectedRange({ checkIn: null, checkOut: null })
    props.onClose?.()
  }

  useEffect(() => {
    if (props.value) {
      setSelectedRange({
        checkIn: props.value.booking.checkIn,
        checkOut: props.value.booking.checkOut,
      })
    }
  }, [props.value])

  useEffect(() => {
    if (isSuccess) {
      handleClose()
      props.onCallback?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return {
    selectedRange,
    handleClose,
    handleRangeChange,
    handleConfirm,
  }
}
