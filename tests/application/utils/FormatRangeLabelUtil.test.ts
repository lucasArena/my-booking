import { FormatRangeLabelUtil } from '@/application/utils/FormatRangeLabel/FormatRangeLabelUtil'

const placeholder = 'Add dates'

describe('FormatRangeLabelUtil', () => {
  it('should return the placeholder when both dates are missing', () => {
    const label = FormatRangeLabelUtil(
      { checkIn: null, checkOut: null },
      placeholder,
    )

    expect(label).toBe(placeholder)
  })

  it('should format the full range when both dates are provided', () => {
    const label = FormatRangeLabelUtil(
      {
        checkIn: new Date(2025, 0, 2),
        checkOut: new Date(2025, 0, 5),
      },
      placeholder,
    )

    expect(label).toBe('02 Jan 2025 – 05 Jan 2025')
  })

  it('should format the range when only the check-in date exists', () => {
    const label = FormatRangeLabelUtil(
      {
        checkIn: new Date(2025, 0, 2),
        checkOut: null,
      },
      placeholder,
    )

    expect(label).toBe('02 Jan 2025 – …')
  })

  it('should format the range when only the check-out date exists', () => {
    const label = FormatRangeLabelUtil(
      {
        checkIn: null,
        checkOut: new Date(2025, 0, 5),
      },
      placeholder,
    )

    expect(label).toBe('… – 05 Jan 2025')
  })
})
