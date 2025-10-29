import type { DrawerProps } from '@mui/material'
import type { IProperty } from '@/domain/entities/Property/Property.types'
import type { TBookingRange } from '@/domain/entities/Booking/Booking.types'

export interface IBookingConfirmationCreateDrawerProps
  extends Omit<DrawerProps, 'property' | 'onClose'> {
  property: IProperty | null
  selectedRange: TBookingRange | null
  disabledDates?: Date[]
  onClose?: VoidFunction
  onCancel?: VoidFunction
  onSuccess?: VoidFunction
  onRangeChange?: (range: TBookingRange) => void
}
