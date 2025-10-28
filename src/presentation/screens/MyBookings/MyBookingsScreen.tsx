import type React from 'react'

import { Box, Button, Icon, Paper, Stack, Typography } from '@mui/material'

import { PropertyCardComponent } from '@/presentation/components/Data/Property/Card/PropertyCardComponent'
import { BookingManageDrawer } from '@/presentation/drawers/Booking/Manage/BookingManageDrawer'
import { useMyBookingsScreen } from '@/presentation/screens/MyBookings/MyBookingsScreen.rules'
import { MessageComponent } from '@/presentation/components/Feedback/Message/MessageComponent'
import { parseISO } from 'date-fns'
import { ListContainerComponent } from '@/presentation/components/Containers/List/ListContainerComponent'
import { PropertyCardSkeletonComponent } from '@/presentation/components/Data/Property/Card/PropertyCardComponent.skeleton'
import { BookingConfirmationCancelDialog } from '@/presentation/dialogs/Confirmation/Cancel/BookingConfirmationCancelDialog'

export const MyBookingScreen: React.FC = () => {
  const {
    bookings,
    handleClickCancelBooking,
    handleCloseCancelDialog,
    handleCloseManageDrawer,
    handleLoadData,
    handleNavigateToBooking,
    handleSelectBooking,
    error,
    bookingToCancel,
    isLoading,
    selectedBooking,
  } = useMyBookingsScreen()

  return (
    <Box display="flex" flexDirection="column" gap={2} padding={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Bookings
      </Typography>

      <ListContainerComponent
        data={bookings}
        renderItem={property => (
          <PropertyCardComponent
            {...property}
            actions={
              <Stack spacing={1.5} width="100%">
                <Typography variant="subtitle2" color="text.secondary">
                  Upcoming stays
                </Typography>

                <Stack spacing={1.5}>
                  {property.bookings.map((booking, index) => {
                    const hasDates = booking.checkIn && booking.checkOut
                    const rangeLabel = hasDates
                      ? `${parseISO(booking.checkIn).toLocaleDateString()} – ${parseISO(booking.checkOut).toLocaleDateString()}`
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
                            borderColor: hasDates ? 'primary.main' : undefined,
                            boxShadow: hasDates ? 3 : undefined,
                          },
                        }}>
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          alignItems={{ xs: 'flex-start', sm: 'center' }}
                          justifyContent="space-between"
                          gap={1.5}>
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
                            width={{ xs: '100%', sm: 'auto' }}
                            direction={{ xs: 'column', sm: 'row' }}
                            alignItems="center"
                            spacing={1.5}>
                            <Button
                              size="small"
                              variant="outlined"
                              fullWidth
                              color="error"
                              disabled={!hasDates}
                              onClick={event => {
                                event.stopPropagation()

                                handleClickCancelBooking(booking.id)
                              }}>
                              Cancel booking
                            </Button>

                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ minWidth: '180px' }}
                              endIcon={
                                <Icon fontSize="small">arrow_forward</Icon>
                              }
                              disabled={!hasDates}
                              fullWidth
                              onClick={event => {
                                event.stopPropagation()

                                handleSelectBooking(booking.id, property)
                              }}>
                              Change booking
                            </Button>
                          </Stack>
                        </Stack>
                      </Paper>
                    )
                  })}
                </Stack>
              </Stack>
            }
          />
        )}
        renderError={() => (
          <MessageComponent
            message={error!}
            cta={
              <Button variant="contained" onClick={handleLoadData}>
                Retry
              </Button>
            }
          />
        )}
        isError={!!error}
        renderLoading={() =>
          Array.from({ length: 3 }).map((_, index) => (
            <PropertyCardSkeletonComponent key={index} />
          ))
        }
        renderEmpty={() => (
          <MessageComponent
            message="You have no bookings yet."
            cta={
              <Button variant="contained" onClick={handleNavigateToBooking}>
                Make a book
              </Button>
            }
          />
        )}
        isLoading={isLoading}
      />

      <BookingConfirmationCancelDialog
        bookingId={bookingToCancel}
        onClose={handleCloseCancelDialog}
        onSuccessCallback={handleLoadData}
      />

      <BookingManageDrawer
        value={selectedBooking}
        onClose={handleCloseManageDrawer}
        onSuccessCallback={handleLoadData}
      />
    </Box>
  )
}
