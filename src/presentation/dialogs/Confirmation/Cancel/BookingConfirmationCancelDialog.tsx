import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import type { IBookingConfirmationCancelDialogProps } from '@/presentation/dialogs/Confirmation/Cancel/BookingConfirmationCancelDialog.types'
import { useBookingConfirmationCancelDialog } from '@/presentation/dialogs/Confirmation/Cancel/BookingConfirmationCancelDialog.rules'

export const BookingConfirmationCancelDialog: React.FC<
  IBookingConfirmationCancelDialogProps
> = props => {
  const { isLoading, handleConfirm } = useBookingConfirmationCancelDialog(props)

  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="customized-dialog-title"
      open={!!props.bookingId}>
      <DialogTitle
        color="error"
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title">
        Booking cancellation
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom fontWeight={500}>
          Do you really want to cancel this booking?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="text" disabled={isLoading} onClick={props.onClose}>
          Close
        </Button>
        <Button
          loading={isLoading}
          disabled={isLoading}
          onClick={handleConfirm}
          variant="contained"
          color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
