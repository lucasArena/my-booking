export const ParseDateLocalUtil = (value: string | null): Date | null => {
  if (!value) {
    return null
  }

  const [year, month, day] = value.split('-').map(Number)

  const date = new Date(year, month - 1, day)
  return Number.isNaN(date.getTime()) ? null : date
}
