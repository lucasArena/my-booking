import { HttpClientAxios } from '@/infra/HttpClient/HttpClientAxios'
import { BookingUserService } from '@/services/Booking/User/BookingUserService'

export const makeBookingUserServiceFactory = () => {
  const httpClient = HttpClientAxios.getInstance()

  return BookingUserService.getInstance(httpClient)
}
