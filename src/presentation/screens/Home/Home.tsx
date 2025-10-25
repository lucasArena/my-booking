import React from 'react'

import SendRoundedIcon from '@mui/icons-material/SendRounded'
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material'

import { DateRangeFieldComponent } from '@/presentation/components/Inputs/DateRange/InputDateRangeFieldComponent'
import { useHomeStyles } from '@/presentation/screens/Home/Home.styles'
import { useHome } from '@/presentation/screens/Home/Home.rules'

export const HomeScreen: React.FC = () => {
  const styles = useHomeStyles()
  const { handleSearchBooking, selectedRange, setSelectedRange } = useHome()

  return (
    <Box sx={styles.page}>
      <Box sx={styles.hero}>
        <Box sx={styles.heroOverlay} />

        <Container maxWidth="lg" sx={styles.heroContainer}>
          <Stack spacing={3.5} sx={styles.heroContent}>
            <Typography variant="h1" sx={styles.heroTitle}>
              Hotel Booking
            </Typography>
            <Typography variant="body1" sx={styles.heroSubtitle}>
              Find stays curated for unforgettable experiences — from seaside
              villas to vibrant city lofts, discover a place that feels like
              yours.
            </Typography>

            <Paper
              component="form"
              elevation={10}
              sx={styles.searchPaper}
              onSubmit={event => {
                event.preventDefault()
                handleSearchBooking()
              }}>
              <Stack sx={styles.searchStack}>
                <DateRangeFieldComponent
                  value={selectedRange}
                  onChange={range => setSelectedRange(range)}
                  label="Select your stay"
                  textFieldProps={{
                    fullWidth: true,
                    sx: styles.searchField,
                  }}
                />

                <Button
                  variant="contained"
                  size="large"
                  sx={styles.searchButton}
                  endIcon={<SendRoundedIcon />}
                  type="submit"
                  disabled={!selectedRange.checkIn || !selectedRange.checkOut}>
                  Send
                </Button>
              </Stack>
            </Paper>

            <Box sx={styles.heroHighlights}>
              <Chip label="Flexible cancellation" sx={styles.highlightChip} />
              <Chip label="24/7 concierge" sx={styles.highlightChip} />
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
