import { ParseDateLocalUtil } from '@/application/utils/ParseDateLocalUtil'

describe('ParseDateLocalUtil', () => {
  it('returns null when the value is null or empty', () => {
    expect(ParseDateLocalUtil(null)).toBeNull()
    expect(ParseDateLocalUtil('')).toBeNull()
  })

  it('parses a valid ISO date string into a Date object', () => {
    const result = ParseDateLocalUtil('2025-12-25')

    expect(result).toEqual(new Date(2025, 11, 25))
  })

  it('returns null for an invalid date string', () => {
    expect(ParseDateLocalUtil('invalid-date')).toBeNull()
  })
})
