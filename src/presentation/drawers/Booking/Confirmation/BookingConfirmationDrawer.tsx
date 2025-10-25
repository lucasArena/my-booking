import React from 'react'
import { Box, Button, Divider, Drawer, Stack, Typography } from '@mui/material'
import { Puller } from '@/presentation/drawers/Booking/Confirmation/BookingConfirmationDrawer.styles'
import type { IBookingConfirmationDrawerProps } from '@/presentation/drawers/Booking/Confirmation/BookingConfirmationDrawer.types'
import { useBookingConfirmationDrawer } from '@/presentation/drawers/Booking/Confirmation/BookingConfirmationDrawer.rules'

export const BookingDrawer: React.FC<
  IBookingConfirmationDrawerProps
> = props => {
  const { stayLabel, handleConfirm } = useBookingConfirmationDrawer(props)

  const { property, onCancel, ...drawerProps } = props

  if (!property) {
    return <Drawer {...drawerProps} />
  }

  return (
    <Drawer {...drawerProps} open={!!property}>
      <Puller />

      <Stack spacing={3} px={3} py={4}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Confirm your stay
          </Typography>
          <Typography variant="h5" fontWeight={600} mt={0.5} gutterBottom>
            {property.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1.5}>
            {property.description}
          </Typography>
        </Box>

        <Divider />

        <Stack spacing={2}>
          <Typography variant="subtitle1" fontWeight={600}>
            Stay dates
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {stayLabel}
          </Typography>
        </Stack>

        <Divider />

        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            onClick={onCancel}>
            Cancel
          </Button>

          <Button fullWidth variant="contained" onClick={() => handleConfirm()}>
            Confirm
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  )
}
