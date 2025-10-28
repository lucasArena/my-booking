import React from 'react'
import {
  Alert,
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'
import type { IBookingManageDrawerProps } from '@/presentation/drawers/Booking/Manage/BookingManageDrawer.types'
import { useBookingManageDrawer } from '@/presentation/drawers/Booking/Manage/BookingManageDrawer.rules'
import { InputCalendarRangeComponent } from '@/presentation/components/Inputs/CalendarRange/InputCalendarRangeComponent'
import { FormatRangeLabelUtil } from '@/application/utils/FormatRangeLabel/FormatRangeLabelUtil'

export const BookingManageDrawer: React.FC<IBookingManageDrawerProps> = ({
  onSuccessCallback: onCallback,
  ...props
}) => {
  const {
    propertyBooking,
    bookingSelected,
    errorMessage,
    selectedRange,
    disabledDates,
    isLoading,
    handleClose,
    handleRangeChange,
    handleConfirm,
  } = useBookingManageDrawer({ onSuccessCallback: onCallback, ...props })

  const isMobile = useMediaQuery('(max-width:768px)')

  const anchor = isMobile ? 'bottom' : 'right'

  const { value, ...drawerProps } = props

  if (!propertyBooking) {
    return
  }

  return (
    <Drawer {...drawerProps} variant="temporary" open={!!value} anchor={anchor}>
      <Stack spacing={3} px={3} py={4} role="presentation">
        <Box>
          <Typography variant="overline" color="text.secondary">
            Update your stay
          </Typography>
          <Typography variant="h5" fontWeight={600} mt={0.5} gutterBottom>
            {propertyBooking.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {propertyBooking.location}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1.5}>
            {propertyBooking.description}
          </Typography>
        </Box>

        <Divider />

        <Stack spacing={2}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <Typography variant="subtitle1" fontWeight={600}>
            Choose new stay dates
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {FormatRangeLabelUtil(selectedRange, 'Select a new stay range')}
          </Typography>
          <InputCalendarRangeComponent
            disabled={isLoading}
            disabledPast
            disabledDates={disabledDates}
            initialRange={{
              checkIn: selectedRange.checkIn,
              checkOut: selectedRange.checkOut,
            }}
            onRangeChange={handleRangeChange}
            label="Select new stay dates"
          />
        </Stack>

        <Divider />

        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            variant="outlined"
            disabled={isLoading}
            onClick={handleClose}>
            Close
          </Button>
          <Button
            fullWidth
            variant="contained"
            disabled={
              isLoading ||
              !bookingSelected?.checkIn ||
              !bookingSelected?.checkOut
            }
            loading={isLoading}
            onClick={handleConfirm}>
            Edit
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  )
}
