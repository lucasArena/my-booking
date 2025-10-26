import { ParseDateLocalUtil } from '@/application/utils/ParseDateLocalUtil'

describe('ParseDateLocalUtil', () => {
  it('should return null when the value is null or empty', () => {
    expect(ParseDateLocalUtil(null)).toBeNull()
    expect(ParseDateLocalUtil('')).toBeNull()
  })

  it('should parse a valid ISO date string into a Date object', () => {
    const result = ParseDateLocalUtil('2025-12-25')

    expect(result).toEqual(new Date(2025, 11, 25))
  })

  it('should return null for an invalid date string', () => {
    expect(ParseDateLocalUtil('invalid-date')).toBeNull()
  })
})
