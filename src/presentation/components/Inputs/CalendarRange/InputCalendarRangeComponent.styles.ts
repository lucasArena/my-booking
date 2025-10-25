import { alpha, styled } from '@mui/material'
import { PickersDay } from '@mui/x-date-pickers'
import type { IRangeDaysProps } from '@/presentation/components/Inputs/CalendarRange/InputCalendarRangeComponent.types'

export const RangePickersDay = styled(PickersDay, {
  shouldForwardProp: (prop: PropertyKey) =>
    prop !== 'isBetween' && prop !== 'isStart' && prop !== 'isEnd',
})<IRangeDaysProps>(({ theme, isBetween, isStart, isEnd }) => {
  const rangeHoverColor = alpha(theme.palette.primary.main, 0.2)

  return {
    ...(isBetween && {
      borderRadius: 0,
      backgroundColor: rangeHoverColor,
      color: theme.palette.text.primary,
    }),
    ...((isStart || isEnd) && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    ...(isStart && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    }),
    ...(isEnd && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    }),
  }
})
