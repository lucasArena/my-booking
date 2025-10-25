import { useFetch } from '@/presentation/hooks/UseFetch/UseFetch'
import { usePropertyContext } from '@/presentation/hooks/UseContext/UsePropertyContext'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const useUpdateBooking = () => {
  const { updateBooking } = usePropertyContext()

  const fetch = useFetch({ handle: updateBooking })

  useEffect(() => {
    if (fetch.isSuccess) {
      toast.success('Booking edited successfully')
    }
  }, [fetch.isSuccess])

  return fetch
}
