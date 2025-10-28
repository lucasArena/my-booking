import type { IHttpClient } from '@/infra/HttpClient/HttpClient.types'
import type { FindMyBookingServiceNamespace } from '@/services/Booking/User/BookingUserService.types'

export class BookingUserService {
  private static instance: BookingUserService

  private httpClient: IHttpClient

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient
  }

  static getInstance(httpClient: IHttpClient) {
    if (!BookingUserService.instance) {
      BookingUserService.instance = new BookingUserService(httpClient)
    }

    return BookingUserService.instance
  }

  async handle(
    data: FindMyBookingServiceNamespace.TRequest,
  ): Promise<FindMyBookingServiceNamespace.TResponse> {
    const response = await this.httpClient.get<
      FindMyBookingServiceNamespace.TRequest,
      FindMyBookingServiceNamespace.TResponse
    >('/bookings/my', data)

    return response
  }
}
