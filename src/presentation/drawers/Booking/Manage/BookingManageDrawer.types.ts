import type { TBookingRange } from '@/domain/entities/Booking/Booking.types'
import type { IPropertyBooking } from '@/presentation/screens/MyBookings/MyBookingsScreen.types'
import type { DrawerProps } from '@mui/material'

export type TBookingManageDrawerForm = TBookingRange

export interface IBookingManageDrawerProps
  extends Omit<DrawerProps, 'property' | 'onClose' | 'open'> {
  value: IPropertyBooking | null
  disabledDates?: Date[]
  onClose?: () => void
  onCancel?: () => void
  onCallback?: () => void
}
