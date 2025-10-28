import type { IHttpClient } from '@/infra/HttpClient/HttpClient.types'
import type { BookingUpdateServiceNamespace } from '@/services/Booking/Update/BookingUpdateService.types'

export class BookingUpdateService {
  private static instance: BookingUpdateService

  private httpClient: IHttpClient

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient
  }

  static getInstance(httpClient: IHttpClient) {
    if (!BookingUpdateService.instance) {
      BookingUpdateService.instance = new BookingUpdateService(httpClient)
    }

    return BookingUpdateService.instance
  }

  async handle(
    data: BookingUpdateServiceNamespace.TRequest,
  ): Promise<BookingUpdateServiceNamespace.TResponse> {
    const response = await this.httpClient.put<
      BookingUpdateServiceNamespace.TRequest,
      BookingUpdateServiceNamespace.TResponse
    >(`/bookings/${data.id}`, data)

    return response
  }
}
