import { act, renderHook } from '@testing-library/react'
import { useContext } from 'react'
import { vi } from 'vitest'

import { PropertyProviderComponent } from '@/presentation/components/Providers/Property/PropertyProviderComponent'
import { PropertyContext } from '@/presentation/components/Providers/Property/PropertyProviderComponent.rules'
import { PropertiesMock } from '@/tests/mocks/Property.mock'

const generateRandomNumberMock = vi.hoisted(() => vi.fn(() => 123456))

vi.mock(
  '@/application/utils/GenerateRandomNumber/GenerateRandomNumberUtil',
  () => ({
    GenerateRandomNumberUtil: generateRandomNumberMock,
  }),
)

describe('PropertyProviderComponent', () => {
  const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
    <PropertyProviderComponent>{children}</PropertyProviderComponent>
  )

  beforeEach(() => {
    generateRandomNumberMock.mockClear()
    generateRandomNumberMock.mockImplementation(() => 123456)
  })

  it('exposes the initial list of properties from the mock data', () => {
    const { result } = renderHook(() => useContext(PropertyContext), {
      wrapper,
    })

    expect(result.current.properties).toHaveLength(PropertiesMock.length)
  })

  it('manages the booking lifecycle through context actions', () => {
    const { result } = renderHook(() => useContext(PropertyContext), {
      wrapper,
    })

    const initialCheckIn = new Date('2025-09-01')
    const initialCheckOut = new Date('2025-09-05')

    act(() => {
      result.current.makeBooking({
        propertyId: 101,
        checkIn: initialCheckIn,
        checkOut: initialCheckOut,
      })
    })

    let property = result.current.properties.find(prop => prop.id === 101)
    expect(property?.bookings).toHaveLength(1)
    expect(property?.bookings[0]).toMatchObject({
      id: 123456,
      checkIn: initialCheckIn,
      checkOut: initialCheckOut,
    })

    expect(
      result.current.getMyBookedProperties().map(prop => prop.id),
    ).toContain(101)

    const updatedCheckIn = new Date('2025-09-02')
    const updatedCheckOut = new Date('2025-09-07')

    act(() => {
      result.current.updateBooking({
        propertyId: 101,
        bookingId: 123456,
        checkIn: updatedCheckIn,
        checkOut: updatedCheckOut,
      })
    })

    property = result.current.properties.find(prop => prop.id === 101)
    expect(property?.bookings[0].checkIn).toEqual(updatedCheckIn)
    expect(property?.bookings[0].checkOut).toEqual(updatedCheckOut)

    act(() => {
      result.current.cancelBooking({ propertyId: 101, bookingId: 123456 })
    })

    property = result.current.properties.find(prop => prop.id === 101)
    expect(property?.bookings).toHaveLength(0)
    expect(result.current.getMyBookedProperties()).toHaveLength(0)
  })

  it('filters properties based on booking overlaps', () => {
    const { result } = renderHook(() => useContext(PropertyContext), {
      wrapper,
    })

    const checkIn = new Date('2025-10-01')
    const checkOut = new Date('2025-10-10')

    act(() => {
      result.current.makeBooking({
        propertyId: 101,
        checkIn,
        checkOut,
      })
    })

    const overlapping = result.current.getPropertyAvailableByDates({
      checkIn: new Date('2025-10-05'),
      checkOut: new Date('2025-10-08'),
    })

    expect(overlapping.find(prop => prop.id === 101)).toBeUndefined()

    const nonOverlapping = result.current.getPropertyAvailableByDates({
      checkIn: new Date('2025-10-11'),
      checkOut: new Date('2025-10-15'),
    })

    expect(nonOverlapping.find(prop => prop.id === 101)).toBeDefined()
  })
})
