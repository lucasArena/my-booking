import { useBookingCreate } from '@/presentation/hooks/UseBooking/UseBookingCreate'
import type { IBookingConfirmationCreateDrawerProps } from '@/presentation/drawers/Booking/Confirmation/Create/BookingConfirmationCreateDrawer.types'
import { format } from 'date-fns'
import { useEffect } from 'react'

const DATE_FORMAT = 'dd MMM yyyy'

export const useBookingConfirmationCreateDrawer = (
  props: IBookingConfirmationCreateDrawerProps,
) => {
  const { isSuccess, isLoading, handleFetch } = useBookingCreate()
  const hasRange = Boolean(
    props.selectedRange?.checkIn && props.selectedRange?.checkOut,
  )

  const stayLabel =
    hasRange && props.selectedRange
      ? `${format(props.selectedRange.checkIn!, DATE_FORMAT)} – ${format(props.selectedRange.checkIn!, DATE_FORMAT)}`
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
      checkIn: format(props.selectedRange.checkIn, 'yyyy-MM-dd'),
      checkOut: format(props.selectedRange.checkOut, 'yyyy-MM-dd'),
    })
  }

  useEffect(() => {
    if (isSuccess) {
      props.onClose?.()
      props.onSuccess?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return { stayLabel, isLoading, handleConfirm }
}
