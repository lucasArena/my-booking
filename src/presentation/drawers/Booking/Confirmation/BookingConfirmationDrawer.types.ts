import type { DrawerProps } from '@mui/material'
import type { IProperty } from '@/domain/entities/Property/Property.types'
import type { TBookingRange } from '@/presentation/screens/MyBookings/MyBookingsScreen.types'

export interface IBookingConfirmationDrawerProps
  extends Omit<DrawerProps, 'property' | 'onClose'> {
  property: IProperty | null
  selectedRange: IBookingForm | null
  disabledDates?: Date[]
  onClose?: VoidFunction
  onCancel?: VoidFunction
  onSuccess?: VoidFunction
  onRangeChange?: (range: TBookingRange) => void
}

export interface IBookingForm {
  checkIn: Date
  checkOut: Date
}
