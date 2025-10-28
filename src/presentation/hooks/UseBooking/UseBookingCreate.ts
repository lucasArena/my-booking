import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useFetch } from '@/presentation/hooks/UseFetch/UseFetch'
import { BookingCreateService } from '@/services/Booking/Create/BookingCreateService'
import { HttpClientAxios } from '@/infra/HttpClient/HttpClientAxios'

export const useBookingCreate = () => {
  const httpClient = HttpClientAxios.getInstance()
  const fetch = useFetch(BookingCreateService.getInstance(httpClient))

  useEffect(() => {
    if (fetch.isSuccess) {
      toast.success('Booking made successfully')
      fetch.handleResetState()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
