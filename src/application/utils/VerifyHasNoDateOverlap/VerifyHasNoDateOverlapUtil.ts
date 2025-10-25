import type { IVerifyHasNoDateOverlapUtilParams } from '@/application/utils/VerifyHasNoDateOverlap/VerifyHasNoDateOverlapUtil.types'

export const VerifyHasNoDateOverlapUtil = ({
  startDate,
  endDate,
  startDateToVerify,
  endDateToVerify,
}: IVerifyHasNoDateOverlapUtilParams): boolean => {
  const startDateTime = startDate.getTime()
  const endDateTime = endDate.getTime()
  const startDateToVerifyTime = startDateToVerify.getTime()
  const endDateToVerifyTime = endDateToVerify.getTime()

  if (
    startDateTime >= endDateTime ||
    startDateToVerifyTime >= endDateToVerifyTime
  ) {
    return false
  }

  const endsBeforeTargetStarts = endDateToVerifyTime <= startDateTime
  const startsAfterTargetEnds = startDateToVerifyTime >= endDateTime

  return endsBeforeTargetStarts || startsAfterTargetEnds
}
