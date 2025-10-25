import type React from 'react'

import {
  Box,
  Button,
  Icon,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { PropertyCardComponent } from '@/presentation/components/Data/Property/Card/PropertyCardComponent'
import { BookingManageDrawer } from '@/presentation/drawers/Booking/Manage/BookingManageDrawer'
import { useMyBookingsScreen } from '@/presentation/screens/MyBookings/MyBookingsScreen.rules'
import { NoDataStateComponent } from '@/presentation/components/Feedback/NoData/NoDataStateComponent'

export const MyBookingScreen: React.FC = () => {
  const {
    bookings,
    handleClickCancelBooking,
    handleCloseDrawer,
    handleLoadData,
    handleNavigateToBooking,
    handleSelectBooking,
    isEmpty,
    selectedBooking,
  } = useMyBookingsScreen()

  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <Box display="flex" flexDirection="column" gap={2} padding={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Bookings
      </Typography>

      {isEmpty && (
        <NoDataStateComponent
          message="No bookings to show."
          cta={
            <Button variant="contained" onClick={handleNavigateToBooking}>
              Make a book
            </Button>
          }
        />
      )}

      {bookings.map(({ ...property }) => (
        <Box key={property.id}>
          <PropertyCardComponent
            {...property}
            actions={
              <Stack spacing={1.5} width="100%">
                <Typography variant="subtitle2" color="text.secondary">
                  Upcoming stays
                </Typography>

                <Stack spacing={1.5}>
                  {property.bookings.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No bookings yet
                    </Typography>
                  ) : (
                    property.bookings.map((booking, index) => {
                      const hasDates = booking.checkIn && booking.checkOut
                      const rangeLabel = hasDates
                        ? `${booking.checkIn.toLocaleDateString()} – ${booking.checkOut.toLocaleDateString()}`
                        : 'Booking dates pending'

                      return (
                        <Paper
                          key={index}
                          variant="outlined"
                          sx={{
                            borderRadius: 2,
                            p: 2,
                            cursor: hasDates ? 'pointer' : 'default',
                            transition: theme =>
                              theme.transitions.create(
                                ['box-shadow', 'border-color'],
                                {
                                  duration: theme.transitions.duration.shortest,
                                },
                              ),
                            '&:hover': {
                              borderColor: hasDates
                                ? 'primary.main'
                                : undefined,
                              boxShadow: hasDates ? 3 : undefined,
                            },
                          }}>
                          <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={1.5}
                            alignItems={{ xs: 'flex-start', sm: 'center' }}
                            justifyContent="space-between">
                            <Stack spacing={0.5}>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                textTransform="uppercase"
                                fontWeight={600}>
                                Stay period
                              </Typography>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {rangeLabel}
                              </Typography>
                            </Stack>

                            <Stack
                              direction={{ xs: 'column', sm: 'row' }}
                              spacing={1.5}>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                disabled={!hasDates}
                                onClick={event => {
                                  event.stopPropagation()

                                  handleClickCancelBooking(
                                    property.id,
                                    booking.id,
                                  )
                                }}>
                                Cancel booking
                              </Button>

                              <Button
                                size="small"
                                variant="outlined"
                                endIcon={
                                  <Icon fontSize="small">arrow_forward</Icon>
                                }
                                disabled={!hasDates}
                                onClick={event => {
                                  event.stopPropagation()

                                  handleSelectBooking(property.id, booking.id)
                                }}>
                                Change booking
                              </Button>
                            </Stack>
                          </Stack>
                        </Paper>
                      )
                    })
                  )}
                </Stack>
              </Stack>
            }
          />
        </Box>
      ))}

      <BookingManageDrawer
        anchor={isMobile ? 'bottom' : 'right'}
        value={selectedBooking}
        onClose={handleCloseDrawer}
        onCancel={handleCloseDrawer}
        onCallback={handleLoadData}
      />
    </Box>
  )
}
