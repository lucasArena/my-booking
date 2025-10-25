import { useMakeBooking } from '@/presentation/hooks/UseBooking/UseMakeBooking'
import type { IBookingConfirmationDrawerProps } from '@/presentation/drawers/Booking/Confirmation/BookingConfirmationDrawer.types'
import { format } from 'date-fns'
import { useEffect } from 'react'

const DATE_FORMAT = 'dd MMM yyyy'

export const useBookingConfirmationDrawer = (
  props: IBookingConfirmationDrawerProps,
) => {
  const { isSuccess, handleFetch } = useMakeBooking()
  const hasRange = Boolean(
    props.selectedRange?.checkIn && props.selectedRange?.checkOut,
  )

  const stayLabel =
    hasRange && props.selectedRange
      ? `${format(props.selectedRange.checkIn, DATE_FORMAT)} – ${format(props.selectedRange.checkOut, DATE_FORMAT)}`
      : 'Select your stay range'

  const handleConfirm = () => {
    if (
      !props.property?.id ||
      !props.selectedRange?.checkIn ||
      !props.selectedRange?.checkOut
    ) {
      return
    }

    handleFetch({
      propertyId: props.property.id,
      checkIn: props.selectedRange.checkIn,
      checkOut: props.selectedRange.checkOut,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      props.onClose?.()
      props.onSuccess?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return { stayLabel, handleConfirm }
}
