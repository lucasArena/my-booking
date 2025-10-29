import { act, renderHook } from '@testing-library/react'
import { useContext } from 'react'
import { vi } from 'vitest'

import { PropertyProviderComponent } from '@/presentation/components/Providers/Property/PropertyProviderComponent'
import { PropertyContext } from '@/presentation/components/Providers/Property/PropertyProviderComponent.rules'

const useBookingUserMock = vi.hoisted(() => vi.fn())

vi.mock('@/presentation/hooks/UseBooking/UseBookingUser', () => ({
  useBookingUser: (
    ...args: Parameters<typeof useBookingUserMock>
  ): ReturnType<typeof useBookingUserMock> => useBookingUserMock(...args),
}))

describe('PropertyProviderComponent', () => {
  const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
    <PropertyProviderComponent>{children}</PropertyProviderComponent>
  )

  beforeEach(() => {
    useBookingUserMock.mockReset()
  })

  it('should expose booking state derived from the booking user hook', () => {
    const handleFetch = vi.fn()
    const bookings = [
      {
        id: 1,
        propertyId: 10,
        checkIn: new Date('2025-03-01'),
        checkOut: new Date('2025-03-05'),
      },
    ]

    useBookingUserMock.mockReturnValue({
      data: bookings,
      isLoading: true,
      error: 'Failed to fetch',
      handleFetch,
    })

    const { result } = renderHook(() => useContext(PropertyContext), {
      wrapper,
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe('Failed to fetch')
    expect(result.current.myBookings).toEqual(bookings)

    act(() => {
      result.current.handleGetMyBookedProperties()
    })

    expect(handleFetch).toHaveBeenCalledTimes(1)
  })

  it('should provide default values when the hook has no data', () => {
    const handleFetch = vi.fn()

    useBookingUserMock.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      handleFetch,
    })

    const { result } = renderHook(() => useContext(PropertyContext), {
      wrapper,
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe('')
    expect(result.current.myBookings).toEqual([])

    act(() => {
      result.current.handleGetMyBookedProperties()
    })

    expect(handleFetch).toHaveBeenCalledTimes(1)
  })
})
