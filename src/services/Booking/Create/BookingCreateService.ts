import type { IHttpClient } from '@/infra/HttpClient/HttpClient.types'
import type { BookingCreateServiceNamespace } from '@/services/Booking/Create/BookingCreateService.types'

export class BookingCreateService {
  private static instance: BookingCreateService

  private httpClient: IHttpClient

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient
  }

  static getInstance(httpClient: IHttpClient) {
    if (!BookingCreateService.instance) {
      BookingCreateService.instance = new BookingCreateService(httpClient)
    }

    return BookingCreateService.instance
  }

  async handle(
    data: BookingCreateServiceNamespace.IRequest,
  ): Promise<BookingCreateServiceNamespace.TResponse> {
    const response = await this.httpClient.post<
      BookingCreateServiceNamespace.IRequest,
      BookingCreateServiceNamespace.TResponse
    >('/bookings', data)

    return response
  }
}
