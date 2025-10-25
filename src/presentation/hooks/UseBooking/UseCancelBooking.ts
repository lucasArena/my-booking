import { useFetch } from '@/presentation/hooks/UseFetch/UseFetch'
import { usePropertyContext } from '@/presentation/hooks/UseContext/UsePropertyContext'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const useCancelBooking = () => {
  const { cancelBooking } = usePropertyContext()

  const fetch = useFetch({ handle: cancelBooking })

  useEffect(() => {
    if (fetch.isSuccess) {
      toast.success('Booking cancelled successfully')
    }
  }, [fetch.isSuccess])

  return fetch
}
