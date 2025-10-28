import type { IHttpClient } from '@/infra/HttpClient/HttpClient.types'
import type { BookingCancelServiceNamespace } from '@/services/Booking/Cancel/BookingCancelService.types'

export class BookingCancelService {
  private static instance: BookingCancelService

  private httpClient: IHttpClient

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient
  }

  static getInstance(httpClient: IHttpClient) {
    if (!BookingCancelService.instance) {
      BookingCancelService.instance = new BookingCancelService(httpClient)
    }

    return BookingCancelService.instance
  }

  async handle({
    id,
  }: BookingCancelServiceNamespace.TRequest): Promise<BookingCancelServiceNamespace.TResponse> {
    await this.httpClient.delete(`/bookings/${id}`)
  }
}
