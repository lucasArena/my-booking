import { HttpClientAxios } from '@/infra/HttpClient/HttpClientAxios'
import { BookingUpdateService } from '@/services/Booking/Update/BookingUpdateService'

export const makeBookingUpdateServiceFactory = () => {
  const httpClient = HttpClientAxios.getInstance()

  return BookingUpdateService.getInstance(httpClient)
}
