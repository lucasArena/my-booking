import { Box, Button, Icon, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

import { PropertyCardComponent } from '@/presentation/components/Data/Property/Card/PropertyCardComponent'
import { BookingConfirmationCreateDrawer } from '@/presentation/drawers/Booking/Confirmation/Create/BookingConfirmationCreateDrawer'
import { useBookingSearch } from '@/presentation/screens/Booking/Search/BookingSearch.rules'
import { DateRangeFieldComponent } from '@/presentation/components/Inputs/DateRange/InputDateRangeFieldComponent'
import { MessageComponent } from '@/presentation/components/Feedback/Message/MessageComponent'
import { ListContainerComponent } from '@/presentation/components/Containers/List/ListContainerComponent'
import { PropertyCardSkeletonComponent } from '@/presentation/components/Data/Property/Card/PropertyCardComponent.skeleton'

export const BookingScreen: React.FC = () => {
  const {
    data,
    isLoading,
    errorMessage,
    handleCloseBookingDrawer,
    handleConfirmBooking,
    handleOpenBookingDrawer,
    handleRangeChange,
    handleBootstrap,
    selectedProperty,
    selectedRange,
  } = useBookingSearch()

  return (
    <Box px={{ xs: 2, md: 4 }} py={{ xs: 2, md: 4 }}>
      <Typography variant="h4" gutterBottom>
        Find your perfect stay
      </Typography>

      <Box
        display="grid"
        gap={{ xs: 3, md: 4 }}
        alignItems="start"
        gridTemplateColumns={{ xs: '1fr', md: 'minmax(260px, 320px) 1fr' }}>
        <Paper
          elevation={1}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            position: { md: 'sticky' },
            top: { md: 24 },
          }}>
          <Typography variant="h6" gutterBottom>
            Check in & Check out
          </Typography>

          <Stack spacing={2}>
            <DateRangeFieldComponent
              onChange={handleRangeChange}
              value={{
                checkIn: selectedRange.checkIn,
                checkOut: selectedRange.checkOut,
              }}
            />
          </Stack>
        </Paper>

        <Stack spacing={3}>
          <ListContainerComponent
            isLoading={isLoading}
            isError={!!errorMessage}
            data={data}
            renderLoading={() =>
              Array.from({ length: 3 }).map((_, index) => (
                <PropertyCardSkeletonComponent key={index} />
              ))
            }
            renderEmpty={() => (
              <MessageComponent
                message={
                  !selectedRange.checkIn && !selectedRange.checkOut
                    ? 'Select check-in and check-out dates to see available properties.'
                    : 'No available properties for the selected dates.'
                }
              />
            )}
            renderError={() => (
              <MessageComponent
                Icon={
                  <Icon color="error" sx={{ fontSize: 124 }}>
                    highlight_off
                  </Icon>
                }
                message={errorMessage}
                cta={
                  <Button variant="contained" onClick={() => handleBootstrap()}>
                    Retry
                  </Button>
                }
              />
            )}
            renderItem={item => (
              <PropertyCardComponent
                {...item}
                actions={
                  <Button
                    variant="contained"
                    onClick={() => handleOpenBookingDrawer(item)}>
                    Book Now
                  </Button>
                }
              />
            )}
          />
        </Stack>
      </Box>

      <BookingConfirmationCreateDrawer
        anchor="bottom"
        onClose={handleCloseBookingDrawer}
        onCancel={handleCloseBookingDrawer}
        property={selectedProperty}
        open={!!selectedProperty}
        onSuccess={handleConfirmBooking}
        selectedRange={
          selectedRange.checkIn && selectedRange.checkOut
            ? {
                checkIn: selectedRange.checkIn,
                checkOut: selectedRange.checkOut,
              }
            : null
        }
      />
    </Box>
  )
}
