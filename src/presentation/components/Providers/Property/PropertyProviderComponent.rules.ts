import { createContext, useState } from 'react'
import type {
  ICancelBookingParams,
  IGetPropertyAvailableByDatesParams,
  IMakeBookingParams,
  IPropertyContext,
  IUpdateBookingParams,
} from '@/presentation/components/Providers/Property/PropertyProviderComponent.types'
import type { IProperty } from '@/domain/entities/Property/Property.types'
import { VerifyHasNoDateOverlapUtil } from '@/application/utils/VerifyHasNoDateOverlap/VerifyHasNoDateOverlapUtil'
import { PropertiesMock } from '@/tests/mocks/Property.mock'
import { GenerateRandomNumberUtil } from '@/application/utils/GenerateRandomNumber/GenerateRandomNumberUtil'

const INITIAL_STATE: IPropertyContext = {
  properties: PropertiesMock,
  getMyBookedProperties: () => [],
  getPropertyAvailableByDates: () => [],
  makeBooking: () => {},
  cancelBooking: () => {},
  updateBooking: () => {},
}

export const PropertyContext = createContext(INITIAL_STATE)

export const usePropertyProviderComponent = () => {
  const [properties, setProperties] = useState<IProperty[]>(
    INITIAL_STATE.properties,
  )

  const makeBooking = ({
    propertyId,
    checkIn,
    checkOut,
  }: IMakeBookingParams): void => {
    const updatedProperties = properties.map(property => {
      if (property.id === propertyId) {
        return {
          ...property,
          bookings: [
            ...property.bookings,
            {
              checkIn,
              checkOut,
              id: GenerateRandomNumberUtil(),
            },
          ],
        }
      }
      return property
    })

    setProperties(updatedProperties)
  }

  const cancelBooking = (params: ICancelBookingParams): void => {
    const updatedProperties = properties.map(property => {
      if (property.id === params.propertyId) {
        return {
          ...property,
          bookings: property.bookings.filter(
            booking => booking.id !== params.bookingId,
          ),
        }
      }
      return property
    })

    setProperties(updatedProperties)
  }

  const updateBooking = (params: IUpdateBookingParams): void => {
    const updatedProperties = properties.map(property => {
      if (property.id === params.propertyId) {
        return {
          ...property,
          bookings: property.bookings.map(booking => {
            if (booking.id === params.bookingId) {
              return {
                ...booking,
                checkIn: params.checkIn,
                checkOut: params.checkOut,
              }
            }
            return booking
          }),
        }
      }
      return property
    })

    setProperties(updatedProperties)
  }

  const getMyBookedProperties = (): IProperty[] => {
    return properties.filter(property => property.bookings.length > 0)
  }

  const getPropertyAvailableByDates = ({
    checkIn,
    checkOut,
  }: IGetPropertyAvailableByDatesParams): IProperty[] => {
    const availableProperties = properties.filter(property =>
      property.bookings.every(booking =>
        VerifyHasNoDateOverlapUtil({
          startDate: booking.checkIn,
          endDate: booking.checkOut,
          startDateToVerify: checkIn,
          endDateToVerify: checkOut,
        }),
      ),
    )

    return availableProperties
  }

  return {
    cancelBooking,
    getMyBookedProperties,
    getPropertyAvailableByDates,
    makeBooking,
    properties,
    updateBooking,
  }
}
