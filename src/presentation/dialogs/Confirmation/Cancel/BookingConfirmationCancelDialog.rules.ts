import { useEffect } from 'react'
import { useBookingCancel } from '@/presentation/hooks/UseBooking/UseBookingCancel'
import type { IBookingConfirmationCancelDialogProps } from '@/presentation/dialogs/Confirmation/Cancel/BookingConfirmationCancelDialog.types'

export const useBookingConfirmationCancelDialog = (
  props: IBookingConfirmationCancelDialogProps,
) => {
  const { isSuccess, isLoading, handleFetch } = useBookingCancel()

  const handleConfirm = () => {
    handleFetch({
      id: props.bookingId!,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      props.onClose?.()
      props.onSuccessCallback?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return { isLoading, handleConfirm }
}
