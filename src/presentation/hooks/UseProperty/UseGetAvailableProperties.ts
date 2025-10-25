import { useFetch } from '@/presentation/hooks/UseFetch/UseFetch'
import { usePropertyContext } from '@/presentation/hooks/UseContext/UsePropertyContext'

export const useGetAvailableBooking = () => {
  const { getPropertyAvailableByDates } = usePropertyContext()

  return useFetch({ handle: getPropertyAvailableByDates })
}
