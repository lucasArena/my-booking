describe('My bookings flow', () => {
  const formatDate = (year, monthIndex, day) =>
    new Intl.DateTimeFormat('en-US').format(new Date(year, monthIndex, day))

  it('creates a booking and displays it in My Bookings', () => {
    cy.clock(new Date(2025, 9, 1).getTime(), ['Date'])

    cy.visit('/')

    cy.get('[data-cy="date-range-input"]').click()

    cy.get('[data-cy="calendar-day-2025-10-01"]').click()
    cy.get('[data-cy="calendar-day-2025-10-04"]').click()

    cy.contains('button', 'Apply').should('not.be.disabled').click()

    cy.contains('button', 'Book Now').first().click()

    cy.contains('button', 'Confirm').should('be.visible').click()

    cy.url().should('include', '/my-bookings')
    cy.contains('Midtown Skyline Loft').should('be.visible')

    const stayRange = `${formatDate(2025, 9, 1)} – ${formatDate(2025, 9, 4)}`
    cy.contains(stayRange).should('be.visible')
  })
})
