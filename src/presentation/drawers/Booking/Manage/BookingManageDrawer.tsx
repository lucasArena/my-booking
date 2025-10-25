import React from 'react'
import { Box, Button, Divider, Drawer, Stack, Typography } from '@mui/material'
import type { IBookingManageDrawerProps } from '@/presentation/drawers/Booking/Manage/BookingManageDrawer.types'
import { useBookingManageDrawer } from '@/presentation/drawers/Booking/Manage/BookingManageDrawer.rules'
import { InputCalendarRangeComponent } from '@/presentation/components/Inputs/CalendarRange/InputCalendarRangeComponent'
import { FormatRangeLabelUtil } from '@/application/utils/FormatRangeLabel/FormatRangeLabelUtil'

export const BookingManageDrawer: React.FC<IBookingManageDrawerProps> = ({
  onCallback,
  ...props
}) => {
  const { selectedRange, handleClose, handleRangeChange, handleConfirm } =
    useBookingManageDrawer({ onCallback, ...props })

  const { value, ...drawerProps } = props

  if (!value) {
    return <Drawer {...drawerProps} open={false} />
  }

  const { property } = value

  return (
    <Drawer {...drawerProps} open={!!value}>
      <Stack spacing={3} px={3} py={4} role="presentation">
        <Box>
          <Typography variant="overline" color="text.secondary">
            Update your stay
          </Typography>
          <Typography variant="h5" fontWeight={600} mt={0.5} gutterBottom>
            {property.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.location}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1.5}>
            {property.description}
          </Typography>
        </Box>

        <Divider />

        <Stack spacing={2}>
          <Typography variant="subtitle1" fontWeight={600}>
            Choose new stay dates
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {FormatRangeLabelUtil(selectedRange, 'Select a new stay range')}
          </Typography>
          <InputCalendarRangeComponent
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
          <Button fullWidth variant="outlined" onClick={handleClose}>
            Close
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleConfirm}
            disabled={!value.booking.checkIn || !value.booking.checkOut}>
            Edit
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  )
}
