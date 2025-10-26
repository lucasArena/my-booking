import { VerifyHasNoDateOverlapUtil } from '@/application/utils/VerifyHasNoDateOverlap/VerifyHasNoDateOverlapUtil'

describe('VerifyHasNoDateOverlapUtil', () => {
  const createParams = (
    startDate: Date,
    endDate: Date,
    startDateToVerify: Date,
    endDateToVerify: Date,
  ) => ({ startDate, endDate, startDateToVerify, endDateToVerify })

  it('should return true when the periods do not overlap (before)', () => {
    const result = VerifyHasNoDateOverlapUtil(
      createParams(
        new Date(2025, 0, 10),
        new Date(2025, 0, 15),
        new Date(2025, 0, 1),
        new Date(2025, 0, 5),
      ),
    )

    expect(result).toBe(true)
  })

  it('should return true when the periods do not overlap (after)', () => {
    const result = VerifyHasNoDateOverlapUtil(
      createParams(
        new Date(2025, 0, 10),
        new Date(2025, 0, 15),
        new Date(2025, 0, 16),
        new Date(2025, 0, 20),
      ),
    )

    expect(result).toBe(true)
  })

  it('should return true when the second range starts the same day the first one ends', () => {
    const result = VerifyHasNoDateOverlapUtil(
      createParams(
        new Date(2025, 9, 1),
        new Date(2025, 9, 3),
        new Date(2025, 9, 3),
        new Date(2025, 9, 6),
      ),
    )

    expect(result).toBe(true)
  })

  it('should return false when the periods overlap', () => {
    const result = VerifyHasNoDateOverlapUtil(
      createParams(
        new Date(2025, 0, 10),
        new Date(2025, 0, 15),
        new Date(2025, 0, 12),
        new Date(2025, 0, 18),
      ),
    )

    expect(result).toBe(false)
  })

  it('should return false when any range is invalid (start >= end)', () => {
    const invalidOriginal = VerifyHasNoDateOverlapUtil(
      createParams(
        new Date(2025, 0, 10),
        new Date(2025, 0, 10),
        new Date(2025, 0, 12),
        new Date(2025, 0, 14),
      ),
    )

    const invalidToVerify = VerifyHasNoDateOverlapUtil(
      createParams(
        new Date(2025, 0, 10),
        new Date(2025, 0, 12),
        new Date(2025, 0, 14),
        new Date(2025, 0, 14),
      ),
    )

    expect(invalidOriginal).toBe(false)
    expect(invalidToVerify).toBe(false)
  })
})
