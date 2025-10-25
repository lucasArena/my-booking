import { useFetch } from '@/presentation/hooks/UseFetch/UseFetch'
import { usePropertyContext } from '@/presentation/hooks/UseContext/UsePropertyContext'

export const useGetMyBookings = () => {
  const { getMyBookedProperties } = usePropertyContext()

  return useFetch({ handle: getMyBookedProperties })
}
