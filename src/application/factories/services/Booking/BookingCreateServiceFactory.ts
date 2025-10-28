import { HttpClientAxios } from '@/infra/HttpClient/HttpClientAxios'
import { BookingCreateService } from '@/services/Booking/Create/BookingCreateService'

export const makeBookingCreateServiceFactory = () => {
  const httpClient = HttpClientAxios.getInstance()

  return BookingCreateService.getInstance(httpClient)
}
