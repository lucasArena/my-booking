describe('Cancel booking flow', () => {
  const property = {
    id: 1,
    img: 'https://plus.unsplash.com/premium_photo-1661950439212-558fa5cc82e0?auto=format&fit=crop&q=80&w=3251',
    name: 'Midtown Skyline Loft',
    description:
      'Contemporary loft with floor-to-ceiling windows, dedicated workspace, and concierge amenities.',
    location: 'Midtown, New York, NY',
    price: '285',
  }

  let bookings = []
  let nextBookingId = 1

  const resetState = () => {
    bookings = []
    nextBookingId = 1
  }

  const setupNetwork = () => {
    cy.intercept('GET', '**/properties/available*', req => {
      req.reply([property])
    }).as('getAvailableProperties')

    cy.intercept('POST', '**/bookings', req => {
      const newBooking = {
        id: nextBookingId++,
        propertyId: property.id,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
      }

      bookings.push(newBooking)

      req.reply({ statusCode: 201, body: {} })
    }).as('createBooking')

    cy.intercept('GET', '**/bookings/my', req => {
      const propertyBookings = bookings.filter(
        booking => booking.propertyId === property.id,
      )

      if (!propertyBookings.length) {
        req.reply([])
        return
      }

      req.reply([
        {
          ...property,
          bookings: propertyBookings,
        },
      ])
    }).as('getMyBookings')

    cy.intercept('DELETE', '**/bookings/*', req => {
      const bookingId = Number(req.url.split('/').pop())
      bookings = bookings.filter(booking => booking.id !== bookingId)

      req.reply({ statusCode: 204, body: {} })
    }).as('cancelBooking')
  }

  const formatDate = (year, monthIndex, day) =>
    new Intl.DateTimeFormat('en-US').format(new Date(year, monthIndex, day))

  const createBookingThroughUi = () => {
    cy.visit('/')

    cy.get('[data-cy="date-range-input"]').click()

    cy.get('[data-cy="calendar-day-2025-10-01"]').click()
    cy.get('[data-cy="calendar-day-2025-10-04"]').click()

    cy.contains('button', 'Apply').should('not.be.disabled').click()

    cy.wait('@getAvailableProperties')

    cy.contains('button', 'Book Now').first().click()

    cy.contains('button', 'Confirm').should('be.visible').click()

    cy.wait('@createBooking')
    cy.wait('@getMyBookings')

    cy.url().should('include', '/my-bookings')

    const stayRange = `${formatDate(2025, 9, 1)} – ${formatDate(2025, 9, 4)}`
    cy.contains(stayRange).should('be.visible')

    return stayRange
  }

  beforeEach(() => {
    resetState()
    setupNetwork()
    cy.clock(new Date(2025, 9, 1).getTime(), ['Date'])
  })

  it('allows users to cancel an existing booking', () => {
    const stayRange = createBookingThroughUi()

    cy.contains('button', 'Cancel booking').should('be.enabled').first().click()

    cy.contains('button', 'Confirm').should('be.visible').click()

    cy.wait('@cancelBooking')
    cy.wait('@getMyBookings')

    cy.contains('Booking cancelled successfully', { timeout: 10000 }).should(
      'be.visible',
    )

    cy.get('body').should('not.contain', stayRange)
    cy.contains('You have no bookings yet.', { timeout: 10000 }).should(
      'be.visible',
    )
    cy.url().should('include', '/my-bookings')
  })
})
