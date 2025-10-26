import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

import { PropertyCardComponent } from '@/presentation/components/Data/Property/Card/PropertyCardComponent'
import { BookingDrawer } from '@/presentation/drawers/Booking/Confirmation/BookingConfirmationDrawer'
import { useBookingSearch } from '@/presentation/screens/Booking/Search/BookingSearch.rules'
import { DateRangeFieldComponent } from '@/presentation/components/Inputs/DateRange/InputDateRangeFieldComponent'
import { NoDataStateComponent } from '@/presentation/components/Feedback/NoData/NoDataStateComponent'

export const BookingScreen: React.FC = () => {
  const {
    data,
    handleCloseBookingDrawer,
    handleConfirmBooking,
    handleOpenBookingDrawer,
    handleRangeChange,
    isEmpty,
    emptyMessage,
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

        {isEmpty && <NoDataStateComponent message={emptyMessage} />}

        <Stack spacing={3}>
          {data.map(property => (
            <Box key={property.id}>
              <PropertyCardComponent
                {...property}
                actions={
                  <Button
                    variant="contained"
                    onClick={() => handleOpenBookingDrawer(property)}>
                    Book Now
                  </Button>
                }
              />
            </Box>
          ))}
        </Stack>
      </Box>

      <BookingDrawer
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
