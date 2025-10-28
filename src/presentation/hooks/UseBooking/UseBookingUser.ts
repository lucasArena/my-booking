import { makeBookingUserServiceFactory } from '@/application/factories/services/Booking/BookingUserServiceFactory'
import { useFetch } from '@/presentation/hooks/UseFetch/UseFetch'

export const useBookingUser = () => {
  return useFetch(makeBookingUserServiceFactory())
}
