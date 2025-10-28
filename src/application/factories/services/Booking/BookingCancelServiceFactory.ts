import { HttpClientAxios } from '@/infra/HttpClient/HttpClientAxios'
import { BookingCancelService } from '@/services/Booking/Cancel/BookingCancelService'

export const makeBookingCancelServiceFactory = () => {
  const httpClient = HttpClientAxios.getInstance()

  return BookingCancelService.getInstance(httpClient)
}
