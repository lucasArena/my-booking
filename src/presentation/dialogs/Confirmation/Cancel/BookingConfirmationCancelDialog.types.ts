import type { DrawerProps } from '@mui/material'

export interface IBookingConfirmationCancelDialogProps
  extends Omit<DrawerProps, 'onClose'> {
  bookingId: number | null
  onClose?: VoidFunction
  onSuccessCallback?: VoidFunction
}
