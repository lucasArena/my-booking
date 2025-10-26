import { startOfDay } from 'date-fns'
import type { IVerifyHasNoDateOverlapUtilParams } from '@/application/utils/VerifyHasNoDateOverlap/VerifyHasNoDateOverlapUtil.types'

export const VerifyHasNoDateOverlapUtil = ({
  startDate,
  endDate,
  startDateToVerify,
  endDateToVerify,
}: IVerifyHasNoDateOverlapUtilParams): boolean => {
  const startDateTime = startOfDay(startDate).getTime()
  const endDateTime = startOfDay(endDate).getTime()
  const startDateToVerifyTime = startOfDay(startDateToVerify).getTime()
  const endDateToVerifyTime = startOfDay(endDateToVerify).getTime()

  if (
    startDateTime >= endDateTime ||
    startDateToVerifyTime >= endDateToVerifyTime
  ) {
    return false
  }

  const endsBeforeTargetStarts = endDateToVerifyTime < startDateTime
  const startsAfterTargetEnds = startDateToVerifyTime > endDateTime

  return endsBeforeTargetStarts || startsAfterTargetEnds
}
