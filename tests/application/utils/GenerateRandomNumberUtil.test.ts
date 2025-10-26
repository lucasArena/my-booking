import { afterEach, describe, expect, it, vi } from 'vitest'

import { GenerateRandomNumberUtil } from '@/application/utils/GenerateRandomNumber/GenerateRandomNumberUtil'

describe('GenerateRandomNumberUtil', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the current timestamp', () => {
    vi.useFakeTimers()

    const fixedDate = new Date('2025-03-15T12:00:00Z')
    vi.setSystemTime(fixedDate)

    const value = GenerateRandomNumberUtil()

    expect(value).toBe(fixedDate.getTime())
  })
})
