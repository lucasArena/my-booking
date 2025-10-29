import { ParseDateLocalUtil } from '@/application/utils/ParseDateLocalUtil/ParseDateLocalUtil'
import type { TBookingRange } from '@/domain/entities/Booking/Booking.types'
import type { IProperty } from '@/domain/entities/Property/Property.types'
import { usePropertyGetAvailable } from '@/presentation/hooks/UseProperty/UsePropertyGetAvailable'
import { formatDate, isValid } from 'date-fns'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import type { IBookingSearchForm } from '@/presentation/screens/Booking/Search/BookingSearch.types'

const defaultValues: IBookingSearchForm = {
  dateRange: {
    checkIn: null,
    checkOut: null,
  },
}

export const useBookingSearch = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { data, error, isLoading, isSuccess, handleFetch } =
    usePropertyGetAvailable()

  const { control, setValue, watch } = useForm<IBookingSearchForm>({
    defaultValues,
  })

  const formValues = watch()

  const searchParams = new URLSearchParams(location.search)

  const safeData = data ?? []

  const handleError = () => {
    if (error) {
      return error
    }

    if (!formValues.dateRange.checkIn || !formValues.dateRange.checkOut) {
      return ''
    }

    const isCheckinGreaterThanCheckout =
      formValues.dateRange.checkIn > formValues.dateRange.checkOut

    if (isCheckinGreaterThanCheckout) {
      return 'Check-in date must be before check-out date.'
    }

    return ''
  }

  const errorMessage = handleError()

  const [selectedProperty, setSelectedProperty] = useState<IProperty | null>(
    null,
  )

  const handleOpenBookingDrawer = (propertySelected: IProperty) => {
    setSelectedProperty(propertySelected)
  }

  const handleCloseBookingDrawer = () => {
    setSelectedProperty(null)
  }

  const handleConfirmBooking = () => {
    navigate('/my-bookings')
  }

  const handleRangeChange = (range: TBookingRange) => {
    navigate(
      `?checkin=${formatDate(range.checkIn!, 'yyyy-MM-dd')}&checkout=${formatDate(range.checkOut!, 'yyyy-MM-dd')}`,
    )
  }

  const handleRetry = () => {
    if (!formValues.dateRange.checkIn || !formValues.dateRange.checkOut) {
      return
    }

    handleFetch({
      checkIn: formatDate(formValues.dateRange.checkIn, 'yyyy-MM-dd'),
      checkOut: formatDate(formValues.dateRange.checkOut, 'yyyy-MM-dd'),
    })
  }

  useEffect(() => {
    const checkIn = searchParams.get('checkin')
    const checkOut = searchParams.get('checkout')

    const safeCheckIn = ParseDateLocalUtil(checkIn)
    const safeCheckOut = ParseDateLocalUtil(checkOut)

    setValue('dateRange.checkIn', safeCheckIn)
    setValue('dateRange.checkOut', safeCheckOut)

    if (isValid(safeCheckIn) && isValid(safeCheckOut)) {
      handleFetch({
        checkIn: formatDate(safeCheckIn!, 'yyyy-MM-dd'),
        checkOut: formatDate(safeCheckOut!, 'yyyy-MM-dd'),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  return {
    control,
    formValues,
    data: safeData,
    errorMessage,
    isLoading,
    isSuccess,
    handleCloseBookingDrawer,
    handleConfirmBooking,
    handleFetch,
    handleRetry,
    handleOpenBookingDrawer,
    handleRangeChange,
    selectedProperty,
  }
}
