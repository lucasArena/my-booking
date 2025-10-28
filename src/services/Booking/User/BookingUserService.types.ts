import type { IPropertyBooking } from '@/domain/entities/Property/PropertyBooking.types'

export namespace FindMyBookingServiceNamespace {
  export type TRequest = void

  export type TResponse = IPropertyBooking[]
}
