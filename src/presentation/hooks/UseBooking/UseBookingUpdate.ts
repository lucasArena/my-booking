import { makeBookingUpdateServiceFactory } from '@/application/factories/services/Booking/BookingUpdateServiceFactory'
import { useFetch } from '@/presentation/hooks/UseFetch/UseFetch'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const useBookingUpdate = () => {
  const fetch = useFetch(makeBookingUpdateServiceFactory())

  useEffect(() => {
    if (fetch.isSuccess) {
      toast.success('Booking edited successfully')
    }
  }, [fetch.isSuccess])

  return fetch
}
