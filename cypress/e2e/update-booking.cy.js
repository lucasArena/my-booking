describe('Update booking flow', () => {
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

    cy.intercept('PUT', '**/bookings/*', req => {
      const bookingId = Number(req.url.split('/').pop())
      bookings = bookings.map(booking => {
        if (booking.id !== bookingId) {
          return booking
        }

        return {
          ...booking,
          checkIn: req.body.checkIn,
          checkOut: req.body.checkOut,
        }
      })

      req.reply({ statusCode: 200, body: { ...req.body } })
    }).as('updateBooking')
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

  it('allows users to update their booking dates', () => {
    const originalStayRange = createBookingThroughUi()
    const updatedStayRange = `${formatDate(2025, 9, 10)} – ${formatDate(
      2025,
      9,
      14,
    )}`

    cy.contains('button', 'Change booking').should('be.enabled').first().click()

    cy.contains('Update your stay').should('be.visible')

    cy.get('[data-cy="calendar-day-2025-10-10"]').click()
    cy.get('[data-cy="calendar-day-2025-10-14"]').click()

    cy.contains('button', 'Edit').should('not.be.disabled').click()

    cy.wait('@updateBooking')
    cy.wait('@getMyBookings')

    cy.contains('Booking edited successfully', { timeout: 10000 }).should(
      'be.visible',
    )

    cy.contains('Update your stay').should('not.exist')
    cy.get('body').should('not.contain', originalStayRange)
    cy.contains(updatedStayRange, { timeout: 10000 }).should('be.visible')
    cy.url().should('include', '/my-bookings')
  })
})
