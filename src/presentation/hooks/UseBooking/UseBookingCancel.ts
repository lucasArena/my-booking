import { useFetch } from '@/presentation/hooks/UseFetch/UseFetch'

import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { makeBookingCancelServiceFactory } from '@/application/factories/services/Booking/BookingCancelServiceFactory'

export const useBookingCancel = () => {
  const fetch = useFetch(makeBookingCancelServiceFactory())

  useEffect(() => {
    if (fetch.isSuccess) {
      toast.success('Booking cancelled successfully')

      // fetch.handleResetState()
    }
  }, [fetch.isSuccess])

  useEffect(() => {
    if (fetch.error) {
      toast.error(fetch.error)
      fetch.handleResetState()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch.error])

  return fetch
}
