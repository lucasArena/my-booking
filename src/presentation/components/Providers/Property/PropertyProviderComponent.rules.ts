import { createContext } from 'react'
import type { IPropertyContext } from '@/presentation/components/Providers/Property/PropertyProviderComponent.types'
import { useBookingUser } from '@/presentation/hooks/UseBooking/UseBookingUser'

const INITIAL_STATE: IPropertyContext = {
  error: '',
  isLoading: false,
  myBookings: [],
  handleGetMyBookedProperties: () => {},
}

export const PropertyContext = createContext(INITIAL_STATE)

export const usePropertyProviderComponent = () => {
  const bookingUser = useBookingUser()

  const handleGetMyBookedProperties = () => {
    bookingUser.handleFetch()
  }

  return {
    isLoading: !!bookingUser.isLoading,
    myBookings: bookingUser.data || [],
    error: bookingUser.error || '',
    handleGetMyBookedProperties,
  }
}
