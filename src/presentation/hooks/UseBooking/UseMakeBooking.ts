import { useFetch } from '@/presentation/hooks/UseFetch/UseFetch'
import { usePropertyContext } from '@/presentation/hooks/UseContext/UsePropertyContext'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export const useMakeBooking = () => {
  const { makeBooking } = usePropertyContext()

  const fetch = useFetch({ handle: makeBooking })

  useEffect(() => {
    if (fetch.isSuccess) {
      toast.success('Booking made successfully')
    }
  }, [fetch.isSuccess])

  return fetch
}
