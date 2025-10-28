import jsonServer from 'json-server'
import { parseISO, startOfDay } from 'date-fns'
import fs from 'fs'

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

const data = JSON.parse(fs.readFileSync('./server/db.json'))
const router = jsonServer.router(data)

server.use(middlewares)

server.use((_req, _res, next) => {
  setTimeout(next, 2000)
})

server.get('/properties/available', (req, res) => {
  const { checkIn, checkOut } = req.query
  if (!checkIn || !checkOut) {
    return res.status(400).json({ error: 'checkIn and checkOut are required' })
  }

  const db = router.db
  const properties = db.get('properties').value()
  const bookings = db.get('bookings').value()

  const checkInDate = startOfDay(parseISO(checkIn))
  const checkOutDate = startOfDay(parseISO(checkOut))

  const availableProperties = properties.filter(property => {
    const propertyBookings = bookings.filter(b => b.propertyId === property.id)

    const hasOverlap = propertyBookings.some(booking => {
      const bookingStart = startOfDay(parseISO(booking.checkIn))
      const bookingEnd = startOfDay(parseISO(booking.checkOut))

      return checkInDate <= bookingEnd && checkOutDate >= bookingStart
    })

    return !hasOverlap
  })

  res.json(availableProperties)
})

server.get('/bookings/my', (req, res) => {
  const db = router.db
  const properties = db.get('properties').value()
  const bookings = db.get('bookings').value()

  const propertiesWithBookings = properties
    .map(property => ({
      ...property,
      bookings: bookings.filter(b => b.propertyId === property.id),
    }))
    .filter(property => property.bookings.length > 0)

  res.json(propertiesWithBookings)
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server running on port 3000')
})
