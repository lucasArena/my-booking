import type { TBookingRange } from '@/domain/entities/Booking/Booking.types'
import type { TextFieldProps } from '@mui/material'

export type TInputDateRangeForm = TBookingRange

export interface IInputDateRangeFieldComponentProps {
  value: TInputDateRangeForm
  onChange: (value: TInputDateRangeForm) => void
  label?: string
  placeholder?: string
  disabledDates?: Date[]
  helperText?: React.ReactNode
  error?: boolean
  textFieldProps?: TextFieldProps
  clearLabel?: string
  confirmLabel?: string
}
